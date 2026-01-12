import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { donorId } = body;

    if (!donorId) {
      return NextResponse.json(
        { error: "Donor ID is required" },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.findUnique({
      where: { id: donorId },
      include: {
        donations: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!donor) {
      return NextResponse.json(
        { error: "Donor not found" },
        { status: 404 }
      );
    }

    const donationSummary = {
      totalDonations: donor.donations.length,
      totalAmount: donor.donations.reduce((sum, d) => sum + d.amount, 0),
      averageDonation: donor.donations.length > 0 
        ? donor.donations.reduce((sum, d) => sum + d.amount, 0) / donor.donations.length
        : 0,
      lastDonationDate: donor.donations.length > 0 ? donor.donations[0].date : null,
      donationTypes: [...new Set(donor.donations.map(d => d.type))],
      recentDonations: donor.donations.slice(0, 5).map(d => ({
        amount: d.amount,
        date: d.date,
        type: d.type,
      })),
    };

    const prompt = `Analyze the following donor profile and provide insights about their giving patterns and engagement strategies:

Donor Name: ${donor.name}
Email: ${donor.email}
Phone: ${donor.phone}
Address: ${donor.address || "N/A"}, ${donor.city || ""}, ${donor.state || ""} ${donor.zipCode || ""}
Total Donations: ${donationSummary.totalDonations}
Total Amount: $${donationSummary.totalAmount.toFixed(2)}
Average Donation: $${donationSummary.averageDonation.toFixed(2)}
Last Donation: ${donationSummary.lastDonationDate ? new Date(donationSummary.lastDonationDate).toLocaleDateString() : "Never"}
Donation Types: ${donationSummary.donationTypes.join(", ")}

Recent Donations:
${donationSummary.recentDonations.map(d => `- $${d.amount} on ${new Date(d.date).toLocaleDateString()} (${d.type})`).join("\n")}

Please provide:
1. A summary of this donor's giving pattern
2. Key insights about their engagement level
3. Specific recommendations to increase engagement and retention
4. Suggested next steps for outreach`;

    const message = await openai.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const insights = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      donor: {
        id: donor.id,
        name: donor.name,
        email: donor.email,
      },
      donationSummary,
      insights,
    });
  } catch (error) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const donor = await prisma.donor.findUnique({
      where: { id },
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

    return NextResponse.json(donor);
  } catch (error) {
    console.error("Error fetching donor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, address, city, state, zipCode, notes } = body;

    const donor = await prisma.donor.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        notes,
      },
    });

    return NextResponse.json(donor);
  } catch (error) {
    console.error("Error updating donor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = session.user;

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can delete donors" },
        { status: 403 }
      );
    }

    const { id } = await params;

    await prisma.donor.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Error deleting donor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

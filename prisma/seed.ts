import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  await prisma.user.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.donor.deleteMany({});
  await prisma.campaign.deleteMany({});
  await prisma.task.deleteMany({});

  const hashedAdminPassword = await bcrypt.hash("admin123", 10);
  const hashedStaffPassword = await bcrypt.hash("staff123", 10);

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@donorconnect.com",
      password: hashedAdminPassword,
      role: "ADMIN",
    },
  });

  const staffUser = await prisma.user.create({
    data: {
      name: "Staff Member",
      email: "staff@donorconnect.com",
      password: hashedStaffPassword,
      role: "STAFF",
    },
  });

  console.log("✅ Created users:", { admin: adminUser.email, staff: staffUser.email });

  const donors = await prisma.donor.createMany({
    data: [
      {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        notes: "Generous donor, prefers monthly donations",
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "(555) 234-5678",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        notes: "Corporate matching gifts available",
      },
      {
        name: "Michael Chen",
        email: "m.chen@email.com",
        phone: "(555) 345-6789",
        address: "789 Pine Road",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        notes: "Interested in planned giving",
      },
      {
        name: "Emily Rodriguez",
        email: "emily.r@email.com",
        phone: "(555) 456-7890",
        address: "321 Elm Street",
        city: "Houston",
        state: "TX",
        zipCode: "77001",
        notes: "Major donor, annual gala attendee",
      },
      {
        name: "David Williams",
        email: "d.williams@email.com",
        phone: "(555) 567-8901",
        address: "654 Maple Drive",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
        notes: "First-time donor, very engaged",
      },
    ],
  });

  console.log(`✅ Created ${donors.count} donors`);

  const donorIds = await prisma.donor.findMany({
    select: { id: true },
  });

  const donations = await prisma.donation.createMany({
    data: [
      {
        amount: 500,
        date: new Date("2024-01-15"),
        type: "Credit Card",
        notes: "Monthly recurring donation",
        donorId: donorIds[0].id,
      },
      {
        amount: 1000,
        date: new Date("2024-02-20"),
        type: "Bank Transfer",
        notes: "Special campaign contribution",
        donorId: donorIds[0].id,
      },
      {
        amount: 2500,
        date: new Date("2024-01-05"),
        type: "Check",
        notes: "Annual giving pledge",
        donorId: donorIds[1].id,
      },
      {
        amount: 750,
        date: new Date("2024-03-10"),
        type: "Credit Card",
        notes: "Tax-deductible donation",
        donorId: donorIds[1].id,
      },
      {
        amount: 5000,
        date: new Date("2024-02-28"),
        type: "Bank Transfer",
        notes: "Major gift for new building fund",
        donorId: donorIds[2].id,
      },
      {
        amount: 300,
        date: new Date("2024-03-15"),
        type: "Cash",
        notes: "In-person donation",
        donorId: donorIds[2].id,
      },
      {
        amount: 10000,
        date: new Date("2023-12-01"),
        type: "Stock",
        notes: "Year-end major gift",
        donorId: donorIds[3].id,
      },
      {
        amount: 1500,
        date: new Date("2024-01-20"),
        type: "Credit Card",
        notes: "Gala sponsorship",
        donorId: donorIds[3].id,
      },
      {
        amount: 250,
        date: new Date("2024-03-05"),
        type: "Check",
        notes: "First donation",
        donorId: donorIds[4].id,
      },
      {
        amount: 1000,
        date: new Date("2024-03-25"),
        type: "Credit Card",
        notes: "Matched by employer",
        donorId: donorIds[4].id,
      },
    ],
  });

  console.log(`✅ Created ${donations.count} donations`);

  const campaigns = await prisma.campaign.createMany({
    data: [
      {
        name: "JibhCF",
        type: "Fundraising",
        raised: 100000,
        goal: 10000,
        status: "active",
      },
      {
        name: "Healthcare Initiative",
        type: "Health",
        raised: 1000,
        goal: 50000,
        status: "active",
      },
    ],
  });

  console.log(`✅ Created ${campaigns.count} campaigns`);

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Call Jane & John",
        description: "Follow up and thank for their donations",
        dueDate: new Date("2025-01-20"),
        status: "pending",
      },
    ],
  });

  console.log(`✅ Created ${tasks.count} tasks`);

  const stats = await prisma.donation.aggregate({
    _sum: {
      amount: true,
    },
  });

  console.log("✅ Database seed completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - Users: 1 Admin, 1 Staff`);
  console.log(`   - Donors: ${donors.count}`);
  console.log(`   - Donations: ${donations.count}`);
  console.log(`   - Total raised: $${stats._sum.amount?.toFixed(2)}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

declare global {
  // allow global prisma across hot-reloads in dev
  // eslint-disable-next-line no-var
  var __prisma?: PrismaClient;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
,
});

export const prisma: PrismaClient = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

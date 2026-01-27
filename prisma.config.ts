// Prisma configuration migrated from package.json
// Use CommonJS-style export to ensure the Prisma CLI can parse this file.
export default {
  seed: {
    run: "ts-node prisma/seed.ts",
  },
  schema: "./prisma/schema.prisma",
};

// Prisma configuration migrated from package.json
// Use CommonJS so the Prisma CLI can load it without TS transpilation.
module.exports = {
  // wrap under `prisma` key so older Prisma CLI versions that expect package.json-style layout can read it
  prisma: {
    seed: "ts-node prisma/seed.ts",
  },
  // keep schema path at top-level if supported
  schema: "./prisma/schema.prisma",
};

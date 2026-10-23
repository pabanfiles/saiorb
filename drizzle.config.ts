const config = {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite" as const,
};

export default config;

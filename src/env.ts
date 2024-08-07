import { z } from "zod";

const envSchema = z.object({
  TW_APP_KEY: z.string().min(1),
  TW_APP_SECRET: z.string().min(1),
  TW_ACCESS_TOKEN: z.string().min(1),
  TW_ACCESS_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

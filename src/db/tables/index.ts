import type { DbTable } from "@/types";
import { TweetDynamoDbTable } from "./tweets";

export const dbTables = {
  TweetDynamoDbTable,
} as const satisfies Record<string, DbTable>;

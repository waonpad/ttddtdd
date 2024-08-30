import type { DbTable } from "src/types";
import { TweetDynamoDbTable } from "./tweets";

export const dbTables = {
  TweetDynamoDbTable,
} as const satisfies Record<string, DbTable>;

import { getDynamoDBClient } from "./aws-dynamodb";

/**
 * ここからDBを触る
 */
export const db = getDynamoDBClient();

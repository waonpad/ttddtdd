import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const getDynamoDBClient = () => {
  const client = new DynamoDBClient({
    endpoint: process.env.IS_OFFLINE ? "http://localhost:8000" : undefined,
  });

  const docClient = DynamoDBDocumentClient.from(client);

  return docClient;
};

export const db = getDynamoDBClient();

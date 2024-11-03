import { env } from "@/constants/env";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * @see [【AWS SDK for JavaScript v3】DynamoDB操作のあれこれをTypeScriptで理解する](https://zenn.dev/fusic/articles/3a4ff465a85dcd)
 */
export const getDynamoDBClient = () => {
  const client = new DynamoDBClient({
    // undefinedを渡すと本番環境では勝手にデプロイ先のDynamoDBに繋がる
    endpoint: env.IS_OFFLINE ? "http://localhost:8000" : undefined,
  });

  // DynamoDBDocumentClientの方が使いやすい
  const docClient = DynamoDBDocumentClient.from(client);

  return docClient;
};

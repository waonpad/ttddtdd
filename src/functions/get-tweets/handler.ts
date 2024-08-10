import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { formatJSONResponse } from "@libs/api-gateway";
import { db } from "@libs/aws";
import { middyfy } from "@libs/lambda";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { TweetDynamoDbTable } from "resources";

const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const scanCommand = new ScanCommand({
    TableName: TweetDynamoDbTable.Properties.TableName,
  });

  const history = await db.send(scanCommand);

  const res = formatJSONResponse({ history }, 200);

  console.log({ event, res });

  return res;
};

export const main = middyfy(handler);

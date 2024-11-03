import { db } from "@/db";
import { type Tweet, TweetDynamoDbTable } from "@/db/tables/tweets";
import { formatJSONResponse } from "@/libs/api-gateway";
import { middyfy } from "@/libs/lambda";
import { ScanCommand, type ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const scanCommand = new ScanCommand({
    TableName: TweetDynamoDbTable.Properties.TableName,
  });

  const history = (await db.send(scanCommand)) as Omit<ScanCommandOutput, "Items"> & {
    Items?: Tweet[];
  };

  const res = formatJSONResponse({ history }, 200);

  console.log({ event, res });

  return res;
};

export const main = middyfy(handler);

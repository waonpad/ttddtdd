import { formatJSONResponse } from "@/libs/api-gateway";
import { middyfy } from "@/libs/lambda";
import { ScanCommand, type ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "src/db";
import { type Tweet, TweetDynamoDbTable } from "src/db/tables/tweets";

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

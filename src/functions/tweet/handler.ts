import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { type ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { env } from "src/constants/env";
import { db } from "src/db";
import { type Tweet, TweetDynamoDbTable } from "src/db/tables/tweets";
import { sendMailToMe } from "src/utils/send-mail-to-me";
import { TwitterApiReadWrite } from "twitter-api-v2";
import type schema from "./schema";
import { createTendonRhythmString, isTendonString } from "./tendon";

if (!env.TW_APP_KEY || !env.TW_APP_SECRET || !env.TW_ACCESS_TOKEN || !env.TW_ACCESS_SECRET) {
  throw new Error("Twitter API keys are not set");
}

const client = new TwitterApiReadWrite({
  appKey: env.TW_APP_KEY,
  appSecret: env.TW_APP_SECRET,
  accessToken: env.TW_ACCESS_TOKEN,
  accessSecret: env.TW_ACCESS_SECRET,
});

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const tendonRhythmString = createTendonRhythmString();

  if (isTendonString(tendonRhythmString)) {
    await sendMailToMe({ text: "ガチでやばいこと起きた" });
  }

  const tweetContent = tendonRhythmString;

  const tweetResult = await client.v2.tweet(tweetContent);

  const createdAt = new Date().toISOString();

  const insertData: Tweet = {
    id: tweetResult.data.id,
    text: tweetResult.data.text,
    createdAt,
  };

  const putCommnad = new PutCommand({
    TableName: TweetDynamoDbTable.Properties.TableName,
    Item: insertData,
  });

  const insertResult = await db.send(putCommnad);

  const res = formatJSONResponse({ tweet: insertData, insertResult }, 201);

  console.log({ event, res });

  return res;
};

export const main = middyfy(handler);

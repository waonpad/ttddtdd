import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { type ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from "@libs/api-gateway";
import { db } from "@libs/aws";
import { middyfy } from "@libs/lambda";
import { TweetDynamoDbTable } from "resources";
// import { TwitterApiReadWrite } from "twitter-api-v2";
import type schema from "./schema";
import { createTendonRhythmString, isTendonString } from "./tendon";

// const env = process.env;

// if (!env.TW_APP_KEY || !env.TW_APP_SECRET || !env.TW_ACCESS_TOKEN || !env.TW_ACCESS_SECRET) {
//   throw new Error("Twitter API keys are not set");
// }

// const client = new TwitterApiReadWrite({
//   appKey: env.TW_APP_KEY,
//   appSecret: env.TW_APP_SECRET,
//   accessToken: env.TW_ACCESS_TOKEN,
//   accessSecret: env.TW_ACCESS_SECRET,
// });

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const tendonRhythmString = createTendonRhythmString();

  if (isTendonString(tendonRhythmString)) {
    // TODO: 通知処理
  }

  const putCommnad = new PutCommand({
    TableName: TweetDynamoDbTable.Properties.TableName,
    Item: {
      id: new Date().toISOString(),
      text: tendonRhythmString,
    },
  });

  const insertResult = await db.send(putCommnad);

  console.log("DB挿入結果", insertResult);

  // const tweetContent = tendonRhythmString;

  // const tweetResult = await client.v2.tweet(tweetContent);

  // TODO: 保存処理

  // const user = await client.currentUserV2();
  // console.log(user);

  // const tweetContent = `APIからのツイート ${new Date().toISOString()}`;

  // const tweetResult = await client.v2.tweet(tweetContent);
  // console.log(tweetResult);

  // const deleteResult = await client.v2.deleteTweet(tweetResult.data.id);
  // console.log(deleteResult);

  const res = formatJSONResponse(
    {
      insertResult,
      // tweetResult,
      // user,
    },
    201,
  );

  console.log({ event, res });

  return res;
};

export const main = middyfy(handler);

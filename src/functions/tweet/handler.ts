import { type ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
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

  console.log("作成結果", tendonRhythmString);

  if (isTendonString(tendonRhythmString)) {
    console.log("てんてんどんどん てんどんどん");

    // TODO: 通知処理
  }

  const db = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });

  const insertResult = await db
    .put({
      TableName: "tweets",
      Item: {
        id: new Date().toISOString(),
        text: tendonRhythmString,
      },
    })
    .promise();

  console.log("DBインサート結果", insertResult);

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

  return formatJSONResponse({
    // tweetResult,
    event,
    // user,
  });
};

export const main = middyfy(handler);

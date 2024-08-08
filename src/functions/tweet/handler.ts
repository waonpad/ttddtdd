import { type ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { TwitterApiReadWrite } from "twitter-api-v2";
import type schema from "./schema";

const env = process.env;

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
  const user = await client.currentUserV2();
  console.log(user);

  const tweetContent = `APIからのツイート ${new Date().toISOString()}`;

  const tweetResult = await client.v2.tweet(tweetContent);
  console.log(tweetResult);

  // const deleteResult = await client.v2.deleteTweet(tweetResult.data.id);
  // console.log(deleteResult);

  return formatJSONResponse({
    event,
    user,
    tweetResult,
  });
};

export const main = middyfy(handler);

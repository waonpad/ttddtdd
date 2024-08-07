import { env } from "@/env";
import { TwitterApiReadWrite } from "twitter-api-v2";

const client = new TwitterApiReadWrite({
  appKey: env.TW_APP_KEY,
  appSecret: env.TW_APP_SECRET,
  accessToken: env.TW_ACCESS_TOKEN,
  accessSecret: env.TW_ACCESS_SECRET,
});

const user = await client.currentUserV2();
console.log(user);

const tweetContent = `APIからのツイート ${new Date().toISOString()}`;

const tweetResult = await client.v2.tweet(tweetContent);
console.log(tweetResult);

const deleteResult = await client.v2.deleteTweet(tweetResult.data.id);
console.log(deleteResult);

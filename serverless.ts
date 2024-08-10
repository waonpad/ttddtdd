import type { AWS } from "@serverless/typescript";

import getTweets from "@functions/get-tweets";
import tweet from "@functions/tweet";
import { config } from "dotenv";
import { TweetDynamoDbTable } from "./resources";

config({
  path: ".env.local",
});

const serverlessConfiguration = {
  service: "ttddtdd",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline", "serverless-dotenv-plugin", "serverless-dynamodb"],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    // region: "ap-northeast-1", // 東京に設定する場合
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        // nameとvalueをオブジェクトで指定する
        {
          name: "api-key",
          value: process.env.API_KEY as string,
        },
      ],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
              "dynamodb:DescribeStream",
              "dynamodb:GetRecords",
              "dynamodb:GetShardIterator",
              "dynamodb:ListStreams",
            ],
            Resource: ["*"],
          },
        ],
      },
    },
  },
  /**
   * ここに関数を追加していく
   */
  functions: { tweet, getTweets },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node20",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    /**
     * dynamodbの設定
     */
    dynamodb: {
      stages: ["local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
      },
    },
  },
  resources: {
    /**
     * ここにリソースを追加していく
     */
    Resources: {
      TweetDynamoDbTable,
    },
  },
} as const satisfies AWS;

module.exports = serverlessConfiguration;

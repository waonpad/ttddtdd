import type { AWS } from "@serverless/typescript";

import tweet from "@functions/tweet";
import { config } from "dotenv";
import { TweetDynamoDbTable } from "./resources";

config({
  path: ".env.local",
});

const serverlessConfiguration: AWS = {
  service: "ttddtdd",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline", // 追加した
    "serverless-dotenv-plugin", // 追加した
    "serverless-dynamodb", // 追加した
  ],
  provider: {
    name: "aws",
    // runtime: "nodejs14.x",
    runtime: "nodejs20.x", // 上のだとデプロイできなかった
    // region: "ap-northeast-1", // 東京に設定
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
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
  // import the function via paths
  functions: { tweet },
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
    dynamodb: {
      stages: ["local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
      },
      seed: {
        development: {
          sources: {
            table: "tweets",
          },
        },
      },
    },
  },
  resources: {
    Resources: {
      TweetDynamoDbTable,
    },
  },
};

module.exports = serverlessConfiguration;

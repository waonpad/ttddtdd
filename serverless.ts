import type { AWS } from "@serverless/typescript";

import getTweets from "@functions/get-tweets";
import tweet from "@functions/tweet";
import { config } from "dotenv";
import { dbTables } from "./src/db/tables";

config({
  path: ".env.local",
});

const env = process.env;

const serverlessConfiguration = {
  service: env.SERVICE_NAME as string,
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    /**
     * NODE_ENVも--stageオプションもつけない場合、.env.development, .env.development.local を自動で読み込もうとする
     * @see [Serverless Dotenv Plugin - Serverless Framework: Plugins](https://www.serverless.com/plugins/serverless-dotenv-plugin#automatic-env-file-resolution)
     */
    "serverless-dotenv-plugin",
    "serverless-dynamodb",
  ],
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
          /**
           * private: true なイベントにアクセスする際に必要
           * リクエストヘッダーに x-api-key: {value} を追加する
           */
          name: "api-key",
          value: env.API_KEY as string,
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
      ...dbTables,
    },
  },
} as const satisfies AWS;

module.exports = serverlessConfiguration;

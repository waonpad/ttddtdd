import type { DbTable } from "@/types";

export type Tweet = {
  id: string;
  text: string;
  createdAt: string;
};

export const TweetDynamoDbTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
      {
        AttributeName: "createdAt",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
      {
        AttributeName: "createdAt",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "tweets",
  },
} as const satisfies DbTable;

import type { AWS } from "@serverless/typescript";

export type DbTable = NonNullable<NonNullable<AWS["resources"]>["Resources"]>[string];

export type LambdaFunctionInfo = NonNullable<NonNullable<AWS["functions"]>>[string];

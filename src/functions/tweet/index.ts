import { handlerPath } from "@libs/handler-resolver";
import type { LambdaFunctionInfo } from "src/types";
// import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    // ローカル開発等でAPIとして公開する場合
    // {
    //   http: {
    //     method: "post",
    //     path: "tweet",
    //     private: true,
    //     request: {
    //       schemas: {
    //         "application/json": schema,
    //       },
    //     },
    //   },
    // },
    {
      schedule: {
        // rate: ["rate(30 minute)"], // 30分ごと
        rate: ["cron(0,30 * * * ? *)"], // 毎時0分と30分
        input: {
          headers: {
            "Content-Type": "application/json",
          },
          body: "null",
        },
      },
    },
  ],
} as const satisfies LambdaFunctionInfo;

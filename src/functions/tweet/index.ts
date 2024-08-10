import { handlerPath } from "@libs/handler-resolver";
import type { LambdaFunctionInfo } from "src/types";
import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "tweet",
        private: true,
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
    // {
    //   schedule: {
    //     //     rate: ["rate(30 minute)"],
    //     rate: ["cron(0,30 * * * ? *)"],
    //     input: {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: "null",
    //     },
    //   },
    // },
  ],
} as const satisfies LambdaFunctionInfo;

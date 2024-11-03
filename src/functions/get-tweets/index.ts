import { handlerPath } from "@/libs/handler-resolver";
import type { LambdaFunctionInfo } from "@/types";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "tweet",
        private: true,
      },
    },
  ],
} as const satisfies LambdaFunctionInfo;

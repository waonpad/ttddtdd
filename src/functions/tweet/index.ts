import { handlerPath } from "@libs/handler-resolver";
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
    //     rate: ["rate(1 minute)"],
    //     input: {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: "null",
    //     },
    //   },
    // },
  ],
};

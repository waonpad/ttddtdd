declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        TW_APP_KEY: string;
        TW_APP_SECRET: string;
        TW_ACCESS_TOKEN: string;
        TW_ACCESS_SECRET: string;
        API_KEY: string;
        MY_GMAIL: string;
        MY_GMAIL_PASSWORD: string;
        SERVICE_NAME: string;
        IS_OFFLINE?: string;
      }
    }
  }
}

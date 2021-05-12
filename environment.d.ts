declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      DEV_MONGO_URI: string;
      PROD_MONGO_URI: string;
    }
  }
}

export {};

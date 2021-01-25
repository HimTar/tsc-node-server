import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  databaseURL:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DEV_MONGO_URI:
    process.env.PROD_MONGO_URI,

  // Auth0 Environment Variables
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,
  baseURL: process.env.BASE_URL,
  secret: process.env.SECRET,
};

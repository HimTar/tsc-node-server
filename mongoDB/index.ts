import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<Boolean> => {
  const url = process.env.PROD_MONGO_URI || "";

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    return true;
  } catch (err) {
    return false;
  }
};

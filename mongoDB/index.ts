import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<Boolean> => {
  const url = config.databaseURL || "";

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    return true;
  } catch (err) {
    return false;
  }
};

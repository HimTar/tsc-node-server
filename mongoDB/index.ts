import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<Boolean> => {
  const url =
    "mongodb+srv://Himanshu:abcd@1234@cluster0.kdtwe.mongodb.net/blog?retryWrites=true&w=majority";

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

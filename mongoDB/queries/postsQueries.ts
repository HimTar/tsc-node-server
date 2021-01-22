import postSchema from "../schemas/postSchema";
import { PostInterface } from "../../interfaces/postInterface";

async function add(post: PostInterface) {
  try {
    const newPost = new postSchema(post);

    await newPost.save();

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: "Error querying the database",
    };
  }
}

async function find() {
  try {
    const data = await postSchema.find();

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Error querying the database",
    };
  }
}

async function findByTitle(title: String) {
  try {
    const data = await postSchema.findOne({
      title: { $regex: title, $options: "i" },
    });

    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Error querying the database",
    };
  }
}

export default Object.freeze({
  add,
  find,
  findByTitle,
});

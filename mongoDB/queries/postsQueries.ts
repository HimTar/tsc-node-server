import postSchema from "../schemas/postSchema";

async function add(post: {}) {
  try {
    const newPost = new postSchema(post);

    await newPost.save();

    return {
      success: true,
    };
  } catch (err) {
    console.log("Error from add \n", err);

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
    console.log("Error from find \n", err);

    return {
      success: false,
      error: "Error querying the database",
    };
  }
}

async function findByTitle(title: String) {
  try {
    const data = await postSchema.findOne({ title });

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.log("Error from find by title \n", err);
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

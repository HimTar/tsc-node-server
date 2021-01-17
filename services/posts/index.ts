import queries from "../../mongoDB/queries/postsQueries";
import { PostInterface } from "../../interfaces/postInterface";

export default async (post: PostInterface) => {
  try {
    if (!post.title) {
      return {
        success: false,
        isValid: false,
        message: "Title field can't be empty",
      };
    }

    if (!post.content) {
      return {
        success: false,
        isValid: false,
        message: "Content field can't be empty",
      };
    }

    if (!post.author) {
      return {
        success: false,
        isValid: false,
        message: "Author field can't be empty",
      };
    }

    const response = await queries.findByTitle(post.title);

    if (response.success) {
      if (response.data)
        return {
          success: true,
          isValid: false,
          message: `Another post already exists with title "${post.title}"`,
        };

      return {
        success: true,
        isValid: true,
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    return {
      success: false,
      isValid: false,
      message: "Error querying the database !!!",
    };
  }
};

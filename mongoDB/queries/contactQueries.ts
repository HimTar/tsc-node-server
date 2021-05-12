import contactSchema from "../schemas/contactSchema";
import { ContactInterface } from "../../interfaces/contactInterface";

async function add(post: ContactInterface) {
  try {
    const newContact = new contactSchema(post);

    await newContact.save();

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
    const data = await contactSchema.find().lean();

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
});

import joi from "joi";

const registerSchema = joi.object({
    name: joi
      .string()
      .pattern(/^[a-zA-Z\s]*$/)
      .required(), // Only accepts upper or lower case letters or blank spaces
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

export default registerSchema;
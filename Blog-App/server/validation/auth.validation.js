import { z } from "zod";
import ApiError from "../utils/ApiError.js";

export const signUpValidation = (req, _, next) => {
  const { email, password, name } = req.body;

  const schema = z.object({
    email: z
      .string()
      .email({ message: "Invalid Email Address" })
      .regex(/@gmail.com$/, { message: "Please Provide your gmail" }),
    password: z
      .string()
      .min(4, { message: "Password must be atleast 4 character long" })
      .max(6, { message: "Password must be atmost 6 character long" }),
    name: z
      .string({ message: "Please provide your name" })
      .min(3, { message: "Name must be atleast 3 character long" }),
  });

  try {
    schema.parse({ email, password, name });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new ApiError(400, error.errors[0].message));
    }
  }
};

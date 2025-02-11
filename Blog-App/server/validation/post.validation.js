import { z } from "zod";
import ApiError from "../utils/ApiError.js";

export const postValidation = (req, _, next) => {
  const { title, category, content, author } = req.body;

  const schema = z.object({
    title: z.string({ message: "Provide Title" }),
    category: z.string().optional(),
    content: z.string({message: "Provide Blog Content"}),
    author: z.string().optional(),
  });

  try {
    schema.parse({ title, category, content, author });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new ApiError(400, error.errors[0].message));
    }
  }
};

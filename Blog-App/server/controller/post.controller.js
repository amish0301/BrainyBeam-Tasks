import { Post } from "../schema/post.schema.js";
import ApiError from "../utils/ApiError.js";
import { TryCatch } from "../utils/TryCatch.js";

export const create = TryCatch(async (req, res, next) => {
  const { title, category, content, author } = req.body;

  console.log("inside create controller");
  const post = await Post.create({
    title,
    category,
    content,
    author,
  });

  if (!post) return next(new ApiError());

  return res.status(201).json({
    success: true,
    message: "Post Created Successfully",
    post,
  });
});

// get ALL Post
export const getAllPost = TryCatch(async (req, res, next) => {
  const posts = await Post.find();
  return res.status(200).json({ success: true, posts });
});

// get post -> ID
export const getPost = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) return next(new ApiError(404, "Post doesn't Exist"));

  return res.status(200).json({ success: true, post });
});

export const deletePost = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  await Post.findByIdAndDelete(id);

  const posts = await Post.find();

  return res.status(200).json({ success: true, message: "Post Deleted", posts });
});

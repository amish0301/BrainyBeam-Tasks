import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      default: "Other",
    },
    content: {
      type: String,
      default: "No content provided",
    },
    author: {
        type: String,
        default: "Unknown"
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);

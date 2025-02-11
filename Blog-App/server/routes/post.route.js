import express from 'express';
import { postValidation } from '../validation/post.validation.js';
import { create as createPost, deletePost, getAllPost, getPost } from '../controller/post.controller.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

// @POST
router.post("/create", upload.none(), postValidation, createPost)

// @GET
router.get("/", getAllPost);
router.get("/:id", getPost);

// @DELETE
router.delete("/:id", deletePost)


export default router;
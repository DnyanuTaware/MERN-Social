import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";
import {
  commentPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPost,
  likeUnlikePost,
  newPost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/new", isAuth, uploadFile, newPost);

router.delete("/:id", isAuth, deletePost);

router.get("/all", isAuth, getAllPost);

router.post("/like/:id", isAuth, likeUnlikePost);

router.post("/comment/:id", isAuth, commentPost);

router.delete("/comment/:id", isAuth, deleteComment);

router.put("/:id", isAuth, editCaption);

export default router;

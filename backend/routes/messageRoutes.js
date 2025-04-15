import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  getAllChats,
  getAllMessages,
  sendMessage,
} from "../controller/messageController.js";

const router = express.Router();

router.post("/", isAuth, sendMessage);

router.get("/chats", isAuth, getAllChats);

router.get("/:id", isAuth, getAllMessages);

export default router;

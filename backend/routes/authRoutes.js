import express from "express";
import uploadFile from "../middleware/multer.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", uploadFile, registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
export default router;

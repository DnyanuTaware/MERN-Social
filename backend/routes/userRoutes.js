import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  followandUnfollow,
  getAllUsers,
  myProfile,
  updatePassword,
  updateProfile,
  userFollowersAndFollowingData,
  userProfile,
} from "../controller/userControllers.js";
import uploadFile from "../middleware/multer.js";

const router = express.Router();
router.get("/me", isAuth, myProfile);
router.get("/all", isAuth, getAllUsers);

router.get("/:id", isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);

router.put("/:id", isAuth, uploadFile, updateProfile);

router.post("/follow/:id", isAuth, followandUnfollow);
router.get("/followdata/:id", isAuth, userFollowersAndFollowingData);

export default router;

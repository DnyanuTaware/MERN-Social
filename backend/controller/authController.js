import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import getDataURL from "../utils/urlGenerator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password, gender } = req.body;
  const file = req.file;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({
      message: "plz give all values",
    });
  }
  let user = await User.findOne({ email });

  if (user) return res.status(400).json({ message: "User already exists" });

  const fileURL = getDataURL(file);

  const hashedPWD = await bcrypt.hash(password, 10);

  const myCloud = await cloudinary.v2.uploader.upload(fileURL.content);
  user = await User.create({
    name,
    email,
    password: hashedPWD,
    gender,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  generateToken(user._id, res);
  res.status(201).json({
    message: "user Registerd ",
    user,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparepassword = await bcrypt.compare(password, user.password);

  if (!comparepassword) {
    return res.status(400).json({
      message: "Invalid Cedentials",
    });
  }

  generateToken(user._id, res);
  res.json({
    message: "User Logged in",
    user,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { message: 0 });
  res.json({
    message: "loged out successfully",
  });
});

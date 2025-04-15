import { Post } from "../models/postModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataURL from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const newPost = TryCatch(async (req, res) => {
  const { caption } = req.body;
  const ownerId = req.user._id;

  const file = req.file;
  const fileURL = getDataURL(file);

  const type = req.query.type;
  let option;

  if (type === "reel") {
    option = {
      resource_type: "video",
    };
  } else {
    option = {};
  }

  const myCloud = await cloudinary.v2.uploader.upload(fileURL.content, option);

  const post = await Post.create({
    caption,
    post: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    type,
    owner: ownerId,
  });

  res.status(201).json({
    message: "Post created",
    post,
  });
});

export const deletePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "No Post with this Id" });
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized to delete post",
    });
  }

  const myCloud = await cloudinary.v2.uploader.destroy(post.post.id);

  await post.deleteOne();

  res.json({
    message: "Post Deleted",
  });
});

export const getAllPost = TryCatch(async (req, res) => {
  const posts = await Post.find({ type: "post" })
    .sort({ createddAt: -1 })
    .populate("owner", "-password")
    .populate({ path: "comments.user", select: "-password" });

  const reels = await Post.find({ type: "reel" })
    .sort({ createddAt: -1 })
    .populate("owner", "-password")
    .populate({ path: "comments.user", select: "-password" });

  res.json({
    posts,
    reels,
  });
});

export const likeUnlikePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "No post with this id",
    });
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index, 1);
    await post.save();
    res.json({
      message: "Post Unliked",
    });
  } else {
    post.likes.push(req.user._id);
    await post.save();
    res.json({
      message: "Post Liked",
    });
  }
});

export const commentPost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "No post with this id to comment on",
    });
  }

  post.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
  });

  await post.save();

  res.json({
    message: "Comment is added",
  });
});

export const deleteComment = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res
      .status(404)
      .json({ message: "No post with this id to delete comment" });

  if (!req.query.commentId) {
    return res.status(400).json({
      message: "Plz provide commentId",
    });
  }

  const commentIdx = post.comments.findIndex(
    (item) => item._id.toString() === req.query.commentId.toString()
  );

  if (commentIdx === -1) {
    return res.status(400).json({
      message: "Comment Not found",
    });
  }
  const comment = post.comments[commentIdx];
  console.log(post.owner.toString());

  if (
    post.owner.toString() === req.user._id.toString() ||
    comment.user.toString() === req.user._id.toString()
  ) {
    post.comments.splice(commentIdx, 1);
    await post.save();
    return res.json({
      message: "Comment Deleted",
    });
  } else {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete comment" });
  }
});

export const editCaption = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "No post with this Id To edit caption",
    });
  }
  if (post.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "You are not authorized to edit caption",
    });
  } else {
    post.caption = req.body.caption;

    await post.save();

    return res.json({
      message: "Caption Edited",
    });
  }
});

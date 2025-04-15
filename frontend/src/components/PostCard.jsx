import React, { useState, useEffect } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import SimpleModal from "./SimpleModal";
import { LoadingAnimation } from "./Loading";
import { SocketData } from "../context/SocketContext";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = UserData();
  const { likePost, addComment, deletePost, loading, editCaption } = PostData();

  const formatDate = format(new Date(value.createddAt), "MMM do");

  useEffect(() => {
    if (value.likes.includes(user.data._id)) {
      setIsLike(true);
    }
  }, [value, user.data._id]);

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };
  const [comment, setComment] = useState("");

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    deletePost(value._id);
  };

  const [showInput, setShowInput] = useState(false);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };

  const [caption, setCaption] = useState(value.caption ? value.caption : "");

  const [captionLoading, setCaptionLoading] = useState(false);

  const updateCaption = () => {
    editCaption(value._id, caption, setCaptionLoading);
    setShowInput(false);
  };
  const { onlineUsers } = SocketData();
  return (
    <div className="bg-gray-100 flex items-center justify-center p-3 pb-14">
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={editHandler}
            className="bg-blue-500 text-white py-1 px-3 w-18 rounded-md cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className="bg-red-500 text-white py-1 px-3 w-18 rounded-md cursor-pointer"
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : "Delete"}
          </button>
        </div>
      </SimpleModal>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex items-center justify-between space-x-2">
          <Link to={`/user/${value.owner._id}`}>
            <div className="flex items-center space-x-2">
              <img
                src={value.owner.profilePic.url}
                alt=""
                className="w-8 h-8 rounded-full "
              />
              {onlineUsers.includes(value.owner._id) && (
                <div className="text-5xl font-bold text-green-400">.</div>
              )}
              <div>
                <p className="text-gray-800 font-semibold ">
                  {value.owner.name}
                </p>
                <div className="text-gray-500 text-sm">{formatDate}</div>
              </div>
            </div>
          </Link>

          {value.owner._id === user.data._id && (
            <button
              onClick={() => setShowModal(true)}
              className="hover:bg-gray-50 rounded-full p-1 text-2xl text-gray-500 cursor-pointer"
            >
              <BsThreeDotsVertical />
            </button>
          )}
        </div>
        <div className="mb-4">
          {showInput ? (
            <>
              <input
                className="custom-input "
                style={{ width: "150px" }}
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></input>
              <button
                onClick={updateCaption}
                className="text-sm bg-blue-600 text-white px-2 py-1 rounded-md m-3 cursor-pointer"
                disabled={captionLoading}
              >
                {captionLoading ? <LoadingAnimation /> : "Update caption"}
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="text-sm bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer"
              >
                Close
              </button>
            </>
          ) : (
            <p className="text-gray-800 my-2">{value.caption}</p>
          )}
        </div>
        <div className="mb-4">
          {type === "post" ? (
            <img
              src={value.post.url}
              alt=""
              className="object-cover rounded-md"
            />
          ) : (
            <video
              src={value.post.url}
              alt=""
              className="object-cover rounded-md"
              autoPlay
              controls
            />
          )}
        </div>
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <span
              onClick={likeHandler}
              className="text-red-500 text-2xl cursor-pointer"
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <button className="hover:bg-gray-50 rounded-full p-1">
              {value.likes.length} likes
            </button>
          </div>
          <button
            onClick={() => setShow(!show)}
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
          >
            <BsChatFill />
            <span>{value.comments.length} comments </span>
          </button>
        </div>
        {show && (
          <form onSubmit={addCommentHandler} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Comment"
              className="custom-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="bg-gray-100 rounded-lg px-5 py-2">
              Add
            </button>
          </form>
        )}
        <hr className="mt-2 mb-2 " />
        <p className="text-gray-800  font-semibold">Comments</p>
        <hr className="mt-2 mb-2 " />
        <div className="mt-4"></div>
        <div className="comments max-h-[200px] overflow-y-auto">
          {value.comments && value.comments.length > 0 ? (
            value.comments.map((e) => (
              <Comment
                value={e}
                key={e._id}
                user={user}
                owner={value.owner._id}
                postId={value._id}
              />
            ))
          ) : (
            <p>No Comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({ value, user, owner, postId }) => {
  const { deleteComment } = PostData();

  const deleteCommentHandler = () => {
    deleteComment(postId, value._id);
  };
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Link to={`/user/${value.user._id}`}>
        <img
          src={value.user.profilePic.url}
          className="size-8 rounded-full"
          alt=""
        ></img>
      </Link>
      <div>
        <p className="text-gray-800 font-semibold">{value.user.name}</p>
        <p className="text-gray-500 text-sm">{value.comment}</p>
      </div>
      {(owner === user.data._id || value.user._id === user.data._id) && (
        <button
          onClick={deleteCommentHandler}
          className="text-red-500 cursor-pointer "
        >
          <MdDelete />
        </button>
      )}
    </div>
  );
};

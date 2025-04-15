import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [fileprev, setFileprev] = useState("");

  const { addPost, addLoading } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("file", file);

    addPost(formData, setCaption, setFile, setFileprev, type);
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileprev(reader.result);
      setFile(file);
    };
  };

  return (
    <>
      <div className=" bg-gray-100 flex items-center justify-center  pt-3 pb-5">
        <div className="bg-white p-8 shadow-md rounded-lg max-w-md">
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-4 items-cneter justify-between mb-4"
          >
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="custom-input"
              placeholder="Enter Caption"
            ></input>
            <input
              type="file"
              required
              onChange={changeFileHandler}
              className="custom-input"
              placeholder="Enter Caption"
              accept={type === "post" ? "image/*" : "video/*"}
            />
            {fileprev && (
              <>
                {type === "post" ? (
                  <img src={fileprev} />
                ) : (
                  <video
                    controlsList="nodownload"
                    controls
                    src={fileprev}
                    className="h-[450px] w-[300px]"
                  />
                )}
              </>
            )}
            <button
              disabled={addLoading}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              {addLoading ? <LoadingAnimation /> : "+ Add Post"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;

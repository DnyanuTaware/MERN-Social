import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Loading } from "../components/Loading";
const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);
  const prevReel = () => {
    if (index === 0) {
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === reels.length - 1) {
      return null;
    }
    setIndex(index + 1);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100">
          <AddPost type={"reel"} />
          <div className=" flex gap-3 m-auto w-[300px] md:w-[500px]">
            {reels && reels.length > 0 ? (
              <PostCard
                value={reels[index]}
                key={reels[index]._id}
                type={"reel"}
              />
            ) : (
              <p>No Reels</p>
            )}

            <div className="button flex flex-col justify-center items-center gap-6">
              {index === 0 ? (
                ""
              ) : (
                <button
                  onClick={prevReel}
                  className="bg-gray-500 text-white p-4 rounded-full"
                >
                  <FaArrowUp />
                </button>
              )}
              {index === reels.length - 1 ? (
                ""
              ) : (
                <button
                  onClick={nextReel}
                  className="bg-gray-500 text-white p-4 rounded-full"
                >
                  <FaArrowDown />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;

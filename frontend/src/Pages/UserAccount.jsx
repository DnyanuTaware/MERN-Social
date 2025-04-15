import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";
import { Loading } from "../components/Loading";
import { UserData } from "../context/UserContext";
import Model from "../components/Model";
import { SocketData } from "../context/SocketContext";

const UserAccount = ({ user: LoggedInUser }) => {
  const { posts, reels } = PostData();
  const [type, setType] = useState("post");
  const params = useParams();

  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/" + params.id);

      setUser(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [params.id]);
  let myPosts;
  if (posts && user) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }
  let myReels;
  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }
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

  const [followed, setFollowed] = useState(false);

  const { followUser } = UserData();

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user._id, fetchUser);
  };
  const followers = user.followers;

  useEffect(() => {
    if (followers && followers.includes(LoggedInUser.data._id)) {
      setFollowed(true);
    }
  }, [user]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loadingFollowData, setLoadingFollowData] = useState(true);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      setLoadingFollowData(true);

      const { data } = await axios.get("/api/user/followdata/" + user._id);
      console.log("data=", data);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
      setLoadingFollowData(false);
    } catch (error) {
      console.log(error);
      setLoadingFollowData(false);
    }
  }
  useEffect(() => {
    followData();
  }, [user]);
  const { onlineUsers } = SocketData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && (
            <div className="bg-gray-100 min-h-screen  flex flex-col gap-4 pt-3 pb-14 items-center justify-center">
              {show && (
                <Model
                  loading={loadingFollowData}
                  value={followersData}
                  title={"Followers"}
                  setShow={setShow}
                />
              )}
              {show1 && (
                <Model
                  loading={loadingFollowData}
                  value={followingsData}
                  title={"Followings"}
                  setShow={setShow1}
                />
              )}
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md flex flex-row gap-4 ">
                <div className="flex flex-col justify-between  mb-4 gap-4">
                  <img
                    src={user.profilePic.url}
                    alt=""
                    className="w-[180px] h-[180px] rounded-full "
                  ></img>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="flex justify-center items-center text-gray-800 font-semibold">
                    {user.name}
                    {onlineUsers.includes(user._id) && (
                      <div className="ml-5">
                        <span className=" font-bold text-green-400">
                          Online
                        </span>
                      </div>
                    )}
                  </p>
                  <p className="text-gray-800 text-sm">{user.email}</p>
                  <p className="text-gray-800 text-sm">{user.gender}</p>
                  <p
                    className="cursor-pointer text-gray-800 text-sm"
                    onClick={() => setShow(true)}
                  >
                    {user.followers.length} Followers
                  </p>
                  <p
                    className="cursor-pointer text-gray-800 text-sm"
                    onClick={() => setShow1(true)}
                  >
                    {user.followings.length} Followings
                  </p>
                  {user._id === LoggedInUser.data._id ? (
                    ""
                  ) : (
                    <button
                      onClick={followHandler}
                      className={`rounded-md px-5 py-2 cursor-pointer text-white ${
                        followed ? "bg-red-600" : "bg-blue-600"
                      }`}
                    >
                      {followed ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
              <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
                <button
                  onClick={() => setType("post")}
                  className="cursor-pointer"
                >
                  {" "}
                  Posts
                </button>
                <button
                  onClick={() => setType("reel")}
                  className="cursor-pointer"
                >
                  Reels
                </button>
              </div>

              {type === "post" && (
                <>
                  {myPosts && myPosts.length > 0 ? (
                    myPosts.map((e) => (
                      <PostCard value={e} key={e._id} type={"post"} />
                    ))
                  ) : (
                    <p>No Posts Yet</p>
                  )}
                </>
              )}

              {type === "reel" && (
                <>
                  {myReels && myReels.length > 0 ? (
                    <div className="flex items-center justify-center gap-3">
                      <PostCard
                        type={"reel"}
                        value={myReels[index]}
                        key={myReels[index]._id}
                      />

                      <div className="button flex flex-col justify-center items-center gap-6">
                        {index === 0 ? (
                          ""
                        ) : (
                          <button
                            onClick={prevReel}
                            className="bg-gray-500 text-white p-4 rounded-full cursor-pointer"
                          >
                            <FaArrowUp />
                          </button>
                        )}
                        {index === myReels.length - 1 ? (
                          ""
                        ) : (
                          <button
                            onClick={nextReel}
                            className="bg-gray-500 text-white p-4 rounded-full cursor-pointer"
                          >
                            <FaArrowDown />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p>No reels Yet</p>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserAccount;

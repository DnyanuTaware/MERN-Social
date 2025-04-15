import React, { useEffect, useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Model from "../components/Model";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";

const Account = ({ user }) => {
  const { logoutUser, updateProfilePic, updateProfileName, updatePassword } =
    UserData();
  const navigate = useNavigate();
  const { posts, reels, loading } = PostData();
  const [type, setType] = useState("post");

  let myPosts;
  if (posts) {
    myPosts = posts.filter((post) => post.owner._id === user.data._id);
  }
  let myReels;
  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user.data._id);
  }

  const logoutHandler = (e) => {
    logoutUser(navigate);
  };

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

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [loadingFollowData, setLoadingFollowData] = useState(true);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      setLoadingFollowData(true);

      const { data } = await axios.get("/api/user/followdata/" + user.data._id);

      setFollowersData(data.followers);
      setFollowingsData(data.followings);
      setLoadingFollowData(false);
    } catch (error) {
      console.log(error);
      setLoadingFollowData(false);
    }
  }
  const [file, setFile] = useState("");
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const changeImageHandler = () => {
    const formdata = new FormData();

    formdata.append("file", file);

    updateProfilePic(user.data._id, formdata, setFile);
  };

  const updateName = () => {
    updateProfileName(user.data._id, name, setShowInput);
  };
  useEffect(() => {
    followData();
  }, [user]);

  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.data.name ? user.data.name : "");

  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePasswordHandler = (e) => {
    e.preventDefault();

    updatePassword(user.data._id, oldPassword, newPassword, setShowUpdatePass);
  };

  return (
    <>
      {user && (
        <>
          {loading ? (
            <Loading />
          ) : (
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
                    src={user.data.profilePic.url}
                    alt=""
                    className="w-[180px] h-[180px] rounded-full "
                  ></img>
                  <div className="update w-[250px] flex flex-col justify-center items-center">
                    <input
                      type="file"
                      className="cutsom-input"
                      onChange={changeFileHandler}
                    />
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md mt-2"
                      onClick={changeImageHandler}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {showInput ? (
                    <>
                      <div className="flex justify-center items-center gap-2">
                        <input
                          type="text"
                          className="custom-input"
                          style={{ width: "85px" }}
                          placeholder="Enter name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          onClick={updateName}
                          className="cursor-pointer "
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setShowInput(false)}
                          className="bg-red-500 text-white p-2 cursor-pointer rounded-lg"
                        >
                          X
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-800 font-semibold">
                      {user.data.name}
                      <button
                        className="cursor-pointer"
                        onClick={() => setShowInput(true)}
                      >
                        <CiEdit />
                      </button>
                    </p>
                  )}
                  <p className="text-gray-800 text-sm">{user.data.email}</p>
                  <p className="text-gray-800 text-sm">{user.data.gender}</p>
                  <p
                    className="cursor-pointer text-gray-800 text-sm"
                    onClick={() => setShow(true)}
                  >
                    {user.data.followers.length} Followers
                  </p>
                  <p
                    className="cursor-pointer text-gray-800 text-sm"
                    onClick={() => setShow1(true)}
                  >
                    {user.data.followings.length} Followings
                  </p>
                  <button
                    className="bg-red-700 rounded-lg p-1 text-white hover:bg-red-800"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowUpdatePass(!showUpdatePass)}
                className="bg-blue-500 px-2 py-1 rounded-sm cursor-pointer text-white"
              >
                {showUpdatePass ? "X" : " Update Password"}
              </button>
              {showUpdatePass && (
                <>
                  <form
                    onSubmit={updatePasswordHandler}
                    className="flex flex-col items-center justify-center bg-white p-6 gap-4 rounded-sm "
                  >
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="custom-input "
                      placeholder="old password"
                      required
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="custom-input "
                      placeholder="New password"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 px-2 py-1 rounded-sm cursor-pointer text-white"
                    >
                      Update Password
                    </button>
                  </form>
                </>
              )}

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

export default Account;

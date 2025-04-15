import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [fileprev, setFileprev] = useState("");
  const [email, setEmail] = useState("");

  const { registerUser, loading } = UserData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileprev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();
  const { fetchPosts } = PostData();

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("file", file);

    registerUser(formData, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[50px]">
            <div className="w-full md:w-3/4">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                  Register to social media
                </h1>
              </div>
              <form onSubmit={submitHandler} method="POST">
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  {fileprev && (
                    <img
                      src={fileprev}
                      className="w-[180px] h-[180px] rounded-full "
                      alt=""
                    />
                  )}
                  <input
                    type="file"
                    className="custom-input"
                    onChange={changeFileHandler}
                    accept="image/*"
                    required
                  ></input>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                  <input
                    type="email"
                    className="custom-input"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></input>{" "}
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="User  Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                  <select
                    className="custom-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="text-center mt-7">
                  <button className="auth-btn">Register</button>
                </div>
              </form>
            </div>
            <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-yellow-400 items-center justify-center flex ">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-5xl">Have Account?</h1>
                <h1>Login to Social Media</h1>
                <Link
                  to="/login"
                  className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

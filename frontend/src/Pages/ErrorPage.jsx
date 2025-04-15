import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-4 text-center">
        <div className="text-gray-600 text-xl font-medium ">Social Media</div>
        <div className="text-5xl text-red-700 font-medium">
          Page Not Found !
        </div>
        <div className="text-gray-500 ">Sorry,This page isn't available</div>
        <div className="flex items-center justify-center ">
          <div
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-1 font-medium rounded-lg hover:scale-105 cursor-pointer"
          >
            Visit Home Page
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

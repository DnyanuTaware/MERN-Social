import React from "react";
import { Link } from "react-router-dom";

const Model = ({ value, title, setShow, loading }) => {
  console.log("value", value);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 ">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[300px] max-h-[300px] overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl text-blue-600 ">{title}</h1>
          <button
            onClick={() => setShow(false)}
            className="cursor-pointer text-gray-500 text-2xl"
          >
            &times;{/*/cross symbol*/}
          </button>
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          {loading ? (
            <p className="animate-pulse ">loading...</p>
          ) : (
            <>
              {value && value.length > 0 ? (
                value.map((e, i) => (
                  <Link
                    onClick={() => setShow(false)}
                    to={`/user/${e._id}`}
                    key={e._id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow hover:bg-blue-50 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-600">
                        {i + 1}.
                      </span>
                      <img
                        src={e.profilePic.url}
                        alt={e.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {e.name}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No {title} yet</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;

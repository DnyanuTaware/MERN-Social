import React from "react";

const Practice = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition duration-300">
            <img
              src="/Nature.avif"
              alt="Nature"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">Nature</h2>
            <p className="text-gray-600 mt-2">Explore the beauty of nature.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Read More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition duration-300">
            <img
              src="/tech.webp"
              alt="Tech"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">Technology</h2>
            <p className="text-gray-600 mt-2">
              Discover the latest innovations.
            </p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Read More
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition duration-300">
            <img
              src="travel.avif"
              alt="Travel"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">Travel</h2>
            <p className="text-gray-600 mt-2">Plan your next adventure.</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-screen p-6 mx-auto flex items-center justify-center ">
        <div className="grid md:grid-cols-3 p-5 grid-center "></div>
      </div>
    </>
  );
};

export default Practice;

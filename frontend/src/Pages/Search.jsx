import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        fetchUsers();
      } else {
        setUsers([]); // clear list if input is empty
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounce);
  }, [search]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);

      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    fetchUsers();
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col justify-center items-center pt-5">
        <div className="search flex items-center justify-center gap-3 mb-3">
          <input
            type="text"
            className="custom-input"
            style={{ border: "1px solid gray" }}
            placeholder="Enter Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="cursor pointer bg-blue-500 rounded-lg px-3 py-1 text-white"
          >
            Search
          </button>
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {users && users.length > 0 ? (
              <div className="flex bg-white max-w-md  w-full flex-col gap-3 mt-4">
                {users.map((e) => (
                  <Link
                    to={`/user/${e._id}`}
                    key={e._id}
                    className="flex items-center gap-4 bg-white shadow-md p-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <img
                      src={e.profilePic.url}
                      alt={e.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-gray-800 font-medium">{e.name}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                No users found. Try searching again.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;

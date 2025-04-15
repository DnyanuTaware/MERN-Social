import React, { useEffect, useState } from "react";
import { chatData } from "../context/chatContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";
const ChatPage = ({ user }) => {
  const { createChat, chats, setChats, selectedChat, setSelectedChat } =
    chatData();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function createNewChat(id) {
    await createChat(id);
    setSearch(false);
    getAllChats();
  }
  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  const { onlineUsers, socket } = SocketData();

  return (
    <div className="w-[100%] md:w-[750px] md:p-4">
      <div className="flex gap-4 mx-auto px-4">
        <div className="w-[30%]">
          <div className="top ">
            <button
              className="cursor-pointer bg-blue-500 text-white px-3 mr-2 py-1 rounded-full"
              onClick={() => setSearch(!search)}
            >
              {search ? "X" : <FaSearch />}
            </button>

            {search ? (
              <>
                <input
                  className="custom-input"
                  style={{ width: "150px", border: "1px solid gray" }}
                  placeholder="Enter name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="users">
                  {users && users.length > 0 ? (
                    users.map((e) => (
                      <div
                        key={e._id}
                        onClick={() => createNewChat(e._id)}
                        className="bg-gray-200 text-black p-2 m-2 cursor-pointer flex justify-center items-center gap-2"
                      >
                        <img
                          src={e.profilePic.url}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        {e.name}
                      </div>
                    ))
                  ) : (
                    <p>No users</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-2 ">
                {chats.map((e) => (
                  <Chat
                    key={e._id}
                    chat={e}
                    setSelectedChat={setSelectedChat}
                    isOnline={onlineUsers.includes(e.users[0]._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedChat === null ? (
          <div className="w-[70%] mx-20 mt-40 text-2xl">
            Hello 👋 {user.data.name} , Select chat to start conversation
          </div>
        ) : (
          <div className="w-[70%]">
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

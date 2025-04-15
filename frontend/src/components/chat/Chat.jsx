import React from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  let user;

  if (chat) user = chat.users[0]; //receiver ....with whome we are talking

  return (
    <div className="w-[100%] ">
      {user && (
        <div
          className="bg-white py-3 pr-12 pl-4 rounded-lg cursor-pointer mt-3 mx-auto shadow hover:shadow-lg transition-all"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex items-center gap-3">
            {/* Optional status dot */}
            {isOnline && (
              <div className="text-5xl font-bold text-green-400">.</div>
            )}
            <img
              src={user.profilePic.url}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{user.name}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                {loggedInUser.data._id === chat.latestMessage.sender && (
                  <BsSendCheck className="text-blue-500" />
                )}
                {chat.latestMessage.text.length > 0
                  ? chat.latestMessage.text.slice(0, 30) + "..."
                  : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

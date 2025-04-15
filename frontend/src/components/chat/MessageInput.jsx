import React, { useState } from "react";
import { chatData } from "../../context/chatContext";
import toast from "react-hot-toast";
import axios from "axios";

const MessageInput = ({ setMessages, selectedChat }) => {
  const [textMsg, setTextMsg] = useState("");
  const { setChats } = chatData();
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages", {
        message: textMsg,
        receiversId: selectedChat.users[0]._id,
      });
      setMessages((message) => [...message, data]);
      setTextMsg("");
      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: {
                text: textMsg,
                sender: data.sender,
              },
            };
          }
          return chat;
        });
        return updatedChat;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <form className="flex gap-2" onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Enter Message"
          className="border border-gray-300 p-2 w-[80%]"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const chatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  async function createChat(id) {
    try {
      const { data } = await axios.post("/api/messages", {
        receiversId: id,
        message: "Hii",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <chatContext.Provider
      value={{ createChat, chats, setChats, selectedChat, setSelectedChat }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const chatData = () => useContext(chatContext);

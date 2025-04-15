import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from "./components/Login.jsx";
// import Home from "./components/.jsx";
// import Register from "./components/Register.jsx";
// import ErrorPage from "./components/ErrorPage.jsx";
// import Practice from "./components/Practice.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { PostContextProvider } from "./context/PostContext.jsx";

import { ChatContextProvider } from "./context/chatContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <ChatContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChatContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  </StrictMode>
);

import { Server } from "socket.io";

import http from "http";

import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiversId) => {
  return userSocketMap[receiversId];
};
//For chceking online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap)); //[1,2,3,4]

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { io, server, app };

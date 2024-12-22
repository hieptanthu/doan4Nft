const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const redis = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const cors = require("cors");

const app = express();

// Cấu hình CORS để cho phép truy cập từ các nguồn cụ thể
app.use(
  cors({
    origin: "*", // Thay thế bằng URL của frontend của bạn
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Tạo kết nối Redis client
const redisClient = redis.createClient({
  url: "redis://183.80.66.166:6379/", // URL kết nối Redis
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected successfully");
});

// Tạo pub/sub clients cho Redis
const pubClient = redis.createClient({
  url: "redis://183.80.66.166:6379/",
});
const subClient = pubClient.duplicate();

// Kiểm tra kết nối pubClient
pubClient.on("error", (err) => {
  console.error("Redis pubClient error: ", err);
});

pubClient.on("connect", () => {
  console.log("Redis pubClient connected successfully");
});

// Kiểm tra kết nối subClient
subClient.on("error", (err) => {
  console.error("Redis subClient error: ", err);
});

subClient.on("connect", () => {
  console.log("Redis subClient connected successfully");
});

pubClient.connect().catch(console.error);
subClient.connect().catch(console.error);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Thay thế bằng URL frontend của bạn
    methods: ["GET", "POST"],
  },
  adapter: createAdapter(pubClient, subClient),
});

const listUser = {}; // Danh sách người dùng

function getRoomNameProduct(room) {
  return  `Product${room}`;
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userid;
  listUser[userId] = socket.id;
  console.log("User connected:", userId);

  // Tham gia vào phòng Product
  socket.on("joinRoomProduct", async (room) => {
    const roomName = getRoomNameProduct(room)
    socket.join(roomName);
    const roomSize = getUsersInRoom(roomName);
    console.log(`User ${socket.id} joined room ${roomName} - Users: ${roomSize}`);
    io.to(roomName).emit("UserInRoomProduct", roomSize);
  });

  // Tham gia vào phòng Chat
  socket.on("joinRoomChat", async (room) => {
    try {
      const roomName = `chat${room}`;
      socket.join(roomName);
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  });

  // Gửi tin nhắn
  socket.on("sendMessage", async (data) => {
    const { room, message } = data;
    const createAt = Date.now(); // Thời gian hiện tại
    const messageObject = {
      message,
      userId,
      createAt,
    };
    const messageString = JSON.stringify(messageObject);
    if (!room || !messageObject) {
      console.error("Invalid data");
      return;
    }

    try {
      if (!redisClient.isOpen) {
        console.log("Redis client is not open, reconnecting...");
        await redisClient.connect();
      }

      // Lưu tin nhắn vào Redis
      await redisClient.rPush(`chat_history_${room}`, messageString);

      // Phát tin nhắn tới phòng
      io.to(`chat${room}`).emit("receiveMessage", messageString);
    } catch (err) {
      console.error("Error saving message to Redis:", err);
    }
  });

  // Thay đổi thông tin Product
  socket.on("changeProduct", async (data) => {
    const { room, product } = data;
    io.to(getRoomNameProduct(room)).emit("receiveChangeProduct", product);
  });

  // Tải thêm tin nhắn
  socket.on("loadMoreMessages", async (data) => {
    const { room, lastMessageIndex } = data;
    try {
      if (!redisClient.isOpen) {
        console.log("Redis client is not open, reconnecting...");
        await redisClient.connect();
      }
      const messages = await redisClient.lRange(
        `chat_history_${room}`,
        lastMessageIndex - 16,
        lastMessageIndex == -1 ? -1 : lastMessageIndex - 1
      );
      if (messages.length > 0) {
        io.to(listUser[userId]).emit("chatHistory", messages);
      }
    } catch (err) {
      console.error("Error loading more messages:", err);
    }
  });

  // Rời phòng Product
  socket.on("leaveRoomProduct", (room) => {
    const roomName = getRoomNameProduct(room)
    socket.leave(roomName);
    const roomSize = getUsersInRoom(roomName);
    io.to(roomName).emit("UserOutRoomProduct", roomSize);
    console.log(`User ${socket.id} left room ${roomName} - Users: ${roomSize}`);
  });

  // Rời phòng Chat
  socket.on("leaveRoomChat", (room) => {
    socket.leave(`chat${room}`);
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    delete listUser[userId];
    console.log("User disconnected:", userId);
  });
});

// Lấy số lượng người dùng trong phòng
function getUsersInRoom(roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);
  return room ? room.size : 0;
}

// API kiểm tra trạng thái server
app.get("/", (req, res) => {
  const totalUsers = Object.keys(listUser).length;
  const rooms = {};

  io.sockets.adapter.rooms.forEach((room, key) => {
    if (key.startsWith("Product")) {
      rooms[key] = room.size;
    }
  });

  res.json({
    serverStatus: "Running",
    totalUsers,
    rooms,
  });
});

// Khởi động server
server.listen(5001, () => {
  console.log("Server is running on port 5001");
});

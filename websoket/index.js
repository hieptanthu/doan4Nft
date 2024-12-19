const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const redis = require("redis");
const { createAdapter } = require("socket.io-redis");
const cors = require("cors");
const { create } = require("domain");

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
  host: "127.0.0.1", // Sử dụng tên container Redis
  port: 6379, // Cổng Redis
});

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected successfully");
});

// Tạo pub/sub clients cho Redis
const pubClient = redis.createClient({
  host: "127.0.0.1", // Sử dụng tên container Redis
  port: 6379,
});
const subClient = pubClient.duplicate(); // Duplicates pubClient for subscription

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Thay thế bằng URL frontend của bạn
    methods: ["GET", "POST"],
  },
  adapter: createAdapter(pubClient, subClient),
});

const listUser = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userid;
  listUser[userId] = socket.id;
  console.log(listUser);

  socket.on("joinRoomProduct", async (room) => {
    socket.join("Product" + room);
    const roomSize = getUsersInRoom("Product" + room);
    io.to("Product" + room).emit("UserInRoomProduct", roomSize);
    console.log(
      `User ${socket.id} joined room Product${room} - number of users: ${roomSize}`
    );
  });

  socket.on("joinRommChat", async (room) => {
    try {
      socket.join("chat" + room);
      // Kiểm tra kết nối Redis trước khi thực hiện lệnh
      if (!redisClient.isOpen) {
        // Nếu Redis client không mở, khởi tạo lại kết nối
        console.log("Redis client is not open, reconnecting...");
        await redisClient.connect();
      }
      // Kiểm tra xem lịch sử chat có tồn tại không
      const messages = await redisClient.lRange(`chat_history_${room}`, -6, -1);
      // Nếu không có tin nhắn nào, tạo lịch sử chat trống
      if (messages.length === 0) {
        console.log(
          `No messages in room ${room}, creating empty chat history.`
        );
      } else {
        io.to("chat" + room).emit("chatHistory", messages);
      }
    } catch (err) {
      console.error("Lỗi khi lấy lịch sử chat:", err);
    }
  });

  socket.on("sendMessage", async (data) => {
    const room = data.room;
    const createAt = Date.now(); // Lấy thời gian hiện tại
    const messageObject = {
      message: data.message,
      userId: userId,
      createAt: createAt,
    };

    const messageString = JSON.stringify(messageObject);
    // Kiểm tra dữ liệu đầu vào
    if (!room || !messageObject) {
      console.error("Dữ liệu không hợp lệ");
      return;
    }

    try {
      // Gửi tin nhắn vào Redis
      const reply = await redisClient.rPush(
        `chat_history_${room}`,
        messageString
      );
      console.log("Lệnh rPush thành công, danh sách có", reply, "phần tử.");

      // Gửi tin nhắn tới tất cả người dùng trong phòng
      io.to("chat" + room).emit("receiveMessage", messageString);
    } catch (err) {
      console.error("Lỗi khi lưu tin nhắn vào Redis:", err);
    }
  });

  socket.on("chaneProduct", async (data) => {
    const room = data.room;
    const product = data.product;

    io.to("Product" + room).emit("receiveChaneProduct", product);
  });

  socket.on("loadMoreMessages", async (data) => {
    const room = data.room;
    const lastMessageIndex = data.lastMessageIndex;

    try {
      const messages = await redisClient.lRange(
        `chat_history_${room}`,
        lastMessageIndex - 16,
        lastMessageIndex - 1
      );
      if (messages.length > 0) {
        io.to("chat" + room).emit("chatHistory", messages);
      }
    } catch (err) {
      console.error("Lỗi khi tải thêm tin nhắn:", err);
    }
  });

  socket.on("leaveRoomProduct", (room) => {
    socket.leave("Product" + room);
    const roomSize = getUsersInRoom("Product" + room);
    io.to("Product" + room).emit("UserOutRoomProduct", roomSize);
    console.log(
      `User ${socket.id} left room Product${room} - number of users: ${roomSize}`
    );
  });

  socket.on("leaveRoomChat", (room) => {
    socket.leave("chat" + room);
  });

  socket.on("disconnect", () => {
    delete listUser[userId];
  });
});

function getUsersInRoom(roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);
  if (room) {
    return room.size;
  } else {
    return 0;
  }
}

// API Route to get server status and user count
app.get("/api/status", (req, res) => {
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

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const redis = require("redis");
const socketIORedis = require("socket.io-redis");

app.use(express.json());
app.use(express.static("public"));

// Tạo kết nối Redis client
const redisClient = redis.createClient({
  host: "localhost", // Địa chỉ của Redis server (sử dụng hostname trong Docker nếu cần)
  port: 6379,        // Cổng mặc định của Redis
});

const server = http.createServer(app);
const io = new Server(server);

// Kết nối Redis với Socket.IO
io.adapter(socketIORedis({ pubClient: redisClient, subClient: redisClient.duplicate() }));

// Hàm lấy số người dùng trong một phòng
function getUsersInRoom(roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);
  if (room) {
    return room.size;
  } else {
    return 0;
  }
}

const listUser = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userid;
  listUser[userId] = socket.id;

  // Khi người dùng gia nhập phòng, trả về lịch sử trò chuyện
  socket.on("joinRoomProduct", async (room) => {
    socket.join("Product" + room);
    const roomSize = getUsersInRoom("Product" + room);

    // Lấy lịch sử chat từ Redis
    redisClient.lrange(`chat_history_${room}`, 0, -1, (err, messages) => {
      if (err) {
        console.error("Lỗi khi lấy lịch sử chat:", err);
      } else {
        // Gửi lịch sử chat về client
        io.to("Product" + room).emit("chatHistory", messages);
      }
    });

    // Thông báo số lượng người dùng trong phòng
    io.to("Product" + room).emit("UserInRoomProduct", roomSize);
    console.log(`User ${socket.id} joined room Product${room} - number of users: ${roomSize}`);
  });

  // Gửi tin nhắn và lưu vào Redis
  socket.on("sendMessage", (data) => {
    const room = data.room;
    const message = data.message;

    // Lưu tin nhắn vào Redis
    redisClient.rpush(`chat_history_${room}`, message, (err, reply) => {
      if (err) {
        console.error("Lỗi khi lưu tin nhắn vào Redis:", err);
      } else {
        // Phát lại tin nhắn cho những người dùng trong phòng
        io.to("Product" + room).emit("receiveMessage", message);
      }
    });
  });

  // Khi người dùng rời phòng
  socket.on("leaveRoomProduct", (room) => {
    socket.leave("Product" + room);
    const roomSize = getUsersInRoom("Product" + room);
    io.to("Product" + room).emit("UserOutRoomProduct", roomSize);
    console.log(`User ${socket.id} left room Product${room} - number of users: ${roomSize}`);
  });

  // Khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    delete listUser[userId];
  });
});

// Khởi động server
app.start = app.listen = function () {
  return server.listen.apply(server, arguments);
};
app.start(5001);

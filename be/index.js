const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const Sequelize = require("sequelize");
const db = require("./app/models/");
const routes = require("./app/routes");
const port = process.env.PORT;

const app = express();
const http = require("http").Server(app);
const io = socket(http);
const Op = Sequelize.Op;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// (async () => {
//   try {
//     // Đồng bộ tất cả các model vào CSDL
//     await db.sequelize.sync({ force: false });
//     console.log("Đồng bộ cơ sở dữ liệu thành công!");
//   } catch (error) {
//     console.error("Lỗi khi khởi chạy ứng dụng:", error);
//   } finally {
//     await db.sequelize.close(); // Đóng kết nối sau khi hoàn tất
//   }
// })();
app.use(cors());
app.use((req, res, next) => {
  // console.log("body".req.body);
  req.Op = Op;
  res.io = io;
  next();
});

app.use(validator());
app.use(routes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  // Lắng nghe sự kiện tham gia vào room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} đã tham gia room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

http.listen(port, () => {
  console.log("Listening on " + port);
});

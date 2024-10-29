const fs = require("fs");
const path = require("path");

// Danh sách tên mô hình cần tạo route
const modelNames = [
  "User",
  "Auction",
  "Category",
  "MarketItem",
  "myNFT",
  "historyTransfer",
  "comment",
  "historyAuction",
]; // Thêm các tên mô hình ở đây

// Hàm tạo mã route
const generateRouteCode = (modelName) => {
  return `
const express = require('express');
const router = express.Router();
const ${modelName}Controller = require('../controllers/${modelName}Controller');

// Định nghĩa các route cho ${modelName}
router.post('/', ${modelName}Controller.create);
router.get('/', ${modelName}Controller.findAll);
router.get('/:id', ${modelName}Controller.findById);
router.put('/:id', ${modelName}Controller.update);
router.delete('/:id', ${modelName}Controller.delete);

module.exports =  router ;
`;
};

// Hàm tạo file route dựa trên danh sách tên mô hình
const createRouteFiles = () => {
  for (const modelName of modelNames) {
    const routeCode = generateRouteCode(modelName);
    const filePath = path.join(__dirname, "routes", `${modelName}Routes.js`);

    // Tạo file route và ghi mã vào đó
    fs.writeFileSync(filePath, routeCode.trim(), { encoding: "utf8" });
    console.log(`Created route for model: ${modelName}`);
  }
};

// Gọi hàm tạo file
createRouteFiles();

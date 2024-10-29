const fs = require("fs");
const path = require("path");

// Danh sách tên mô hình cần tạo controller
const modelNames = ["historyAuction"]; // Thêm các tên mô hình ở đây

// Hàm tạo mã controller
const generateControllerCode = (modelName) => {
  return `
const  models  = require('../models'); // Nhập models từ index

const ${modelName}Controller = {
  create: async (req, res) => {
    try {
      const item = await models.${modelName}.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const items = await models.${modelName}.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const item = await models.${modelName}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await models.${modelName}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      
      // Chỉ cập nhật các thuộc tính được truyền vào
      await item.update(req.body, { fields: Object.keys(req.body) });
      
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const item = await models.${modelName}.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ${modelName}Controller;
`;
};

// Hàm tạo file controller dựa trên danh sách tên mô hình
const createControllerFiles = () => {
  for (const modelName of modelNames) {
    const controllerCode = generateControllerCode(modelName);
    const filePath = path.join(
      __dirname,
      "controllers",
      `${modelName}Controller.js`
    );

    // Tạo file controller và ghi mã vào đó
    fs.writeFileSync(filePath, controllerCode.trim(), { encoding: "utf8" });
    console.log(`Created controller for model: ${modelName}`);
  }
};

// Gọi hàm tạo file
createControllerFiles();

const  models  = require('../models'); // Nhập models từ index

const historyTransferController = {
  create: async (req, res) => {
    try {
      const item = await models.historyTransfer.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const items = await models.historyTransfer.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const item = await models.historyTransfer.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await models.historyTransfer.findByPk(req.params.id);
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
      const item = await models.historyTransfer.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = historyTransferController;
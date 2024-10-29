const express = require('express');
const router = express.Router();
const historyTransferController = require('../controllers/historyTransferController');

// Định nghĩa các route cho historyTransfer
router.post('/', historyTransferController.create);
router.get('/', historyTransferController.findAll);
router.get('/:id', historyTransferController.findById);
router.put('/:id', historyTransferController.update);
router.delete('/:id', historyTransferController.delete);

module.exports =  router ;
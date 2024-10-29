const express = require('express');
const router = express.Router();
const historyAuctionController = require('../controllers/historyAuctionController');

// Định nghĩa các route cho historyAuction
router.post('/', historyAuctionController.create);
router.get('/', historyAuctionController.findAll);
router.get('/:id', historyAuctionController.findById);
router.put('/:id', historyAuctionController.update);
router.delete('/:id', historyAuctionController.delete);

module.exports =  router ;
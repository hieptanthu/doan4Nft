const express = require('express');
const router = express.Router();
const AuctionController = require('../controllers/AuctionController');

// Định nghĩa các route cho Auction
router.post('/', AuctionController.create);
router.get('/', AuctionController.findAll);
router.get('/:id', AuctionController.findById);
router.put('/:id', AuctionController.update);
router.delete('/:id', AuctionController.delete);

module.exports =  router ;
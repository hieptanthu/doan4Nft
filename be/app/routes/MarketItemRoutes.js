const express = require('express');
const router = express.Router();
const MarketItemController = require('../controllers/MarketItemController');

// Định nghĩa các route cho MarketItem
router.post('/', MarketItemController.create);
router.get('/', MarketItemController.findAll);
router.get('/:id', MarketItemController.findById);
router.put('/:id', MarketItemController.update);
router.delete('/:id', MarketItemController.delete);

module.exports =  router ;
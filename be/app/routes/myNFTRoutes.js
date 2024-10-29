const express = require('express');
const router = express.Router();
const myNFTController = require('../controllers/myNFTController');

// Định nghĩa các route cho myNFT
router.post('/', myNFTController.create);
router.get('/', myNFTController.findAll);
router.get('/:id', myNFTController.findById);
router.put('/:id', myNFTController.update);
router.delete('/:id', myNFTController.delete);

module.exports =  router ;
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Định nghĩa các route cho comment
router.post('/', commentController.create);
router.get('/', commentController.findAll);
router.get('/:id', commentController.findById);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

module.exports =  router ;
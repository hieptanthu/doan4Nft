const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Định nghĩa các route cho Category
router.post('/', CategoryController.create);
router.get('/', CategoryController.findAll);
router.get('/:id', CategoryController.findById);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports =  router ;
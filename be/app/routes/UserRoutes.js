const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Định nghĩa các route cho User
router.post('/', UserController.create);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports =  router ;
const express = require('express');
const router = express.Router();
const userController = require('./user-controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUsersByChatId);
router.put('/:id', userController.createOrUpdateNickname);

module.exports = router;
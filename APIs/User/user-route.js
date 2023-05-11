const express = require('express');
const router = express.Router();
const userController = require('./user-controller');

router.get('/', userController.getAllUsers);
router.put('/:id', userController.createOrUpdateNickname);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('./user-controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUsersByChatId);
// router.put('/:id', userController.createOrUpdateNickname);
router.put('/geoLocation/:id', userController.saveGeoLocation);
router.put('/socketIn/:id', userController.socketIn);
router.put('/socketOut', userController.socketOut);

module.exports = router;
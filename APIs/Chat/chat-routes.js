const express = require('express');
const chatController = require('./chat-controller');

const router = express.Router();

router.get('/', chatController.getAll);
router.get('/:id', chatController.getOne);
router.post('/', chatController.addChat);
router.put('/:id', chatController.updateChattingContext);
router.delete('/room/:roomId/user/:userId', chatController.removeUserFromChat);
router.delete('/:id', chatController.removeChattingContext);


module.exports = router;
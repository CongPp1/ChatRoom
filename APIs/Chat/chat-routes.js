const express = require('express');
const chatController = require('./chat-controller');

router.get('/', chatController.chatController);
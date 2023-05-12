const express = require('express')
const authRoutes = require('./APIs/Auth/auth-routes')
const userRoutes = require('./APIs/User/user-route')
const chatRoutes = require('./APIs/Chat/chat-routes')

const router = express.Router()

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

module.exports = router
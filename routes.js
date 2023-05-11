const express = require('express')
const authRoutes = require('./APIs/Auth/auth-routes')
const userRoutes = require('./APIs/User/user-route')

const router = express.Router()

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router
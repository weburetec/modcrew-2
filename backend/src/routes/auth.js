const express = require('express')
const registerUser = require('../controllers/auth/register')
const loginUser = require('../controllers/auth/login')
const getMe = require('../controllers/auth/getMe')
const forgotPassword = require('../controllers/auth/forgotPassword')
const resetPassword = require('../controllers/auth/resetPassword')
const getOrdersForUser = require('../controllers/auth/getOrdersForUser')

const { protect } = require('../middleware/auth')

const router = express.Router()

// @route   /api/v1/auth/register
router.post('/register', registerUser)

// @route   /api/v1/auth/login
router.post('/login', loginUser)

// @route   /api/v1/auth/me
router.get('/me', protect, getMe)

// @route   /api/v1/auth/me/orders
router.route('/me/orders').get(protect, getOrdersForUser)

// @route   /api/v1/auth/forgot-password
router.post('/forgot-password', forgotPassword)

// @route   /api/v1/auth/reset-password
router.put('/reset-password/:resettoken', resetPassword)

module.exports = router

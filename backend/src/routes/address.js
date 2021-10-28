const express = require('express')
const getAllAddress = require('../controllers/address/getAllAddress')
const addAddress = require('../controllers/address/addAddress')
const updateAddress = require('../controllers/address/updateAddress')
const deleteAddress = require('../controllers/address/deleteAddress')

const { protect } = require('../middleware/auth')

const router = express.Router()

router.route('/').get(protect, getAllAddress).post(protect, addAddress)

router.route('/:id').put(protect, updateAddress).delete(protect, deleteAddress)

module.exports = router

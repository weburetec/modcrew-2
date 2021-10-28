const express = require('express')
const getUsers = require('../controllers/users/getUsers')
const getUser = require('../controllers/users/getUser')
const updateUser = require('../controllers/users/updateUser')
const deleteUser = require('../controllers/users/deleteUser')
const purchaseMembership = require('../controllers/users/purchaseMembership')

const { protect } = require('../middleware/auth')
const { filter } = require('../middleware/filter')

const router = express.Router()

router.route('/').get(filter, getUsers)

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/purchase/membership/:id').get(purchaseMembership)

module.exports = router
 
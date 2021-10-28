const express = require('express')
const contactUs = require('../controllers/contact/contact-us')

const router = express.Router()

router.route('/').post(contactUs)

module.exports = router

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authRoute = require('../routes/authRoute');
const userRoute = require('../routes/userRoute');

router.get('/', indexController.goIndex);

module.exports = [router, authRoute, userRoute]

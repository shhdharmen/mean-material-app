const express = require('express');
const router = express.Router();
const loginCtrl = require('./login/login.controller');

//Routing all HTTP requests to /auth to auth controller
router.use('/login', loginCtrl);

module.exports = router;
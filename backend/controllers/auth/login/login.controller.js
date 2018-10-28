const express = require('express');
const router = express.Router();
const userService = require('./login.service');

// routes
router.post('/', authenticate);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(({idToken, expiresIn, user}) => ({idToken, expiresIn, user}) ? res.status(200).json({idToken, expiresIn, user}) : res.status(401).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
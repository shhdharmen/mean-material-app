const express = require('express');
const router = express.Router();
const userService = require('./login.service');

// routes
router.post('/', authenticate);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((authRes) => {
            authRes ? res.status(200).json(authRes) : res.status(401).json({ action: 'login', message: 'Username or password is incorrect' })
        })
        .catch(err => next(err));
}
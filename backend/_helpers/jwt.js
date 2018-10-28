const expressJwt = require('express-jwt');
const fs = require('fs');
const publicKey = fs.readFileSync('config/public.key', 'utf-8');

module.exports = jwt;

function jwt() {
    // const { secret } = publicKey;
    return expressJwt({ secret : publicKey }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/login/'
        ]
    });
}
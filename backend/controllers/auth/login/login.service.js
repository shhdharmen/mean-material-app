const fs = require('fs');
const privateKey = fs.readFileSync('config/private.key', 'utf-8');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = validateEmailAndPassword(username, password);
    try {
        if (user) {
            const token = jwt.sign({}, privateKey, {
                algorithm: 'RS256',
                expiresIn: '1h',
                subject: user.id.toString()
            });
            const { password, ...userWithoutPassword } = user;
            return {
                idToken: token,
                expiresIn: 10,
                user: userWithoutPassword
            };
        }
    } catch (err) {
        console.log(err);
    }
}

function validateEmailAndPassword(username, password) {
    return users.find(u => u.username === username && u.password === password);
}

const mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'mean-material-app-db';      // REPLACE WITH YOUR DB NAME
const localConnectionString = `mongodb://${server}/${database}`;
const remoteConnectionString = `mongodb+srv://new-user_31:${process.env.passphrase}@cluster0-pke4z.mongodb.net/test?retryWrites=true/mean-material-app-db`;
class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(remoteConnectionString)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            });
    }
}
module.exports = new Database();
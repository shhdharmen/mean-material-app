// We’ll declare all our dependencies here
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
// const taskCtrl = require('./controllers/tasks');
const authCtrl = require('./controllers/auth/auth.controller');
const errorHandler = require('./_helpers/error-handler');
const jwt = require('./_helpers/jwt');

//Connect mongoose to our database
// mongoose.connect(config.database);

//Initialize our app variable
const app = express();

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware for CORS
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.get('/', (req, res) => {
  res.send("Invalid page");
})

//Routing all HTTP requests to /bucketlist to tasks controller
// app.use('/tasks', taskCtrl);

//Routing all HTTP requests to /auth to auth controller
app.use('/auth', authCtrl);

// global error handler
app.use(errorHandler);

//Declaring Port
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
app.listen(port, () => {
  console.log('Server listening on port ' + port);
})
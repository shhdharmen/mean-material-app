//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    module: {
        type: String,
        required: true,
        enum: ['Client', 'Client Admin', 'Support', 'Support Admin', 'Seller', 'Seller Admin']
    }
});

const TaskList = module.exports = mongoose.model('TaskList', TaskSchema);

//BucketList.find() returns all the lists
module.exports.getAllTasks = (callback) => {
    try {
        console.log("backend/models/Task.js | getAllTasks");
        TaskList.find(callback);
    } catch (err) {
        console.log('err', err);
    }
};

//BucketList.find() returns all the lists
module.exports.getTaskById = (id, callback) => {
    let query = { _id: id };
    TaskList.find(query, callback);
};

//newList.save is used to insert the document into MongoDB
module.exports.addTask = (newTask, callback) => {
    newTask.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteTaskById = (id, callback) => {
    let query = { _id: id };
    TaskList.remove(query, callback);
};
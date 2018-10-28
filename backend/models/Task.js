//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    module: {
        type: String,
        required: true,
        enum: ['Client', 'ClientAdmin', 'Support', 'SupportAdmin', 'Seller', 'SellerAdmin']
    }
});

const TaskList = module.exports = mongoose.model('TaskList', TaskSchema);

//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    TaskList.find(callback);
};

//BucketList.find() returns all the lists
module.exports.getListById = (id, callback) => {
    let query = { _id: id };
    TaskList.find(query, callback);
};

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteListById = (id, callback) => {
    let query = { _id: id };
    TaskList.remove(query, callback);
};
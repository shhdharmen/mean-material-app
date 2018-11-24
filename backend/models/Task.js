//Require mongoose package
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

//Define BucketlistSchema with title, description and category
let TaskSchema = new mongoose.Schema({
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
        enum: ['high', 'medium', 'low']
    },
    module: {
        type: String,
        required: true,
        enum: ['client', 'clientAdmin', 'support', 'supportAdmin', 'seller', 'sellerAdmin']
    }
});
TaskSchema.plugin(mongoosePaginate);

const TaskList = module.exports = mongoose.model('TaskList', TaskSchema);

//TaskList.find() returns all the lists
module.exports.getAllTasks = (query, callback) => {
    const sort = query.sort;
    const order = query.order;
    const page = query.page;
    const limitTo = query.limitTo;
    try {
        console.log("backend/models/Task.js | getAllTasks");
        TaskList.paginate({}, {
            sort: {
                [sort]: order
            },
            page: page,
            limit: +limitTo
        }, function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.docs, result.total);
        });
    } catch (err) {
        console.log('err', err);
    }
};

module.exports.getTaskById = (id, callback) => {
    let query = {
        _id: id
    };
    TaskList.find(query, callback);
};

//newTask.save is used to insert the document into MongoDB
module.exports.addTask = (newTask, callback) => {
    newTask.save(callback);
};

//Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteTaskById = (id, callback) => {
    let query = {
        _id: id
    };
    TaskList.remove(query, callback);
};

// we will use findByIdAndUpdate() which will find and update in one shot
module.exports.updateById = (id, updatedTask, callback) => {
    TaskList.findByIdAndUpdate(id, {
        $set: {
            title: updatedTask.title,
            description: updatedTask.description,
            category: updatedTask.category,
            module: updatedTask.module
        }
    }, {
        new: true
    }, callback);
};
//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const task = require('../models/Task');

//GET HTTP method to /bucketlist
router.get('/', (req, res) => {
    task.getAllLists((err, lists) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all tasks. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, lists: lists }, null, 2));
            res.end();

        }
    });
});

//GET HTTP method to /bucketlist
router.get('/:id', (req, res) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    task.getListById(id, (err, lists) => {
        if (err) {
            res.json({ success: false, message: `Failed to load single task. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, lists: lists }, null, 2));
            res.end();

        }
    });
});

//POST HTTP method to /bucketlist
router.post('/', (req, res, next) => {
    let newTask = new task({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });
    task.addList(newTask, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new task. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully." });

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.
router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    task.deleteListById(id, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the list. Error: ${err}` });
        }
        else if (list) {
            res.json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    });
});

module.exports = router;
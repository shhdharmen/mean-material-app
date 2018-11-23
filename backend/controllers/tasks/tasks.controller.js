//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const task = require('../../models/Task');

// GET HTTP sorted and paginated data
router.get('/', (req, res) => {
    task.getAllTasks(req.query, (err, tasks, totalTasks) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load all tasks. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                tasks: tasks,
                totalTasks: totalTasks
            }, null, 2));
            res.end();

        }
    });
});

// GET HTTP id data
router.get('/:id', (req, res) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    task.getTaskById(id, (err, tasks) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load single task. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                tasks: tasks
            }, null, 2));
            res.end();

        }
    });
});

//POST HTTP method to add task
router.post('/', (req, res, next) => {
    let newTask = new task({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        module: req.body.module
    });
    task.addTask(newTask, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to create a new task. Error: ${err}`
            });

        } else
            res.status(200).json({
                success: true,
                message: "Added successfully."
            });

    });
});

//DELETE HTTP method to delete task. Here, we pass in a param which is the object id.
router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    task.deleteTaskById(id, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to delete the list. Error: ${err}`
            });
        } else if (list) {
            res.status(200).json({
                success: true,
                message: "Deleted successfully"
            });
        } else
            res.status(501).json({
                success: false,
                message: `Failed to delete the list. Unknown Error.`
            });
    });
});

module.exports = router;
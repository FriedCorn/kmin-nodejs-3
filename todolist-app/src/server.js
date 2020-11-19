const express = require('express');
const mongoose = require('mongoose');

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('./services/task-service');
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/todolist-app', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());

app.route("/tasks")
    .post((req, res) => {
        const { title, body } = req.body;

        if (!title) {
            return res.status(400).json({ message: "title is required" });
        }
        createTask({ title, body }, (err, task) => {
            if (err)
                res.send(err);
            else
                res.json(task);
        });
    })
    .get((req, res) => {
        getAllTasks((err, tasks) => {
            if (err)
                res.send(err);
            else
                res.json(tasks);
        });
    });

app.route("/tasks/:taskId")
    .get((req, res) => {
        getTaskById(req.params.taskId, (err, task) => {
            if (err)
                res.send(err);
            else
                res.json(task);
        });
    })
    .patch((req, res) => {
        const { title, body, completed } = req.body;
        const updatedTask = updateTask(req.params.taskId, { title, body, completed });
        if (updateTask != null)
            res.send(updatedTask);
        else
            res.send("Fail Updating");
    })
    .delete((req, res) => {
        if (deleteTask(req.params.taskId))
            res.send("Deleted");
        else
            res.send("Fail");
    });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTaskById
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

        createTask({ title, body })
            .then((task) => res.json(task))
            .catch((error) => res.status(500).send(error))
    })
    .get((req, res) => {
        getAllTasks()
            .then((tasks) => res.json(tasks))
            .catch((error) => res.status(500).send(error));
    });

app.route("/tasks/:taskId")
    .get((req, res) => {
        getTaskById(req.params.taskId)
            .then((task) => res.json(task))
            .catch((error) => res.status(500).send(error));
    })
    .patch((req, res) => {
        const { title, body, completed } = req.body;
        const taskId = req.params.taskId;
        updateTask(taskId, { title, body, completed })
        .then((updatedTask) => res.json(updatedTask))
        .catch((error) => res.status(500).send(error));
    })
    .delete((req, res) => {
        const taskId = req.params.taskId;
        deleteTaskById(taskId)
        .then((task) => res.json(task))
        .catch((error)=>res.status(500).send(error));
    });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
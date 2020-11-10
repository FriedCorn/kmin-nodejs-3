const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('./services/task-service');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.route("/tasks")
    .post((req, res) => {
        const { title, body } = req.body;

        if (!title) {
            return res.status(400).json({ message: "title is required" });
        }
        const createdTask = createTask({ title, body });
        res.send(createdTask);
    })
    .get((req, res) => {
        const allTask = getAllTasks();
        if (allTask.length != 0)
            res.send(allTask);
        else
            res.send("NO TASK");
    });

app.route("/tasks/:taskId")
    .get((req, res) => {
        const foundTask = getTaskById(req.params.taskId);
        if (foundTask != null)
            res.send(foundTask);
        else
            res.send("NOT FOUND");
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
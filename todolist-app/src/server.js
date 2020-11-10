const express = require('express');
const { createTask, getAllTasks, getTaskById } = require('./services/task-service');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/tasks", (req, res) => {
    const { title, body } = req.body;
    const createdTask = createTask({ title, body });
    res.send(createdTask);
});

app.get("/tasks", (req, res) => {
    const allTask = getAllTasks();
    if (allTask.length != 0)
        res.send(allTask);
    else
        res.send("NO TASK");
});

app.get("/tasks/:taskId", (req, res) => {
    const task = getTaskById(req.params.taskId);
    if (task != null)
        res.send(task);
    else
        res.send("NOT FOUND");
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
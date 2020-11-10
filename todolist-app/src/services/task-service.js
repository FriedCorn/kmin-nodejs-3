const { createModel } = require("../helper/model");

const Task = createModel('tasks');

// Create task
function createTask({ title, body }) {
    const tasks = Task.findAll();
    const lastId = tasks.length + 1;
    const newTask = {
        id: lastId,
        title,
        body,
        createdDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        completed: false,
        completedAt: null,
    };
    return Task.create(newTask);
}

// Get all tasks
function getAllTasks() {
    return Task.findAll();
}

// Get task by ID
function getTaskById(taskId) {
    const foundTask = Task.findById(taskId);
    return foundTask;
}

function updateTask(taskId, { title, body, completed }) {
    const foundTask = Task.findById(taskId);
    if (foundTask == null)
        return null;

    let checkUpdate = false;
    if (foundTask.title != title && title) {
        foundTask.title = title;
        checkUpdate = true;
    }
    if (foundTask.body != body && body) {
        foundTask.body = body;
        checkUpdate = true;
    }
    if (foundTask.completed != completed) {
        foundTask.completed = completed;
        if (completed == true)
            foundTask.completedAt = new Date().toLocaleTimeString();
        else
            foundTask.completedAt = null;
        checkUpdate = true;
    }

    if (checkUpdate == true)
        return Task.update(foundTask);
    return null;
}

function deleteTask(taskId) {
    const task = Task.findById(taskId);
    // if (task)
        return Task.removeById(taskId);
    // return null;
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
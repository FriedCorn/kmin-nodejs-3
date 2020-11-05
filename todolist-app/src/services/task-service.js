const { createModel } = require("../helper/model");

const Task = createModel('tasks');

// Create task
function createTask({ title, body }) {
    return Task.create({title, body});
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

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
};
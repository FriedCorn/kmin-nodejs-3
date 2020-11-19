const { createModel } = require("../helper/model");
const Task = require('../models/Task');

const TaskJSONDB = createModel('tasks');

// Create task
function createTask({ title, body }, callback) {
    // const tasks = TaskJSONDB.findAll();
    // const newTask = {
    //     id: Date.now().toString(),
    //     title,
    //     body,
    //     createdAt: new Date(),
    //     completed: false,
    //     completedAt: null,
    // };
    // return TaskJSONDB.create(newTask);
    Task.create({ title, body }).then((task) => {
        callback(null, task);
    });
}

// Get all tasks
function getAllTasks(callback) {
    Task.find().then((tasks) => {
        if (tasks.length == 0) {
            callback('Empty', undefined);
        }
        else
            callback(null, tasks);
    });
}

// Get task by ID
function getTaskById(taskId, callback) {
    // const foundTask = TaskJSONDB.findById(taskId);
    // return foundTask;
    Task.findById(taskId).then((task) => {
        if (task != null)
            callback(null, task);
        else
            callback("Task doesn't exist", undefined);
    });
}

function updateTask(taskId, { title, body, completed }) {
    const foundTask = TaskJSONDB.findById(taskId);
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
            foundTask.completedAt = new Date();
        else
            foundTask.completedAt = null;
        checkUpdate = true;
    }

    if (checkUpdate == true)
        return TaskJSONDB.update(foundTask);
    return null;
}

function deleteTask(taskId) {
    const task = TaskJSONDB.findById(taskId);
    // if (task)
    return TaskJSONDB.removeById(taskId);
    // return null;
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
const { createModel } = require("../helper/model");
const Task = require('../models/Task');

const TaskJSONDB = createModel('tasks');

// Create task
function createTask({ title, body }) {
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
    return new Promise((resolve, reject) => {
        Task.create(
            {
                title,
                body,
                completed: false,
                createdAt: new Date(),
                completedAt: null
            })
            .then((task) => resolve(task))
            .catch((error) => reject(error));
    });
}

// Get all tasks
function getAllTasks() {
    return new Promise((resolve, reject) => {
        Task.find()
            .then((tasks) => {
                if (tasks.length != 0)
                    resolve(tasks);
                else
                    reject("Empty task list");
            })
            .catch((error) => reject(error));
    });
}

// Get task by ID
function getTaskById(taskId) {
    // const foundTask = TaskJSONDB.findById(taskId);
    // return foundTask;
    return new Promise((resolve, reject) => {
        Task.findById(taskId)
            .then((task) => {
                if (task)
                    resolve(task);
                reject("Task doesn't exist");
            })
            .catch((error) => reject(error));
    })
}

function updateTask(taskId, { title, body, completed }) {
    // const foundTask = TaskJSONDB.findById(taskId);
    // if (foundTask == null)
    //     return null;

    // let checkUpdate = false;
    // if (foundTask.title != title && title) {
    //     foundTask.title = title;
    //     checkUpdate = true;
    // }
    // if (foundTask.body != body && body) {
    //     foundTask.body = body;
    //     checkUpdate = true;
    // }
    // if (foundTask.completed != completed) {
    //     foundTask.completed = completed;
    //     if (completed == true)
    //         foundTask.completedAt = new Date();
    //     else
    //         foundTask.completedAt = null;
    //     checkUpdate = true;
    // }

    // if (checkUpdate == true)
    //     return TaskJSONDB.update(foundTask);
    // return null;
    return new Promise((resolve, reject) => {
        Task.findById(taskId)
            .then((foundTask) => {
                if (foundTask) {
                    let completedAt = null;
                    if (completed == true)
                        completedAt = new Date();
                    Task.update({ _id: taskId }, { title, body, completed, completedAt})
                        .catch((error) => reject(error));
                    resolve(foundTask);
                }
                else
                    reject("Task doesn't exist. Updation failed");
            })
            .catch((error) => reject(error));
    });
}

function deleteTaskById(taskId) {
    // const task = TaskJSONDB.findById(taskId);
    // // if (task)
    // return TaskJSONDB.removeById(taskId);
    // // return null;
    return new Promise((resolve, reject) => {
        Task.findByIdAndRemove(taskId)
            .then((task) => {
                if (task)
                    resolve(task)
                else
                    reject("Task doesn't exist. Deletion failed")
            })
            .catch((error) => reject(error));
    });
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTaskById
};
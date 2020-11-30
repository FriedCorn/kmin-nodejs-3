const Task = require('../models/Task');

// Create task
function createTask({ title, body, userId }) {
    return new Promise((resolve, reject) => {
        Task.create(
            {
                title,
                body,
                completed: false,
                createdAt: new Date(),
                completedAt: null,
                userId
            })
            .then((task) => resolve(task))
            .catch((error) => reject(error));
    });
}

// Get all tasks
function getAllTasks(userId) {
    return new Promise((resolve, reject) => {
        Task.find({userId: userId})
            .then((tasks) => resolve(tasks))
            .catch((error) => reject(error));
    });
}

// Get task by ID
function getTaskById(taskId, userId) {
    return new Promise((resolve, reject) => {
        Task.findById({_id: taskId})
            .then((task) => {
                if (!task)
                    resolve(null);
                if (task.userId.toString() != userId)
                    resolve(null);
                resolve(task);
            })
            .catch((error) => reject(error));
    })
}

function updateTask(taskId, { title, body, completed, completedAt }) {
    return new Promise((resolve, reject) => {
        Task.updateOne({ _id: taskId }, { title, body, completed, completedAt })
            .then((updatedTask) => {
                updatedTask = Task.findById(taskId);
                resolve(updatedTask);
            })
            .catch((error) => reject(error));
    });
}

function deleteTaskById(taskId) {
    return new Promise((resolve, reject) => {
        Task.deleteOne({_id: taskId})
            .then((task) => resolve(task))
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
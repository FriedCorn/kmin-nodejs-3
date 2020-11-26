const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: String,
    completed: Boolean,
    completedAt: String,
    createdAt: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
const fs = require('fs');
const path = require('path');

const DB_DIR = path.resolve(__dirname, "../../db");

// If DB_FILE doesn't exist, create it.
function ensureDbFile(dbFile) {
    if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR);
    }

    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, "");
    }
}

// Create model
function createModel(modelName) {
    const dbFILE = path.resolve(DB_DIR, `${modelName}.json`);

    function create({ title, body }) {
        const tasks = findAll();
        const lastId = tasks.length + 1;

        const newTask = {
            id: lastId,
            title,
            body,
            createdDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        };

        tasks.push(newTask);
        saveAll(tasks);

        return newTask;
    }

    function findAll() {
        ensureDbFile(dbFILE);
        try {
            const tasksJson = fs.readFileSync(dbFILE, { encoding: "utf-8" });
            return JSON.parse(tasksJson);
        } catch (error) {
            return [];
        }
    }

    function findById(id) {
        const tasks = findAll();
        for (const i in tasks) {
            if (tasks[i].id == id)
                return tasks[i];
        }
        return null;
    }

    function saveAll(tasks) {
        ensureDbFile(dbFILE);
        fs.writeFileSync(dbFILE, JSON.stringify(tasks));
    }

    return {
        create,
        findAll, 
        findById
    };
}

module.exports = {
    createModel
}

const { time } = require('console');
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
    const dbFile = path.resolve(DB_DIR, `${modelName}.json`);

    function create(newEntity) {
        if (newEntity) {
            const entities = findAll();
            entities.push(newEntity);
            saveAll(entities);

            return newEntity;
        }
        return null;
    }

    function findAll() {
        ensureDbFile(dbFile);
        try {
            const tasksJson = fs.readFileSync(dbFile, { encoding: "utf-8" });
            return JSON.parse(tasksJson);
        } catch (error) {
            return [];
        }
    }

    function findById(id) {
        const entities = findAll();
        for (const i in entities) {
            if (entities[i].id == id)
                return entities[i];
        }
        return null;
    }

    function saveAll(entities) {
        ensureDbFile(dbFile);
        fs.writeFileSync(dbFile, JSON.stringify(entities));
    }

    function getIndex(entity) {
        if (entity) {
            const entities = findAll();
            for (const i in entities) {
                if (entity.id == entities[i].id)
                    return i;
            }
        }
        return undefined;
    }

    function update(entity) {
        if (entity) {
            const entities = findAll();
            const i = getIndex(entity);
            if (i != undefined) {
                entities.splice(i, 1, entity);
                saveAll(entities);
                return entity;
            }
        }
        return null;
    }

    function removeById(id) {
        const entity = findById(id);
        const i = getIndex(entity);
        if (i != undefined) {
            const entities = findAll();
            const removedEntity = entities.splice(i, 1);
            saveAll(entities);
            return removedEntity;
        }
        return null;
    }

    return {
        create,
        findAll,
        findById,
        update,
        removeById,
    };
}

module.exports = {
    createModel
}

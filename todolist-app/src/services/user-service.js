const User = require("../models/User");

// Create user
const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        User.create({username, password})
        .then((createdUser) => resolve(createdUser))
        .catch((error) => reject(error));
    });
};

// Find user by ID
const findUserById = (userId) => {
    return User.findById(userId);
}

// Find user by username
const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({username: username})
        .then((foundUser) => resolve(foundUser))
        .catch((error) => reject(error));
    });
};

module.exports = {
    createUser,
    // deleteUser,
    findUserByUsername,
    findUserById
}
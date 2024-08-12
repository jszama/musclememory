const generateToken = require('./generateToken');
const validateExists = require('./validateExists');
const validateUserInput = require('./validateUserInput');
const hashPassword = require('./hashPassword');
const validLogin = require('./validLogin');
const alreadyFriends = require('./alreadyFriends');
const getUserById = require('./getUserById');
const getUserByName = require('./getUserByName');

module.exports = {
    generateToken,
    validateExists,
    validateUserInput,
    hashPassword,
    validLogin,
    alreadyFriends,
    getUserById,
    getUserByName
};
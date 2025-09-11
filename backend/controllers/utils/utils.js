const generateToken = require('./generateToken');
const validateExists = require('./validateExists');
const validateUserInput = require('./validateUserInput');
const hashPassword = require('./hashPassword');
const validLogin = require('./validLogin');
const alreadyFriends = require('./alreadyFriends');
const getUserNameById = require('./getUserNameById');
const getUserIdByName = require('./getUserIdByName');

module.exports = {
    generateToken,
    validateExists,
    validateUserInput,
    hashPassword,
    validLogin,
    alreadyFriends,
    getUserNameById,
    getUserIdByName
};
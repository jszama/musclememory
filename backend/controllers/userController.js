const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const { validateUserInput, validateExists, hashPassword, validLogin, generateToken } = require('./utils/utils.js');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    validateUserInput(name, email, password);
    await validateExists(email);

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    
    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        }
    });
}
);

// Login a user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, remember } = req.body;

    const user = await User.findOne({ email });

    if (validLogin(user, password)) {
        const token = generateToken(user._id);

        if (remember === true) {
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7
            });
        }

        res.status(200).json({
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getLoggedInUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user._id);

    if (req.user) {
        res.status(200).json({
            _id,
            name,
            email
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser
};

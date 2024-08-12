const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const { validateUserInput, validateExists, hashPassword, validLogin, generateToken } = require('./utils/utils.js');
const { uploadFile } = require('../config/upload');

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
    const { _id, name, email, bio, profilePic } = await User.findById(req.user._id);

    if (req.user) {
        res.status(200).json({
            _id,
            name,
            email,
            bio,
            profilePic
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    user.bio = req.body.bio || user.bio;

    if (req.file) {
        try {
            const fileBuffer = req.file.buffer;

            const location = await uploadFile(fileBuffer, user._id.toString());
            user.profilePic = location;
        } catch (error) {
            console.error(`Failed to upload file: ${error.message}`);
            return res.status(500).json({ error: `Failed to upload file: ${error.message}` });
        }
    }

    await user.save();

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic
    });
});

module.exports = {
    registerUser,
    loginUser,
    getLoggedInUser,
    updateUserProfile
};

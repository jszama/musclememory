const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const validateUserInput = require('../utils/validateUserInput');
const validateExists = require('../utils/validateExists');

// Register a new user

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    validateUserInput(name, email, password);
    await validateExists(email);

    const hashedPassword = hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    });
}
);

// Login a user

const validLogin = async (user, password) => {
    return user && (await bcrypt.compare(password, user.password));
};

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (validLogin(user, password)) {
        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

module.exports = {
    registerUser,
    loginUser
};

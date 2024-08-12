const User = require('../../models/userModel');

const getUserByName = async (name) => {
    const user = await User.findOne({ name });

    if (user !== null) {
        return user._id
    } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    };
}

module.exports = getUserByName;
const User = require('../../models/userModel');

const getUserNameById = async (id) => {
    const user = await User.findById(id);

    if (user) {
        return user.name
    } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    };
}

module.exports = getUserNameById;
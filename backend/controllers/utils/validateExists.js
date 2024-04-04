const User = require('../../models/User');

const validateExists = async (email) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error('User already exists');
    }
};

module.exports = validateExists;
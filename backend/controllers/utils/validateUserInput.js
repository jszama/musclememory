const validateUserInput = (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error('Please enter all fields');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
};

module.exports = validateUserInput;
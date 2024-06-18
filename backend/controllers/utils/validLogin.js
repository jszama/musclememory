const bcrypt = require('bcryptjs');

const validLogin = async (user, password) => {
    return user && (await bcrypt.compare(password, user.password));
};

module.exports = validLogin;
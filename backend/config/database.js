const db = require('mongoose');

const start = () => {
    db.connect(process.env.DB_CON)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

module.exports = {
    start: start
};
const db = require('./database');
const server = require('./server');
require('dotenv').config();

const port = process.env.API_PORT;
db.start();

server.listen(port, () => console.log(`Server is running on port ${port}`));

const db = require('../config/database');
const server = require('../config/server');

const port = process.env.API_PORT;
db.start();

server.listen(port, () => console.log(`Server is running on port ${port}`));

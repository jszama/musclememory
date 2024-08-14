console.log(__dirname); // prints the directory of the current module
console.log(require.resolve('../middleWare/authMiddleware')); // prints the resolved path of the module

const db = require('./database');
const server = require('./server'); 
require('dotenv').config();

const port = process.env.API_PORT;
db.start();

server.listen(port, () => console.log(`Server is running on port ${port}`));

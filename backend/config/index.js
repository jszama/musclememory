const db = require('../config/database');
const app = require('../config/server');

const port = process.env.API_PORT;
db.start();

app.listen(port, () => console.log(`Server is running on port ${port}`));


const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

module.exports = {app: app};
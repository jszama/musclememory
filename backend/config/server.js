const express = require('express');
require('dotenv').config();
const cors = require('cors');

const exerciseRoutes = require('../routes/exerciseRoutes');
const userRoutes = require('../routes/userRoutes');
const workoutRoutes = require('../routes/workoutRoutes');
const completedWorkoutsRoutes = require('../routes/completedWorkouts');
const friendsRoutes = require('../routes/friendsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/completed_workouts', completedWorkoutsRoutes);
app.use('/api/friends', friendsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

module.exports = app;
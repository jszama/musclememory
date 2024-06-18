const express = require('express');
const router = express.Router();

const { getWorkouts, getWorkout, addWorkout } = require('../controllers/completedWorkoutsController.js');

router.get('/all/:id', getWorkouts);
router.post('/add', addWorkout);
router.get('/:id', getWorkout)

module.exports = router;
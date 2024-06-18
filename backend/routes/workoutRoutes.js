const express = require('express');
const router = express.Router();

const { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

router.get('/all/:id', getWorkouts);
router.post('/create', createWorkout);

router.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout);

module.exports = router;
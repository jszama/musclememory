const CompletedWorkout = require('../models/completedWorkoutModel');

const addWorkout = async (req, res) => {
    const { _id, name, exercises } = req.body;

    const workout = await CompletedWorkout 
    .create({
        _id,
        name,
        exercises
    });

    res.status(201).json(workout);
}

const getWorkouts = async (req, res) => {
    const workouts = await CompletedWorkout.find({ user: req.params.id });

    return res.json(workouts);
}

const getWorkout = async (req, res) => {
    const workout = await CompletedWorkout.findById(req.params.id);

    if (workout) {
        return res.json(workout);
    } else {
        res.status(404) && res.json({ message: 'Workout not found' });
    }
}

module.exports = {
    addWorkout,
    getWorkouts,
    getWorkout
};
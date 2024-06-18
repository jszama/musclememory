const Workout = require('../models/workoutModel');

const updateWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
        workout.name = req.body.name || workout.name;

        workout.exercises = req.body.exercises || workout.exercises;

        await workout.save();
        res.json(workout);
    } else {
        res.status(404);
        throw new Error('Workout not found');
    }
}

const createWorkout = async (req, res) => {
    const { user, name, exercises } = req.body;

    const workout = await Workout.create({
        user,
        name,
        exercises
    });

    res.status(201).json(workout);
}

const deleteWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
        await workout.deleteOne();
        res.json({ message: 'Workout removed' });
    } else {
        res.status(404); 
        throw new Error('Workout not found');
    }
}

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({ user: req.params.id });

    return res.json(workouts);
}

const getWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
        res.json(workout);
    } else {
        res.status(404);
        throw new Error('Workout not found');
    }
}

module.exports = {
    updateWorkout,
    createWorkout,
    deleteWorkout,
    getWorkouts,
    getWorkout
};
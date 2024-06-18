const Exercise = require('../models/exerciseModel');

const getExercises = async (req, res) => {
    const exercises = await Exercise.find();

    res.json(exercises);
};

const getExercise = async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).json({ message: 'Exercise not found' });
    }
};

module.exports = {
    getExercises,
    getExercise
};

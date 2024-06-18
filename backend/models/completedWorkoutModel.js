const mongoose = require('mongoose');

const completedWorkoutSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    exercises: {
        type: Array,
        required: true
    }
});

const CompletedWorkout = mongoose.model('CompletedWorkout', completedWorkoutSchema);

module.exports = CompletedWorkout;
const mongoose = require('mongoose');

const completedWorkoutSchema = new mongoose.Schema({
    user_id: {
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
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const CompletedWorkout = mongoose.model('CompletedWorkout', completedWorkoutSchema);

module.exports = CompletedWorkout;
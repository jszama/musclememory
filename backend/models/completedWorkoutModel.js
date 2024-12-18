const mongoose = require('mongoose');

const completedWorkoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const CompletedWorkout = mongoose.model('CompletedWorkout', completedWorkoutSchema);

module.exports = CompletedWorkout;
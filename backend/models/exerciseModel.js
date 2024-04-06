const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        enum: ['Abs', 'Biceps', 'Back', 'Chest', 'Forearms', 'Legs', 'Neck', 'Shoulders', 'Triceps', 'Other'],
        required: true
    },
    resistance: {
        type: String,
        enum: ['Barbell', 'Bodyweight', 'Cable','Dumbbell', 'Machine', 'Other'],
        required: true
    },
    angle: {    
        type: String,
        enum: ['Incline', 'Decline', 'Flat', 'Other'],
        required: true
    },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
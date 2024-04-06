const express = require('express');
const router = express.Router();

const { getExercises, getExercise, createExercise } = require('../controllers/exerciseController');

router.get('/', getExercises);
router.get('/:id', getExercise);
router.post('/', createExercise);

module.exports = router;
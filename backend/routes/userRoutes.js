const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getLoggedInUser } = require('../controllers/userController');
const { protect } =  require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', protect, getLoggedInUser); 

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const { registerUser, loginUser, getLoggedInUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', protect, getLoggedInUser); 
router.put('/profile', protect, upload.single('profilePic'), updateUserProfile);

module.exports = router;
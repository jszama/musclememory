const express = require('express');
const router = express.Router();

const { getFriends, sendRequest, deleteFriend, acceptRequest, declineRequest, getFriendRequests } = require('../controllers/friendsController');

router.get('/:id', getFriends);
router.get('/requests/:id', getFriendRequests);
router.post('/accept', acceptRequest);
router.post('/decline', declineRequest)
router.post('/add', sendRequest)
router.delete('/:id', deleteFriend);

module.exports = router;
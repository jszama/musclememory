const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    friend_id: {
        type: String,
        required: true
    }
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

module.exports = FriendRequest;
const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    friend_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;
const Friends = require('../../models/friendsModel');
const FriendRequest = require('../../models/friendRequestModel.js');

const alreadyFriends = async (user, friend) => {
    if (user == friend) {
        const error = new Error('Cannot add yourself as a friend');
        error.statusCode = 400;
        throw error;
    }

    const friends = await Friends.find({ $or: [{ user, friend }, { user: friend, friend: user }] });

    if (friends.length > 0) {
        const error = new Error('Friendship already exists');
        error.statusCode = 401;
        throw error;
    }

    const requests = await FriendRequest.find({ user_id: user, friend_id: friend });

    if (requests.length > 0) {
        const error = new Error('Friend request already sent');
        error.statusCode = 409;
        throw error;
    }
}

module.exports = alreadyFriends;

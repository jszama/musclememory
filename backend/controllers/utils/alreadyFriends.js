const Friends = require('../../models/friendsModel');
const FriendRequest = require('../../models/friendRequestModel.js');

const alreadyFriends = async (user, friend) => {
    if (user == friend) {
        const error = new Error('Cannot add yourself as a friend');
        error.statusCode = 400;
        throw error;
    }

    const isFriends = (await Friends.find({ $or: [{ user, friend }, { user: friend, friend: user }] })).length > 0;

    if (isFriends) {
        const error = new Error('Friendship already exists');
        error.statusCode = 401;
        throw error;
    }

    const requestAlreadySent = (await FriendRequest.find({ user_id: user, friend_id: friend })).length > 0;

    if (requestAlreadySent) {
        const error = new Error('Friend request already sent');
        error.statusCode = 409;
        throw error;
    }
}

module.exports = alreadyFriends;

const Friends = require('../models/friendsModel');
const FriendRequest = require('../models/friendRequestModel.js')
const asyncHandler = require('express-async-handler');
const { alreadyFriends, getUserById, getUserByName } = require('./utils/utils.js');

const getFriends = asyncHandler(async (req, res) => {
    const friends = await Friends.find({ $or: [{ user_id: req.params.id }, { friend_id: req.params.id }] });
    const n = friends.length;

    if (n === 0) return res.json([]);
    let data = [n];

    for (let i = 0; i < friends.length; i++) {
        let target = friends[i].user_id === req.params.id ? (friends[i].friend_id) : (friends[i].user_id).toString();
        data[i] = [target, await getUserById(target)];
    }

    res.json(data);
});

const getFriendRequests = asyncHandler(async (req, res) => {
    const requests = await FriendRequest.find({ friend_id: req.params.id });
    let n = requests.length;

    if (n === 0) return [];

    let data = [n];

    for (let i = 0; i < requests.length; i++) {
        let target = requests[i].user_id.toString();
        data[i] = [target, await getUserById(target)];
    }

    res.json(data);
});

const addFriend = asyncHandler(async (req, res) => {
    let { user, friend } = req.body;

    try {
        friend = await getUserByName(friend);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
            return;
    }

    try {
        await alreadyFriends(user, friend);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
        return;
    }

    try {
        if (await FriendRequest.findOne({ user_id: friend, friend_id: user })) {
            await acceptRequest({ body: { user: friend, friend: user } }, res);
        } else {
            const newFriendRequest = await FriendRequest.create({
                user_id: user,
                friend_id: friend
            });

            res.status(201).json(newFriendRequest);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const acceptRequest = asyncHandler(async (req, res) => {
    let { user, friend } = req.body
    
    const newFriend = await Friends.create({
        user_id: user,
        friend_id: friend
    });

    await FriendRequest.deleteOne({
        user_id: user,
        friend_id: friend
    });

    const converted = [newFriend.friend_id, getUserByName(newFriend.friend_id)];

    res.status(201).json(converted);
});

const declineRequest = asyncHandler(async (req, res) => {
    let { user, friend } = req.body
    
    FriendRequest.deleteOne({
        user_id: user,
        friend_id: friend
    })

    res.status(204).json({
        friend: friend,
        message: 'Friend request declined'
     });
});

const deleteFriend = asyncHandler(async (req, res) => {
    const friend = await Friends.findOne({ $or: [{ friend_id: req.params.id }, { user_id: req.params.id }] });

    if (friend) {
        await friend.deleteOne();
        res.status(204).json({ friend: friend, message: 'Friend removed' });
    } else {
        res.status(404).json({ message: 'Friend not found' });
    }
});

module.exports = { getFriends, addFriend, acceptRequest, declineRequest, deleteFriend, getFriendRequests };
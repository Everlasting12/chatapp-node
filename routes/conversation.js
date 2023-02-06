const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Conversation } = require("../model/conversation.model")


// new conversation

router.post("/", async (req, res) =>
{
    const { senderId, receiverId } = req.body;
    const conversation = new Conversation({
        members: [mongoose.Types.ObjectId(senderId), mongoose.Types.ObjectId(receiverId)]
    })

    try
    {
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    } catch (error)
    {
        console.log(error);
        res.status(500).json(error)
    }
})

// get conversations with userid

router.get("/:userid", async (req, res) =>
{
    try
    {
        const { userid } = req.params;
        const conversations = await Conversation.aggregate([
            {
                $match: {
                    members: { $in: [mongoose.Types.ObjectId(userid)] }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "membersData"
                }
            },
            {
                $project: {
                    "_id": 1,
                    "members": 1,
                    "created_at": 1,
                    "updated_at": 1,
                    "membersData._id": 1,
                    "membersData.username": 1,
                    "membersData.firstname": 1,
                    "membersData.lastname": 1,
                    "membersData.phone": 1,
                    "membersData.email": 1,
                    "membersData.avatar": 1,
                    "membersData.user_tags": 1,
                    "membersData.created_at": 1,
                    "membersData.updated_at": 1,
                }
            }
        ])
        res.status(200).json({ count: conversations.length, conversations });
    } catch (error)
    {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;

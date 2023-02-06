const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Message } = require("../model/message.model")


// add message
router.post("/", async (req, res) =>
{
    const { conversation_id, text, sender } = req.body
    try
    {
        const newMessage = new Message({
            conversation_id: mongoose.Types.ObjectId(conversation_id),
            sender: mongoose.Types.ObjectId(sender),
            text
        });
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch (error)
    {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get("/:conversationId", async (req, res) =>
{
    try
    {
        const messages = await Message.find({ conversation_id: mongoose.Types.ObjectId(req.params.conversationId) })
        res.status(200).json(messages);

    } catch (error)
    {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;

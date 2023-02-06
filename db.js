const mongoose = require("mongoose");

module.exports = async function(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
        console.log("db connected")
    } catch (error) {
        console.log("db failed to connect", error)
    }
}
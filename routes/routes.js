const signupRouter = require("./signup");
const loginRouter = require("./login");
const messageRouter = require("./message");
const conversationRouter = require("./conversation");

function getAllRoutes(app) {

    //routes for Users
    app.use("/api/users", signupRouter);

    //routes for Logins
    app.use("/api/login", loginRouter);

    //routes for conversation
    app.use("/api/conversation", conversationRouter);

    //routes for message
    app.use("/api/message", messageRouter);

}

module.exports = { getAllRoutes };
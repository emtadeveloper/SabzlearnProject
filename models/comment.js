const mongoose = require("mongoose");
const schema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.objectId,
        ref: "Course",
        required: true
    },
    creator: {
        type: mongoose.Types.objectId,
        ref: "User",
        required: true
    },
    isActive: {
        type: Number,
        default: 0
    },
    score: {
        type: Number
    },
    isAnswer: {
        type: Number,
        required: true
    },
    mainCommentID: {
        type: mongoose.Types.objectId,
        ref: "Comment"
    }
}, {timestamps: true})

const model = mongoose.model("Comment", schema);
module.exports = model
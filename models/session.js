const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String, required: true
    }, time: {
        type: String, required: true
    }, free: {
        type: Number, required: true // 0 ( false - not free ) || 1 ( true - free )
    }, video: {
        type: String, required: true
    }, course: {
        type: mongoose.Types.objectId, ref: "Course"
    }
}, {timestamps: true});

const model = mongoose.model("Session");
module.exports = model

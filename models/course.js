const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    support: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String, // complete - presel
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    categoryID: {
        type: mongoose.Types.objectId,
        required: true,
        ref: "Category"
    },
    creator: {
        type: mongoose.Types.objectId,
        ref: "User"
    }
}, {timeStamp: true})

schema.virtuals("sessions", {
    ref: "Session",
    localField: "_id",
    foreignField: "course"
})

schema.virtuals("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course"
})

const model = mongoose.model("Course", schema);
module.exports = model
const courseModel = require("./../../models/course");
const sessionModel = require("./../../models/session")
const mongoose = require("mongoose");

exports.create = async (req, res) => {
    const {name, description, support, href, price, status, discount, categoryID} = req.body
    const course = await courseModel.create({
        name,
        description,
        support,
        href,
        price,
        status,
        discount,
        categoryID,
        creator: req.file._id,
        cover: req.file.filename
    })
    const mainCourse = await courseModel.findById(course._id).populate('creator', "-password");
    return res.status(201).json(mainCourse)
}

exports.createSession = async (req, res) => {
    const {title, free, time} = req.body;
    const session = await sessionModel.create({
        title,
        time,
        free,
        video: "video.mp4",
        course: id
    })
    return res.status(201).json(session);
}

exports.getAllSessions = async (req, res) => {
    const sessions = await sessionModel.find({}).populate("course", "name").lean();
    return res.json(sessions)
}

exports.getSessionInfo = async (req, res) => {
    const course = await courseModel.findOne({href: req.params.href}).lean();
    const session = await sessionModel.findOne({_id: req.params.sessionID})
    const sessions = await sessionModel.find({course: course._id});
    return res.json({sessions, session})
}
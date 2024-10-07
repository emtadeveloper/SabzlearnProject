const express = require("express");
const multer = require("multer")

const courseController = require("./../../controllers/v1/course")
const authMiddleware = require("./../../middlewares/auth")
const isAdminMiddleware = require("./../../middlewares/isAdmin")

const router = express.Router();
const multerStorage = require("./../../utils/uploader")

router.route('/').post(multer({
    storage: multerStorage,
    limit: {fileSize: 1000000000000000}
}).single("cover"), authMiddleware, isAdminMiddleware, courseController.create)


router.route('/:id/sessions').post(multer({
    storage: multerStorage,
    limit: {fileSize: 1000000000000000}
}).single("video"), authMiddleware, isAdminMiddleware, courseController.createSession)

router.route("/sessions").get(authMiddleware, isAdminMiddleware, courseController.getAllSessions);

router.route("/:href/:sessionID").get(courseController.getSessionInfo)


module.exports = router;
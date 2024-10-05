const express = require("express");

const controller = require("../../controllers/v1/auth");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/me", controller.getMe);

// getMe اطلاعات صاحب توکن رو بهش می دهیم

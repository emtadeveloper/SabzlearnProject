const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../../models/user");

const registerValidator = require("./../../validators/register");

exports.register = async (req, res) => {
    const validateResult = registerValidator(req.body);
    if (validateResult !== true) {
        return res.status(422).json(validateResult);
    }
    const {username, name, email, password, phone} = req.body;
    const isUserExists = await userModel.findOne({
        $or: [{username}, {email}],
    });
    if (isUserExists) {
        return res.status(409).json({
            message: "username or email is duplicated",
        });
    }
    const countOfUsers = await userModel.countDocuments();
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({
        username,
        name,
        email,
        phone,
        password: hashPassword,
        role: countOfUsers > 0 ? "USER" : "ADMIN",
    });

    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password")
    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30 day"})
    return res.status(201).json({user, accessToken})
};

exports.login = async (req, res) => {
};

exports.getMe = async (req, res) => {
};

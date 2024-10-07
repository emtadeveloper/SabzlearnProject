const userModel = require('../../models/user');
const banUserModel = require('../../models/ban-phone');
const mongoose = require("mongoose");

exports.banUser = async (req, res) => {
    const mainUser = await userModel.findOne({_id: req.params.id}).lean();
    const banUserResult = await banUserModel.create({phone: mainUser.phone});
    console.log(mainUser, 'mainUser', banUserResult, 'banUserResult')

    if (banUserModel) {
        return res.status(200).json({message: "User ban successfully :))"})
    }
    return res.status(500).json({message: "Server  Error !!"})
};

exports.getAll = async (req, res) => {
    const users = await userModel.find({});
    return res.json(users);
};

exports.removeUser = async (req, res) => {
    const isValidUserID = mongoose.Types.ObjectID.isValid(req.params.id);
    if (isValidUserID) {
        return res.status(409).json({
            message: "User ID is not valid !!"
        })
    }
    const removeUser = await userModel.findByIdAndDelete({_id: req.params.id})

    if (!removeUser) {
        return res.status(404).json({
            message: "there is no user !!"
        })
    }
    return res.status(200).json({
        message: "User Removed Successfully :))"
    })


}
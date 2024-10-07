const categoryModel = require("./../../models/category")
const mongoose = require("mongoose");

exports.create = async (req, res) => {
    const {title, href} = req.body
    const category = await categoryModel.create({title, href})
    return res.status(201).json(category)
}

exports.getAll = async (req, res) => {
    const categories = await categoryModel.find({});
    return res.json(categories)
}

exports.remove = async (req, res) => {
    const {id} = req.params;
    const isValidID = mongoose.Types.objectId.isValid(id);
    if (!isValidID) {
        return res.status(409).json({
            message: "Category ID is not valid"
        })
    }
    const deleteCategory = await categoryModel.findByIdAndDelete({_id: id})
    return res.json(deleteCategory)

}

exports.update = async (req, res) => {
    const {title, href} = req.body
    const isValidID = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidID) {
        return res.status(409).json({
            message: "Category ID is not valid !!"
        })
    }

    const updateCategory = await categoryModel.findByIdAndUpdate({_id: req.params.id}, {title, href});
    if (!updateCategory) {
        return res.status(404).json({message: "Category not found !!"})
    }
    return res.json(updateCategory)

}
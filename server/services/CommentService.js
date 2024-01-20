const CommentModel = require("../models/Comment");

exports.getAllComments = async() => {
    return await CommentModel.find();
}

exports.createComment = async(comment) => {
    return await CommentModel.create(comment);
}

exports.getCommentById = async(id) => {
    return await CommentModel.findById(id);
}

exports.updateComment = async(id, comment) => {
    return await CommentModel.findByIdAndUpdate(id, comment);
}

exports.deleteComment = async(id) => {
    return await CommentModel.findByIdAndDelete(id);
}
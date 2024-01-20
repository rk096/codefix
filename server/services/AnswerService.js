const AnswerModel = require("../models/Answer");

exports.getAllAnswers = async() => {
    return await AnswerModel.find();
}

exports.createAnswer = async(answer) => {
    return await AnswerModel.create(answer);
}

exports.getAnswerById = async(id) => {
    return await AnswerModel.findById(id);
}

exports.updateAnswer = async(id, answer) => {
    return await AnswerModel.findByIdAndUpdate(id, answer);
}

exports.deleteAnswer = async(id) => {
    return await AnswerModel.findByIdAndDelete(id);
}
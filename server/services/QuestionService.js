const QuestionModel = require("../models/Question");

exports.getAllQuestions = async() => {
    return await QuestionModel.find();
}

exports.createQuestion = async(question) => {
    return await QuestionModel.create(question);
}

exports.getQuestionById = async(id) => {
    return await QuestionModel.findById(id);
}

exports.updateQuestion = async(id, question) => {
    return await QuestionModel.findByIdAndUpdate(id, question);
}

exports.deleteQuestion = async(id) => {
    return await QuestionModel.findByIdAndDelete(id);
}
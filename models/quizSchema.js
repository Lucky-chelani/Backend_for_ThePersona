const mongoose = require('mongoose');
const quizSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, 'title is required!'], trim: true },
        questions: [{ question: String, options: [String], answer: String }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }
       
);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
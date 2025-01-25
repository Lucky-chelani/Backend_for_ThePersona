const mongoose = require('mongoose');
const quizSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, 'title is required!'], trim: true },
        questions: [{ question: String, options: [String], answer: String }],
        duration: { 
            type: Number, // Duration in minutes
            required: [true, 'Duration is required!'] 
        },
        createdBy: { type: String ,  required: true }
    }
       
);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
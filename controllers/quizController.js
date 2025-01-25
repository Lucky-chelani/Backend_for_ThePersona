

const Leaderboard = require('../models/leaderboardModel');
const Quiz = require('../models/quizSchema');

exports.createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const quiz = new Quiz({ title, questions, createdBy: req.user._id });
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.attendQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.answer === answers[index]) {
                score++;
            }
        });

        const leaderboard = await Leaderboard.findOne({ quiz: quizId });
        if (leaderboard) {
            leaderboard.scores.push({ user: req.user._id, score });
            await leaderboard.save();
        } else {
            const newLeaderboard = new Leaderboard({
                quiz: quizId,
                scores: [{ user: req.user._id, score }]
            });
            await newLeaderboard.save();
        }

        res.status(200).json({ message: 'Quiz attended successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
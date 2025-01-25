

const Leaderboard = require('../models/leaderboardModel');
const Quiz = require('../models/quizSchema');

exports.createQuiz = async (req, res) => {
    try {
        const { title, questions,username, duration  } = req.body;
        const quiz = new Quiz({ title, questions, duration, createdBy: username});
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
        const { score, userId } = req.body;
       

        const leaderboard = await Leaderboard.findOne({ quiz: quizId });
        if (leaderboard) {
            leaderboard.scores.push({ user: userId, score });
            await leaderboard.save();
        } else {
            const newLeaderboard = new Leaderboard({                                                                                                                                                                                         
                quiz: quizId,
                scores: [{ user: userId, score }]
            });
            await newLeaderboard.save();
        }

        res.status(200).json({ message: 'Quiz attended successfully', score });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.fetchAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().select('title _id questions');
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
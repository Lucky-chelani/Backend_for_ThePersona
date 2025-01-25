const Leaderboard = require("../models/leaderboardModel");


exports.getLeaderboard = async (req, res) => {
    try {
        const { quizId } = req.params;
        const leaderboard = await Leaderboard.findOne({ quiz: quizId }).populate('scores.user', 'username');
        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
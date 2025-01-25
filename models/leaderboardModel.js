const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    scores: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, score: Number }]
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;

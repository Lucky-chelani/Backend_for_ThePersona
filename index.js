const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const quizRoutes = require('./routers/quizRoutes');
const LeaderboardRoutes = require('./routers/leaderboardRoues');

const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.Dburl)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/quizzes', quizRoutes);
app.use('/api/leaderboard',LeaderboardRoutes); 
app.get('/', (req, res) => {
	res.json({ message: 'Hello from the server' });
});

app.listen(process.env.PORT, () => {
	console.log('listening...');
});

const express = require('express');
const { createQuiz, attendQuiz, fetchAllQuizzes } = require('../controllers/quizController');
const { isAdmin } = require('../middlewares/isadmin');


const router = express.Router();

router.post('/create', isAdmin, createQuiz);
router.post('/attend/:quizId', attendQuiz);
router.get('/',  fetchAllQuizzes);

module.exports = router;
const express = require('express');
const { createQuiz, attendQuiz, fetchAllQuizzes } = require('../controllers/quizController');
const { isAdmin } = require('../middlewares/isadmin');
const { identifier } = require('../middlewares/identification');


const router = express.Router();

router.post('/create', isAdmin, createQuiz);
router.post('/attend/:quizId',identifier, attendQuiz);
router.get('/', identifier, fetchAllQuizzes);

module.exports = router;
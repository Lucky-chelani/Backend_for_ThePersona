const express = require('express');
const { createQuiz, attendQuiz } = require('../controllers/quizController');
const { isAdmin } = require('../middlewares/isadmin');


const router = express.Router();

router.post('/create', isAdmin, createQuiz);
router.post('/attend/:quizId', attendQuiz);

module.exports = router;
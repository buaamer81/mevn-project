// index.js
const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const Quiz = require('./mongdb'); // Import the Quiz model

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
// Define routes

// Route for fetching quiz questions
app.get('/api/questions', async (req, res) => {
    // Your logic to fetch quiz questions goes here
    try {
        const questions = await Quiz.find();
        res.json({ questions });
    } catch (err) {
        console.error('Error fetching quiz questions', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for submitting quiz answers
app.post('/api/submit', (req, res) => {
    const { answers } = req.body; // Assuming answers are submitted as an array in the request body
    // Your logic to evaluate submitted answers goes here
    // Compare submitted answers with correct answers and calculate score
    const score = calculateScore(answers); // Implement calculateScore function as per your logic
    res.json({ score });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to calculate score (example)
function calculateScore(answers) {
    let score = 0;
    const correctAnswers = [
        { questionId: 1, answer: "Paris" },
        { questionId: 2, answer: "Mars" },
        { questionId: 3, answer: "H2O" },
        { questionId: 4, answer: "William Shakespeare" },
        { questionId: 5, answer: "Blue Whale" },
        { questionId: 6, answer: "Mount Everest" },
        { questionId: 7, answer: "Leonardo da Vinci" },
        { questionId: 8, answer: "Au" }
        // Add correct answers for more questions
    ];
    answers.forEach(answer => {
        const correctAnswer = correctAnswers.find(a => a.questionId === answer.questionId);
        if (correctAnswer && correctAnswer.answer === answer.answer) {
            score++;
        }
    });
    return score;
}

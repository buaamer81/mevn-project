// MongoDB Schema
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    id: Number,
    question: String,
    options: [String],
    answer: String
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Seed data if needed
        seedDatabase();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// Seed Data
async function seedDatabase() {
    const quizData = [
        { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
        { id: 2, question: "Which planet is known as the Red Planet?", options:["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        {
            id: 3,
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "NaCl", "O2"],
            answer: "H2O"
        },
        {
            id: 4,
            question: "Whohjk wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
            answer: "William Shakespeare"
        },
        {
            id: 5,
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            answer: "Blue Whale"
        },
        {
            id: 6,
            question: "What is the tallest mountain in the world?",
            options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Denali"],
            answer: "Mount Everest"
        },
        {
            id: 7,
            question: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            answer: "Leonardo da Vinci"
        },
        {
            id: 8,
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Cu"],
            answer: "Au"
        }
        // Insert other quiz questions here
    ];

    try {
        await Quiz.insertMany(quizData);
        console.log('Quiz data seeded successfully');
    } catch (err) {
        console.error('Error seeding quiz data', err);
    }
}

module.exports = Quiz;

const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true
    },
    translation: {
        type: String,
        required: true,
        trim: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    exampleSentence: {
        type: String,
        trim: true
    },
    culturalNote: {
        type: String,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    pronunciation: {
        type: String,
        trim: true
    },
    memoryTip: {
        type: String,
        trim: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    lastReviewed: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vocabulary', vocabularySchema); 
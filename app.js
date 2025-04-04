const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/language_learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Import Vocabulary model
const Vocabulary = require('./models/Vocabulary');

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Language Learning App',
        message: 'This web application was created to fulfill Web Technology module\'s requirements and does not represent an actual company or service'
    });
});

// Vocabulary routes
app.get('/vocabulary', async (req, res) => {
    try {
        const vocabularies = await Vocabulary.find().sort({ dateAdded: -1 });
        res.render('vocabulary/index', { vocabularies });
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

app.get('/vocabulary/new', (req, res) => {
    res.render('vocabulary/new', { vocabulary: null });
});

app.post('/vocabulary', async (req, res) => {
    try {
        const newItem = new Vocabulary({
            ...req.body,
            dateAdded: new Date(),
            lastReviewed: new Date()
        });
        await newItem.save();
        res.redirect('/vocabulary');
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

app.get('/vocabulary/:id/edit', async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findById(req.params.id);
        if (!vocabulary) {
            return res.status(404).render('error', { error: 'Vocabulary not found' });
        }
        res.render('vocabulary/edit', { vocabulary });
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

app.put('/vocabulary/:id', async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findByIdAndUpdate(req.params.id, {
            ...req.body,
            lastReviewed: new Date()
        }, { new: true });
        if (!vocabulary) {
            return res.status(404).render('error', { error: 'Vocabulary not found' });
        }
        res.redirect('/vocabulary');
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

app.delete('/vocabulary/:id', async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
        if (!vocabulary) {
            return res.status(404).render('error', { error: 'Vocabulary not found' });
        }
        res.redirect('/vocabulary');
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
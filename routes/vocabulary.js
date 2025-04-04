const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Vocabulary = require('../models/Vocabulary');

// Validation middleware
const validateVocabulary = [
    body('word').trim().notEmpty().withMessage('Word is required'),
    body('translation').trim().notEmpty().withMessage('Translation is required'),
    body('language').trim().notEmpty().withMessage('Language is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level')
];

// GET all vocabulary items
router.get('/', async (req, res) => {
    try {
        const vocabularies = await Vocabulary.find().sort({ dateAdded: -1 });
        res.render('vocabulary/index', { vocabularies });
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

// GET form to create new vocabulary
router.get('/new', (req, res) => {
    res.render('vocabulary/new');
});

// POST create new vocabulary
router.post('/', validateVocabulary, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('vocabulary/new', {
            errors: errors.array(),
            vocabulary: req.body
        });
    }

    try {
        const vocabulary = new Vocabulary(req.body);
        await vocabulary.save();
        res.redirect('/vocabulary');
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

// GET edit form
router.get('/:id/edit', async (req, res) => {
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

// PUT update vocabulary
router.put('/:id', validateVocabulary, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('vocabulary/edit', {
            errors: errors.array(),
            vocabulary: req.body
        });
    }

    try {
        const vocabulary = await Vocabulary.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastReviewed: Date.now() },
            { new: true }
        );
        if (!vocabulary) {
            return res.status(404).render('error', { error: 'Vocabulary not found' });
        }
        res.redirect('/vocabulary');
    } catch (err) {
        res.status(500).render('error', { error: err });
    }
});

// DELETE vocabulary
router.delete('/:id', async (req, res) => {
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

module.exports = router; 
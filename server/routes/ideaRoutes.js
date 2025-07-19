const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitIdea, getPendingIdeas, approveIdea, rejectIdea, getApprovedIdeas, deleteIdea, getApprovedIdea } = require('../controllers/ideaSubmission');

// User submits idea
router.post('/submit-idea', upload.single('image'), submitIdea);

router.get('/pending-ideas', getPendingIdeas);

router.patch('/approve-idea/:id', approveIdea);

router.delete('/reject-idea/:id', rejectIdea);

router.get('/approved-ideas', getApprovedIdeas);

router.delete('/delete-idea/:id', deleteIdea);

router.get('/approved-idea/:id', getApprovedIdea);

module.exports = router;

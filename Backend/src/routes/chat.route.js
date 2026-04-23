const express = require('express');
const router = express.Router();
const { chatBot } = require('../controllers/chat.controller');

// POST /api/v1/chat
router.post('/', chatBot);

module.exports = router;


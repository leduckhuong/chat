const express = require('express');
const router = express.Router();

const meController = require('../../app/controllers/Me');

router.get('/', meController.index);

module.exports = router;
const express = require('express');
const router = express.Router();
const indexController = require('../../app/controllers/Index.controller');

router.get('/', indexController.index);

module.exports = router;
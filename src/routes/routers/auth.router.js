const express = require('express');
const router = express.Router();

const authController = require('../../app/controllers/Auth.controller');

router.get('/', authController.index);

module.exports = router;
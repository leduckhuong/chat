const express = require('express');
const router = express.Router();

const logoutController = require('../../app/controllers/Logout.controller');

router.get('/', logoutController.logout);

module.exports = router;
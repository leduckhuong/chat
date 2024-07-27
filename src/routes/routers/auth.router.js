const express = require('express');
const router = express.Router();

const authController = require('../../app/controllers/Auth.js');

router.get('/', authController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
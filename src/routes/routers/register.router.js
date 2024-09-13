const express = require('express');
const router = express.Router();

const registerController = require('../../app/controllers/Register.controller');

router.get('/', registerController.index);
router.post('/', registerController.register);
router.get('/verify', registerController.verifyUI);
router.post('/verify', registerController.verify);

module.exports = router;
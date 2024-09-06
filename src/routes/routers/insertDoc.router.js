const express = require('express');
const router = express.Router();

const insertDocController = require('../../app/controllers/InsertDoc.controller');

router.get('/', insertDocController.index);
router.post('/', insertDocController.insert);

module.exports = router;
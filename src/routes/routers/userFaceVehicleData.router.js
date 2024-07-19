const express = require('express');
const router = express.Router();

const userFaceVehicleData = require('../../app/controllers/UserFaceVehicleData');

router.post('/', userFaceVehicleData.save);

module.exports = router;
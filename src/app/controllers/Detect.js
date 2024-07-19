const userFaceVehicleData = require('../models/UserFaceVehicleData.model');

class DetectModel {
    index (req, res, next) {
        res.json(req.body);
    }
}

module.exports = new DetectModel();
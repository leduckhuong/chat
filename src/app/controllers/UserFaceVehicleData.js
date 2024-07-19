const UserFaceVehicleData = require('../models/UserFaceVehicleData.model');

class UserFaceVehicleDataModel {
    save(req, res, next) {
        const data = req.body;
        const newRecord = new UserFaceVehicleData(data);
        newRecord.save()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(422).json(err)
            })
    }
}

module.exports = new UserFaceVehicleDataModel();
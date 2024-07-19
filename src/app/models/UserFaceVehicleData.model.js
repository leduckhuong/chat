const mongoose = require('mongoose');

const UserFaceVehicleDataSchema = mongoose.Schema({
    face: { type: String, require },
    vehicle: { type: String, default: 'not null' }
});

module.exports = mongoose.model('UserFaceVehicleData', UserFaceVehicleDataSchema);
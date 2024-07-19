const index = require('./routers/index.router');
const auth = require('./routers/auth.router');
const me = require('./routers/me.router');
const userFaceVehicleData = require('./routers/userFaceVehicleData.router');

function route(app) {
    app.use('/', index);
    app.use('/auth', auth);
    app.use('/me', me);
    app.use('/userFaceVehicleData', userFaceVehicleData);
}

module.exports = route;
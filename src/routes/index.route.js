const index = require('./routers/index.router');
const auth = require('./routers/auth.router');
const me = require('./routers/me.router');
const userFaceVehicleData = require('./routers/userFaceVehicleData.router');

const errorHandler = require('../app/middlewares/errorHandler');

function route(app) {
    app.use('/', index);
    app.use('/auth', auth);
    app.use('/me', me);
    app.use('/userFaceVehicleData', userFaceVehicleData);
    app.use(errorHandler);
}

module.exports = route;
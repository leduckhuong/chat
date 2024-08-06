const axios = require('axios');

const index = require('./routers/index.router');

const errorHandler = require('../app/middlewares/errorHandler');

function route(app) {
    app.use('/', index);
    app.use(errorHandler);
}

module.exports = route;
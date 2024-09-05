const index = require('./routers/index.router');
const auth = require('./routers/auth.router');

const errorHandler = require('../app/middlewares/errorHandler');

function route(app) {
    app.use('/', index);
    app.use('/auth', auth);
    app.use(errorHandler);
}

module.exports = route;
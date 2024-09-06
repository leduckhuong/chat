const index = require('./routers/index.router');
const login = require('./routers/login.router');
const register = require('./routers/register.router');
const insertDoc = require('./routers/insertDoc.router');

const errorHandler = require('../app/middlewares/errorHandler');

function route(app) {
    app.use('/', index);
    app.use('/login', login);
    app.use('/register', register);
    app.use('/insertDoc', insertDoc);
    app.use(errorHandler);
}

module.exports = route;
const axios = require('axios');

const index = require('./routers/index.router');

const errorHandler = require('../app/middlewares/errorHandler');

function route(app) {
    app.use('/', index);
    app.use('/test', async (req, res, next) => {
        try {
            const response = await axios.get(`${process.env.AUTH_SERVER}/test`, { withCredentials: true });
            res.json(response.data);
        } catch (error) {
            console.log(error);
            res.send('Error');
        }
    });
    app.use(errorHandler);
}

module.exports = route;
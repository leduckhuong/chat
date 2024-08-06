const axios = require('axios');

const newAccessToken = require('../utils/newAccessToken.util');

const getData = require('../utils/getData.util');

module.exports = async function errorHandler (err, req, res, next) {
    console.log(req.url);
    switch (err.status) {
        case 401:
            console.log('Is errorHandle 401');
            return res.send('Is errorHandle 401');            
        case 403:
            console.log('Is errorHandle 403');
            return res.send('Is errorHandle 403');            
        case 404:
            console.log('Is errorHandle 404');
            return res.send('Is errorHandle 404');    
        case 409:
            console.log('Is errorHandle 409');
            return res.send('Is errorHandle 409');    
        case 500:
            console.log('Is errorHandle 500');
            return res.send('Is errorHandle 500');            
        default:
            console.log(err);
            return res.send('Error');
    }
}

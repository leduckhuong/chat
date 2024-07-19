const cryptojs = require('crypto-js');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { compare } = require('../middlewares/funcs.middleware');

const UserModel = require('../models/User.model');

class Auth {
    index (req, res) {
        res.render('auth', {
            isAuth: true
        });
    }
    register(req, res) {
        const userData = req.body;
        axios.post(`${process.env.AUTH_SERVER}/register`, userData)
            .then(response => {
                const accessToken = response.data.accessToken;
                res.cookie('act', accessToken, {
                    signed: true,
                    expires: new Date( Date.now() + 8*3600000 )
                })
                .redirect('/');
            })
            .catch(error => {
                console.log('Error: ', error);
                res.sendStatus(409);
            })
    }
    login(req, res) {
        const userData = req.body;
        axios.post(`${process.env.AUTH_SERVER}/login`, userData)
            .then(response => {
                const accessToken = response.data.accessToken;
                res.cookie('act', accessToken, {
                    signed: true,
                    expires: new Date( Date.now() + 8*3600000 )
                })
                .redirect('/');
            })
            .catch(error => {
                console.log('Error: ', error);
                res.sendStatus(401);
            })
    }
    logout(req, res) {
        axios.post(`${process.env.AUTH_SERVER}/logout`, userData);
        res.clearCookie('act')
        .redirect('/login');
    }
}

module.exports = new Auth();
const axios = require('axios');
const errorFlow = require('../utils/errorFlow.util');
const getLanguage = require('../utils/getLanguage.util');

class Register {
    async index(req, res) {
        let langCode = req.cookies.userLang;
        try {
            let languages = await getLanguage(langCode);
            res.render('index', {
                languages,
                isRegister: true
            });
        } catch (error) {
            res.send('Error!');
        }
    }
    async register(req, res) {
        const userData = req.body;
        if(!userData.email || !userData.pass) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const response = await axios.post(`${process.env.AUTH_SERVER}/register`, userData);
            return res.cookie('status', 'register-success', {maxAge: 2000})
            .cookie('uid', response.data.uid, { signed: true })
            .cookie('exp', response.data.expires, {maxAge: 120000})
            .redirect('/register/verify');
        } catch (error) {
            errorFlow(error, next);
        }
    }
    async verifyUI (req, res, next) {
        try {
            let langCode = req.cookies.userLang;
            let languages = await getLanguage(langCode);
            const exp = new Date(req.cookies.exp);
            if(!exp || exp == 'Invalid Date') return res.render('index', { languages, isVerify: true });
            const currentTime = new Date();
            const timeDifference = exp - currentTime;
            const time = Math.floor(timeDifference / 1000);
            return res.render('index', { 
                languages, 
                isVerify: true,
                time
            });
        } catch (error) {
            console.log(error);
            res.send("Error!");
        }
    }
    async verify (req, res, next) {
        const id = req.signedCookies.uid;
        if (!id) return res.redirect('auth');
        try {
            const data = { uid: id, code: req.body.code };
            const response = await axios.post(`${process.env.AUTH_SERVER}/verify`, data);
            const {uid, accessToken} = response.data;
            const cookieOptions = { signed: true, maxAge: 3600000 };
            return res.cookie('act', accessToken, cookieOptions)
            .cookie('uid', uid, cookieOptions)
            .redirect('/');
        } catch (error) {
            errorFlow(error, next);
        }
    }
}

module.exports = new Register();
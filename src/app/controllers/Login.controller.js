const axios = require('axios');
const errorFlowUtil = require('../utils/errorFlow.util');
const getLanguageUtil = require('../utils/getLanguage.util');

class Login {
    async index(req, res) {
        let langCode = req.cookies.userLang;
        try {
            let languages = await getLanguageUtil(langCode);
            res.render('index', {
                languages,
                isLogin: true
            });
        } catch (error) {
            errorFlowUtil(error, next);
        }
    }
    async login(req, res, next) {
        const userData = req.body;
        if(!userData.email || !userData.pass) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const response = await axios.post(`${process.env.AUTH_SERVER}/login`, userData);
            const {uid, accessToken} = response.data;
            const cookieOptions = { signed: true, maxAge: 3600000 };
            return res.cookie('act', accessToken, cookieOptions)
            .cookie('uid', uid, cookieOptions)
            .redirect('/');
        } catch (error) {
            errorFlowUtil(error, next);
        }
    }
}

module.exports = new Login();
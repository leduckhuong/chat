const axios = require('axios');
const createError = require('http-errors');

class Auth {
    index (req, res) {
        const status = req.cookies.status;
        if(status) return res.render('auth', { isAuth: true, status });
        return res.render('auth', { isAuth: true });
    }
    async register(req, res, next) {
        const userData = req.body;
        if(!userData.email || !userData.password) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const response = await axios.post(`${process.env.AUTH_SERVER}/register`, userData);
            const {uid, accessToken} = response.data;
            const cookieOptions = {
                signed: true,
                maxAge: 3600000
            };
            return res.cookie('act', accessToken, cookieOptions)
            .cookie('uid', uid, cookieOptions)
            .redirect('/');
        } catch (error) {
            if (error.response) {
                next(createError(error.response.status, error.response.data.message));
            } else {
                next(createError(500, 'Internal server error'));
            }
        }
    }
    async login(req, res) {
        const userData = req.body;
        if(!userData.email || !userData.password) return res.status(400).json({ message: 'Invalid request data' });
        try {
            const response = await axios.post(`${process.env.AUTH_SERVER}/login`, userData);
            const {uid, accessToken} = response.data;
            const cookieOptions = {
                signed: true,
                maxAge: 3600000
            };
            return res.cookie('act', accessToken, cookieOptions)
            .cookie('uid', uid, cookieOptions)
            .redirect('/');
        } catch (error) {
            if (error.response) {
                next(createError(error.response.status, error.response.data.message));
            } else {
                next(createError(500, 'Internal server error'));
            }
        }
    }
    async logout(req, res, next) {
        const act = req.signedCookies.act;
        if(!act) res.redirect('/login');  
        try {
            await axios.delete(`${process.env.AUTH_SERVER}/logout`, { headers: { 'Authorization': `Bearer ${act}` } })
            return res.clearCookie('act')
            .clearCookie('uid')
            .redirect('/auth');
        } catch (error) {
            if (error.response) {
                next(createError(error.response.status, error.response.data.message));
            } else {
                next(createError(500, 'Internal server error'));
            }
        }
    }
}

module.exports = new Auth();
const axios = require('axios');

const errorFlowUtil = require('../utils/errorFlow.util');
const newAccessTokenUtil = require('../utils/newAccessToken.util');

class Logout {
    async logout(req, res, next) {
        const act = req.signedCookies.act;
        const uid = req.signedCookies.uid;
        if(!act || !uid) res.redirect('/login');  
        try {
            const newAccessToken = await newAccessTokenUtil(uid);
            await axios.delete(`${process.env.AUTH_SERVER}/logout`, { headers: { 'Authorization': `Bearer ${newAccessToken}` } })
            res.clearCookie('act');
            res.clearCookie('uid');
            return res.redirect('/login');
        } catch (error) {
            errorFlowUtil(error, next);
        }
    }
}

module.exports = new Logout();
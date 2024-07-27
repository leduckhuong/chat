const axios = require('axios');
const createError = require('http-errors');

class Me {
    async index (req, res, next) {
        const act = req.signedCookies.act;
        if(!act) {
            return res.redirect('/login');
        }
        try {
            const response = await axios.get(`${process.env.AUTH_SERVER}/data`, { headers: { 'Authorization': `Bearer ${act}` }});
            const user = response.data; 
            return res.render('me', { user });
        } catch (error) {
            if (error.response) {
                next(createError(error.response.status, error.response.data.message));
            } else {
                next(createError(500, 'Internal server error'));
            }
        }
    }
    update (req, res) {
        
    }
}

module.exports = new Me();
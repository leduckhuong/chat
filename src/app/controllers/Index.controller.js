const axios = require('axios');
const createError = require('http-errors');
const getLanguage = require('../utils/getLanguage.util');


class IndexModel {
    async index (req, res, next) {
        let langCode = req.cookies.userLang;
        try {
            let languages = await getLanguage(langCode);
            res.render('index', {
                languages
            });
        } catch (error) {
            res.send('Error!');
        }
        // const act = req.signedCookies.act;
        // if(!act) return res.render('index', { data: null });
        // try {
        //     const response = await axios.get(`${process.env.AUTH_SERVER}/data`, { headers: { 'Authorization': `Bearer ${act}` } });
        //     const user = response.data; 
        //     return res.render('index', { user });
        // } catch (error) {
        //     if (error.response) {
        //         next(createError(error.response.status, error.response.data.message));
        //     } else {
        //         next(createError(500, 'Internal server error'));
        //     }
        // }
    }
}

module.exports = new IndexModel();
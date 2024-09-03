const axios = require('axios');
const createError = require('http-errors');

const Languages = require('../models/Languages.model');
const LanguagesModel = require('../models/Languages.model');

class IndexModel {
    async index (req, res, next) {
        const langCode = req.cookies.userLang;
        try {
            let currentLang, languages;
            if(langCode) {
                languages = await Languages.find({code: langCode});
                currentLang = await LanguagesModel.findOne({content: langCode, code: 'en'});
            } else {
                languages = await Languages.find({code: 'en'});
                currentLang = await LanguagesModel.findOne({content: 'en', code: 'en'});
            }
            languages.sort(function(a, b) {
                return a.index - b.index;
            });
            res.render('index', {
                languages,
                currentLang
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
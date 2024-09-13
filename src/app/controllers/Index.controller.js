const axios = require('axios');
const getLanguageUtil = require('../utils/getLanguage.util');
const errorFlowUtil = require('../utils/errorFlow.util');


class IndexModel {
    async index (req, res, next) {
        let langCode = req.cookies.userLang;
        const act = req.signedCookies.act;
        try {
            let languages = await getLanguageUtil(langCode);
            if(!act) {
                return res.render('index', {
                    languages
                });
            }
            const response = await axios.get(`${process.env.AUTH_SERVER}/data`, { headers: { 'Authorization': `Bearer ${act}` } });
            const user = response.data;
            return res.render('index', { languages, user });
        } catch (error) {
            errorFlowUtil(error, next);
        }
    }
}

module.exports = new IndexModel();
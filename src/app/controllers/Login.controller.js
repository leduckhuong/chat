const getLanguage = require('../utils/getLanguage.util');

class Login {
    async index(req, res) {
        let langCode = req.cookies.userLang;
        try {
            let languages = await getLanguage(langCode);
            res.render('index', {
                languages,
                isLogin: true
            });
        } catch (error) {
            res.send('Error!');
        }
    }
}

module.exports = new Login();
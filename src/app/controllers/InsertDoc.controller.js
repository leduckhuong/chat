const LanguagesModel = require('../models/Languages.model');

class InsertDoc {
    async index(req, res) {
        const langCode = req.cookies.userLang;
        try {
            let currentLang, languages;
            if(langCode) {
                languages = await LanguagesModel.find({code: langCode});
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
                currentLang,
                isInsertDoc: true
            });
        } catch (error) {
            res.send('Error!');
        }
    }
    async insert(req, res) {
        try {
            const data = req.body;
            const newDoc = await LanguagesModel.create(data);
            res.json(newDoc);
        } catch (error) {
            res.send('Error!');
        }
    }
}

module.exports = new InsertDoc();
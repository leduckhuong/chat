const axios = require('axios');

const UserModel = require('../models/User.model');

class IndexModel {
    index (req, res) {
        const act = req.signedCookies.act;
        if(!act) {
            res.render('index', {
                data: null
            });
            return;
        }
        axios.get(`${process.env.AUTH_SERVER}/data`, {
            headers: {
                'Authorization': `Bearer ${act}`
            }
        })
        .then(response => {
            const user = response.data; 
            res.render('index', {
                user
            });
        })
        .catch(error => {
            console.log('Error: ', error);
            res.sendStatus(403);
        })
    }
}

module.exports = new IndexModel();
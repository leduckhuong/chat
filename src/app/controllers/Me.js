// const { verify } = require('../middlewares/jwt.middleware');

class Me {
    index (req, res, next) {
        const act = req.signedCookies.act;
        if(!act) {
            res.redirect('/');
        }
        // const data = verify(act, process.env.ACCESSTOKEN_SECRET, next);
        // res.render('me', {
        //     data,
        //     isMe: true
        // })
    }
}

module.exports = new Me();
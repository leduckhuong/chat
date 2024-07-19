class Me {
    index (req, res) {
        const act = req.signedCookies.act;
        if(!act) {
            res.redirect('/login');
        }
        axios.get(`${process.env.AUTH_SERVER}/data`, {
            headers: {
                'Authorization': `Bearer ${act}`
            }
        })
        .then(response => {
            const user = response.data; 
            res.render('me', {
                user
            });
        })
        .catch(error => {
            console.log('Error: ', error);
            res.sendStatus(403);
        })
    }
    update (req, res) {
        
    }
}

module.exports = new Me();
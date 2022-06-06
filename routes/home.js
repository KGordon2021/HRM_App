var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.loggedin == true) {
    res.render('../views/pages/home', {
                my_session: req.session
              });
    }else {
        res.redirect('/login')
    }
});

module.exports = router;
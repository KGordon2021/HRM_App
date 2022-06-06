var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt');

//renders longin view
router.get('/register', function(req, res, next) {
    res.render('../views/register');
});

router.post('/user/registration' , async(req, res) => {
var value = req.body.pswrd;
const salt =  await bcrypt.genSalt(12); // the sync alternative const salt = bcrypt.genSaltSync(12) where no await function is used
value =  await bcrypt.hash(value, salt) // similarly the sync alternative value = bcrypt.hash(value, salt)

let data = {    user_fnm: req.body.f_nm, 
                user_lnm: req.body.l_nm,
                user_email: req.body.usr_email,
                user_pswd: value
            };

    let sqlQuery = "INSERT INTO users SET ?";
    
    let vQuery = conn.query(sqlQuery, data,(err, results) => {
    if(err) {
      console.log(err); 
    } else {
    //    res.send(JSONResponse(results));
       res.redirect('/login');
    }
    });
}); 

module.exports = router;
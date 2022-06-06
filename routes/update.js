var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

router.post('/addProject/updatesInfo', (req, res, next) => {
    if(req.session.loggedin == true) {
    let sqlQuery = "UPDATE orientations SET group_id ='" + req.body.orient_name + 
                "', orientation_off_id ='" + req.body.orient_off + 
                "' WHERE id = " + req.body.id;

    conn.query(sqlQuery, function(err,rows) {
        if(err) {
            console.log(err)
        } else {
        //req.flash('error', err); 
        res.redirect('/existing_orients');
        }   
        next();                
     });
    }else {
        res.redirect('/login')
    }
});
module.exports = router;


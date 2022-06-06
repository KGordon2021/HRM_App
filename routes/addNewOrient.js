var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//POST Router to Add Projects from the form
router.get('/addNewOrient', (req, res)=> {
    if(req.session.loggedin == true) {
    res.render("interns/addNewOrient")
    }else {
        res.redirect('/login')
    }
})

router.post('/existing_orients/addNew' , (req, res) => {
    if(req.session.loggedin == true) {
    let data = {    group_id:     req.body.grp_id, 
                    orientation_off_id: req.body.off_id, 
                     };

        let sqlQuery = "INSERT INTO orientations SET ?";
        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/existing_orients');
            }
        });
    }else {
        res.redirect('/login')
    }
    }); 

module.exports = router;
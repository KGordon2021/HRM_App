var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//POST Router to Add Projects from the form
router.get('/addNewGroup', (req, res)=> {
    if(req.session.loggedin == true) {
    res.render("groups/addgroup")
    }else {
        res.redirect('/login')
    }
})

router.post('/existing_groups/addNew' , (req, res) => {
    if(req.session.loggedin == true) {
    var dated = new Date().toLocaleDateString('fr-CA')
    let data = {    group_id:     req.body.g_id, 
                    orientation_type: req.body.o_t, 
                    appointment_date:  dated
                 };

        let sqlQuery = "INSERT INTO group_classification SET ?";
        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/existing_groups');
            }
        });
    }else {
        res.redirect('/login')
    }
    }); 

module.exports = router;

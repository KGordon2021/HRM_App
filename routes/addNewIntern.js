var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//POST Router to Add Projects from the form
router.get('/addNewIntern', (req, res)=> {
    if(req.session.loggedin == true) {
    res.render("interns/addIntern")
    }else {
        res.redirect('/login')
    }
})

router.post('/addNewIntern/addNew' , (req, res) => {
    if(req.session.loggedin == true) {

    let data = {    intern_id: req.body.intern_id, 
                    intern_fn: req.body.fname, 
                    intern_ln: req.body.lname, 
                    email_addr: req.body.e_mail, 
                    group_id: req.body.orient_id
                     };

        let sqlQuery = "INSERT INTO new_interns SET ?";
        let vQuery = conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        }
            else {
                res.redirect('/existing_interns');
            }
        });
        }else {
            res.redirect('/login')
        }
        });


module.exports = router;


var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//Create GET Router to fetch all the projects in Database

router.get('/existing_interns', function(req, res, next) { //route has to be declared once
    conn.query(`Select * FROM new_interns`,function(err, rows){
    if(req.session.loggedin == true) {
           if(err){
               res.render('interns/allInterns', // was in incorrect file path allInterns
               {data:''});   
           }else{
               res.render('interns/allInterns', 
               {data: rows});
           }
        }else {
            res.redirect('/login')
        }                        
            });
       });



//Update router to update projects //this is the set up for the actual page

router.get('/allinterns/update/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
    if(req.session.loggedin == true) {

    conn.query("Select * FROM new_interns WHERE id =" + req.params.id, function(err,row){
    if(err) {
        res.render('interns/editInterns', {updatingInterns:''});
    } else {
        res.render('interns/editInterns', {updatingInterns:row});
    }
    });
    }else {
        res.redirect('/login')
    }
    });

router.post('/existing_interns/addNew' , (req, res) => {
    if(req.session.loggedin == true) {
    let data = {    intern_id: req.body.grp_id, 
                    intern_fn: req.body.off_id, 
                    intern_ln: req.body.off_id, 
                    intern_email_addr: req.body.off_id, 
                    group_id: req.body.off_id, 
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


router.post('/allInterns/updateInternInfo', (req, res, next) => {
    if(req.session.loggedin == true) {
    let sqlQuery = "UPDATE new_interns SET intern_fn ='" + req.body.f_name+ 
                "', intern_ln ='" + req.body.l_name + 
                "', email_addr ='" + req.body.eMail + 
                "', group_id ='" + req.body.grouped + 
                "' WHERE id = " + req.body.id;

    conn.query(sqlQuery, function(err,rows) {
        if(err) {
            console.log(err)
        } else {
        //req.flash('error', err); 
        res.redirect('/existing_interns');
        }   
        next();                
     });
    }else {
        res.redirect('/login')
    }
});

//the delete routes for students
router.get('/allInterns/delete/:id', (req, res, next) => {
    if(req.session.loggedin == true) {

    conn.query('DELETE FROM new_interns WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
            res.redirect('/existing_interns');
            next();
    });
    }else {
        res.redirect('/login')
    }
    });


module.exports = router;
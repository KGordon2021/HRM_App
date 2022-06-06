var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');

//Create GET Router to fetch all the projects in Database

router.get('/existing_orients', function(req, res, next) { //route has to be declared once
    if(req.session.loggedin == true) {
    conn.query(`SELECT o.id, gc.group_id, gc.orientation_type, gc.appointment_date, oo.hro_id, oo.hro_fnm, oo.hro_lnm
                FROM hrm_1st_graded_assign.orientations o, hrm_1st_graded_assign.group_classification gc, hrm_1st_graded_assign.orientation_officer oo
                WHERE o.group_id = gc.group_id AND oo.hro_id = o.orientation_off_id
                ORDER BY gc.group_id`,function(err, rows){
           if(err){
               res.render('pages/allRecords', // was in incorrect file path allRecords
               {data:''});   
           }else{
               res.render('pages/allRecords', 
               {data: rows});
           }                          
            });
        }else {
            res.redirect('/login')
        }
       });



//Update router to update projects //this is the set up for the actual page

router.get('/allRecords/update/:id', function(req, res) { //must be router.get or app.get or whatever else i choose but it has to be a get http verb
    if(req.session.loggedin == true) {
    conn.query(`SELECT o.id, gc.group_id, gc.orientation_type, gc.appointment_date, oo.hro_id, oo.hro_fnm, oo.hro_lnm
            FROM hrm_1st_graded_assign.orientations o, hrm_1st_graded_assign.group_classification gc, hrm_1st_graded_assign.orientation_officer oo
            WHERE o.group_id = gc.group_id AND oo.hro_id = o.orientation_off_id AND o.id =` + req.params.id, function(err,row){
    if(err) {
        res.render('pages/update', {updatedInfo:''});
    } else {
        res.render('pages/update', {updatedInfo:row});
    }
    });
    }else {
        res.redirect('/login')
    }
});

//the delete routes for students
router.get('/allRecords/delete/:id', (req, res, next) => {
    if(req.session.loggedin == true) {
    conn.query('DELETE FROM orientations WHERE id =' + req.params.id, function(err, row){
     if(err)  throw err;
         res.redirect('/existing_orients');
         next();
    });
    }else {
        res.redirect('/login')
    }
    });


module.exports = router;
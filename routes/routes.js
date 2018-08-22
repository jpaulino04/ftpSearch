const express = require("express");
const router  = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Group = require('../models/Group');

//index route
router.get('/users', (req, res)=>{
    res.render('index');
})

//post
router.post('/users', function(req,res){
    const userPick = req.body.picker;
    const search = req.body.search;
    // let inputData = req.body.email;
    // res.render('index');
    // if(user !== ''){

    // }
    // Group.create({
    //     groupname: 'Group0'
    // },(err, group) =>{
    //     if(err) throw err;
    //     group.users.push(user);
    //     group.save()
    //     console.log('Group Added!')
    // })    
    // User.create({
    //     username: ftpuser
    // }, (err, user) => {
    //     if(err) throw err
    //     user.save()
    //     console.log(user)
    // })

    //Find by Username
    //if search is not empty and search by username selected
    if(search !== '' && userPick == 'user'){
        User.find({username: search})
        .exec((err, data) => {
            if(err) throw err;
            if(data == {} || data == ''){
                res.json({msg: 'Could not find User!'})
            } else {
                res.json(data);
            }            
        })
    }
    //Continue working on search by  group and by folder
    

    //Trying partial search
    // User.find({folders: {$regex: 'e:/ftpdata/files.ipro.org/managed care/la eqro/united/'}})
    // .exec((err, folder) => {
    //     if(err) throw err;
    //     res.json(folder);
    // })



    
    // User.findOne({username:ftpuser}, (err, user) => {
    //     if(err) throw err;
    //     if(typeof user == "null"){
    //         console.log('User not found')
    //     } else {
    //         res.json(user)
    //         console.log(user)
    //     }      
    // })
   
    // Group.create({
    //     groupName: "Group2"
    // }, (err, group) => {
    //     if(err) throw err;
    //     console.log(group)
    //     User.findOne({userName:'jpaulino04@msn.com'}, (err, user) => {
    //         if(err) throw err;
    //         user.groups.push(group);
    //         user.save();
    //         console.log('Group added to user!')
    //     })
    // });

}) 
    


module.exports = router;
'use strict'
//Connect to db
const fs = require('fs');
const parseString = require('xml2js').parseString;
const mongoose = require('mongoose');
const User = require('./models/User');
const Group = require('./models/Group');
mongoose.set('debug', true);


// if (process.argv.length <= 2) {
//  console.log("Usage: " + __filename + " path/to/directory");
//  process.exit(-1);
// }

const path = './users'

function buildArray(cb){
 fs.readdir(path, function(err, items) {
   let usersArray = [];
   items.forEach(email => {
     usersArray.push(email)
   })
   cb(usersArray);      
 });
}

buildArray(runData)

function runData(arr, cb){
  let allUsers = []
  let arraySize = arr.length; //get array length
  let paths = []
  arr.forEach(item => {
   //Build file path and push to paths
   let file = __dirname +'\\users\\'+item;
   paths.push(file);     
 })
 paths.forEach((path,idx) => {
    let userObj = {};
    userObj.groups = [];
    userObj.folders = [];
    let username = {}
    let res = fs.readFileSync(path, 'utf8');
    parseString(res, function (err, result) {
      if(err) throw err;
      let users = result.USER_ACCOUNTS.USER;      
      let ftpUser = users[0].UserName[0]
      userObj._ID = idx;
      userObj.username = ftpUser;
      // Build array of groups on user schema:
      if(typeof users[0].Group !== 'undefined'){
        users[0].Group.forEach(group => {
          userObj.groups.push(group.Group_Name[0])
        })
        // console.log(userObj)
        allUsers.push(userObj)
      }
       // Build array of folders on user schema
      if(typeof users[0].Folder !== 'undefined'){
          users[0].Folder.forEach(folder => {
            userObj.folders.push(folder.Path[0])
          })
          allUsers.push(userObj)
      }   
   


      if(idx == paths.length -1){ 
        console.log(allUsers) 
        pushToDB(allUsers)        
      }            
    }); 
  })
}

function pushToDB(data){
  let user = JSON.stringify(data)
  console.log('Writing..')
  fs.writeFile('userGroupsFolders.json', user, err=>{
    if(err) throw err;
  })
  console.log("File written")
  
    
}

module.exports = buildArray;



  

 // console.log(usersArray)



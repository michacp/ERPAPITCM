const express = require('express');
const UserController = require('../controllers/UserController')
const users = express.Router();
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')


users.get("/listuser",logged,isadmin,UserController.new);
users.post('/createuser',logged,isadmin, UserController.create);
users.get("/finduser",logged,isadmin,UserController.findID);
users.post("/edituser",logged,isadmin,UserController.edituser);
users.get("/deloeteuser",logged,isadmin,UserController.deleteuser);


users.post('/login', UserController.login);

users.get('/getusergroup', UserController.getstategroup);
users.get('/getuserstate', UserController.getstateuser);
users.get('/getusergener', UserController.getgender);




users.get("/listemployee",logged,isadmin,UserController.listemployee);
module.exports = users;
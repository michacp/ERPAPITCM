const express = require('express');
const UserController = require('../controllers/UserController')
const users = express.Router();
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')


users.post('/login', UserController.login);
users.post('/createuser',logged,isadmin, UserController.create);
users.post('/getusergroup', UserController.getstategroup);
users.post('/getuserstate', UserController.getstateuser);
users.post("/listuser",logged,isadmin,UserController.new);
users.post("/finduser",logged,isadmin,UserController.findID);
users.post("/edituser",logged,isadmin,UserController.edituser);
users.post("/deloeteuser",logged,isadmin,UserController.deleteuser);
module.exports = users;
const express = require('express');
const UserController = require('../controllers/UserController')
const users = express.Router();
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')


users.post('/login', UserController.login);
users.post('/createuser',logged,isadmin, UserController.create);
users.get('/getusergroup', UserController.getstategroup);
users.get('/getuserstate', UserController.getstateuser);
users.get('/getusergener', UserController.getgender);
users.get("/listuser/:allclients/:numperpage/:pagination/:findlike",logged,isadmin,UserController.new);
users.get("/listuser/:allclients/:numperpage/:pagination/",logged,isadmin,UserController.new);
users.get("/finduser/:id",logged,isadmin,UserController.findID);
users.post("/edituser",logged,isadmin,UserController.edituser);
users.get("/deloeteuser/:id/:id1",logged,isadmin,UserController.deleteuser);
users.get("/listemployee/:allclients/:numperpage/:pagination/:findlike",logged,isadmin,UserController.listemployee);
users.get("/listemployee/:allclients/:numperpage/:pagination/",logged,isadmin,UserController.listemployee);
module.exports = users;
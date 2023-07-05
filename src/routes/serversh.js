const express = require("express");
const ServershCotroller=require ("../controllers/ServershController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


routes.post("/listserversh",logged,isadmin,ServershCotroller.list);
routes.post("/findserversh",logged,isadmin,ServershCotroller.find);
routes.post("/findservershstate",logged,isadmin,ServershCotroller.liststate);
routes.post("/editserversh",logged,isadmin,ServershCotroller.edit);
routes.post("/newserversh",logged,isadmin,ServershCotroller.new);
routes.post("/filterby",logged,isadmin, ServershCotroller.findby );
routes.post("/deleteserversh",logged,isadmin, ServershCotroller.delete);
routes.post("/listbranchesserversh",logged,isadmin, ServershCotroller.listbranches)


module.exports = routes;
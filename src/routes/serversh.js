const express = require("express");
const ServershCotroller=require ("../controllers/ServershController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


routes.get("/listserversh",logged,isadmin,ServershCotroller.list);
//routes.get("/listserversh/:allclients/:numperpage/:pagination/",logged,isadmin,ServershCotroller.list);
routes.get("/findserversh",logged,isadmin,ServershCotroller.find);
routes.get("/findservershstate",logged,isadmin,ServershCotroller.liststate);
routes.post("/editserversh",logged,isadmin,ServershCotroller.edit);
routes.post("/newserversh",logged,isadmin,ServershCotroller.new);
routes.post("/filterby",logged,isadmin, ServershCotroller.findby );
routes.get("/deleteserversh",logged,isadmin, ServershCotroller.delete);
routes.get("/listbranchesserversh",logged,isadmin, ServershCotroller.listbranches)


module.exports = routes;
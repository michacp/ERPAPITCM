const express = require("express");
const BranchesController=require ("../controllers/BranchesController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


routes.get("/listbranches",logged,isadmin,BranchesController.list);
routes.post("/newbranches",logged,isadmin,BranchesController.new);
routes.get("/findbranches",logged,isadmin,BranchesController.find);



 routes.get("/findbranchesstate",logged,isadmin,BranchesController.liststate);
 routes.post("/editbranches",logged,isadmin,BranchesController.edit);

// routes.post("/filterby",logged,isadmin, ServershCotroller.findby );
 routes.get("/deletebranches",logged,isadmin, BranchesController.delete);


module.exports = routes;
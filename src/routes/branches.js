const express = require("express");
const BranchesController=require ("../controllers/BranchesController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


routes.post("/listbranches",logged,isadmin,BranchesController.list);
routes.post("/findbranches",logged,isadmin,BranchesController.find);
 routes.post("/findbranchesstate",logged,isadmin,BranchesController.liststate);
 routes.post("/editbranches",logged,isadmin,BranchesController.edit);
 routes.post("/newbranches",logged,isadmin,BranchesController.new);
// routes.post("/filterby",logged,isadmin, ServershCotroller.findby );
 routes.post("/deletebranches",logged,isadmin, BranchesController.delete);


module.exports = routes;
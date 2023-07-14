const express = require("express");
const BranchesController=require ("../controllers/BranchesController")
const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const routes = express.Router();


routes.get("/listbranches/:allclients/:numperpage/:pagination/:findlike",logged,isadmin,BranchesController.list);
routes.get("/listbranches/:allclients/:numperpage/:pagination/",logged,isadmin,BranchesController.list);
routes.get("/findbranches/:id",logged,isadmin,BranchesController.find);
 routes.get("/findbranchesstate",logged,isadmin,BranchesController.liststate);
 routes.post("/editbranches",logged,isadmin,BranchesController.edit);
 routes.post("/newbranches",logged,isadmin,BranchesController.new);
// routes.post("/filterby",logged,isadmin, ServershCotroller.findby );
 routes.get("/deletebranches/:id",logged,isadmin, BranchesController.delete);


module.exports = routes;
const express = require("express");



const {logged}=require('../helpers/auth')
const {isadmin}= require('../helpers/permissions')
const AppController = require("../controllers/AppController");

const routes = express.Router();

routes.get("/", AppController.index);
routes.post("/listar", AppController.list);
routes.post("/save",logged,isadmin,AppController.savecli);
routes.post("/edit", AppController.edit);
routes.get("/find/:id", AppController.find);
routes.post("/delete",logged,isadmin, AppController.deletecli);
routes.post("/saveserver", AppController.saveserver);
routes.post("/tokenstate",logged,AppController.tokenstate);




// routes.get('/elpuyolesjoto', AppController.consultar);

//  routes.get("/sse", (req, res) => {
//     console.log(req.body)
//      var app = SSE(res);
//     // app.send('TEAMCELLMANIA')
//  //res.end()
//  app.sendEvent('time', function () {
//     return new Date
// },1000);

// app.disconnect(function () {
//     console.log("disconnected");
// });

// app.removeEvent('time',3100);

//  });

module.exports = routes;

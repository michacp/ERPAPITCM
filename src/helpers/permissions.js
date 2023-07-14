const permissions = {};
const jwt = require("jsonwebtoken");
var fs = require("fs");
const findgroup=require("../models/UserModels")
const {key}=require('../config/key')

permissions.isadmin =async (req, res, next) => {
 
    var cert = fs.readFileSync(key.public)//("./keys/jwtRS256.key.pub");
    //console.log("aqui")
    jwt.verify(req.token, cert,async (error, authData) => {
        if (error) {
            res.sendStatus(403);
          } else {
            const groups=await findgroup.findgroup(authData.dats,'ADMINS')
            //console.log(authData.dats)
            if(groups){
             
              next();
            }else{
             
              res.send({ status: true, result: "No tienes permiso" }) ;
            }
           // console.log()
            
            //res.json(authData)
            //const app = await App.get();
            //
          }
        });
    
//console.log(req)


}
module.exports = permissions ;

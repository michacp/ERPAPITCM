const permissions = {};
const jwt = require("jsonwebtoken");
var fs = require("fs");
const findgroup=require("../models/UserModels")

permissions.isadmin =async (req, res, next) => {
  
    var cert = fs.readFileSync("./keys/jwtRS256.key.pub");
    jwt.verify(req.token, cert,async (error, authData) => {
        if (error) {
            res.sendStatus(403);
          } else {
            const groups=await findgroup.findgroup(authData.dats,'ADMINS')
            
            if(groups){
             delete req.body.token 
              next();
            }else{
              res.send({ status: "error,", result: "No tienes permiso" }) ;
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

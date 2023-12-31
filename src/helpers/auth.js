const auth = {};
const jwt = require("jsonwebtoken");
var fs = require("fs");
const Find = require("../models/UserModels");
const bq = require('../helpers/bcryptjs')
const {key}=require('../config/key')
// function listarrutas(){
// const fs = require('fs');

// fs.readdir("./", function (err, archivos) {
// if (err) {
// onError(err);
// return;
// }
// console.log(archivos);
// });}

auth.Token = async (data) => {
 // listarrutas()
 // console.log("2")
  try {
    const buscar = await Find.find(data);
  // console.log(buscar[0])
    if (buscar) {
      const pass = bq.verifyPassword(data.pasword_user, buscar[0].pasword_user);
      if (pass) {
        dats = {
          user: buscar[0].name_user,
          name: buscar[0].employees.first_name1 + " "+buscar[0].employees.last_name1,
          email:buscar[0].employees.email_business
        };
        var appRoot = process.cwd()
      //console.log(appRoot)
        var privateKey = fs.readFileSync(key.key)//"./keys/jwtRS256.key");
        const token = jwt.sign({ dats }, privateKey, {
          algorithm: "RS256",
          expiresIn:"1h",
        });
        delete buscar[0].pasword_user
        return  {token: token,user: buscar[0] } ;
      } else {
        return  false
      }
    } else {
      return  false
    }
  } catch (err) {
    console.log(err)
    return  false
  }
};

auth.RenewalToken= async(data1,datatoken)=>{
 // console.log(data1)
 
if (data1==datatoken.dats.user){
  let data={name_user:datatoken.dats.user}
  const buscar = await Find.find(data)
  //console.log(buscar)
  if(buscar){
    const time=(datatoken.exp-Math.floor(Date.now() / 1000))/60
   //console.log(time)
    if(time<30){
      dats = {
        user: buscar[0].name_user,
        name: buscar[0].employees.first_name1 + " "+buscar[0].employees.last_name1,
        email:buscar[0].employees.email_business
      };

      var privateKey = fs.readFileSync(key.key)//"./keys/jwtRS256.key");
      const token = jwt.sign({ dats }, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });
      delete buscar[0].pasword_user
      
      return { estatustoken: true, result: { token: token,user: buscar[0] } };
    }else{
      return true
    }
     
  }else{
    return false
  }
  
}else{
  return false
}

}
auth.logged = (req, res, next) => {
 // console.log("aaaa",req.body)
 
const bearerHeader = req.headers["authorization"];
// const bearerHeader = req.body.token;
 
 //console.log(req.headers)
  if (typeof bearerHeader !== "undefined") {
  const bearerToken = bearerHeader.split(" ")[1];
    
    req.token = bearerToken;
    //console.log(req.body)
    var cert = fs.readFileSync(key.public)//"./keys/jwtRS256.key");
    jwt.verify(req.token, cert, (error, authData) => {
      if (error) {
        //console.log(error)
        res.statusMessage = "NECESITA INICIAR SESIÓN";
        res.sendStatus(401);
        // res.json({estatustoken:false});
       } else {
         req.toke= authData;
          next();
       }
     });
   } else {
     res.statusMessage = "NECESITA INICIAR SESIÓN";
     res.sendStatus(401);
   }


};
module.exports = auth;

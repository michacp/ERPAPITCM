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
          expiresIn: "1h",
        });
        return { status: true, result: { token: token,user: buscar[0] } };
      } else {
        return { status: false, result: "credenciales incorrectas" };
      }
    } else {
      return { status: false, result: "credenciales incorrectas" };
    }
  } catch (err) {
    console.log(err)
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
      
      return { estatustoken: true, result: { token: token,user: buscar[0] } };
    }else{
      return { estatustoken: true, result: false};
    }
     
  }else{
    return { estatustoken: false, result: "credenciales incorrectas" }
  }
  
}else{
  return { estatustoken: false, result: "credenciales incorrectas" }
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
      // console.log(error)
        res.json({estatustoken:false});
      } else {
        req.toke= authData
       // console.log('aqui')
        
        next();
        
        //res.json(authData)
        //const app = await App.get();
        //
      }
    });
  } else {
  
    res.json({estatustoken:false});
  }


};
module.exports = auth;

const auth = {};
const jwt = require("jsonwebtoken");
var fs = require("fs");
const Find = require("../models/UserModels");
const bq = require('../helpers/bcryptjs')

auth.Token = async (data) => {
  console.log("2")
  try {
    const buscar = await Find.find(data);
    console.log(buscar)
    if (buscar) {
      const pass = bq.verifyPassword(data.pasword_user, buscar[0].pasword_user);
      if (pass) {
        dats = {
          nombre: buscar[0].name_user,
          firstname: buscar[0].first_name_user,
          email: buscar[0].email_user,
        };
        var appRoot = process.cwd()
        console.log(appRoot)
        var privateKey = fs.readFileSync(appRoot+"keys/jwtRS256.key");
        console.log(privateKey,"buffer")
        const token = jwt.sign({ dats }, privateKey, {
          algorithm: "RS256",
          expiresIn: "1h",
        });
        return { status: true, result: { token: token,user: buscar[0].name_user } };
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

auth.RenewalToken= async(data,datatoken)=>{
  //console.log(datatoken)
if (data.user==datatoken.dats.nombre){
  data.name_user=datatoken.dats.nombre
  const buscar = await Find.find(data)
  if(buscar){
    const time=(datatoken.exp-Math.floor(Date.now() / 1000))/60
   //console.log(time)
    if(time<30){
      dats = {
        nombre: buscar[0].name_user,
        firstname: buscar[0].first_name_user,
        email: buscar[0].email_user,
      };
      var privateKey = fs.readFileSync("keys/jwtRS256.key");
      const token = jwt.sign({ dats }, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });
      
      return { estatustoken: 'ok', result: { token: token,user: buscar[0].name_user } };
    }else{
      return { estatustoken: 'ok', result: false};
    }
     
  }else{
    return { estatustoken: 'error', result: "credenciales incorrectas" }
  }
  
}else{
  return { estatustoken: 'error', result: "credenciales incorrectas" }
}

}
auth.logged = (req, res, next) => {
 // console.log("aaaa",req.body)
// console.log(req.headers)
  //const bearerHeader = req.headers["authorization"];
 const bearerHeader = req.body.token;
 
 //console.log(req.body.token)
  if (typeof bearerHeader !== "undefined") {
  const bearerToken = bearerHeader.split(" ")[1];
    
    req.token = bearerToken;
    //console.log(req.body)
    var cert = fs.readFileSync("keys/jwtRS256.key.pub");
    jwt.verify(req.token, cert, (error, authData) => {
      if (error) {
       
        res.json({estatustoken:'error'});
      } else {
        req.toke= authData
        //console.log(authData)
        next();
        
        //res.json(authData)
        //const app = await App.get();
        //
      }
    });
  } else {
  
    res.json({estatustoken:'error'});
  }


};
module.exports = auth;

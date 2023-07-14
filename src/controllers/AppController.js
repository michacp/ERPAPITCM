const AppController = {};

const App = require("../models/App");
const Authserver = require("../models/Authserver");

const auth = require("../helpers/auth");

AppController.index = async (req, res) => {
  res.sendFile(__dirname + "/views/");
  //res.send('exito aqui')
};

AppController.list = async (req, res) => {
  //  const lista = await App.get(req.body);
  // console.log(lista)
  res.json({ lista: "ok" });
  //res.send('exito aqui')
};

AppController.save = async (req, res) => {};

AppController.find = async (req, res) => {
  console.log(req.headers);
  res.json({ estado: "ok" });
};

AppController.edit = async (req, res) => {};
AppController.delete = async (req, res) => {};

AppController.deletecli = async (req, res) => {};

AppController.savecli = async (req, res) => {
  console.log(req);
};

AppController.tokenstate = async (req, res) => {
 try {
  //console.log(req.headers["x-user"])
    const resultf = await auth.RenewalToken(req.headers["x-user"], req.toke);
    res.json(resultf); 
  } catch (error) {
   console.log(error) 
  }

};

AppController.saveserver = async (req, res) => {
  const app = await App.saveservers(req.body);
  //console.log(req.body)

  res.end();
};

//  AppController.consultar= async(req,res)=>{

//    const app=await App.consultar()
//     //console.log(app)

//  res.json(app)

// }
module.exports = AppController;

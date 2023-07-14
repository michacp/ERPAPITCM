const UserController = {};

const Token = require("../helpers/auth");
const UserModels = require("../models/UserModels");
const bq = require("../helpers/bcryptjs");
const aux=require("../config/auxp")

UserController.create = async (req, res) => {
 // console.log(req.body);

  const saveuser = await UserModels.create(req.body);
  //res.json({esta:"si"})
  if (saveuser) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }
};
UserController.listemployee = async (req, res) => {
  const data=await aux.convert(req.params)
  const saveuser = await UserModels.getemployees(data);
  res.json(saveuser);
};
UserController.new = async (req, res) => {
  const data=await aux.convert(req.params)
  //console.log('req.body')
  const saveuser = await UserModels.getby(data);
  //console.log(saveuser)
  res.json(saveuser);
};
UserController.getstateuser = async (req, res) => {
  const groupp = await UserModels.getstate();

  res.json(groupp);
};
UserController.getstategroup = async (req, res) => {
  const state = await UserModels.getgroup();

  res.json(state);
};
UserController.getgender = async (req, res) => {
  const gener = await UserModels.getgener();
  //console.log(gener)
  res.json(gener);
};
UserController.findID = async (req, res) => {
  // console.log(req.body)
  const userone = await UserModels.finbdID(req.params.id);
  //console.log(req.params)
  res.json(userone);
};
UserController.edituser = async (req, res) => {
  //console.log(req.body)
  if (
    req.body.pasword_user.length < 6 ||
    req.body.pasword_user1.length < 6
  ) {
    delete req.body.pasword_user;
    delete req.body.pasword_user1;
    const userone = await UserModels.edituser(
      req.body,
      req.body._id,
      req.body.dni
    );
    if (userone) {
      res.json({ status: "ok", mensaje: "dato guardado" });
    } else {
      res.json({ status: "error", mensaje: "dato no guardado" });
    }
  } else {
    if (req.body.pasword_user === req.body.pasword_user1) {
      req.body.pasword_user = bq.bcrypt(req.body.pasword_user);
     
      const userone =  await UserModels.edituser(
         req.body.id,
       req.body.id._id,
        req.body.id.dni
       );

      if (userone) {
        res.json({ status: "ok", mensaje: "dato guardado" });
      } else {
        res.json({ status: "error", mensaje: "dato no guardado" });
      }
    } else {
      res.json({ status: "error", mensaje: "dato no guardado" });
    }
  }
};

UserController.deleteuser = async (req, res) => {
 // console.log(req.params)
  const deleteuser = await UserModels.deleteuser(req.params);
  if (deleteuser) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};

UserController.login = async (req, res) => {
  // console.log(req.body)

  //console.log(datos)
  const s = await Token.Token(req.body);
  // const app = await App.saveservers(req.body);
  // console.log(s);
  res.json(s);
};
module.exports = UserController;

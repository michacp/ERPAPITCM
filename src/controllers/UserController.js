const UserController = {};

const Token = require("../helpers/auth");
const UserModels = require("../models/UserModels");
const bq = require("../helpers/bcryptjs");

UserController.create = async (req, res) => {
  //  console.log(req.body);

  const saveuser = await UserModels.create(req.body);
  //res.json({esta:"si"})
  if (saveuser) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }
};
UserController.listemployee = async (req, res) => {
  //console.log('req.body')
  const saveuser = await UserModels.getemployees(req.body.datapage);
  //console.log(saveuser)
  res.json(saveuser);
};
UserController.new = async (req, res) => {
  //console.log('req.body')
  const saveuser = await UserModels.getby(req.body.datapage);
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
  const userone = await UserModels.finbdID(req.body);
  res.json(userone);
};
UserController.edituser = async (req, res) => {
  // console.log(req.body)
  if (
    req.body.id.pasword_user.length < 6 ||
    req.body.id.pasword_user1.length < 6
  ) {
    delete req.body.id.pasword_user;
    delete req.body.id.pasword_user1;
    const userone = await UserModels.edituser(
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
    if (req.body.id.pasword_user === req.body.id.pasword_user1) {
      req.body.id.pasword_user = bq.bcrypt(req.body.id.pasword_user);
      const userone = await UserModels.edituser(
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
  const deleteuser = await UserModels.deleteuser(req.body);
  if (deleteuser) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};

UserController.login = async (req, res) => {
  // console.log("1")
  const datos = {
    name_user: req.body.usuario,
    pasword_user: req.body.pasword,
  };
  //console.log(datos)
  const s = await Token.Token(datos);
  // const app = await App.saveservers(req.body);
  // console.log(s);
  res.json(s);
};
module.exports = UserController;

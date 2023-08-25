const UserController = {};

const Token = require("../helpers/auth");
const UserModels = require("../models/UserModels");
const bq = require("../helpers/bcryptjs");
const aux = require("../config/auxp");

UserController.create = async (req, res) => {
  try {
    const saveuser = await UserModels.create(req.body);
    if (saveuser) {
      res.statusMessage = "USUARIO GUARDADO";
      res.sendStatus(200);
    } else {
      res.statusMessage = "USUARIO NO GUARDADO";
      res.sendStatus(304);
    }
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.listemployee = async (req, res) => {
  try {
    const data = await aux.convert(req.query);
    const saveuser = await UserModels.getemployees(data);
    res.json(saveuser);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.new = async (req, res) => {
  try {
    const data = await aux.convert(req.query);
    const saveuser = await UserModels.getby(data);
    res.json(saveuser);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.getstateuser = async (req, res) => {
  try {
    const groupp = await UserModels.getstate();

    res.json(groupp);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.getstategroup = async (req, res) => {
  try {
    const state = await UserModels.getgroup();

    res.json(state);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.getgender = async (req, res) => {
  try {
    const gener = await UserModels.getgener();
    //console.log(gener)
    res.json(gener);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.findID = async (req, res) => {
  try {
    // console.log(req.body)
    const userone = await UserModels.finbdID(req.query.id);
    //console.log(req.params)
    res.json(userone);
  } catch (error) {
    res.sendStatus(417);
  }
};
UserController.edituser = async (req, res) => {
  try {
    //console.log(req.body)
    if (req.body.pasword_user.length < 6 || req.body.pasword_user1.length < 6) {
      delete req.body.pasword_user;
      delete req.body.pasword_user1;
      const userone = await UserModels.edituser(
        req.body,
        req.body._id,
        req.body.dni
      );
      if (userone) {
        res.statusMessage = "USUARIO EDITADO";
        res.sendStatus(200);
      } else {
        res.statusMessage = "USUARIO NO EDITADO";
        res.sendStatus(304);
      }
    } else {
      if (req.body.pasword_user === req.body.pasword_user1) {
        req.body.pasword_user = bq.bcrypt(req.body.pasword_user);

        const userone = await UserModels.edituser(
          req.body.id,
          req.body.id._id,
          req.body.id.dni
        );

        if (userone) {
          res.statusMessage = "USUARIO EDITADO";
          res.sendStatus(200);
        } else {
          res.statusMessage = "USUARIO NO EDITADO";
          res.sendStatus(304);
        }
      } else {
        res.statusMessage = "USUARIO NO EDITADO";
        res.sendStatus(304);
      }
    }
  } catch (error) {
    res.sendStatus(417);
  }
};

UserController.deleteuser = async (req, res) => {
  try {
    //console.log(req.params)
    const deleteuser = await UserModels.deleteuser(req.query);
    if (deleteuser) {
      res.statusMessage = "USUARIO ELIMINADO";
      res.sendStatus(200);
    } else {
      res.statusMessage = "USUARIO NO ELIMINADO";
      res.sendStatus(304);
    }
  } catch (error) {
    res.sendStatus(417);
  }
};

UserController.login = async (req, res) => {
  try {
    // console.log(req.body)

    //console.log(datos)
    const s = await Token.Token(req.body);
    if (s) {
      res.status(200).json(s);
      //res.json(s);
    } else {
      res.statusMessage = "CREDENCIALES INCORRECTAS";
      res.sendStatus(428);
    }
  } catch (error) {
    res.sendStatus(417);
  }
};
module.exports = UserController;

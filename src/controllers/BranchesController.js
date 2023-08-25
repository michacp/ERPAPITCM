const BranchesController = {};
const Branches = require("../models/BranchesModel");
const aux=require("../config/auxp")

BranchesController.list = async (req, res) => {
  try {
 const data=await aux.convert(req.query)
  const statebranches = await Branches.getby(data);
  //console.log(JSON.stringify(statebranches))
  res.json(statebranches);
} catch (error) {
  res.sendStatus(417);
}
};

BranchesController.liststate = async (req, res) => {
  try {
  const statebranches = await Branches.getstate();
  //console.log(servers)
  res.json(statebranches);
} catch (error) {
  res.sendStatus(417);
}
};

BranchesController.new = async (req, res) => {
  try {
  const branches =await Branches.new(req.body);
  if (branches) {
    res.statusMessage = "SUCURSAL CREADA";
    res.sendStatus(200);
  } else {
    res.statusMessage = "SUCURSAL NO CREADA";
    res.sendStatus(304);
  }
} catch (error) {
  res.sendStatus(417);
}
};
BranchesController.find = async (req, res) => {
  try {
    const statebranches = await Branches.find(req.query.id);
    res.json(statebranches);
  } catch (error) {
    res.sendStatus(417);
  }
};
BranchesController.edit = async (req, res) => {
  try {
   // console.log(req.body)
    const userone = await Branches.edit(req.body, req.body._id);
    if (userone) {
      res.statusMessage = "SUCURSAL EDITADA";
      res.sendStatus(200);
    } else {
      res.statusMessage = "SUCURSAL NO EDITADA";
      res.sendStatus(304);
    }
  } catch (error) {
    res.sendStatus(417);
  }
};

BranchesController.delete = async (req, res) => {
  try {
  const deletebranch = await Branches.delete(req.query);
  if (deletebranch) {
    res.statusMessage = "SUCURSAL ELIMINADA";
    res.sendStatus(200);
  } else {
    res.statusMessage = "SUCURSAL NO ELIMINADA";
    res.sendStatus(304);
  }
} catch (error) {
  res.sendStatus(417);
}
};
module.exports = BranchesController;

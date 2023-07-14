const BranchesController = {};
const Branches = require("../models/BranchesModel");
const aux=require("../config/auxp")

BranchesController.list = async (req, res) => {
 // console.log(req.params)
 const data=await aux.convert(req.params)
  const statebranches = await Branches.getby(data);
  //console.log(JSON.stringify(statebranches))
  res.json(statebranches);
};

BranchesController.liststate = async (req, res) => {
  // console.log(req.body)

  const statebranches = await Branches.getstate();
  //console.log(servers)
  res.json(statebranches);
};

BranchesController.new = async (req, res) => {
   
  const branches =await Branches.new(req.body);
  if (branches) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }
};
BranchesController.find = async (req, res) => {
  try {
    const statebranches = await Branches.find(req.params.id);
    res.json(statebranches);
  } catch (err) {
    console.log(err);
  }
  //console.log(req.body.id);

  //console.log(JSON.stringify(statebranches))
};
BranchesController.edit = async (req, res) => {
  try {
   // console.log(req.body)
    const userone = await Branches.edit(req.body, req.body._id);
    if (userone) {
      res.json({ status: "ok", mensaje: "dato guardado" });
    } else {
      res.json({ status: "error", mensaje: "dato no guardado" });
    }
  } catch (err) {
    console.log(err);
  }
};

BranchesController.delete = async (req, res) => {
  //console.log(req.params.id)
  const deletebranch = await Branches.delete(req.params.id);
  if (deletebranch) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};
module.exports = BranchesController;

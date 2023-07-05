const BranchesController = {};
const Branches = require("../models/BranchesModel");

BranchesController.list = async (req, res) => {
  // console.log(req.body);
  const statebranches = await Branches.getby(req.body.datapage);
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
  // console.log(req.body)
  const branches = await Branches.new(req.body);
  if (branches) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }
};
BranchesController.find = async (req, res) => {
  try {
    const statebranches = await Branches.find(req.body.id);
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
    const userone = await Branches.edit(req.body.id, req.body.id._id);
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
  const deletebranch = await Branches.delete(req.body);
  if (deletebranch) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};
module.exports = BranchesController;

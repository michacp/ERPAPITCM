const ServershController = {};
const Serversh = require("../models/Serversh");

ServershController.list = async (req, res) => {
 //  console.log(req.body)

  //
  const servers = await Serversh.getby(req.body.datapage);
  //console.log(servers)
  res.json(servers);
};
ServershController.liststate = async (req, res) => {
  const state = await Serversh.getstate();
  // console.log(server)
  res.json(state);
};

ServershController.find = async (req, res) => {
//  console.log(req.body)
  const server = await Serversh.find(req.body.id);
  // console.log(server)
  res.json(server);
};

ServershController.findby = async (req, res) => {
 // console.log("server")
const server = await Serversh.getby(req.body.datapage);
   
  res.json(server);
};

ServershController.edit = async (req, res) => {
  delete req.body.token;
  delete req.body.name;
 // console.log(req.body._id)
  const editserver = await Serversh.edit(req.body, req.body._id);
  // console.log(editserver)
  if (editserver) {
    res.json({ status: "ok", mensaje: "dato modificado" });
  } else {
    res.json({ status: "error", mensaje: "dato no modificado" });
  }
};

ServershController.new = async (req, res) => {
 // console.log(req.body)
  delete req.body.id_serverusers;
  delete req.body.name;
 
  const editserver = await Serversh.new(req.body);
  // // console.log(editserver)
  if (editserver) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }

  // console.log(editserver)
  // res.json({status:"ok"})
};

ServershController.delete = async (req, res) => {
 // console.log(req.body)
  const del = await Serversh.delete(req.body._id);

  if (del) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};

module.exports = ServershController;

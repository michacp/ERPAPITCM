const ServershController = {};
const Serversh = require("../models/Serversh");
const aux=require("../config/auxp")

ServershController.list = async (req, res) => {
 //  console.log(req.body)
 const data=await aux.convert(req.params)
  //
  const servers = await Serversh.getby(data);
  //console.log(servers)
  res.json(servers);
};
ServershController.liststate = async (req, res) => {
  const state = await Serversh.getstate();
   //console.log(state)
  res.json(state);
};
ServershController.listbranches = async (req, res) => {
  const state = await Serversh.listbranches();
 //console.log(state )
  res.json(state);
};
ServershController.find = async (req, res) => {
  //console.log(req.params.id)
  const server = await Serversh.find(req.params.id);
  // console.log(server)
  res.json(server);
};

ServershController.findby = async (req, res) => {
 // console.log("server")
const server = await Serversh.getby(req.body.datapage);
   
  res.json(server);
};

ServershController.edit = async (req, res) => {

// console.log(req.body)
  const editserver = await Serversh.edit(req.body, req.body._id);
 
  if (editserver) {
    res.json({ status: "ok", mensaje: "dato modificado" });
  } else {
    res.json({ status: "error", mensaje: "dato no modificado" });
  }
};

ServershController.new = async (req, res) => {
 
  const editserver = await Serversh.new(req.body);
  if (editserver) {
    res.json({ status: "ok", mensaje: "dato guardado" });
  } else {
    res.json({ status: "error", mensaje: "dato no guardado" });
  }

};

ServershController.delete = async (req, res) => {

  const del = await Serversh.delete(req.params.id);

  if (del) {
    res.json({ status: "ok", mensaje: "dato eliminado" });
  } else {
    res.json({ status: "error", mensaje: "dato eliminado" });
  }
};

module.exports = ServershController;

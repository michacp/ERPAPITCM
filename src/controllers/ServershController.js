const ServershController = {};
const Serversh = require("../models/Serversh");
const aux=require("../config/auxp")

ServershController.list = async (req, res) => {
  try {
    const data=await aux.convert(req.query)
    const servers = await Serversh.getby(data);
    res.json(servers);
  } catch (error) {
    res.sendStatus(417);
  }

};
ServershController.liststate = async (req, res) => {
  try {
  const state = await Serversh.getstate();
   //console.log(state)
  res.json(state);
} catch (error) {
  res.sendStatus(417);
}
};
ServershController.listbranches = async (req, res) => {
  try {
  const state = await Serversh.listbranches();
 //console.log(state )
  res.json(state);
} catch (error) {
  res.sendStatus(417);
}
};
ServershController.find = async (req, res) => {
  
  try {
    const server = await Serversh.find(req.query.id);
  // console.log(server)
  res.json(server);
} catch (error) {
  res.sendStatus(417);
}
};

ServershController.findby = async (req, res) => {
  try {
  const data = await aux.convert(req.query);
const server = await Serversh.getby(data);
   
  res.json(server);
} catch (error) {
  res.sendStatus(417);
}
};

ServershController.edit = async (req, res) => {
  try {
// console.log(req.body)
  const editserver = await Serversh.edit(req.body, req.body._id);
 
  if(editserver){

    res.statusMessage = "SERVIDOR EDITADO";
    res.sendStatus(200);
  }else{
    res.statusMessage = "SERVIDOR NO EDITADO";
    res.sendStatus(304)
  }
} catch (error) {
  res.sendStatus(417);
}
};

ServershController.new = async (req, res) => {
  try {
  const editserver = await Serversh.new(req.body);
  if(editserver){

    res.statusMessage = "SERVIDOR GUARDADO";
    res.sendStatus(200);
  }else{
    res.statusMessage = "SERVIDOR NO GUARDADA";
    res.sendStatus(304)
  }
} catch (error) {
  res.sendStatus(417);
}

};

ServershController.delete = async (req, res) => {
  try {
  const del = await Serversh.delete(req.query.id);

  if(del){
    console.log(del)
    res.statusMessage = "SERVIDOR ELIMIADO";
    res.sendStatus(200);
  }else{
    res.statusMessage = "SERVIDOR NO ELIMINADO";
    res.sendStatus(304)
  }
} catch (error) {
  console.log(error)
  res.sendStatus(417);
}
};

module.exports = ServershController;

const CustomerController = {};
const Customer = require("../models/Customer");
const aux=require("../config/auxp")
const modelage = require("../modelsdb/ages");

CustomerController.list = async (req, res) => {
  //console.log(req.params)
 const data=await aux.convert(req.params)
  //
  const servers = await Customer.getby(data);
  //console.log(servers)
  res.json(servers);
};
// CustomerController.liststate = async (req, res) => {
//   const state = await Customer.getstate();
//    //console.log(state)
//   res.json(state);
// };
CustomerController.listages = async (req, res) => {
  const state = await Customer.listage();
 //console.log(state )
  res.json(state);
};
CustomerController.find = async (req, res) => {
 //console.log(req.query)
  const server = await Customer.Findone(req.query.id);
  // console.log(server)
  res.json(server);
};

CustomerController.findby = async (req, res) => {
  
  const data=await aux.convert(req.query)
  //console.log(req.query)
const server = await Customer.Findby(data);
   
  res.json(server);
};

CustomerController.edit = async (req, res) => {
//console.log(req.body)
  const editserver = await Customer.edit(req.body);
 
  if (editserver) {
    res.json({ status: true, mensaje: "dato modificado" });
  } else {
    res.json({ status: false, mensaje: "dato no modificado" });
  }
};

CustomerController.new = async (req, res) => {

  const editserver = await Customer.new(req.body);
  if (editserver) {
    res.json({ status: true, mensaje: "dato guardado" });
  } else {
    res.json({ status: false, mensaje: "dato no guardado" });
  }

};

// CustomerController.delete = async (req, res) => {

//   const del = await Customer.delete(req.params.id);

//   if (del) {
//     res.json({ status: true, mensaje: "dato eliminado" });
//   } else {
//     res.json({ status: false, mensaje: "dato eliminado" });
//   }
// };

module.exports = CustomerController;
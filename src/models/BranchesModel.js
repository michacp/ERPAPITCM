const BranchesModels = {};
const bq = require("../helpers/bcryptjs");
const modelbranches = require("../modelsdb/branches");
const modelestateb = require("../modelsdb/state_branches");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


BranchesModels.getstate = async () => {
    try {
      
      const groupww = await modelestateb.paginate({});

      const group = groupww.docs;
      return group;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  BranchesModels.new = async (data) => {
    try {
    // console.log(data)
     // delete data.id_serverusers;
     // delete data.password_server;
    //  data.password_server= bq.bcrypt(data.password_server);
  
      const insertar = await modelbranches.create(data);
  
      if (insertar === "error") {
        console.log("ERROR");
  
        return (insertar1 = false);
      } else {
        return (insertar1 = true);
      }
    } catch (e) {
      console.error(e);
  
      return (insertar1 = false);
    }
  };


  BranchesModels.getby = async (data) => {
    try { 
    //  data.allclients ==0
   //console.log(data)
     var findby=data.findlike;
      var myAggregate;
      var page =data.pagination ;
      var numPerPage = data.numperpage;
      var skip = (page - 1) * numPerPage;
      //console.log(skip)
     if(!data.findlike){
      findby=""
     
     }
  
      if (data.allclients == 0) {
        myAggregate = await modelbranches.aggregate([
          {
            $match: {
              name: {'$regex': findby}
            },
          },
          {
            $lookup: {
              from: "state_branches",
              localField: "id_state",
              foreignField: "_id",
              as: "statebranches",
            },
          },
          { $unwind: "$statebranches" },
  
          { $sort: { order_number: -1 } },
          {
            $facet: {
              metadata: [
                { $count: "total" },
                { $addFields: { page: Number(page) } },
              ],
              data: [{ $skip: skip }, { $limit: numPerPage }], // add projection here wish you re-shape the docs
            },
          },
        ]);
  
      } else {
  
  
        myAggregate = await modelbranches.aggregate([
          {
            $match: {
              id_state: new ObjectId(data.allclients),
              name: {'$regex': findby}
            },
          },
          {
            $lookup: {
              from: "state_branches",
              localField: "id_state",
              foreignField: "_id",
              as: "statebranches",
            },
          },
          { $unwind: "$statebranches" },
  
          { $sort: { order_number: -1 } },
          {
            $facet: {
              metadata: [
                { $count: "total" },
                { $addFields: { page: Number(page) } },
              ],
              data: [{ $skip: skip }, { $limit: numPerPage }], // add projection here wish you re-shape the docs
            },
          },
        ]);
      }
  var  numero_de_paginas
  var total
      if(myAggregate[0].metadata.length ==0){
        numero_de_paginas = Math.trunc(0 / numPerPage)+1 ;
        total=0
      }else{
        numero_de_paginas = Math.trunc(myAggregate[0].metadata[0].total/ numPerPage)+1 ;
        total=myAggregate[0].metadata[0].total
      }
  
     
      const respuesta = {
        allclients:data.allclients,
        numero_de_paginas: numero_de_paginas,
        pagina_actual: page,
        numero_de_entradas: total,
        numero_entradas_por_pagina:numPerPage,  
        consumo:myAggregate[0].data,
      };
     // console.log(respuesta);
      return respuesta;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  BranchesModels.find = async (data) => {
    try {
     // const findcli = await db.query(
     //   "SELECT id_serverusers,name_server,state_server,name,idstate FROM serverusers INNER JOIN state ON state_server=idstate where id_serverusers=?",
      //  data
   //   );
   myAggregate = await modelbranches.aggregate([
    {
      $match: {
        _id: new ObjectId(data),
        
      },
    },
    {
      $lookup: {
        from: "state_branches",
        localField: "id_state",
        foreignField: "_id",
        as: "statebranches",
      },
    },
    { $unwind: "$statebranches" },
  ])
   //console.log(myAggregate)
      return myAggregate;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  BranchesModels.edit = async (data, id) => {
    try {
      delete data._id;

      const insertar = await modelbranches.findOneAndUpdate(
        { _id: id },
        { $set: data },
        {
          returnOriginal: false,
        }
      );
      if (insertar === "error") {
        console.log("ERROR");
        return (insertar1 = false);
      } else {
        return (insertar1 = true);
      }
     // console.log(insertar);
    } catch (err) {
      console.error(err);
      return (inser = false);
    }
  };


  BranchesModels.delete= async (data) => {
    try{
      const insertar = await modelbranches.deleteOne( { _id: data.id } )
     
      if (insertar === "error") {
        console.log("ERROR");
        return (insertar1 = false);
      } else {
        return (insertar1 = true);
      }
    }catch(err){
  console.log(err)
    }}
  module.exports =BranchesModels
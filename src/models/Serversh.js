const Servesh = {};
const { add } = require("date-fns");
const bq = require("../helpers/bcryptjs");
modelserverusers = require("../modelsdb/serverusers");
modelstate = require("../modelsdb/state_server");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const modelbranches = require("../modelsdb/branches");
Servesh.get = async (data) => {
  try {
    //console.log(data)
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;

    if (data.allclients == 0) {
      myAggregate = await modelserverusers.aggregate([
        {
          $lookup: {
            from: "states",
            localField: "state_server",
            foreignField: "_id",
            as: "stateservers",
          },
        },
        { $unwind: "$stateservers" },

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
      myAggregate = await modelserverusers.aggregate([
        {
          $match: {
            state_server: new ObjectId(data.allclients),
          },
        },
        {
          $lookup: {
            from: "states",
            localField: "state_server",
            foreignField: "_id",
            as: "stateservers",
          },
        },
        { $unwind: "$stateservers" },

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
    var numero_de_paginas;
    var total;
    if (myAggregate[0].metadata.length == 0) {
      numero_de_paginas = Math.trunc(0 / numPerPage) + 1;
      total = 0;
    } else {
      numero_de_paginas =
        Math.trunc(myAggregate[0].metadata[0].total / numPerPage) + 1;
      total = myAggregate[0].metadata[0].total;
    }

    const respuesta = {
      numero_de_paginas: numero_de_paginas,
      pagina_actual: page,
      numero_de_entradas: total,
      numero_entradas_por_pagina: numPerPage,
      consumo: myAggregate[0].data,
    };
    // console.log(respuesta);
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};

Servesh.getby = async (data) => {
  try {
    // console.log(data)
    var findby = data.findlike;
    var myAggregate;
    var page = data.pagination;
    var numPerPage = data.numperpage;
    var skip = (page - 1) * numPerPage;
    if (!data.findlike) {
      findby = "";
    }

    if (data.allclients == 0) {
      myAggregate = await modelserverusers.aggregate([
        {
          $match: {
            name_server: { $regex: findby },
          },
        },
        {
          $lookup: {
            from: "states",
            localField: "state_server",
            foreignField: "_id",
            as: "stateservers",
          },
        },
        { $unwind: "$stateservers" },
        {
          $lookup: {
            from: "branches",
            localField: "branches_id",
            foreignField: "_id",
            as: "branches",
          },
        },
        { $unwind: "$branches" },

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
      myAggregate = await modelserverusers.aggregate([
        {
          $match: {
            state_server: new ObjectId(data.allclients),
            name_server: { $regex: findby },
          },
        },
        {
          $lookup: {
            from: "states",
            localField: "state_server",
            foreignField: "_id",
            as: "stateservers",
          },
        },
        { $unwind: "$stateservers" },
        {
          $lookup: {
            from: "branches",
            localField: "branches_id",
            foreignField: "_id",
            as: "branches",
          },
        },
        { $unwind: "$branches" },

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
    var numero_de_paginas;
    var total;
    if (myAggregate[0].metadata.length == 0) {
      numero_de_paginas = Math.trunc(0 / numPerPage) + 1;
      total = 0;
    } else {
      numero_de_paginas =
        Math.trunc(myAggregate[0].metadata[0].total / numPerPage) + 1;
      total = myAggregate[0].metadata[0].total;
    }

    const respuesta = {
      allclients: data.allclients,
      numero_de_paginas: numero_de_paginas,
      pagina_actual: page,
      numero_de_entradas: total,
      numero_entradas_por_pagina: numPerPage,
      consumo: myAggregate[0].data,
    };
    // console.log(respuesta);
    return respuesta;
  } catch (err) {
    console.log(err);
    return false;
  }
};

Servesh.getstate = async () => {
  try {
    const state1 = await modelstate.paginate({});
    const state = state1.docs; //await db.query("SELECT * FROM state ");
    // console.log(state)
    return state;
  } catch (err) {
    console.log(err);
    return false;
  }
};

Servesh.find = async (data) => {
  try {
    // const findcli = await db.query(
    //   "SELECT id_serverusers,name_server,state_server,name,idstate FROM serverusers INNER JOIN state ON state_server=idstate where id_serverusers=?",
    //  data
    //   );
    myAggregate = await modelserverusers.aggregate([
      {
        $match: {
          _id: new ObjectId(data),
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_server",
          foreignField: "_id",
          as: "stateservers",
        },
      },
      { $unwind: "$stateservers" },
      {
        $lookup: {
          from: "branches",
          localField: "branches_id",
          foreignField: "_id",
          as: "branches",
        },
      },
      { $unwind: "$branches" },
    ]);
    //console.log(myAggregate)
    return myAggregate;
  } catch (err) {
    console.log(err);
    return false;
  }
};

Servesh.edit = async (data, id) => {
  try {

    delete data._id;
    //console.log(data)
    const insertar = await modelserverusers.findOneAndUpdate(
      { _id: id },
      {
        name_server: data.name_server,
        state_server: new ObjectId(data.state_server),
        branches_id: new ObjectId(data.branches_id)
      },
      {
        returnOriginal: false,
      }
    );
    //console.log(insertar)
    //await db.query(
    //  "UPDATE serverusers SET ? where id_serverusers=? ",
    //  [data, id]
    // );
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
Servesh.new = async (data) => {
  try {
    // console.log(data)
    delete data.id_serverusers;
    // delete data.password_server;
    data.password_server = bq.bcrypt(data.password_server);

    const insertar = await modelserverusers.create(data);

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

Servesh.delete = async (data) => {
  try {
    //console.log(data)
    const insertar = await modelserverusers.deleteOne({ _id: data });
    //await db.query(
    //"DELETE FROM serverusers where id_serverusers=?",
    //data
    //);
    if (insertar === "error") {
      console.log("ERROR");
    } else {
      return insertar;
    }
  } catch (e) {
    console.error(e);
  }
};

Servesh.listbranches = async () => {
  try {
    const groupww1 = await modelbranches.find();
    return groupww1;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = Servesh;

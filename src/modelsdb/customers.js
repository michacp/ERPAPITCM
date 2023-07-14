const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const CustomersScheme = new mongoose.Schema(
  {
    first_name1: {
      type: String,
      required: true,
    },
    last_name1: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    addres: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
CustomersScheme.plugin(aggregatePaginate);
module.exports = mongoose.model("customers", CustomersScheme);
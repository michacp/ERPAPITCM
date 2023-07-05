
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const BranchesScheme = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  addres: {
    type: String,
    
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  id_state: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
 code: {
    type: String,
    required: true,
  },


},
{timestamps:true});
BranchesScheme.plugin(aggregatePaginate)
module.exports=mongoose.model('branches',BranchesScheme)
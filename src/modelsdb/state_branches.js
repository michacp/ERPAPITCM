const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const state_branchesScheme = new mongoose.Schema({
    name: {
    type: String,
    uppercase: true,
    unique: true,
    required: true,
  },

},
{timestamps:true});
state_branchesScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('state_branches',state_branchesScheme)
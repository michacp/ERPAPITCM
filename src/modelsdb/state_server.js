const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const stateScheme = new mongoose.Schema({
    name: {
    type: String,
    unique: true,
    required: true,
  },

},
{timestamps:true});
stateScheme.plugin(mongoosePaginate)
module.exports=mongoose.model('states',stateScheme)
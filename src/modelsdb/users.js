
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const UserScheme = new mongoose.Schema({
    
    name_user: {
        type: String,
        unique: true,
        required: true,
      },
    email_user: {
        type: String,
        unique: true,
        required: true,
      },
    first_name_user: {
        type: String,
        required: true,
      },
    last_name: {
        type: String,
         required: true,
      },
    pasword_user: {
        type: String,
         required: true,
      },
      
      state_user: {
        type: mongoose.Types.ObjectId,
        required: true,
      }

},
{timestamps:true});
UserScheme.plugin(aggregatePaginate)
module.exports=mongoose.model('user',UserScheme)
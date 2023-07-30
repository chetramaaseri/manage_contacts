const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required :["true","Please enter an username"],
        unique :[true,"Username already Taken"]
    },
    email:{
        type:String,
        required :["true","Please enter an emai"],
        unique :[true,"email already registred"]
    },
    password:{
        type:String,
        required :["true","Choose a password"],
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema);
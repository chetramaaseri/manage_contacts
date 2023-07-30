const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    name :{
        type :String,
        required :[true,"Please add contact name"]
    },
    email :{
        type :String,
        required :[true,"Please add contact email"]
    },
    mobile :{
        type :String,
        required :[true,"Please add contact mobile number"]
    }
},
{
    timestamps: true 
});

module.exports = mongoose.model("Contact",contactSchema);
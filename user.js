const mongoose=require('mongoose');
const schema=mongoose.Schema;


const userSchema=new schema({
    email:String,
    password:String,
});


const User=mongoose.model("User",userSchema);

module.exports=User;
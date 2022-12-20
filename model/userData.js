const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require: true,
        },
       email:{
            type:String,
            require: true,
        },
        password:{
            type:String,
            require: true,
        },
        typed:{
            type:String,
            require: true,
        }
    }
)

const userData=mongoose.model("userData",userSchema)
module.exports=userData
const{Schema,model}=require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const UserSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    surname:String,
    bio:String,
    nick:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"role_user"
    },
    img_avatar:{
        type:String,
        default:"imageUser.png"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

UserSchema.plugin(mongoosePaginate);

module.exports = model("User",UserSchema,"users")
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    displayName:{
        type:String,
        required:true,
        trim:true,
    },
    avatarId:{
        type:String,
    },
    avatarUrl:{
        type:String
    },
    bio:{
        type:String,
        maxlenght:500,
    },
    phone:{
        type:String,
        sparse:true,
    },
},{
    timestamps:true,
});

const Users = mongoose.model("Users",UsersSchema);

export default Users
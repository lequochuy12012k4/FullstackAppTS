import mongoose from "mongoose";

const SessionsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users',
        index:true
    },
    refreshToken:{
        type:String,
        required:true,
        unique:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    }
},{
    timestamps:true,
});

SessionsSchema.index({expiresAt:1},{expireAfterSeconds:0});

const Sessions = mongoose.model("Sessions",SessionsSchema);

export default Sessions;
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:["activated","deactivated"],
        default:"activated",
    },
    completedAt:{
        type:Date,
        default:null,
    }
},
    {
        timestamps:true,
    }
);

const Task = mongoose.model("Task",TaskSchema);

export default Task

import Task from "../models/Task"

export const getAllTasks = async (req : any,res:any) => {
    try {
        const tasks = await Task.find().sort({createdAt:'desc'});
        res.status(200).json(tasks);
    }
    catch (error) {
        console.log("Error on method GET",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const createTask = async (req:any,res:any)=>{
    try {
        const {title} = req.body;
        const task = new Task({title}) 
        const newTask = await task.save()
        res.status(201).json(newTask);
    }
    catch (error) {
        console.log("Error on method POST",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateTask = async (req:any, res:any)=>{
    try {
        const {title, status, completedAt} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {title, status, completedAt},
            {new:true}
        );
        if(!updateTask){
            return res.status(404).json({message:'Task not found'})
        }
        res.status(201).json(updatedTask);
    } catch (error) {
        console.log("Error on method PUT",error)
        res.status(500).json({message:"Internal server error"})
    }

}

export const deleteTask = async (req:any, res:any)=>{
    try {
        const deleteTask = await Task.findByIdAndDelete(
            req.params.id,
        );
        if(!deleteTask){
            return res.status(404).json({message:'Task not found'})
        }
        res.status(201).json(deleteTask);
    } catch (error) {
        console.log("Error on method DELETE",error)
        res.status(500).json({message:"Internal server error"})
    }
}
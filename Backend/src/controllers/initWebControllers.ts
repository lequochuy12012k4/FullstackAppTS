export const getAllTasks = (req : any,res:any) => {
    res.status(200).json({message:"Hello World"})
}

export const createTask = (req:any,res:any)=>{
    res.status(200).json({message:"Task created"})
}

export const updateTask = (req:any, res:any)=>{
    res.status(201).json({message:"Task updated"})
}

export const deleteTask = (req:any, res:any)=>{
    res.status(202).json({message:"Task deleted"})
}
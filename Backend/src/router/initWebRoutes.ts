import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/initWebControllers';
const router = express.Router();

const initWebRoutes = (app: any) => {
    router.get("/api/tasks",getAllTasks)

    router.post("/api/tasks",createTask)

    router.put("/api/tasks/:id",updateTask)
    
    router.delete("/api/tasks/:id",deleteTask)
    
    return app.use("/",router)
}

export default initWebRoutes;
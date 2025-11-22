import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/initWebControllers';
const router = express.Router();

const initWebRoutes = (app: any) => {
    router.get("/",getAllTasks)

    router.post("/api/task",createTask)

    router.put("/api/task/:id",updateTask)
    
    router.delete("/api/task/:id",deleteTask)
    
    return app.use("/",router)
}

export default initWebRoutes;
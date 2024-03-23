import { Router } from "express"; 
import { TaskController } from "../controllers/TaskController.js";

const router = Router(); 


router.get("/add", TaskController.createTask);
router.get("/", TaskController.showTasks); 
router.get("/:id", TaskController.showTask); 
router.get("/edit/:id", TaskController.editTask);
router.post("/save", TaskController.saveTask);
router.post("/update", TaskController.updateTask);
router.post("/delete",TaskController.removeTask);
router.post("/toggle", TaskController.toggleTask); 


export default router; 
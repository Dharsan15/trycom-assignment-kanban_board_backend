import express, { Request, Response } from "express";
import { taskModel } from "../models/task.js";

const router = express.Router();

router.get("/gettasks", async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});


router.post("/addtasks" , async (req , res) => {
    
    const { id , title, description, status } = req.body;

    try{
        const newTask = new taskModel({ id , title, description, status });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    }
    catch(error)
    {
        res.status(500).json({ message: "Error creating task", error });
    }


})


router.patch('/updatetask/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const id = taskId;

  console.log(id);
  

  try {

    const updatedTask = await taskModel.findOneAndUpdate(
      { id }, 
      { status },
      { new: true } 
    );
     
  
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task status' });
  }
});


router.delete("/deletetask/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await taskModel.findOneAndDelete({ id });;

    console.log("delete task" , id);
    

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});



export default router;
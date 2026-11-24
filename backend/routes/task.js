import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
//ROUTE 1 : Create  a new task using POST: "/api/task/createtask".Login Required
router.post("/createtask", fetchUser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are errors,return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { project: projectId } = req.body;
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).send("Not Found");
      }
      if (
        project.owner.toString() !== req.user.id &&
        !project.members.some((member) => member.toString() === req.user.id)
      ) {
        return res.status(401).send("Not Allowed");
      }
      const { title, description, assignedTo, priority, status, dueDate } =
        req.body;
      const userId = req.user.id;

      let task = await Task.create({
        title,
        description,
        project: projectId,
        createdBy: userId,
        assignedTo : assignedTo || userId,
        createdBy: userId,
        priority,
        status,
        dueDate,
      });
      res.json({ task });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
//ROUTE 2 : fetch all the tasks using GET: "/api/task/fetchalltasks".Login Required
router.get("/fetchalltasks", fetchUser, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 3 : Update  an existing  task using PUT: "/api/task/updatetask".Login Required
router.put("/updatetask/:id", fetchUser, async (req, res) => {
  const { title, description, status, priority } = req.body;
  try {
    //create a new task object
    const newTask = {};
    if (title !== undefined) {
      newTask.title = title;
    }
    if (description !== undefined) {
      newTask.description = description;
    }
    if (status !== undefined) {
      newTask.status = status;
    }
    if (priority !== undefined) {
      newTask.priority = priority;
    }
    //find the Task to be updated and update it.

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");
    }
    if (
      task.createdBy.toString() != req.user.id &&
      task.assignedTo.toString() != req.user.id
    ) {
      return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true, runValidators: true },
    );
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 4 : Delete  an existing  task using DELETE: "/api/task/deletetask".Login Required
router.delete("/deletetask/:id", fetchUser, async (req, res) => {
  try {
    //find the task to be deleted and delete it.
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");
    }
    if (
      task.createdBy.toString() != req.user.id &&
      task.assignedTo.toString() != req.user.id
    ) {
      return res.status(401).send("Not Allowed");
    }
    task = await Task.findByIdAndDelete(req.params.id);
    res.send({ Success: "Task has been deleted " });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 5 : Assign a task to team members using PUT: "/api/task/assigntask".Login Required
router.put("/assigntask/:id", fetchUser, async (req, res) => {
 
  try {
     const { assignedTo } = req.body;
    // Find the task
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    // Check whether the assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    // Only the task creator can assign the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // Update the assignedTo field
    task = await Task.findByIdAndUpdate(req.params.id,{ $set: {assignedTo} },{ new: true, runValidators: true });
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 6 : fetch  tasks of a specific project using GET: "/api/task/fetchtask".Login Required
router.get("/fetchtask/:projectId", fetchUser, async (req, res) => {
  try {
    //check whether the project exists or not.
    const project = await Project.findById(req.params.projectId);
    if(!project){
      return res.status(404).send("Project Not Found");
    }
     if (project.owner.toString() !== req.user.id && !project.members.some((member) => member.toString() === req.user.id)) {
        return res.status(401).send("Not Allowed");
      }
    const tasks = await Task.find({project: req.params.projectId});
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 7 : fetch a single task of a specific project using GET: "/api/task/getsingletask".Login Required
router.get("/getsingletask/:taskId", fetchUser, async (req, res) => {
  try {
    //find the task
    const task = await Task.findById(req.params.taskId);
     //check whether the task exists or not.
    if(!task){
      return res.status(404).send("Task Not Found");
    }
      // Find the project associated with this task
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).send("Project Not Found");
    }
    // Check user roles
    const isOwner = project.owner.toString() === req.user.id;

    const isMember = project.members.some((member) => member.toString() === req.user.id
    );

    const isCreator = task.createdBy.toString() === req.user.id;

    const isAssignedUser = task.assignedTo && task.assignedTo.toString() === req.user.id;

    // Deny access only if the user has none of these roles
    if (!isOwner && !isMember && !isCreator && !isAssignedUser) {
      return res.status(403).send("Not Allowed");
    }

    res.json(task);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;

import express from "express";
const router = express.Router();
import Project from "../models/Project.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";
//ROUTE 1 : fetch all projects using GET: "/api/project/fetchallprojects".Login Required
router.get("/fetchallprojects", fetchUser, async (req, res) => {
  try {
    //.populate converts the object id into name.
    const projects = await Project.find({ owner: req.user.id }).populate('owner','name').populate("members", "name");
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 2 : Add  a new project using POST: "/api/project/addproject".Login Required
router.post(
  "/addproject",
  fetchUser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, members = [] } = req.body;

    try {
      // Add logged-in user and selected members without duplicates
      const project = new Project({
        title,
        description,
        status,
        owner: req.user.id,
        members: [...new Set([req.user.id, ...members])],
      });

      // Save project
      const savedProject = await project.save();

      res.json(savedProject);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//ROUTE 3 : Update  an existing  project using PUT: "/api/project/update".Login Required
router.put("/update/:id", fetchUser, async (req, res) => {
  const { title, description, status, members } = req.body;
  try {
    //create a new project object
    const newProject = {};
    if (title) {
      newProject.title = title;
    }
    if (description) {
      newProject.description = description;
    }
    if (status) {
      newProject.status = status;
    }
    if (members) {
      newProject.members = members;
    }
    //find the project to be updated and update it.

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not Found");
    }
    if (project.owner.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true, runValidators: true },
    );
    res.json({ project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 4 : Delete  an existing  project using DELETE: "/api/project/delete".Login Required
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    //find the project to be deleted and delete it.
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not Found");
    }
    if (project.owner.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    project = await Project.findByIdAndDelete(req.params.id);
    res.send({ Success: "project has been deleted " });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;

const mongoose = require("mongoose");
const Project = require("../models/projectModel");

//get all projects
const getAllProjects = async (req, res) => {
  await Project.find({});

  res.status(200).json(projects);
};

//GET a single project
const getSignleProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id is not valid" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }
};

//POST a new porject
const postProject = async (req, res) => {
  const data = req.body;

  try {
    const project = await Project.create({
      ...data,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE a project

//UPDATE a project

module.exports = {
  postProject,
  getAllProjects,
  getSignleProject,
};

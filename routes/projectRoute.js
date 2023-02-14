const express = require("express");
const {
  postProject,
  getAllProjects,
  getSignleProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

// router
const router = express.Router();

// GET all projects
router.get("/", getAllProjects);

// GET a single project
router.get("/:id", getSignleProject);

// POST a new project
router.post("/", postProject);

// DELETE a project
router.delete("/:id", deleteProject);

// UPDATE a project
router.patch("/:id", updateProject);

module.exports = router;

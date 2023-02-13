const express = require("express");
const {
  postProject,
  getAllProjects,
  getSignleProject,
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
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a project" });
});

// UPDATE a project
router.patch("/:id", (req, res) => {
  res.json({ message: "PATCH a project" });
});

module.exports = router;

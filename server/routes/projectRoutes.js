// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

const seedDatabase = async () => {
	try {
		await Project.deleteMany(); // Clear existing data

		const project = [
			{ title: 'The Great Gatsby',  description: 'A classic novel about the American Dream', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg' },
			{ title: 'To Kill a Mockingbird', description: 'A powerful story of racial injustice and moral growth', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg' },
			{ title: '1984', description: 'A dystopian vision of a totalitarian future society',imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
			{ title: 'The Great Gatsby',  description: 'A classic novel about the American Dream', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
			{ title: 'To Kill a Mockingbird', description: 'A powerful story of racial injustice and moral growth', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
			{ title: '1984', description: 'A dystopian vision of a totalitarian future society', imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg' },
		
		];
		
		await Project.insertMany(project);
		console.log('Database seeded successfully');
	} catch (error) {
		console.error('Error seeding database:', error);
	}
};
seedDatabase();
// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a project (Admin only)
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).send("Project added!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

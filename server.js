const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Swagger UI
app.use(cors());

// Mock Resume Data
const resumes = [
    { id: 1, name: "John Doe", skills: ["JavaScript", "Node.js"] },
    { id: 2, name: "Jane Smith", skills: ["Python", "Django"] },
    { id: 3, name: "Alice Johnson", skills: ["Java", "Spring"] }
];

// API Endpoint: Get Resumes (Filter by Name)
app.get('/resume', (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredResume = resumes.filter(resume => resume.name.toLowerCase() === name.toLowerCase());

        if (filteredResume.length === 0) {
            return res.status(404).json({ error: "Resume not found for the given name" });
        }

        return res.json(filteredResume);
    }

    // Return all resumes if no query parameter is provided
    res.json(resumes);
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

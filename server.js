const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Postman Mock Server URL
const MOCK_SERVER_URL = "https://mock.api/resume";

app.get('/resume', async (req, res) => {
    try {
        const response = await axios.get(MOCK_SERVER_URL);
        const allResumes = response.data; // Get resumes from mock server

        const { name } = req.query;
        if (name) {
            const filteredResume = allResumes.find(resume => resume.name.toLowerCase() === name.toLowerCase());
            if (!filteredResume) {
                return res.status(404).json({ error: "Resume not found" });
            }
            return res.json(filteredResume);
        }

        res.json(allResumes); // Return all resumes if no filter is applied
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

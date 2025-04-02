const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios for API calls

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Swagger UI
app.use(cors());

// Postman Mock Server URL (Replace with your actual mock server URL)
const POSTMAN_MOCK_SERVER_URL = "https://your-postman-mock-server.com/resumes";

app.get('/resume', async (req, res) => {
    try {
        // Fetch mock data from Postman Mock Server
        const response = await axios.get(https://a2635451-d1b3-47f3-98a9-4c7dcddf7d68.mock.pstmn.io);
        const resumes = response.data;

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

    } catch (error) {
        console.error("Error fetching mock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

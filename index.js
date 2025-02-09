if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const JUDGE0_URL = process.env.BASEURL;
const API_KEY = process.env.API;

const languageMap = {"C": 50,"C++": 54,"Python": 71,"Java": 62,"JavaScript": 63};

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/compilecode", async (req, res) => {
    const { code, input, lang } = req.body;
    if (!languageMap[lang]) {
        console.error("Unsupported language received:", lang);
        return res.status(400).json({ error: `Unsupported language: ${lang}` });
    }
    try {
        //Submit Code for Execution
        const response = await axios.post(`${JUDGE0_URL}?base64_encoded=false&wait=false`, {
            source_code: code,
            language_id: languageMap[lang],
            stdin: input
        }, {
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "Content-Type": "application/json"
            }
        });
        if (!response.data.token) {
            return res.status(500).json({ error: "Failed to submit code for execution" });
        }
        const token = response.data.token;
        let outputResponse;
        while (true) {
            outputResponse = await axios.get(`${JUDGE0_URL}/${token}?base64_encoded=false`, {
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
                }
            });

            if (outputResponse.data.status.id >= 3) break;
        }
        const result = outputResponse.data;
        res.json({ output: result.stdout || result.stderr || "Execution error" });

    } catch (error) {
        console.error("Execution Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Execution failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
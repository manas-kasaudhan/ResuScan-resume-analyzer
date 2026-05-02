const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenAI, Type, Schema } = require('@google/genai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for file uploads (in memory for now)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Prompt for Gemini
const systemPrompt = `
You are an expert AI Resume Analyzer and Career Coach. 
Analyze the following resume text and provide actionable feedback, ATS scores, missing keywords, and specific section rewrites.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        atsScore: { type: Type.INTEGER, description: "A score from 0 to 100 based on ATS compatibility" },
        improvedAtsScore: { type: Type.INTEGER, description: "The potential score from 0 to 100 if suggestions are applied" },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of strengths in the resume" },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of weaknesses in the resume" },
        suggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "A unique identifier string" },
                    category: { type: Type.STRING, description: "One of: content, formatting, keywords, structure" },
                    text: { type: Type.STRING, description: "The actionable suggestion" },
                    priority: { type: Type.STRING, description: "One of: high, medium, low" },
                    original: { type: Type.STRING, description: "The original text from the resume (optional)", nullable: true },
                    improved: { type: Type.STRING, description: "The improved/rewritten text (optional)", nullable: true }
                },
                required: ["id", "category", "text", "priority"]
            }
        },
        keywords: {
            type: Type.OBJECT,
            properties: {
                found: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords found in the resume" },
                missing: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords that should be added" }
            },
            required: ["found", "missing"]
        },
        diffSections: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "A unique identifier string" },
                    title: { type: Type.STRING, description: "The section title, e.g. Professional Summary" },
                    original: { type: Type.STRING, description: "The original text" },
                    improved: { type: Type.STRING, description: "The rewritten version" }
                },
                required: ["id", "title", "original", "improved"]
            }
        }
    },
    required: ["atsScore", "improvedAtsScore", "strengths", "weaknesses", "suggestions", "keywords", "diffSections"]
};


// Routes
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    let textContent = '';
    
    // Parse PDF
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      textContent = data.text;
    } else {
      return res.status(400).json({ error: 'Currently, only PDF files are supported.' });
    }

    console.log(`Received file: ${req.file.originalname}, Size: ${req.file.size} bytes`);
    console.log(`Extracted Text Length: ${textContent.length} characters`);

    // Call Gemini
    console.log("Analyzing with Gemini...");
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Here is the resume text to analyze:\n\n${textContent}`,
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.2
        }
    });

    const aiResponseContent = response.text;
    const analysisResult = JSON.parse(aiResponseContent);

    console.log("Analysis complete!");
    res.json(analysisResult);

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume. Please try again.' });
  }
});

app.post('/api/improve', async (req, res) => {
  // Placeholder endpoint for future AI improvements
  setTimeout(() => {
    res.json({ success: true, message: 'Resume improved!' });
  }, 2000);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

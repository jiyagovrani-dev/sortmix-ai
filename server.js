
require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const recommendationRoute = require("./recommendation-route");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/recommendation", recommendationRoute);
const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(
                new Error("Please upload a JPG, PNG or WEBP image.")
            );
        }
    }
});

if (!process.env.GEMINI_API_KEY) {
    console.error(
        "Missing GEMINI_API_KEY. Check your .env file."
    );
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

// Test whether the backend is running
app.get("/", (req, res) => {
    res.send("SortMix AI backend is running 🌱");
});

// Identify the uploaded image
app.post(
    "/api/identify",
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Please upload an image."
                });
            }

            
const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-3.6-flash"
});

            

            const imagePart = {
                inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype
                }
            };

            const prompt = `
Identify the main visible household item for SortMix.

Choose exactly one category:
computer, phone, tube, battery, plastic, paper, clothes, other.

Return only valid JSON:
{
  "item": "plastic",
  "itemName": "Plastic bottle",
  "confidence": "high",
  "description": "A plastic bottle is visible."
}

Rules:
- Use only the allowed categories.
- Confidence must be high, medium, or low.
- If unclear, choose other and low confidence.
- Do not guess chemical contents or recyclability.
- Return JSON only, without Markdown.
`;

            const result = await model.generateContent([
                prompt,
                imagePart
            ]);

            const responseText = result.response.text();

            let identification;

            try {
                identification = JSON.parse(
                    responseText
                        .replace(/```json/gi, "")
                        .replace(/```/g, "")
                        .trim()
                );
            } catch {
                return res.status(502).json({
                    success: false,
                    error:
                        "Unexpected AI response. Please try another photo."
                });
            }

            const allowedItems = [
                "computer",
                "phone",
                "tube",
                "battery",
                "plastic",
                "paper",
                "clothes",
                "other"
            ];

            if (
                !identification ||
                !allowedItems.includes(identification.item) ||
                !["high", "medium", "low"].includes(
                    identification.confidence
                ) ||
                typeof identification.itemName !== "string" ||
                typeof identification.description !== "string"
            ) {
                return res.status(502).json({
                    success: false,
                    error:
                        "The AI returned an invalid identification."
                });
            }

            return res.json({
                success: true,
                identification
            });

        } catch (error) {
            console.error(
                "Identification error:",
                error.message
            );

            const isBusy =
                /503|overloaded|high demand|temporarily unavailable/i
                    .test(error.message || "");

            return res.status(isBusy ? 503 : 500).json({
                success: false,
                error: isBusy
                    ? "The AI service is busy. Please wait a minute and try again."
                    : "Unable to identify this image. Check the backend terminal."
            });
        }
    }
);

// Handle upload and request errors
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        const message =
            error.code === "LIMIT_FILE_SIZE"
                ? "Image too large. Maximum size is 10 MB."
                : "The uploaded image could not be processed.";

        return res.status(400).json({
            success: false,
            error: message
        });
    }

    console.error("Request error:", error.message);

    return res.status(400).json({
        success: false,
        error: error.message || "Something went wrong."
    });
});

app.listen(PORT, () => {
    console.log(
        `SortMix backend running at http://localhost:${PORT}`
    );
});

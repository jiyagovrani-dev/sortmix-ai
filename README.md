# 🌱 SortMix AI — Smart Waste Sorting & Reuse Assistant

SortMix AI helps people identify everyday waste items and discover safer, more sustainable ways to reuse, donate, recycle, or dispose of them.

## 💡 Problem

People often don't know how to dispose of different materials correctly. Batteries and electronic waste need special handling, while usable clothes, paper, and plastic items may have reuse or recycling options.

## ✨ Features

- **AI image identification:** Uses Google's Gemini API to identify an uploaded item.
- **Condition-based guidance:** Offers suggestions based on whether an item is working, repairable, broken, or unknown.
- **Waste recommendations API:** Provides category-based actions and disposal instructions.
- **Nearby destination search:** Opens Google Maps searches for relevant recycling, donation, and collection options.
- **Fallback guidance:** Keeps local recommendations available if the recommendation API is unavailable.
- **AWS SAM component:** Includes a serverless recommendation handler and SAM template.

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Node.js and Express
- Google Gemini API
- AWS Serverless Application Model (AWS SAM)
- Amazon API Gateway and AWS Lambda configuration in the SAM template

## 🏗️ Architecture

1. The user uploads an item image.
2. The Express backend sends the image to Gemini for identification.
3. The frontend displays the identified item and condition-specific guidance.
4. The frontend requests a category-based recommendation from the local Express API.
5. The AWS SAM project contains a corresponding serverless recommendation handler that can be tested separately.

**Current implementation note:** The running frontend calls the local Express recommendation endpoint. The SAM handler has been built and tested separately; deployment to AWS Lambda has not been completed.

## 🚀 Run Locally

### Requirements
- Node.js and npm
- A Gemini API key

### Setup
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with your own credentials:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

4. Start the backend using `node server.js`.
5. Open `index.html` using VS Code Live Server.

Keep `.env` private. Never commit API keys.

## ☁️ AWS SAM

The `sortmix-recommendations/` directory contains the serverless recommendation handler and its AWS SAM template.

Validate and build from that directory:

```bash
sam validate --template-file template.yaml
sam build --template-file template.yaml
```

AWS deployment has not been performed.

## ⚠️ Disclaimer

Recommendations are general guidance, not verified local facility listings. Confirm local recycling rules and contact collection centres before visiting. Handle damaged batteries and potentially hazardous items with care.

## 🌍 Vision

SortMix AI aims to make sustainable disposal decisions easier by combining AI-powered identification with practical reuse and recycling guidance.

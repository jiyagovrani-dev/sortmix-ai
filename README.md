
# 🌱 SortMix AI

### Smart Waste Identification and Sustainable Disposal Assistant

SortMix AI is an AI-powered web application that helps users identify waste items from images and discover suitable ways to reuse, repair, donate, or recycle them.

## ✨ Features

- 📸 **Image Upload:** Upload an image of a waste item.
- 🤖 **AI Identification:** Uses Google's Gemini API to identify the uploaded item.
- ♻️ **Smart Recommendations:** Provides suggestions based on the item's condition.
- 📍 **Find Nearby Destinations:** Opens Google Maps searches to help users find recycling and donation options.
- 🌍 **Sustainability Focus:** Encourages responsible waste management and reuse.

## 🛠️ Tech Stack

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js, Express.js

**AI:** Google Gemini API

**Other Tools:** Multer, dotenv, CORS, Google Maps

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jiyagovrani-dev/sortmix-ai.git
   ```

2. Open the project folder:

   ```bash
   cd sortmix-ai
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root:

   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=3000
   ```

5. Start the backend:

   ```bash
   node server.js
   ```

6. Open `index.html` using VS Code Live Server.

## 🔐 Security

Keep your API key private. Never upload your `.env` file or share your API key publicly.

## 🔮 Future Scope

- Connect users with NGOs and verified recycling centres.
- Enable online donations and relevant service transactions.
- Introduce doorstep waste pickup options.
- Track environmental impact, such as waste diverted from landfills.
- Improve location-based recommendations.

*These are planned enhancements, not currently implemented features.*

## 🌿 Our Mission

To make responsible waste disposal easier by combining AI, technology, and sustainable choices.

---

**Built for Environmental Hacks by WeMakeDevs × AWS.**

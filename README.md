# Shramik-Profile 🇮🇳

> **Where Skill Meets Trust, Where Work Earns Dignity.**

Shramik-Profile is a digital identity and trust platform designed to empower India's informal workforce with a portable professional identity and verified work history.

The platform helps workers build a **Digital Trust Resume** containing their skills, experience, ratings, and professional reputation. It also helps families, societies, and enterprises discover and hire workers through structured profiles and trust signals.

## 🚀 Features

- 👷 Digital worker profiles
- ⭐ Verified ratings and reviews
- 🔎 Worker search and filtering
- 📍 Location-based worker discovery
- 🏠 Family hiring flow
- 🏢 Society management
- 🏭 Enterprise hiring
- 📱 Mobile-friendly interface
- 🇮🇳 Hindi / regional-language support
- 🔊 Read-aloud and Easy Mode
- 📊 Worker experience and trust information
- 🔐 Role-based user flows

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API

### Data Storage
- JSON-based storage

### Deployment
- Render

## 📂 Project Structure

```text
Shramik-Profile/
│
├── backend/
│   ├── data/
│   │   ├── workers.json
│   │   └── contact-submissions.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── Dockerfile.api
├── docker-compose.yml
├── render.yaml
├── package.json
├── package-lock.json
└── README.md

💻 Running the Project Locally
Follow these steps to run Shramik-Profile on your local machine.

1. Clone the Repository
git clone https://github.com/sarthak291005/Shramik-Profile.git

Move into the project directory:
cd Shramik-Profile


2. Install Dependencies
Install the required frontend dependencies:

npm install
3. Configure Environment Variables

Create a local environment file using the example provided:

cp .env.example .env

Update the values in .env if required.

4. Start the Frontend

Run the Vite development server:

npm run dev

The frontend will be available at:

http://localhost:5173


5. Start the Backend
Open a new terminal window and navigate to the project directory:
cd Shramik-Profile

Start the Express API: 
npm run dev:api


The backend will run on:
http://localhost:8080

You can check whether the backend is running by visiting:
http://localhost:8080/api/health


6. Run Frontend and Backend Together
For the complete application experience, keep both servers running:

Frontend
http://localhost:5173

        ↓

Express API
http://localhost:8080

The frontend communicates with the backend through the available REST API endpoints.


🔨 Development
Create a production build: npm run build

Preview the production build: npm run preview

Run the project's linting checks: npm run lint


🌐 Deployment
The project is currently deployed using Render.
Deployment configuration is maintained in: render.yaml


🎯 Vision
Shramik-Profile aims to turn informal workers into recognized professionals by making their skills, experience, and reputation more visible and portable.

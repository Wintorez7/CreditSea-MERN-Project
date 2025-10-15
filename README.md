🏦 CreditSea Assignment – Full Stack XML Credit Report Processor

🏦 CreditSea Assignment – Full Stack XML Credit Report Processor
🚀 A MERN stack application that processes Experian XML soft credit pull data and generates a structured, interactive credit report dashboard.
📋 Overview

This project was built as part of the CreditSea Full Stack Internship Assignment.
It allows users to upload XML files containing soft credit pull data (from Experian), parse and extract key information such as:

Basic Details: Name, Mobile, PAN, Credit Score

Report Summary: Total Accounts, Active/Closed, Balances, Enquiries

Account Details: Banks, Account Numbers, Balances, Overdues

The data is then stored in MongoDB and displayed beautifully in a React (Vite) frontend dashboard.

🧠 Tech Stack
Layer	Technology Used
Frontend	React + Vite + TailwindCSS + ShadCN UI
Backend	Node.js + Express
Database	MongoDB (via Mongoose)
Parser	fast-xml-parser
File Uploads	multer (in-memory)
Toast & UI Components	ShadCN + Lucide Icons
API Handling	Fetch + React Router + React Query


⚙️ Features

✅ Upload XML credit report file
✅ XML parsed on backend and stored in MongoDB
✅ Clean, responsive React dashboard
✅ Real-time credit score & summary visualization
✅ Download JSON version of parsed report
✅ Robust error handling and toast notifications
✅ Modular backend (controllers, services, middleware)



🧠 Backend API Endpoints
Method	Endpoint	Description
POST	/api/reports/upload	Uploads XML file and parses it
GET	/api/reports	Fetch all stored reports
GET	/api/reports/:id	Fetch report by ID


🔧 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/creditsea-assignment.git
cd creditsea-assignment


2️⃣ Setup Backend
cd backend
npm install


Create .env file:
PORT=3000
MONGO_URI=mongodb+srv://mohankumhar:MK2025@cluster0.uo7g4.mongodb.net/


Start the backend:
npm run dev


Backend will run at:
👉 http://localhost:3000



3️⃣ Setup Frontend
cd ../client
npm install


Create .env file:
VITE_API_URL=http://localhost:3000


Run frontend:
npm run dev



💻 Usage Flow

1️⃣ Go to http://localhost:8080/upload
2️⃣ Drag & drop your XML file (e.g., Sagar_Ugle1.xml)
3️⃣ The file is uploaded → parsed → stored in MongoDB
4️⃣ You are redirected to /report/:id
5️⃣ The dashboard displays your credit report details ✨
6️⃣ Optionally, download the report as JSON


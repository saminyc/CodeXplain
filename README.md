🤖 AI Codebase Explainer

An AI-powered web app that analyzes any public GitHub repository and generates a beginner-friendly explanation of the project.

⸻

🚀 What It Does
	•	🔗 Accepts a GitHub repository URL
	•	📂 Fetches repository files using the GitHub API
	•	🤖 Sends file structure to OpenAI
	•	🧠 Generates an AI explanation of:
	•	What the project does
	•	Tech stack used
	•	Key files and their purpose

⸻

🧠 How It Works

User Input (GitHub URL)
        ↓
Next.js Frontend
        ↓
/api/github → Fetch repo files
        ↓
/api/explain → Send files to OpenAI
        ↓
AI generates explanation
        ↓
Frontend displays results


⸻

🛠️ Tech Stack
	•	Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
	•	Backend: Next.js API Routes
	•	APIs:
	•	GitHub REST API
	•	OpenAI API (gpt-4o-mini)

⸻

📸 Features
	•	Clean UI for repo input
	•	Real-time loading state
	•	Error handling
	•	AI-generated explanations

⸻

⚙️ Setup Instructions

1. Clone the repo

git clone https://github.com/your-username/your-repo.git
cd your-repo


⸻

2. Install dependencies

npm install


⸻

3. Add environment variables

Create a .env.local file:

OPENAI_API_KEY=your_api_key_here


⸻

4. Run the app

npm run dev

Open: http://localhost:3000

⸻

⚠️ Notes
	•	Only works with public GitHub repositories
	•	OpenAI API usage may incur cost
	•	Currently analyzes file structure (not full file content)

⸻

🚀 Future Improvements
	•	📄 Analyze actual file content (deeper explanations)
	•	💬 Chat with repository (AI Q&A)
	•	📁 Click a file → AI explains that file
	•	⚡ Performance optimizations

⸻

📌 Why This Project?

This project demonstrates:
	•	Full-stack development (Next.js frontend + backend)
	•	API integration (GitHub + OpenAI)
	•	Asynchronous data flow
	•	Real-world AI application design

⸻

🧑‍💻 Author

Built by Samin Chowdhury 🚀

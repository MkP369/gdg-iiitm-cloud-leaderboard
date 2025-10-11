# 🏆 IIITM Gwalior Google Cloud Study Jams Leaderboard

A modern, fast application showcasing participants' progress in the Google Cloud Study Jams program at IIITM Gwalior. 

<!-- Project Badges -->
<p align="center">
  <a href="https://gdg-leaderboard.pages.dev">
    <img src="https://img.shields.io/website?up_message=Live&url=https%3A%2F%2Fgdg-leaderboard.pages.dev" alt="Website Status">
  </a>
  <img src="https://img.shields.io/badge/Built%20with-Preact-blue?logo=preact" alt="Built with Preact">
  <img src="https://img.shields.io/badge/Powered%20by-Vite-purple?logo=vite" alt="Powered by Vite">
  <img src="https://img.shields.io/badge/Runtime-Bun-orange?logo=bun" alt="Bun Runtime">
</p>

🔗 **Live:** [gdg-leaderboard.pages.dev](https://gdg-leaderboard.pages.dev)


## Setup and Running Locally

To get the project running on your local machine, follow these steps.

---

## 🧩 Prerequisites

- **Bun** installed on your system  
- A code editor like **Visual Studio Code**

---

## 🚀 1. Clone the Repository

```bash
git clone https://github.com/MkP369/gdg-iiitm-cloud-leaderboard.git
cd gdg-iiitm-cloud-leaderboard
```

---

## 📦 2. Install Dependencies

Install all the necessary packages using Bun.

```bash
bun install
```

---

## ⚙️ 3. Set Up Environment Variables

The script that fetches the data requires a **Google Sheet ID**.

1. Create a new file named `.env` in the root of the project.  
2. Add the following line to the file, replacing the placeholder with your actual Google Sheet ID:

```bash
GOOGLE_SHEET_ID="1X_FycrTud0TiiitmisbestDyOpy9DMM"
```



---

## 🧠 4. Run the Development Server

Start the Vite development server.

```bash
bun run dev
```

The application should now be running locally at 👉 [http://localhost:5173](http://localhost:5173)

---

## 📊 Updating the Leaderboard Data

The leaderboard data is **not fetched live in the browser**.  
Instead, a script connects to the Google Sheet, processes the data, and writes it to a static JSON file that the application uses.

To update the data, run the following command from the project root:

```bash
bun run scripts/processLeaderboard.js
```

This will update the `src/data/leaderboard.json` file.  


---

## ☁️ Deployment

This project is configured for **continuous deployment on Cloudflare Pages**.

- **Automatic Builds:** Every push to the `main` branch automatically triggers a new build and deployment.  
- **Build Command:**  
  ```bash
  bun install && bun run build
  ```
- **Output Directory:** `dist`

Ensure the following environment variables are configured in the **Cloudflare Pages dashboard**:

```bash
BUN_VERSION
GOOGLE_SHEET_ID
```

---


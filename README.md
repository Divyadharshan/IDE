<div align="center">

# 💻 Online IDE

🚀 Welcome to **Online IDE**, a sleek and powerful web-based integrated development environment that lets you **write, compile, and execute code directly in your browser** - anytime, anywhere!

</div>

---

## ✨ Features

- 🧠 **Multi-language Support**: Run code in **C, C++, Python, Java, and JavaScript**.
- 📱 **Responsive Design**: Use it seamlessly across **desktops, tablets, and smartphones**.
- ☁️ **Cloud-Based Execution**: No local setup required — everything runs via secure APIs.

---

## ⚙️ Getting Started

### 📋 Prerequisites

Before running the Online IDE locally, make sure you have:

-  **Node.js** – [Download Node.js](https://nodejs.org/)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Divyadharshan/IDE.git
cd IDE
npm install
```

---

## 🛠️ Environment Setup

Create a `.env` file in the root of the project and add the following variables:

```env
BASEURL=https://judge0-ce.p.rapidapi.com/submissions
API=YOUR_API_KEY
```

> 🔐 **Note**:  
> `BASEURL` is the endpoint for Judge0 code submission.  
> `API` is your **RapidAPI key** for authenticating requests. Keep it safe!

---

## 🏃 Running the Application

To start the development server locally:

```bash
npm start
```

Then open your browser and visit:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Live Demo
 
🔗 [https://ide-lake-two.vercel.app/](https://ide-lake-two.vercel.app/)

---

## 🧑‍💻 Usage

### ✍️ Writing and Running Code

1. 🔽 **Choose** a programming language from the dropdown.
2. 🧾 **Write** your code in the editor.
3. 📥 **Select** if input is required (`Yes/No`).
4. ▶️ **Click** the "Run" button.
5. 📤 **View** the output in real-time below the editor.

---

## 🔌 API Integration (Judge0)

This IDE uses the **Judge0 API** to compile and execute code in the cloud:

- 🛰️ `POST` to **/submissions** with language, source code, and input.
- 🔁 Poll the **token** to get results using `GET /submissions/{token}`.
- 🛡️ Authenticated using your **RapidAPI key** in headers.

---

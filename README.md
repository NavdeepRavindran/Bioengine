# 🚀 Bioengine

Bioengine is an AI-powered **NASA Bioscience Knowledge Dashboard** that helps researchers, astronauts, and mission planners explore and understand insights from 600+ NASA bioscience publications.

It summarizes dense scientific studies into **interactive, searchable insights**—making it easier to prepare for safe and healthy long-duration space missions.

---

## ✨ Features

* 📊 **Interactive Dashboard** – Explore studies via search, filters, and graphs.
* 🧠 **AI-Powered Summaries** – Generates simplified and detailed summaries of research papers.
* 🔍 **Keyword & Year Search** – Quickly find studies by topic, author, or year.
* 🌌 **Mission Insights** – Highlights risks like radiation, immune response, bone/muscle loss.
* 🔗 **Knowledge Graphs** – Visualize relationships between experiments and outcomes.

---

## 🛠️ Tech Stack

* **Frontend**: React + TailwindCSS
* **Backend / API**: Node.js / Express
* **Database**: MongoDB (for metadata + summaries)
* **AI / NLP**: OpenAI / Hugging Face Transformers
* **Visualization**: D3.js / Recharts

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/NavdeepRavindran/Bioengine.git
cd Bioengine
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```env
HF_API_TOKEN=your_hugging_face_token
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_database_url
```

*(Never commit your `.env` file — it’s in `.gitignore`)*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

MIT License – feel free to use and adapt!

---

## 🌍 NASA Space Apps Challenge 2025

This project was developed as part of the **NASA Space Apps Challenge 2025** to help democratize access to NASA’s bioscience research.

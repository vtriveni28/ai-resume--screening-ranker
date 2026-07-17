# 🤖 AI Resume Screening & Ranking System

An AI-powered Resume Screening and Ranking System that helps recruiters automatically analyze, score, and rank resumes against a Job Description (JD). The system extracts candidate information, compares resumes with the JD using NLP techniques, and provides recruiter-friendly recommendations through an interactive dashboard.

---

## 🚀 Features

### 📄 Resume Parsing
- Supports PDF and DOCX resumes
- Extracts candidate details automatically
- Parses:
  - Name
  - Email
  - Phone
  - Skills
  - Education
  - Experience

---

### 🧠 AI Resume Ranking

Uses NLP-based semantic similarity and hybrid scoring to compare resumes with the Job Description.

Ranking is based on:

- Skill Match
- Experience Match
- Education Match
- Semantic Similarity

Each candidate receives:

- Overall Match Score
- Ranking Position
- Recommendation
  - Highly Recommended
  - Recommended
  - Not Recommended

---

### 📊 Recruiter Dashboard

Modern SaaS-style interface including:

- Resume Upload
- Job Description Input
- AI Ranking Table
- Candidate Details Modal
- Match Scores
- Recruiter Recommendations

---

### 🎓 Smart Education Extraction

Automatically detects:

- Degree
- College/University
- CGPA
- Duration

Example:

Bachelor of Technology in Computer Science & Engineering (AI & ML)

Institution:
XYZ Institute of Technology

CGPA:
8.41

Duration:
Nov 2022 – May 2026

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Icons

### Backend

- Python
- FastAPI

### AI / NLP

- spaCy
- Sentence Transformers
- Scikit-learn

### File Processing

- pdfplumber
- python-docx

---

## 📂 Project Structure

```
AI-Resume-Ranker
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── src
│   ├── api
│   ├── features
│   ├── parsers
│   └── ranking
│
├── tests
├── config
├── app.py
├── requirements.txt
└── README.md
```

---

## ⚙ Installation

### Clone the repository

```bash
git clone https://github.com/vtriveni28/ai-resume-ranker.git
```

### Backend

```bash
python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app:app --reload
```

---

### Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

---

## 📈 Workflow

```
Resume Upload
        │
        ▼
Resume Parsing
        │
        ▼
Information Extraction
        │
        ▼
JD Comparison
        │
        ▼
Hybrid AI Scoring
        │
        ▼
Resume Ranking
        │
        ▼
Recruiter Dashboard
```

---

## 📸 Screenshots

Add screenshots here after deployment.

Example:

- Home Page
- Resume Upload
- AI Ranking
- Candidate Details

---

## 🔮 Future Enhancements

- Authentication
- Resume Database
- Email Notifications
- Multi-JD Management
- Recruiter Analytics
- Cloud Storage
- Interview Scheduling

---

## 👩‍💻 Author

**Triveni**

AI & Machine Learning Engineering Student

GitHub:
https://github.com/vtriveni28

---

## ⭐ If you like this project

Please consider giving the repository a ⭐.

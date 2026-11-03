# 💊 Pharma-Pulse: 15-Day Strategic Exam Mastery Dashboard

Designed specifically for **MBBS, Pharmacy, and Medical Graduates** preparing for Pharmacology university exams under intense time constraints (15 days), using **KD Tripathi** and **Shanbhag (4th Ed)** as primary benchmarks.

---

## 🚀 Quick Start (Zero Setup Needed)

You have two convenient ways to use this dashboard:

### Option 1: Instant Browser Launch (Zero Installation)
Simply **double-click** `index.html` in your file explorer. It opens directly in Chrome, Edge, Safari, or Firefox with full offline capabilities!

### Option 2: Live Local Server (With Markdown Disk Syncing)
If you want edits made in the browser to sync directly back to your local `.md` files on disk:
```bash
node server.js
```
Then visit: **`http://localhost:3000`** in your browser.

---

## 🧠 Strategic Architecture (World-Class UX for Anti-Panic)

### 1. 🛡️ The 80/20 "Smart Play" Triage Switch
Medical students often panic when they realize they cannot read all 1,000+ pages of KD Tripathi. The dashboard features a persistent mode switcher:
- **`🛡️ Pass & Secure (80/20)`**: Focuses exclusively on the ~40 core prototype drugs and high-frequency "Give Reasons Why" questions that account for **~75% of university exam marks**.
- **`🎯 First Class`**: Standard 85 drugs + high-yield Short Answer Questions (SAQs).
- **`🏆 Distinction`**: Full comprehensive reference with deep classification trees and second-line therapeutics.

### 2. ⚡ Cognitive Load Protection (Anti-Overwhelm)
- **Focus on Today:** Default view shows only *Today's Mission*, keeping cortisol levels down.
- **Built-in Pomodoro Timer (25 min):** With gentle audio chimes to enforce healthy intervals.
- **Zen Mode Toggle:** One-click full-screen focus that hides all headers and progress metrics when reviewing cards.

### 3. 🎮 Dopamine Gamification (Clinical Training Engine)
- **Rank Progression:** Start as *Medical Intern (Lvl 1)* $\to$ *Junior Resident* $\to$ *Senior Resident* $\to$ *Chief Pharmacologist* $\to$ *Professor of Pharmacology (Lvl 5)*.
- **Daily Boss Battles:** Defeat 15 unique system bosses (e.g., *The Muscarinic Overlord*, *The Peptidoglycan Golem*) by solving 5 rapid-fire university questions (+200 XP).
- **Exam Readiness Radar (%):** A transparent score that measures actual mastery of active recall cards and core milestones.

---

## 📂 Live Markdown Syllabus System (`/content`)

All syllabus content and drills are stored in human-readable, easily editable Markdown files:

```
Bread Exam/
├── content/
│   ├── days/
│   │   ├── day-01.md  (General Pharmacology)
│   │   ├── day-02.md  (ANS: Cholinergic)
│   │   ├── ...
│   │   └── day-15.md  (Mock Exam & Classification Sprint)
│   └── drills/
│       ├── drugs-of-choice.md            (50 Core DOCs)
│       ├── antidotes.md                  (30 Specific Antidotes)
│       ├── reasons-why.md                (50 Essential University SAQs)
│       └── high-yield-classifications.md (Core Tree Diagrams)
├── anki/
│   ├── pharma_high_yield_anki_deck.csv   (Ready-to-import Anki CSV)
│   └── HOW_TO_IMPORT_ANKI.md             (Step-by-step import guide)
├── index.html                            (Interactive Dashboard Web App)
├── server.js                             (Lightweight Node sync server)
├── KD Tripathy Pharma .pdf               (Textbook Reference)
└── Shanbaag 4th Ed .pdf                  (High-Yield Companion)
```

### How to Customize Content:
1. **Via the Web App:** Click **`✏️ Edit .md Notes`** on any day's screen, modify notes or paste your university's past questions, and click **Save**.
2. **Via Text Editor:** Open any file in `content/days/` or `content/drills/` using Notepad, VS Code, or Obsidian and save.

---

## 🎴 Anki Flashcard System

A pre-built deck containing **47+ essential active recall cards** (Drugs of Choice, Antidotes, and "Give Reasons Why" rationales) is ready in:
`anki/pharma_high_yield_anki_deck.csv`

### How to Import:
1. Open **Anki Desktop** $\rightarrow$ Click **File** $\rightarrow$ **Import...**
2. Select `anki/pharma_high_yield_anki_deck.csv`.
3. Check the box **"Allow HTML in fields"**.
4. Click **Import**. (Full guide available in [`anki/HOW_TO_IMPORT_ANKI.md`](./anki/HOW_TO_IMPORT_ANKI.md)).

---

## 📅 The 15-Day Master Study Plan

| Day | Topic | Textbook Chapters |
|:---|:---|:---|
| **Day 1** | **General Pharma:** Pharmacokinetics, Dynamics, Enzyme Inducers/Inhibitors | Shanbhag Ch 1–4; KDT Sec 1 |
| **Day 2** | **ANS 1:** Cholinergic, Organophosphates, Atropine, Myasthenia Gravis | Shanbhag Ch 5–9; KDT Sec 2 |
| **Day 3** | **ANS 2:** Adrenergic, Beta-blockers, Dale's Reversal, Glaucoma | Shanbhag Ch 10–13; KDT Sec 2 |
| **Day 4** | **CVS 1:** Hypertension (A-B-C-D), Antianginal, Nitrates | Shanbhag Ch 23–26; KDT Sec 8 |
| **Day 5** | **CVS 2:** Heart Failure, Digoxin, Diuretics, Antiarrhythmics | Shanbhag Ch 27–30; KDT Sec 8, 9 |
| **Day 6** | **CNS 1:** Benzodiazepines, Antiepileptics (Phenytoin, Valproate), Status Epilepticus | Shanbhag Ch 14–17; KDT Sec 6 |
| **Day 7** | **CNS 2 & Autacoids:** Morphine, Paracetamol, Aspirin, Gout, Antipsychotics | Shanbhag Ch 18–22; KDT Sec 3, 6 |
| **Day 8** | **Antimicrobials 1:** Penicillins, Cephalosporins, Aminoglycosides, Macrolides | Shanbhag Ch 39–43; KDT Sec 12 |
| **Day 9** | **Antimicrobials 2:** Fluoroquinolones, Anti-TB (HRZES), Antifungals | Shanbhag Ch 44–47; KDT Sec 12 |
| **Day 10** | **Chemo & Blood:** Antimalarials (ACT), Methotrexate, Heparin vs Warfarin | Shanbhag Ch 31–33, 48, 50 |
| **Day 11** | **Endocrine 1:** Diabetes (Insulin, Metformin, SGLT2i), Corticosteroids | Shanbhag Ch 34, 38; KDT Sec 5 |
| **Day 12** | **Endocrine 2 & Resp:** Thyroid, OCPs, Bronchial Asthma (Relievers vs Controllers) | Shanbhag Ch 35–37, 51 |
| **Day 13** | **GIT & Toxicology:** Peptic Ulcer (PPIs), Antiemetics, Chelating Agents (BAL, EDTA) | Shanbhag Ch 52–54; KDT Sec 11, 13 |
| **Day 14** | **Consolidation:** 50 Drugs of Choice, 30 Antidotes, Top 50 "Explain Why" | Consolidated Revision |
| **Day 15** | **Mock University Exam:** 3-Hour Paper Simulation & Classification Speed Redraw | Model Papers & Final Polish |

---
*Created for rapid retention and calm exam mastery.*


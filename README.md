# 💊 Pharma-Pulse: 15-Day Strategic Exam Mastery Dashboard

Designed specifically for **MBBS Students & Medical Graduates** preparing for Pharmacology university examinations under tight time constraints (15 days), using **KD Tripathi** and **Shanbhag (4th Ed)** as benchmarks.

---

## 🚀 Quick Start (Zero Setup Needed)

You have two convenient ways to use this dashboard:

### Option 1: Instant Browser Launch (Zero Installation)
Simply **double-click** `index.html` in your file explorer. It opens directly in Chrome, Edge, Safari, or Firefox with full offline capabilities! All 73 community classification charts and 82 active recall flashcards work 100% offline.

### Option 2: Live Local Server (With Markdown Disk Syncing)
If you want edits made in the browser to sync directly back to your local `.md` files on disk:
```bash
node server.js
```
Then visit: **`http://localhost:3000`** in your browser.

---

## 🧠 Strategic Architecture (World-Class UX for Medical Students)

### 1. 🛡️ The 80/20 "Smart Play" Triage Switch
Medical students often freeze when trying to read 1,000+ pages of KD Tripathi. The dashboard features a persistent mode switcher:
- **`🛡️ Pass & Secure (80/20)`**: Focuses exclusively on the ~40 core prototype drugs, top classifications, and high-frequency "Give Reasons Why" questions that account for **~75% of university exam marks**.
- **`🎯 First Class`**: Standard 85 drugs + high-yield Short Answer Questions (SAQs).
- **`🏆 Distinction`**: Full comprehensive reference with deep classification trees and second-line therapeutics.

### 2. 📷 The Community Classification Atlas (73 Charts • 1,074 Occlusion Boxes)
Integrated directly from the community deck **`Drugs Classification and Shizz.apkg`**:
- **73 Visual Classification Diagrams** covering all 14 organ systems.
- **In-Browser Interactive Occlusion**: Click any yellow box on a diagram to test whether you recall the hidden drug name or receptor!
- **Study Mode**: Inspect high-resolution unmasked diagrams for quick pre-exam visual memory.
- **Day-Specific Mapping**: Every day's mission automatically surfaces the exact classification charts matching today's syllabus (e.g. Day 2 & 3 surface all 6 ANS charts).

### 3. ⚡ Cognitive Load Protection (Anti-Overwhelm Protocol)
- **Focus on Today:** Default view shows only *Today's Mission*, keeping cortisol levels down.
- **Built-in Pomodoro Timer (25 min):** With audio chimes to enforce structured focus.
- **Zen Mode Toggle:** One-click full-screen focus that hides all headers and progress metrics when reviewing cards.

### 4. 🎮 Dopamine Gamification (Clinical Training Engine)
- **Rank Progression:** Start as *Medical Intern (Lvl 1)* $\to$ *Junior Resident* $\to$ *Senior Resident* $\to$ *Chief Pharmacologist* $\to$ *Professor of Pharmacology (Lvl 5)*.
- **Daily Boss Battles:** Defeat 15 unique system bosses (e.g., *The Muscarinic Overlord*, *The Peptidoglycan Golem*) by solving 5 rapid-fire university questions (+200 XP).
- **Exam Readiness Radar (%):** Transparent score combining milestone checklists, card mastery, and boss victories.

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
│       ├── reasons-why.md                (45 Essential University SAQs)
│       └── high-yield-classifications.md (Core ASCII Tree Diagrams)
├── anki/
│   ├── Drugs_Classification_and_Shizz.apkg (Community Image Occlusion Deck, 673 cards)
│   ├── pharma_high_yield_anki_deck.csv   (82 Day-tagged active recall cards)
│   ├── classification_images/            (73 High-res classification charts + SVG masks)
│   └── HOW_TO_IMPORT_ANKI.md             (Step-by-step import & filtered deck guide)
├── index.html                            (Single-Page Interactive Dashboard Web App)
├── server.js                             (Lightweight Node sync server)
├── KD Tripathy Pharma .pdf               (Textbook Reference)
└── Shanbaag 4th Ed .pdf                  (High-Yield Companion)
```

---

## 🎴 The Dual Anki Ecosystem

### Deck 1: High-Yield Reasoning Deck (`pharma_high_yield_anki_deck.csv`)
- **82 Day-Tagged Cards** (`Day::01` to `Day::15`) covering:
  - 49 "Give Reasons Why" clinical reasoning cards
  - 18 Drug of Choice cards
  - 15 Specific Antidote & Mechanism cards
- Importable into Anki Desktop, AnkiDroid, and AnkiMobile with HTML styling.

### Deck 2: Community Image Occlusion Deck (`Drugs_Classification_and_Shizz.apkg`)
- **673 Image Occlusion Cards** across 14 sub-decks (`01: ANS`, `02: Autacoids`, `03: Cough`, `04: Hormones`, `05: PNS`, `06: CNS`, `07: CVS`, `08: Kidney`, `09: Blood`, `10: GIT`, `11: AMA`, `12: Antiviral etc`, `13: Cancer`, `14: Misc`).
- Pre-mapped to our 15-day timeline: follow [`anki/HOW_TO_IMPORT_ANKI.md`](./anki/HOW_TO_IMPORT_ANKI.md) to study system-by-system without card overload!

---

## 📅 The 15-Day Master Study Plan

| Day | Topic | Textbook Chapters | Community Charts | Active Recall Cards |
|:---|:---|:---|:---|:---|
| **Day 1** | **General Pharma:** Pharmacokinetics, Dynamics, Enzyme Inducers | Shanbhag Ch 1–4; KDT Sec 1 | 1 Chart (`General`) | 5 Cards (`Day::01`) |
| **Day 2** | **ANS 1:** Cholinergic, Organophosphates, Atropine, Myasthenia Gravis | Shanbhag Ch 5–9; KDT Sec 2 | 3 Charts (`ANS`) | 6 Cards (`Day::02`) |
| **Day 3** | **ANS 2:** Adrenergic, Beta-blockers, Dale's Reversal, Glaucoma | Shanbhag Ch 10–13; KDT Sec 2 | 3 Charts (`ANS`) | 5 Cards (`Day::03`) |
| **Day 4** | **CVS 1:** Hypertension (A-B-C-D), Antianginals, Nitrates | Shanbhag Ch 23–26; KDT Sec 8 | 4 Charts (`CVS`) | 5 Cards (`Day::04`) |
| **Day 5** | **CVS 2:** Heart Failure, Digoxin, Diuretics, Antiarrhythmics | Shanbhag Ch 27–30; KDT Sec 8, 9 | 3 Charts (`CVS & Renal`) | 5 Cards (`Day::05`) |
| **Day 6** | **CNS 1:** Benzodiazepines, Antiepileptics (Phenytoin, Valproate), PNS | Shanbhag Ch 14–17; KDT Sec 6 | 7 Charts (`CNS & PNS`) | 6 Cards (`Day::06`) |
| **Day 7** | **CNS 2 & Autacoids:** Morphine, Paracetamol, Aspirin, Gout, Antipsychotics | Shanbhag Ch 18–22; KDT Sec 3, 6 | 13 Charts (`CNS & Autacoids`) | 6 Cards (`Day::07`) |
| **Day 8** | **Antimicrobials 1:** Penicillins, Cephalosporins, Aminoglycosides, Macrolides | Shanbhag Ch 39–43; KDT Sec 12 | 6 Charts (`AMA`) | 7 Cards (`Day::08`) |
| **Day 9** | **Antimicrobials 2:** Fluoroquinolones, Anti-TB (HRZES), Antifungals, Antivirals | Shanbhag Ch 44–47; KDT Sec 12 | 5 Charts (`Antiviral & TB`) | 5 Cards (`Day::09`) |
| **Day 10** | **Blood & Chemotherapy:** Anticoagulants, Heparin, Warfarin, Anticancer | Shanbhag Ch 31–33, 48–51; KDT Sec 10, 13 | 7 Charts (`Blood & Cancer`) | 6 Cards (`Day::10`) |
| **Day 11** | **Endocrine 1:** Diabetes (Insulin, Metformin, SGLT2i), Corticosteroids | Shanbhag Ch 34–36; KDT Sec 5 | 6 Charts (`Hormones`) | 5 Cards (`Day::11`) |
| **Day 12** | **Endocrine 2 & Respiratory:** Thyroid, Antithyroid, Sex Hormones, Asthma | Shanbhag Ch 37–38, 52; KDT Sec 4, 5 | 8 Charts (`Hormones & Cough`) | 5 Cards (`Day::12`) |
| **Day 13** | **GIT & Toxicology:** Peptic Ulcer (PPIs), Antiemetics, Laxatives, Heavy Metals | Shanbhag Ch 53–55; KDT Sec 11, 14 | 4 Charts (`GIT`) | 6 Cards (`Day::13`) |
| **Day 14** | **Consolidation Drills:** High-Yield DOC Matrix, Antidote Matrix Sprint | High-Yield Drills | 3 Charts (`Misc`) | 5 Cards (`Day::14`) |
| **Day 15** | **Mock Exam Simulator:** 3-Hour Timed Paper & Weak Spot Review | Complete Syllabus | All Charts Review | 5 Cards (`Day::15`) |

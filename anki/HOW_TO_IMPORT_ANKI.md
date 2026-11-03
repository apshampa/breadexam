# 🎴 The Ultimate Pharmacology Anki Guide for MBBS (15-Day Crunch)

This directory equips you with **two complementary decks** designed specifically for university exam success:

1. **`pharma_high_yield_anki_deck.csv` (82 Active Recall Cards)**
   - Formatted with HTML styling, bullet points, and high-yield keywords.
   - Categorized by **Day (Day 01 to Day 15)** and question type (`HighYield::ExplainWhy`, `Pharma::DOC`, `Pharma::Antidotes`).
   - Covers the guaranteed 25–35 marks of "Give Reasons Why" short-answer questions and clinical choices.

2. **`Drugs_Classification_and_Shizz.apkg` (673 Community Image Occlusion Cards)**
   - The legendary community deck featuring 73 handwritten & textbook classification charts across 14 pharmacology sub-decks.
   - Built with **Image Occlusion Enhanced**: parts of the classification table are hidden by colored blocks, allowing you to drill drug names and class hierarchies.

---

## ⚡ The 15-Day "Anti-Drowning" Study Protocol

> [!WARNING]
> **DO NOT study all 673 cards in the APKG root deck at once!**
> Trying to study 673 cards in 15 days without structure causes review-queue buildup ("Ease Hell") and extreme burnout. Instead, follow this day-by-day sub-deck mapping.

### 📅 Day-by-Day Deck Roadmap

| Day | Topic / System | Target Sub-Deck in APKG | High-Yield CSV Tag |
|:---|:---|:---|:---|
| **Day 1** | General Pharmacology | `Pharmac Uni` (Root) | `Day::01` |
| **Day 2 & 3** | Autonomic Nervous System (Cholinergic & Adrenergic) | `Pharmac Uni::01: ANS` (44 cards, 6 charts) | `Day::02`, `Day::03` |
| **Day 4 & 5** | Cardiovascular System & Diuretics | `Pharmac Uni::07: CVS` (68 cards) + `08: Kidney` (15 cards) | `Day::04`, `Day::05` |
| **Day 6** | Peripheral Nervous System & CNS Sedatives/Epilepsy | `Pharmac Uni::05: PNS` (23 cards) + `06: CNS` (Part 1) | `Day::06` |
| **Day 7** | CNS Opioids & NSAIDs / Autacoids | `Pharmac Uni::02: Autacoids` (49 cards) + `06: CNS` (Part 2) | `Day::07` |
| **Day 8 & 9** | Antimicrobials, Anti-TB, Antivirals & Antifungals | `Pharmac Uni::11: AMA` (54 cards) + `12: Antiviral etc` (49 cards) | `Day::08`, `Day::09` |
| **Day 10** | Blood, Coagulation & Cancer Chemotherapy | `Pharmac Uni::09: Blood` (27 cards) + `13: Cancer` (39 cards) | `Day::10` |
| **Day 11 & 12** | Endocrine, Steroids, Diabetes & Asthma | `Pharmac Uni::04: Hormones` (96 cards) + `03: Cough` (22 cards) | `Day::11`, `Day::12` |
| **Day 13** | Gastrointestinal Tract & Toxicology | `Pharmac Uni::10: GIT` (39 cards) + `14: Misc` (Part 1) | `Day::13` |
| **Day 14** | Consolidation Drills (DOCs, Antidotes, Misc) | `Pharmac Uni::14: Misc` (28 cards) + Filtered Deck `is:due` | `Day::14` |
| **Day 15** | Mock Exam Simulator & Weak Spot Blitz | Filtered Deck `rated:1:1` (Cards you struggled with) | `Day::15` |

---

## 💻 How to Import into Anki

### Option A: Importing the APKG (`Drugs_Classification_and_Shizz.apkg`)
1. Open **Anki Desktop** (or AnkiDroid / AnkiMobile).
2. Simply **double-click** the `Drugs_Classification_and_Shizz.apkg` file, or go to **File $\rightarrow$ Import** and select it.
3. Anki will automatically create the sub-decks (`01: ANS`, `02: Autacoids`, etc.) and import all image files and masks.
4. **How to create a Day-specific Filtered Deck in Anki:**
   - Press `F` (Create Filtered Deck).
   - In Search, type: `deck:"Pharmac Uni::01: ANS"` (replace with today's deck).
   - Set limit to `50` cards.
   - Drill the cards!

### Option B: Importing the CSV (`pharma_high_yield_anki_deck.csv`)
1. Open **Anki Desktop**.
2. Click **File $\rightarrow$ Import...** (or `Ctrl + I`).
3. Select `pharma_high_yield_anki_deck.csv`.
4. Field Mapping:
   - Field 1 $\rightarrow$ `Front`
   - Field 2 $\rightarrow$ `Back`
   - Field 3 $\rightarrow$ `Tags`
5. Check the box **"Allow HTML in fields"** (vital for styling & colors).
6. Click **Import**.

---

## 🌟 Pro-Tip for Medical Students
If you prefer not having to manage Anki settings and algorithms during your exam crunch, simply use our **web dashboard (`index.html`)**:
- All 73 community classification charts are embedded directly in the **Classification Atlas** tab.
- Click **"Test Occlusion"** on any diagram to hide the drug names and click to reveal them interactively!
- All 82 reasoning cards and daily boss battles are ready with one click on your laptop or phone browser.

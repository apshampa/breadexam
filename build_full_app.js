const fs = require('fs');
const { DRUG_USES_DATA, MOA_DIAGRAMS_DATA } = require('./pharma_additions');

const originalHtml = fs.readFileSync('index.html.bak', 'utf8');

// Extract large datasets from originalHtml
function extractConst(name) {
  const startMarker = `const ${name} = [`;
  const startIdx = originalHtml.indexOf(startMarker);
  if (startIdx === -1) throw new Error(`Could not find ${name}`);
  
  // Find closing bracket followed by semicolon
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let i = startIdx + startMarker.length - 1; // points to '['
  
  for (; i < originalHtml.length; i++) {
    const char = originalHtml[i];
    const prevChar = i > 0 ? originalHtml[i - 1] : '';
    
    if (inString) {
      if (char === stringChar && prevChar !== '\\\\') {
        inString = false;
      }
    } else {
      if (char === '"' || char === "'" || char === '\`') {
        inString = true;
        stringChar = char;
      } else if (char === '[' || char === '{') {
        depth++;
      } else if (char === ']' || char === '}') {
        depth--;
        if (depth === 0) {
          // Found end of array
          let endIdx = i;
          while (endIdx < originalHtml.length && originalHtml[endIdx] !== ';') {
            endIdx++;
          }
          return originalHtml.substring(startIdx, endIdx + 1);
        }
      }
    }
  }
  throw new Error(`Failed to balance brackets for ${name}`);
}

console.log('Extracting original datasets...');
const daysDataStr = extractConst('DAYS_DATA');
const flashcardsStr = extractConst('FLASHCARDS');
const atlasDataStr = extractConst('ATLAS_DATA');
const classificationsRaw = extractConst('CLASSIFICATIONS');

// Enhance CLASSIFICATIONS with Corticosteroids
const corticosteroidItem = `      {
        title: "Corticosteroids: Potency & Relative Activity Spectrum",
        badge: "Endocrine Core",
        tree: \`CORTICOSTEROIDS (GLUCOCORTICOIDS vs MINERALOCORTICOIDS)
├── SHORT-ACTING (t½ 8–12 hrs; 1:1 Glucocorticoid:Mineralocorticoid)
│   └── Hydrocortisone (Cortisol) [Anti-inflam: 1 | Na+ retain: 1 | Equiv: 20 mg | Addison Crisis DOC]
├── INTERMEDIATE-ACTING (t½ 18–36 hrs; Predominant Glucocorticoid)
│   ├── Prednisolone [Anti-inflam: 4 | Na+ retain: 0.8 | Equiv: 5 mg | Minimal Change Nephrotic DOC]
│   ├── Methylprednisolone [Anti-inflam: 5 | Na+ retain: 0.5 | Equiv: 4 mg | Pulse therapy in lupus/graft]
│   └── Triamcinolone [Anti-inflam: 5 | Na+ retain: 0 | Equiv: 4 mg | Intra-articular / Topical]
├── LONG-ACTING (t½ 36–54 hrs; Pure Glucocorticoids, Zero Salt Retention)
│   ├── Dexamethasone [Anti-inflam: 25–30 | Na+ retain: 0 | Equiv: 0.75 mg | Cerebral Edema DOC]
│   └── Betamethasone [Anti-inflam: 25–30 | Na+ retain: 0 | Equiv: 0.75 mg | Antenatal fetal lung maturity]
└── MINERALOCORTICOID SPECIALIST (High Na+/H2O Retention)
    └── Fludrocortisone [Anti-inflam: 10 | Na+ retain: 125 | Equiv: 2 mg | Chronic Addison maintenance]\`
      },
`;

const classificationsStr = classificationsRaw.replace(
  'const CLASSIFICATIONS = [',
  'const CLASSIFICATIONS = [\n' + corticosteroidItem
);

console.log('Datasets successfully extracted and enhanced.');

// Now let's build the full clean, minimal black-and-white HTML
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pharma-Pulse | 15-Day Strategic Exam Mastery</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Canvas Confetti for Gamification -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <!-- Marked for markdown preview -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            neutral: {
              850: '#1f1f23',
              925: '#111113',
              950: '#09090b'
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Card Flip 3D Styles */
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    
    /* Clean Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #000000; }
    ::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #404040; }
    
    /* Subtle Pulse */
    @keyframes subtlePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.02); }
    }
    .boss-pulse { animation: subtlePulse 3s infinite ease-in-out; }

    /* Prose markdown overrides for dark mode */
    .prose-invert h1 { font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; margin-top: 1rem; }
    .prose-invert h2 { font-size: 1.1rem; font-weight: 700; color: #f5f5f5; margin-bottom: 0.5rem; margin-top: 0.75rem; }
    .prose-invert h3 { font-size: 0.95rem; font-weight: 600; color: #e5e5e5; margin-bottom: 0.35rem; margin-top: 0.5rem; }
    .prose-invert p { margin-bottom: 0.5rem; color: #d4d4d4; font-size: 0.85rem; line-height: 1.5; }
    .prose-invert ul { list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem; color: #d4d4d4; font-size: 0.85rem; }
    .prose-invert li { margin-bottom: 0.25rem; }
    .prose-invert blockquote { border-left: 3px solid #525252; padding-left: 0.75rem; margin-bottom: 0.5rem; color: #a3a3a3; font-style: italic; }
    .prose-invert code { background: #171717; padding: 0.15rem 0.35rem; border-radius: 0.25rem; font-size: 0.8rem; color: #ffffff; border: 1px solid #262626; }
    .prose-invert table { width: 100%; border-collapse: collapse; margin-bottom: 0.75rem; font-size: 0.8rem; }
    .prose-invert th, .prose-invert td { border: 1px solid #262626; padding: 0.4rem 0.6rem; text-align: left; }
    .prose-invert th { background: #171717; color: #ffffff; font-weight: 600; }
  </style>
</head>
<body class="bg-black text-neutral-100 min-h-screen font-sans antialiased selection:bg-neutral-800 selection:text-white">

  <!-- Top Navigation & Gamification Bar -->
  <header class="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand & Rank -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-base shadow-sm border border-neutral-700">
          <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-bold text-base text-white tracking-tight">Pharma-Pulse</h1>
            <span id="rankBadge" class="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-neutral-900 text-neutral-300 border border-neutral-800">
              Lvl 1 • Intern
            </span>
          </div>
          <div class="flex items-center gap-3 text-xs text-neutral-400">
            <span>⭐ <strong id="xpCount" class="text-white font-bold">0</strong> XP</span>
            <span>🔥 <strong id="streakCount" class="text-white font-bold">1</strong>-Day Streak</span>
          </div>
        </div>
      </div>

      <!-- Center: 80/20 Smart Play Triage Switch -->
      <div class="hidden md:flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        <button onclick="setTriageMode('pass')" id="btnTriagePass" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5">
          <span>🛡️</span> Pass & Secure (80/20)
        </button>
        <button onclick="setTriageMode('first_class')" id="btnTriageStandard" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5">
          <span>🎯</span> First Class
        </button>
        <button onclick="setTriageMode('distinction')" id="btnTriageDistinction" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5">
          <span>🏆</span> Distinction
        </button>
      </div>

      <!-- Right Controls: Timer, Backup, Focus Mode -->
      <div class="flex items-center gap-2">
        
        <!-- Pomodoro Widget -->
        <div class="bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-lg flex items-center gap-2 text-xs">
          <span class="text-neutral-400">⏱️</span>
          <span id="pomoTimer" class="font-mono font-bold text-neutral-200">25:00</span>
          <button onclick="togglePomodoro()" id="btnPomoToggle" class="text-neutral-400 hover:text-white transition">
            ▶
          </button>
          <button onclick="resetPomodoro()" class="text-neutral-500 hover:text-neutral-300 transition text-[10px]">
            ↺
          </button>
        </div>

        <!-- Progress Backup & Restore Button -->
        <button onclick="openProgressModal()" title="Backup or Restore Progress (JSON)" class="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition text-xs font-medium flex items-center gap-1">
          <span>💾</span>
          <span class="hidden lg:inline text-[11px]">Vault</span>
        </button>

        <!-- Zen Focus Mode -->
        <button onclick="toggleFocusMode()" title="Toggle Zen Focus Mode" class="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
        </button>

      </div>
    </div>
  </header>

  <!-- Readiness Progress Bar -->
  <div class="bg-neutral-950 border-b border-neutral-800 px-4 py-2">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <span class="text-neutral-400">Overall Exam Readiness:</span>
        <span id="readinessScore" class="font-bold text-white">0%</span>
        <span id="readinessStatus" class="text-[11px] text-neutral-500 italic">Preparing for takeoff...</span>
      </div>
      <div class="w-full sm:w-96 bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
        <div id="readinessBar" class="bg-white h-full rounded-full transition-all duration-700" style="width: 0%"></div>
      </div>
    </div>
  </div>

  <!-- Main Container -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

    <!-- Tab Navigation -->
    <div class="flex border-b border-neutral-800 gap-2 sm:gap-4 overflow-x-auto pb-1 text-sm">
      <button onclick="switchTab('today')" id="tabBtnToday" class="px-4 py-2.5 font-semibold border-b-2 border-white text-white flex items-center gap-2 whitespace-nowrap">
        <span>📅</span> Today's Mission
      </button>
      <button onclick="switchTab('cards')" id="tabBtnCards" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>⚡</span> Active Recall Cards
        <span id="badgeCardCount" class="text-xs bg-neutral-900 px-2 py-0.5 rounded-full text-neutral-300 border border-neutral-800">47</span>
      </button>
      <button onclick="switchTab('matrix')" id="tabBtnMatrix" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>🧪</span> Drugs of Choice & Antidotes
      </button>
      <button onclick="switchTab('classifications')" id="tabBtnClassifications" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>🌳</span> Classifications & Atlas <span id="badgeAtlasCount" class="text-xs bg-neutral-900 px-2 py-0.5 rounded-full text-neutral-300 border border-neutral-800">73</span>
      </button>
      <button onclick="switchTab('timeline')" id="tabBtnTimeline" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>🗺️</span> 15-Day Map
      </button>
    </div>

    <!-- TAB 1: TODAY'S MISSION -->
    <section id="tabToday" class="space-y-6">
      
      <!-- Day Selector Carousel / Jump Bar -->
      <div class="bg-neutral-950 border border-neutral-800 p-3 rounded-2xl flex items-center justify-between gap-3 overflow-x-auto">
        <div class="flex items-center gap-1.5" id="dayPickerPills">
          <!-- Populated by JS -->
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="jumpPreviousDay()" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold transition">
            ◀ Prev
          </button>
          <button onclick="jumpNextDay()" class="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold transition shadow-sm">
            Next ▶
          </button>
        </div>
      </div>

      <!-- Spaced Repetition (3/5/7) Revision Due Banner -->
      <div id="spacedRevisionBanner" class="hidden"></div>

      <!-- Main Day Card Hero -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left: Objectives, Uses, MOA, Atlas, Pearls, Custom Notes (2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden">

            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div class="flex items-center gap-2">
                <span id="currentDayBadge" class="bg-neutral-900 text-white border border-neutral-700 font-bold px-3 py-1 rounded-full text-xs">
                  DAY 1 of 15
                </span>
                <span id="currentSystemBadge" class="text-xs px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                  General Principles
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="openMarkdownEditor()" class="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition">
                  <span>✏️</span> Edit .md Notes
                </button>
              </div>
            </div>

            <h2 id="currentDayTitle" class="text-2xl font-extrabold text-white tracking-tight mb-2">
              General Pharmacology: Pharmacokinetics & Dynamics
            </h2>

            <!-- Textbook References -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs">
              <div class="bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl flex items-center gap-3">
                <div class="text-xl">📘</div>
                <div>
                  <div class="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Primary High-Yield</div>
                  <div id="refShanbhag" class="text-neutral-200 font-medium">Shanbhag Ch 1 - 4 (pp. 1-38)</div>
                </div>
              </div>
              <div class="bg-neutral-900/60 border border-neutral-800 p-3 rounded-xl flex items-center gap-3">
                <div class="text-xl">📕</div>
                <div>
                  <div class="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Reference / Flowcharts</div>
                  <div id="refKDT" class="text-neutral-200 font-medium">KD Tripathi Section 1 (Ch 1 - 6)</div>
                </div>
              </div>
            </div>

            <!-- Checklist of Objectives -->
            <div class="mt-6">
              <h3 class="text-sm font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between mb-3">
                <span>🎯 Core High-Yield Milestones</span>
                <span id="objectiveProgress" class="text-xs text-neutral-400 font-mono">0 / 5 Complete</span>
              </h3>
              <div id="objectivesList" class="space-y-2.5">
                <!-- Injected via JS -->
              </div>
            </div>

          </div>

          <!-- PROTOTYPE DRUGS & CLINICAL INDICATIONS (FEEDBACK: USES FOR EACH DRUG) -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">💊</span>
                <div>
                  <h3 class="text-sm font-bold text-white uppercase tracking-wider">Key Prototype Drugs & Clinical Uses</h3>
                  <p class="text-xs text-neutral-500">First-line indications, emergency uses, and high-yield clinical pearls for Day <span id="labelDrugUsesDay">1</span></p>
                </div>
              </div>
              <div class="relative w-full sm:w-64">
                <input type="text" id="drugUsesSearchInput" oninput="filterTodayDrugUses()" placeholder="Filter drug or disease..." class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white">
              </div>
            </div>
            <div id="todayDrugUsesList" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- Injected via JS -->
            </div>
          </div>

          <!-- MECHANISM OF ACTION (MOA) FLOWCHARTS (FEEDBACK: MORE MOA DIAGRAMS) -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">🔬</span>
                <div>
                  <h3 class="text-sm font-bold text-white uppercase tracking-wider">Mechanism of Action (MOA) Flowcharts</h3>
                  <p class="text-xs text-neutral-500">Receptor cascades, site of action & potency spectrum</p>
                </div>
              </div>
              <button onclick="toggleMoaSection()" id="btnToggleMoa" class="text-xs text-neutral-400 hover:text-white border border-neutral-800 px-2.5 py-1 rounded-lg bg-neutral-900 transition">
                Collapse ▴
              </button>
            </div>
            <div id="todayMoaContainer" class="space-y-4">
              <!-- Injected via JS -->
            </div>
          </div>

          <!-- Community Classification Diagrams for Today -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 relative">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">📷</span>
                <h3 class="text-sm font-bold text-white uppercase tracking-wider">Today's High-Yield Classification Charts</h3>
              </div>
              <span id="todayAtlasCountBadge" class="text-xs px-2.5 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800 font-semibold">0 Charts</span>
            </div>
            <p class="text-xs text-neutral-500 mb-4">
              Community charts from <strong class="text-neutral-300">"Drugs Classification and Shizz"</strong>. 40%+ of your exam paper asks for these exact classifications.
            </p>
            <div id="todayAtlasThumbGrid" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <!-- Injected via JS -->
            </div>
            <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span class="text-[11px] text-neutral-500">Click any chart to enter Anki-style Interactive Occlusion mode</span>
              <button onclick="switchTab('classifications')" class="text-xs text-neutral-300 hover:text-white font-semibold flex items-center gap-1">
                Explore Full Atlas (73) →
              </button>
            </div>
          </div>

          <!-- High-Yield Pearls -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 relative">
            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <span>💡</span> High-Yield Exam Pearls (Guaranteed Marks)
            </h3>
            <div id="pearlsList" class="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <!-- Injected via JS -->
            </div>
          </div>

          <!-- MY STUDY NOTES & CUSTOM SYLLABUS CARD (MARKDOWN LIVE PREVIEW) -->
          <div id="customNotesCard" class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-3">
            <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">📝</span>
                <div>
                  <h3 class="text-sm font-bold text-white uppercase tracking-wider">My Notes & Custom Syllabus</h3>
                  <span id="customNotesStatusBadge" class="text-[10px] text-neutral-500">Standard Syllabus</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="openMarkdownEditor()" class="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition">
                  ✏️ Edit .md
                </button>
                <button onclick="resetCurrentDayNotes()" id="btnResetCustomNotes" class="hidden px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs border border-neutral-800 transition" title="Reset to original template">
                  ↺ Reset
                </button>
              </div>
            </div>
            <div id="customNotesRenderArea" class="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed overflow-x-auto">
              <!-- Rendered via marked.parse() in JS -->
            </div>
          </div>

        </div>

        <!-- Right: Daily Boss Battle Card (1 col) -->
        <div class="space-y-6">
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 text-center relative overflow-hidden">
            <div class="inline-block p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-4xl mb-3 boss-pulse">
              👾
            </div>
            <div class="text-xs uppercase font-bold tracking-widest text-neutral-400">Daily Boss Battle</div>
            <h3 id="bossName" class="text-xl font-black text-white mt-1">The Kinetic Titan</h3>
            <p class="text-xs text-neutral-400 mt-2 px-2">
              Defeat the daily boss with 5 high-speed university exam questions to claim <strong class="text-white font-bold">+200 XP</strong> and lock in retention!
            </p>

            <!-- Boss Status / Play Button -->
            <div class="mt-6">
              <div id="bossStatusBadge" class="hidden mb-3 text-xs py-1 px-3 rounded-full font-bold bg-neutral-900 text-neutral-200 border border-neutral-700">
                ✅ Boss Defeated!
              </div>
              <button onclick="startBossBattle()" id="btnStartBoss" class="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm shadow-sm transition-all transform hover:scale-[1.01]">
                ⚔️ Enter Boss Arena (5 Questions)
              </button>
            </div>

            <!-- Quick Action Cards below Boss -->
            <div class="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-2 gap-2 text-left">
              <button onclick="openAnkiExporter()" class="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs transition">
                <div class="font-bold text-white">📥 Export Anki</div>
                <div class="text-[10px] text-neutral-500">Download .csv deck</div>
              </button>
              <button onclick="startTodayDeck()" class="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs transition">
                <div class="font-bold text-white flex items-center justify-between">
                  <span>⚡ Today's Cards</span>
                  <span id="quickTodayCardCount" class="text-[10px] bg-neutral-800 text-neutral-200 px-1.5 py-0.2 rounded font-mono">5</span>
                </div>
                <div class="text-[10px] text-neutral-500 mt-0.5">Day <span id="quickTodayDayNum">1</span> active recall</div>
              </button>
            </div>
          </div>

          <!-- Motivational Tip Box -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-5 text-xs text-neutral-400 space-y-2">
            <div class="font-bold text-white flex items-center gap-1.5">
              <span>🧠</span> 15-Day Strategy Rule
            </div>
            <p>
              Don't spend more than 3 hours on primary reading. Real retention happens when answering "Why" questions, studying MOA diagrams, and classifying drugs by memory.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- TAB 2: ACTIVE RECALL FLASHCARDS (DIGITAL ANKI) -->
    <section id="tabCards" class="hidden space-y-6">
      
      <!-- Card Toolbar -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <button onclick="filterCards('today')" id="btnFilterToday" class="px-3 py-1.5 rounded-lg bg-white text-black font-bold flex items-center gap-1.5 shadow-sm">
            <span>📅</span> Today's Deck (Day <span id="labelFilterTodayDay">1</span>: <span id="countTodayCards">0</span>)
          </button>
          <button onclick="filterCards('all')" id="btnFilterAll" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium">
            📚 Cumulative All (<span id="countAll">0</span>)
          </button>
          <button onclick="filterCards('review')" id="btnFilterReview" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium flex items-center gap-1">
            <span>🔄</span> Revision Due (3/5/7: <span id="countReviewCards">0</span>)
          </button>
          <button onclick="filterCards('red')" id="btnFilterRed" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-rose-400 font-medium">
            🔴 Needs Review (<span id="countRed">0</span>)
          </button>
          <button onclick="filterCards('green')" id="btnFilterGreen" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-emerald-400 font-medium">
            🟢 Mastered (<span id="countGreen">0</span>)
          </button>

          <!-- Day Selector Dropdown -->
          <div class="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1">
            <span class="text-neutral-500 text-[11px]">Filter Day:</span>
            <select id="selectCardDay" onchange="filterCardsByDay(this.value)" class="bg-transparent text-neutral-200 text-xs focus:outline-none cursor-pointer">
              <option value="today" class="bg-black text-white">📅 Today's Mission</option>
              <option value="all" class="bg-black text-white">📚 All 15 Days</option>
              <option value="1" class="bg-black text-white">Day 1: General Principles</option>
              <option value="2" class="bg-black text-white">Day 2: ANS Cholinergic</option>
              <option value="3" class="bg-black text-white">Day 3: ANS Adrenergic</option>
              <option value="4" class="bg-black text-white">Day 4: CVS Hypertension</option>
              <option value="5" class="bg-black text-white">Day 5: CVS Heart Failure</option>
              <option value="6" class="bg-black text-white">Day 6: CNS Sedatives & Epilepsy</option>
              <option value="7" class="bg-black text-white">Day 7: CNS Opioids & NSAIDs</option>
              <option value="8" class="bg-black text-white">Day 8: Antimicrobials 1 (Cell Wall)</option>
              <option value="9" class="bg-black text-white">Day 9: Antimicrobials 2 (Anti-TB)</option>
              <option value="10" class="bg-black text-white">Day 10: Chemo, Malaria & Blood</option>
              <option value="11" class="bg-black text-white">Day 11: Endocrine 1 (Diabetes & Steroids)</option>
              <option value="12" class="bg-black text-white">Day 12: Endocrine 2 & Asthma</option>
              <option value="13" class="bg-black text-white">Day 13: GIT & Toxicology</option>
              <option value="14" class="bg-black text-white">Day 14: Consolidation Drills</option>
              <option value="15" class="bg-black text-white">Day 15: Mock Exam Simulator</option>
            </select>
          </div>

          <button onclick="filterCards('why')" id="btnFilterWhy" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium text-[11px]">Explain Why</button>
          <button onclick="filterCards('doc')" id="btnFilterDoc" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium text-[11px]">Drug of Choice</button>
          <button onclick="filterCards('antidote')" id="btnFilterAntidote" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium text-[11px]">Antidotes</button>
        </div>
        
        <div class="flex items-center gap-2">
          <button onclick="openAnkiExporter()" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 border border-neutral-800 flex items-center gap-1.5 transition">
            <span>📥</span> Download Anki (.csv)
          </button>
        </div>
      </div>

      <!-- Flashcard Arena -->
      <div class="max-w-2xl mx-auto space-y-4">
        
        <div class="flex items-center justify-between text-xs text-neutral-400 px-2">
          <span>Card <strong id="currentCardIndex" class="text-white">1</strong> of <strong id="totalCardsCount" class="text-white">47</strong></span>
          <span id="currentCardTag" class="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 text-[10px]">HighYield::ExplainWhy</span>
        </div>

        <!-- The 3D Flip Card Container -->
        <div onclick="flipCurrentCard()" class="perspective-1000 cursor-pointer min-h-[300px]">
          <div id="flipCardInner" class="relative w-full min-h-[300px] transition-transform duration-500 transform-style-3d bg-neutral-950 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-700 shadow-xl">
            
            <!-- Front Face -->
            <div id="cardFront" class="space-y-4">
              <div class="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>QUESTION / CHALLENGE</span>
                <span class="text-neutral-500 text-[10px]">Click or Space to flip ↺</span>
              </div>
              <div id="cardFrontText" class="text-lg sm:text-xl font-bold text-white leading-relaxed pt-2">
                Loading question...
              </div>

              <!-- Hint Fallback Option on Front Face -->
              <div class="pt-2">
                <button onclick="toggleCardHint(event)" id="btnCardHint" class="text-xs text-neutral-400 hover:text-white border border-neutral-800 bg-neutral-900 px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1.5">
                  <span>💡</span> Show Hint Clue
                </button>
                <div id="cardHintBox" class="hidden mt-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed italic"></div>
              </div>
            </div>

            <!-- Back Face (Revealed on flip) -->
            <div id="cardBack" class="hidden space-y-4 border-t border-neutral-800 pt-4">
              <div class="text-xs font-bold uppercase tracking-wider text-white">
                EXAM-STANDARD RATIONALE & KEYWORDS
              </div>
              <div id="cardBackText" class="text-sm sm:text-base text-neutral-200 leading-relaxed space-y-2">
                Loading answer...
              </div>
            </div>

            <!-- Footer Hint -->
            <div class="pt-4 text-center text-xs text-neutral-500">
              <span id="flipPrompt">Click anywhere to flip and see answer</span>
            </div>

          </div>
        </div>

        <!-- Rating Buttons (Spaced Repetition Controls) -->
        <div class="grid grid-cols-3 gap-3">
          <button onclick="rateCurrentCard('red')" class="py-3 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-rose-900/50 hover:border-rose-600 text-rose-300 font-bold text-xs sm:text-sm flex flex-col items-center gap-1 transition">
            <span>🔴 Review Soon [1]</span>
            <span class="text-[10px] font-normal text-rose-400/80">Struggled or blanked</span>
          </button>
          <button onclick="rateCurrentCard('yellow')" class="py-3 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-amber-900/50 hover:border-amber-600 text-amber-300 font-bold text-xs sm:text-sm flex flex-col items-center gap-1 transition">
            <span>🟡 Medium [2]</span>
            <span class="text-[10px] font-normal text-amber-400/80">Partial recall</span>
          </button>
          <button onclick="rateCurrentCard('green')" class="py-3 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-emerald-900/50 hover:border-emerald-600 text-emerald-300 font-bold text-xs sm:text-sm flex flex-col items-center gap-1 transition">
            <span>🟢 Mastered [3]</span>
            <span class="text-[10px] font-normal text-emerald-400/80">Reflex recall (+15 XP)</span>
          </button>
        </div>

        <!-- FALLBACK OPTION FOR FLASHCARDS -->
        <div class="mt-2">
          <button onclick="skipCurrentCard()" class="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition">
            <span>⏭️ Skip / Fallback Option [0 or S]</span>
            <span class="text-[10px] text-neutral-500">(Defers card to end of deck without rating penalty)</span>
          </button>
        </div>

        <!-- Navigation Arrows -->
        <div class="flex items-center justify-between pt-2">
          <button onclick="prevCard()" class="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition">
            ← Previous (Left Arrow)
          </button>
          <button onclick="nextCard()" class="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition">
            Next (Right Arrow) →
          </button>
        </div>

      </div>
    </section>

    <!-- TAB 3: SEARCHABLE DOC & ANTIDOTE MATRIX -->
    <section id="tabMatrix" class="hidden space-y-6">
      
      <!-- Search & Filter Controls -->
      <div class="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:w-96">
          <input type="text" id="matrixSearchInput" oninput="renderMatrixTables()" placeholder="Search condition, drug, or poison (e.g. 'shock', 'heparin')..." class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-white">
          <span class="absolute right-3 top-2.5 text-neutral-500 text-xs">🔍</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <button onclick="toggleMatrixCategory('all')" id="btnMatrixAll" class="px-3 py-1.5 rounded-lg bg-white text-black font-semibold">All</button>
          <button onclick="toggleMatrixCategory('doc')" id="btnMatrixDoc" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium">Drugs of Choice (50)</button>
          <button onclick="toggleMatrixCategory('antidote')" id="btnMatrixAntidote" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium">Antidotes (30)</button>
        </div>
      </div>

      <!-- Results Container -->
      <div id="matrixResultsContainer" class="space-y-6">
        <!-- Rendered via JS -->
      </div>
    </section>

    <!-- TAB 4: HIGH-YIELD CLASSIFICATION TREES -->
    <section id="tabClassifications" class="hidden space-y-6">
      <!-- Top Control Bar -->
      <div class="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- View Toggle (Visual Atlas vs Flowcharts) -->
        <div class="flex items-center bg-black p-1 rounded-xl border border-neutral-800 text-xs w-full md:w-auto">
          <button onclick="setAtlasSubView('visual')" id="btnSubViewVisual" class="px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 bg-white text-black shadow-sm">
            <span>📷</span> Visual Atlas (73 Community Charts)
          </button>
          <button onclick="setAtlasSubView('trees')" id="btnSubViewTrees" class="px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-neutral-200 transition flex items-center gap-1.5">
            <span>✍️</span> Core Quick-Draw Flowcharts (7 Core)
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-80" id="atlasSearchContainer">
          <input type="text" id="atlasSearchInput" oninput="filterAtlas()" placeholder="Search classifications (e.g. 'ANS', 'Cephalosporin', 'Steroid')..." class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-white">
          <span class="absolute right-3 top-2 text-neutral-500 text-xs">🔍</span>
        </div>

      </div>

      <!-- System Filters for Visual Atlas -->
      <div id="atlasFilterPillsContainer" class="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs scrollbar-thin">
        <button onclick="filterAtlasBySystem('all')" id="atlasFilterAll" class="px-3 py-1.5 rounded-lg bg-white text-black font-bold whitespace-nowrap shadow-sm">All (73)</button>
        <button onclick="filterAtlasBySystem('today')" id="atlasFilterToday" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold whitespace-nowrap">📅 Today's Charts</button>
        <button onclick="filterAtlasBySystem('ANS')" id="atlasFilterANS" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">ANS (6)</button>
        <button onclick="filterAtlasBySystem('CVS')" id="atlasFilterCVS" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">CVS & Renal (7)</button>
        <button onclick="filterAtlasBySystem('CNS')" id="atlasFilterCNS" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">CNS & PNS (13)</button>
        <button onclick="filterAtlasBySystem('AMA')" id="atlasFilterAMA" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">Antimicrobials (11)</button>
        <button onclick="filterAtlasBySystem('Hormones')" id="atlasFilterHormones" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">Endocrine & Steroids (12)</button>
        <button onclick="filterAtlasBySystem('Autacoids')" id="atlasFilterAutacoids" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">Autacoids & NSAIDs (7)</button>
        <button onclick="filterAtlasBySystem('Blood')" id="atlasFilterBlood" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">Blood & Cancer (7)</button>
        <button onclick="filterAtlasBySystem('GIT')" id="atlasFilterGIT" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">GIT & Resp (6)</button>
        <button onclick="filterAtlasBySystem('Misc')" id="atlasFilterMisc" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 whitespace-nowrap">Misc & Gen (4)</button>
      </div>

      <!-- VISUAL ATLAS GRID (Primary View) -->
      <div id="visualAtlasGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Rendered via JS -->
      </div>

      <!-- ASCII TREES CONTAINER (Alternative View) -->
      <div id="asciiTreesView" class="hidden space-y-4">
        <div class="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl text-xs text-neutral-300 flex items-center justify-between">
          <div>
            <strong class="text-white">Exam Sheet Strategy:</strong> Drawing clean classification flowcharts on your university theory paper earns instant full marks before examiners even read paragraphs.
          </div>
        </div>
        <div id="classificationsContainer" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Populated via JS -->
        </div>
      </div>
    </section>

    <!-- TAB 5: 15-DAY MASTER TIMELINE MAP -->
    <section id="tabTimeline" class="hidden space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="timelineGrid">
        <!-- Populated via JS -->
      </div>
    </section>

  </main>

  <!-- MODAL: BOSS BATTLE ARENA -->
  <div id="bossModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative space-y-5">
      
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">👾</span>
          <div>
            <h3 id="modalBossName" class="font-bold text-white text-base">The Kinetic Titan</h3>
            <div class="text-[11px] text-neutral-400">Day Boss Battle</div>
          </div>
        </div>
        <button onclick="closeBossModal()" class="text-neutral-500 hover:text-white text-xl">✕</button>
      </div>

      <!-- Boss HP Bar -->
      <div class="space-y-1">
        <div class="flex items-center justify-between text-xs font-semibold">
          <span class="text-neutral-400">Boss HP:</span>
          <span id="bossHpText" class="text-rose-400">100 / 100 HP</span>
        </div>
        <div class="w-full bg-neutral-900 h-3 rounded-full overflow-hidden border border-neutral-800">
          <div id="bossHpBar" class="bg-rose-500 h-full rounded-full transition-all duration-300" style="width: 100%"></div>
        </div>
      </div>

      <!-- Question Box -->
      <div id="bossQuestionArea" class="space-y-4">
        <div class="text-xs text-neutral-300 font-bold uppercase tracking-wider flex items-center justify-between">
          <span id="bossQIndex">Question 1 of 5</span>
          <span class="text-white font-mono">+40 XP per hit</span>
        </div>
        <div id="bossQuestionText" class="text-sm sm:text-base font-semibold text-white leading-relaxed">
          Question loading...
        </div>

        <!-- 4 Multiple Choice Options -->
        <div id="bossOptionsList" class="space-y-2">
          <!-- Populated via JS -->
        </div>

        <!-- Explanation area revealed after answer -->
        <div id="bossExplanationBox" class="hidden p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
          <!-- Populated via JS -->
        </div>
      </div>

      <!-- Victory Screen (Hidden until beat) -->
      <div id="bossVictoryArea" class="hidden text-center py-6 space-y-4">
        <div class="text-6xl animate-bounce">🏆</div>
        <h3 class="text-2xl font-black text-white">BOSS DEFEATED!</h3>
        <p class="text-sm text-neutral-300">
          Outstanding active recall! You earned <strong class="text-white">+200 XP</strong> and secured mastery over today's core concepts.
        </p>
        <button onclick="closeBossModal()" class="py-2.5 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm">
          Claim Victory & Continue
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL: CLASSIFICATION DIAGRAM LIGHTBOX & INTERACTIVE OCCLUSION ARENA -->
  <div id="atlasModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-2 sm:p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-5xl w-full h-[95vh] flex flex-col shadow-2xl relative overflow-hidden">
      
      <!-- Top Modal Bar -->
      <div class="p-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950">
        <div>
          <div class="flex items-center gap-2">
            <h3 id="atlasModalTitle" class="font-bold text-white text-base">ANS Classification Chart</h3>
            <span id="atlasModalBadge" class="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-neutral-900 text-neutral-300 border border-neutral-800">Day 2-3 • ANS</span>
          </div>
          <div id="atlasModalSubtitle" class="text-xs text-neutral-400 mt-0.5">Deck: Pharmac Uni::01: ANS • 10 Interactive Occlusion Cards</div>
        </div>

        <!-- Mode & Occlusion Controls -->
        <div class="flex items-center gap-2 text-xs">
          <!-- Occlusion Mode Toggle -->
          <button onclick="toggleOcclusionMode()" id="btnToggleOcclusion" class="px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-200 border border-neutral-700 font-bold flex items-center gap-1.5 transition">
            <span>⚡</span> <span id="labelOcclusionToggle">Occlusion Mode: ON</span>
          </button>
          
          <button onclick="revealAllOcclusionBoxes()" id="btnRevealAll" class="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-medium">
            👁️ Reveal All
          </button>
          <button onclick="hideAllOcclusionBoxes()" id="btnHideAll" class="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-medium">
            🔒 Hide All
          </button>

          <!-- Zoom Controls -->
          <div class="hidden sm:flex items-center gap-1 bg-neutral-900 px-2 py-1 rounded-lg border border-neutral-800">
            <button onclick="zoomAtlasImage(-0.2)" class="text-neutral-400 hover:text-white font-bold px-1.5">-</button>
            <span id="atlasZoomLabel" class="text-[10px] text-neutral-300 font-mono w-10 text-center">100%</span>
            <button onclick="zoomAtlasImage(0.2)" class="text-neutral-400 hover:text-white font-bold px-1.5">+</button>
            <button onclick="resetAtlasZoom()" class="text-[10px] text-neutral-400 hover:text-white pl-1">↺</button>
          </div>

          <button onclick="closeAtlasModal()" class="text-neutral-400 hover:text-white text-xl p-1 ml-2">✕</button>
        </div>
      </div>

      <!-- Occlusion Progress Bar Banner -->
      <div id="occlusionStatusBanner" class="bg-neutral-900/80 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2 text-neutral-300">
          <span>🎯 Click any yellow box to test your recall:</span>
          <span id="occlusionBoxesCount" class="font-bold text-white">0 / 0 Revealed</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] text-neutral-500">💡 Tip: Recall the drug name aloud before clicking!</span>
        </div>
      </div>

      <!-- Interactive Canvas Area (Scrollable & Zoomable) -->
      <div id="atlasCanvasContainer" class="flex-1 overflow-auto p-4 flex items-center justify-center bg-black relative select-none">
        <div id="atlasStage" class="relative inline-block transition-transform duration-200 origin-center max-w-full">
          <img id="atlasModalImg" src="" alt="Classification Chart" class="max-h-[70vh] w-auto h-auto block rounded-xl shadow-2xl border border-neutral-800">
          <!-- Dynamic Occlusion Overlay Container -->
          <div id="atlasOcclusionOverlay" class="absolute inset-0 pointer-events-none"></div>
        </div>
      </div>

      <!-- Footer Bar with Prev / Next Navigation -->
      <div class="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
        <button onclick="navAtlasModal(-1)" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold flex items-center gap-1.5 transition">
          ◀ Previous Chart
        </button>
        <span id="atlasModalNavIndex" class="text-neutral-400 font-mono text-xs">Chart 1 of 73</span>
        <button onclick="navAtlasModal(1)" class="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold flex items-center gap-1.5 shadow-sm transition">
          Next Chart ▶
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL: MARKDOWN EDITOR (GITHUB PAGES OPTIMIZED & LIVE PREVIEW) -->
  <div id="mdEditorModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-2 sm:p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative space-y-4 max-h-[92vh] flex flex-col">
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-white text-base">✏️ Study Notes Editor (Day <span id="mdModalDayNum">1</span>)</h3>
            <span class="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-800">Markdown Powered</span>
          </div>
          <p class="text-xs text-neutral-400 mt-0.5">Customize your personal syllabus, paste past university questions, and take persistent notes</p>
        </div>
        <button onclick="closeMarkdownEditor()" class="text-neutral-500 hover:text-white text-xl p-1">✕</button>
      </div>

      <!-- Mode Tabs -->
      <div class="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs">
        <button onclick="setMdTab('edit')" id="btnMdTabEdit" class="px-3 py-1.5 rounded-lg bg-white text-black font-semibold">
          ✏️ Edit Notes
        </button>
        <button onclick="setMdTab('preview')" id="btnMdTabPreview" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium">
          👁️ Live Preview
        </button>
        <span class="text-[11px] text-neutral-500 ml-auto hidden sm:inline">Supports Markdown, checklists, tables & formulas</span>
      </div>

      <!-- Editor Container -->
      <div class="flex-1 overflow-hidden min-h-[300px] max-h-[52vh] flex flex-col">
        <textarea id="mdEditorTextarea" oninput="onMdTextareaChange()" class="w-full h-full min-h-[300px] bg-black border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-200 focus:outline-none focus:border-white resize-none leading-relaxed"></textarea>
        <div id="mdEditorPreviewArea" class="hidden w-full h-full min-h-[300px] bg-black border border-neutral-800 rounded-xl p-4 text-xs text-neutral-200 overflow-y-auto leading-relaxed prose prose-invert max-w-none"></div>
      </div>

      <!-- Footer & Action Controls -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-800 text-xs">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button onclick="importMarkdownFile()" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-medium flex items-center gap-1.5 transition">
            <span>📂</span> Import .md
          </button>
          <button onclick="exportMarkdownFile()" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-medium flex items-center gap-1.5 transition">
            <span>📥</span> Export .md
          </button>
          <button onclick="resetMarkdownContent()" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 border border-neutral-800 font-medium transition">
            ↺ Reset
          </button>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span class="text-[10px] text-neutral-500 hidden md:inline">Persistent in browser storage</span>
          <button onclick="closeMarkdownEditor()" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold transition">
            Cancel
          </button>
          <button onclick="saveMarkdownContent()" class="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold shadow-sm transition">
            💾 Save to Browser
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL: PROGRESS BACKUP & RESTORE (VAULT) -->
  <div id="progressModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">💾</span>
          <h3 class="font-bold text-white text-base">Progress Vault & Backup</h3>
        </div>
        <button onclick="closeProgressModal()" class="text-neutral-500 hover:text-white text-xl">✕</button>
      </div>
      <p class="text-xs text-neutral-400 leading-relaxed">
        Your XP, streak, completed objectives, card ratings, and custom notes are stored securely in your browser's local storage.
      </p>
      <div class="space-y-2 pt-2">
        <button onclick="exportProgressBackup()" class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm">
          <span>📥</span> Download Progress Backup (.json)
        </button>
        <button onclick="importProgressBackup()" class="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold text-xs flex items-center justify-center gap-2 transition">
          <span>📤</span> Restore from Backup File
        </button>
      </div>
      <div class="pt-2 text-center text-[10px] text-neutral-600">
        Zero data loss guarantee • Fully persistent offline & on GitHub Pages
      </div>
    </div>
  </div>

  <!-- MODAL: ANKI EXPORT INFO -->
  <div id="ankiExportModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🎴</span>
          <h3 class="font-bold text-white text-base">Download Anki Flashcard Deck</h3>
        </div>
        <button onclick="closeAnkiExporter()" class="text-neutral-500 hover:text-white text-xl">✕</button>
      </div>

      <div class="text-xs text-neutral-300 space-y-4 leading-relaxed">
        
        <!-- Deck 1: High Yield Reasoning CSV -->
        <div class="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-2">
          <div class="flex items-center justify-between">
            <div class="font-bold text-white flex items-center gap-1.5">
              <span>⚡</span> 1. High-Yield Reasoning Deck (.CSV)
            </div>
            <span class="text-[10px] bg-neutral-950 text-neutral-300 px-2 py-0.5 rounded-full font-mono border border-neutral-800">82 Cards • Day 1-15</span>
          </div>
          <p class="text-neutral-400 text-[11px]">
            Contains all "Give Reasons Why", Drugs of Choice, and Antidote cards formatted with Day tags and HTML styling.
          </p>
          <div class="flex items-center justify-end pt-1">
            <button onclick="triggerAnkiDownload()" class="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
              <span>📥</span> Download CSV Deck
            </button>
          </div>
        </div>

        <!-- Deck 2: Community Classification APKG -->
        <div class="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-2">
          <div class="flex items-center justify-between">
            <div class="font-bold text-white flex items-center gap-1.5">
              <span>🖼️</span> 2. Community Classification Deck (.APKG)
            </div>
            <span class="text-[10px] bg-neutral-950 text-neutral-300 px-2 py-0.5 rounded-full font-mono border border-neutral-800">673 Cards • 14 Sub-Decks</span>
          </div>
          <p class="text-neutral-400 text-[11px]">
            The complete <strong>"Drugs Classification and Shizz.apkg"</strong> with Image Occlusion Enhanced cards covering every major system.
          </p>
          <div class="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
            <div class="font-semibold text-neutral-200">💡 15-Day Strategy Warning:</div>
            <div>Don't study all 673 cards at once! Double-click to import, then use <strong>Filtered Decks (F)</strong> for today's system.</div>
          </div>
          <div class="flex items-center justify-end pt-1">
            <a href="anki/Drugs_Classification_and_Shizz.apkg" download class="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 border border-neutral-700 transition">
              <span>📥</span> Download .APKG Deck (8.9 MB)
            </a>
          </div>
        </div>

      </div>

      <div class="pt-2 flex items-center justify-end gap-2 border-t border-neutral-800">
        <button onclick="closeAnkiExporter()" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- EMBEDDED DATA & APPLICATION LOGIC -->
  <script>
    // --- 1. CORE DATA STORE ---
    ${daysDataStr}

    // --- FLASHCARDS DATA (47 High-Yield Cards) ---
    ${flashcardsStr}

    // --- PROTOTYPE DRUGS & CLINICAL USES (FEEDBACK: USES FOR EACH DRUG) ---
    const DRUG_USES_DATA = ${JSON.stringify(DRUG_USES_DATA, null, 2)};

    // --- MECHANISM OF ACTION (MOA) FLOWCHARTS (FEEDBACK: MORE MOA DIAGRAMS & STEROIDS) ---
    const MOA_DIAGRAMS_DATA = ${JSON.stringify(MOA_DIAGRAMS_DATA, null, 2)};

    // --- COMMUNITY CLASSIFICATION ATLAS DATA (73 CHARTS) ---
    ${atlasDataStr}

    // --- CLASSIFICATION TREES DATA ---
    ${classificationsStr}

    // --- 2. STATE INITIALIZATION ---
    let state = {
      currentDay: 1,
      triageMode: 'pass', // 'pass' | 'first_class' | 'distinction'
      xp: 0,
      streak: 1,
      completedObjectives: {}, // { "day-1-0": true }
      cardRatings: {}, // { "c1": "green" }
      bossesDefeated: {}, // { 1: true }
      activeCardIndex: 0,
      cardFilter: 'today',
      isCardFlipped: false,
      pomoSeconds: 25 * 60,
      pomoRunning: false,
      pomoTimerId: null,
      matrixCategory: 'all'
    };

    // Load from localStorage if available (100% Backward Compatible)
    function loadState() {
      try {
        const saved = localStorage.getItem('pharma_pulse_state');
        if (saved) {
          const parsed = JSON.parse(saved);
          state = { ...state, ...parsed };
        }
      } catch (e) {
        console.warn("Could not load state:", e);
      }
    }

    function saveState() {
      try {
        localStorage.setItem('pharma_pulse_state', JSON.stringify({
          currentDay: state.currentDay,
          triageMode: state.triageMode,
          xp: state.xp,
          streak: state.streak,
          completedObjectives: state.completedObjectives,
          cardRatings: state.cardRatings,
          bossesDefeated: state.bossesDefeated
        }));
      } catch (e) {
        console.warn("Could not save state:", e);
      }
    }

    // --- TOAST NOTIFICATIONS ---
    function showToast(message) {
      const existing = document.getElementById('pharmaToast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'pharmaToast';
      toast.className = 'fixed bottom-6 right-6 bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl z-[100] transition-opacity duration-300 flex items-center gap-2 border border-neutral-200';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }

    // --- 3. AUDIO SYNTHESIZER ---
    function playChime(type = 'success') {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } else if (type === 'boss_hit') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(220, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }
      } catch (e) {}
    }

    // --- 4. GAMIFICATION HELPERS ---
    function addXP(amount, reason = "") {
      state.xp += amount;
      updateHeaderStats();
      saveState();
      
      if (amount >= 100 && window.confetti) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#ffffff', '#a3a3a3', '#525252']
        });
      }
    }

    function getRank(xp) {
      if (xp >= 3000) return { title: "Lvl 5 • Professor of Pharmacology", class: "bg-white text-black font-bold" };
      if (xp >= 1800) return { title: "Lvl 4 • Chief Pharmacologist", class: "bg-neutral-900 text-white border-neutral-700" };
      if (xp >= 1000) return { title: "Lvl 3 • Senior Resident", class: "bg-neutral-900 text-neutral-200 border-neutral-800" };
      if (xp >= 400)  return { title: "Lvl 2 • Junior Resident", class: "bg-neutral-900 text-neutral-300 border-neutral-800" };
      return { title: "Lvl 1 • Intern", class: "bg-neutral-900 text-neutral-400 border-neutral-800" };
    }

    function updateHeaderStats() {
      document.getElementById('xpCount').textContent = state.xp;
      document.getElementById('streakCount').textContent = state.streak;
      const rank = getRank(state.xp);
      const rankBadge = document.getElementById('rankBadge');
      rankBadge.textContent = rank.title;
      rankBadge.className = \`text-[10px] px-2 py-0.5 rounded-full font-semibold border \${rank.class}\`;

      // Calculate Readiness Score (%)
      let totalObjCount = 0;
      let doneObjCount = 0;
      DAYS_DATA.forEach(d => {
        d.objectives.forEach((_, idx) => {
          totalObjCount++;
          if (state.completedObjectives[\`day-\${d.day}-\${idx}\`]) doneObjCount++;
        });
      });

      let masteredCards = Object.values(state.cardRatings).filter(r => r === 'green').length;
      let bossesCount = Object.keys(state.bossesDefeated).length;

      let objPct = (doneObjCount / (totalObjCount || 1)) * 50;
      let cardPct = (masteredCards / FLASHCARDS.length) * 30;
      let bossPct = (bossesCount / DAYS_DATA.length) * 20;

      let totalPct = Math.min(100, Math.round(objPct + cardPct + bossPct));
      
      const bar = document.getElementById('readinessBar');
      const score = document.getElementById('readinessScore');
      const status = document.getElementById('readinessStatus');
      
      bar.style.width = \`\${totalPct}%\`;
      score.textContent = \`\${totalPct}%\`;

      if (totalPct >= 75) {
        status.textContent = "Safe Distinction Zone Reached";
        status.className = "text-[11px] text-white font-bold";
      } else if (totalPct >= 50) {
        status.textContent = "Solid Pass / First-Class trajectory";
        status.className = "text-[11px] text-neutral-300 font-semibold";
      } else if (totalPct >= 25) {
        status.textContent = "Gaining steady clinical momentum";
        status.className = "text-[11px] text-neutral-400";
      } else {
        status.textContent = "Preparing for takeoff...";
        status.className = "text-[11px] text-neutral-500 italic";
      }
    }

    // --- SPACED REPETITION (3/5/7 DAYS) ENGINE ---
    function getSpacedReviewDays(currentDay) {
      const intervals = [1, 3, 5, 7];
      const due = [];
      intervals.forEach(intv => {
        const target = currentDay - intv;
        if (target >= 1 && target <= 15) {
          due.push({ interval: intv, day: target });
        }
      });
      return due;
    }

    // --- 5. TRIAGE MODE (SMART PLAY 80/20) ---
    function setTriageMode(mode) {
      state.triageMode = mode;
      saveState();

      const btnPass = document.getElementById('btnTriagePass');
      const btnStd = document.getElementById('btnTriageStandard');
      const btnDist = document.getElementById('btnTriageDistinction');

      const activeClass = "bg-white text-black font-semibold shadow-sm";
      const inactiveClass = "text-neutral-400 hover:text-white";

      btnPass.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'pass' ? activeClass : inactiveClass}\`;
      btnStd.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'first_class' ? activeClass : inactiveClass}\`;
      btnDist.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'distinction' ? activeClass : inactiveClass}\`;

      renderDayPickerPills();
      renderTimeline();
    }

    // --- 6. RENDER DAY VIEW ---
    function renderDayView() {
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];

      document.getElementById('currentDayBadge').textContent = \`DAY \${dayData.day} of 15\`;
      document.getElementById('currentSystemBadge').textContent = dayData.system;
      document.getElementById('currentDayTitle').textContent = dayData.title;
      document.getElementById('refShanbhag').textContent = dayData.shanbhag_ref;
      document.getElementById('refKDT').textContent = dayData.kdt_ref;
      document.getElementById('bossName').textContent = dayData.boss_name;

      // Boss defeated badge
      const isBossDefeated = !!state.bossesDefeated[dayData.day];
      const bossBadge = document.getElementById('bossStatusBadge');
      const bossBtn = document.getElementById('btnStartBoss');
      if (isBossDefeated) {
        bossBadge.classList.remove('hidden');
        bossBtn.textContent = "⚔️ Replay Boss Fight";
      } else {
        bossBadge.classList.add('hidden');
        bossBtn.textContent = "⚔️ Enter Boss Arena (5 Questions)";
      }

      // Spaced Repetition (3/5/7) Revision Due Banner
      renderSpacedRevisionBanner();

      // Objectives Checklist
      const objContainer = document.getElementById('objectivesList');
      objContainer.innerHTML = '';
      let completedInDay = 0;

      dayData.objectives.forEach((obj, idx) => {
        const objKey = \`day-\${dayData.day}-\${idx}\`;
        const isDone = !!state.completedObjectives[objKey];
        if (isDone) completedInDay++;

        const div = document.createElement('div');
        div.className = \`p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer \${isDone ? 'bg-neutral-900 border-neutral-700 text-neutral-200' : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-900/60'}\`;
        div.onclick = () => toggleObjective(dayData.day, idx);

        div.innerHTML = \`
          <input type="checkbox" \${isDone ? 'checked' : ''} class="mt-1 rounded text-white focus:ring-0 bg-neutral-800 border-neutral-700 pointer-events-none">
          <span class="text-xs sm:text-sm font-medium \${isDone ? 'line-through opacity-70 text-neutral-400' : 'text-neutral-200'}">\${obj}</span>
        \`;
        objContainer.appendChild(div);
      });

      document.getElementById('objectiveProgress').textContent = \`\${completedInDay} / \${dayData.objectives.length} Complete\`;

      // Render Prototype Drugs & Uses
      renderTodayDrugUses();

      // Render MOA Flowcharts
      renderTodayMoaDiagrams();

      // High-Yield Pearls
      const pearlsContainer = document.getElementById('pearlsList');
      pearlsContainer.innerHTML = '';
      dayData.pearls.forEach(pearl => {
        const p = document.createElement('div');
        p.className = "flex items-start gap-2 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800";
        p.innerHTML = \`<span class="text-white font-bold shrink-0">⚡</span><span class="text-neutral-200">\${pearl}</span>\`;
        pearlsContainer.appendChild(p);
      });

      // Render Custom Markdown Notes (Live Marked Preview)
      renderCurrentDayNotesCard();

      renderDayPickerPills();
      renderTodayAtlasWidget();
    }

    // --- SPACED REVISION BANNER (1 / 3 / 5 / 7 DAYS) ---
    function renderSpacedRevisionBanner() {
      const banner = document.getElementById('spacedRevisionBanner');
      if (!banner) return;
      const reviewDue = getSpacedReviewDays(state.currentDay);

      if (reviewDue.length === 0) {
        banner.className = "hidden";
        banner.innerHTML = "";
        return;
      }

      banner.className = "bg-neutral-950 border border-neutral-800 p-4 rounded-2xl space-y-3";
      banner.innerHTML = \`
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔄</span>
            <div>
              <h4 class="font-bold text-white text-xs sm:text-sm">Spaced Repetition Due Today (1 / 3 / 5 / 7 Days)</h4>
              <p class="text-[11px] text-neutral-500">Scheduled active recall reinforcement prevents memory decay</p>
            </div>
          </div>
          <button onclick="startReviewDueDeck()" class="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs transition shadow-sm">
            ⚡ Review Due Cards (\${getReviewCardsCount()})
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          \${reviewDue.map(item => {
            const pastDayData = DAYS_DATA.find(d => d.day === item.day);
            return \`
              <div class="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold text-neutral-400">\${item.interval}-Day Interval</span>
                    <span class="text-[10px] font-mono font-bold text-white">Day \${item.day}</span>
                  </div>
                  <div class="font-medium text-neutral-200 text-[11px] mt-1 line-clamp-1">\${pastDayData ? pastDayData.system : 'Pharmacology'}</div>
                </div>
                <button onclick="jumpToDay(\${item.day})" class="mt-2 text-[10px] text-neutral-400 hover:text-white font-semibold text-left">
                  Quick View Day \${item.day} →
                </button>
              </div>
            \`;
          }).join('')}
        </div>
      \`;
    }

    function getReviewCardsCount() {
      const reviewDue = getSpacedReviewDays(state.currentDay);
      const reviewDays = reviewDue.map(r => r.day);
      return FLASHCARDS.filter(c => reviewDays.includes(c.day)).length;
    }

    function startReviewDueDeck() {
      state.cardFilter = 'review';
      switchTab('cards');
      renderCurrentCard();
    }

    function jumpToDay(dayNum) {
      state.currentDay = dayNum;
      saveState();
      renderDayView();
    }

    // --- PROTOTYPE DRUGS & CLINICAL USES RENDERING ---
    let drugUsesSearchQuery = '';
    function filterTodayDrugUses() {
      drugUsesSearchQuery = (document.getElementById('drugUsesSearchInput')?.value || '').toLowerCase().trim();
      renderTodayDrugUses();
    }

    function renderTodayDrugUses() {
      const container = document.getElementById('todayDrugUsesList');
      if (!container) return;
      const labelDay = document.getElementById('labelDrugUsesDay');
      if (labelDay) labelDay.textContent = state.currentDay;
      const drugs = DRUG_USES_DATA[state.currentDay] || [];
      let filtered = drugs;
      if (drugUsesSearchQuery) {
        filtered = drugs.filter(d => 
          d.drug.toLowerCase().includes(drugUsesSearchQuery) ||
          d.class.toLowerCase().includes(drugUsesSearchQuery) ||
          d.uses.toLowerCase().includes(drugUsesSearchQuery) ||
          d.pearl.toLowerCase().includes(drugUsesSearchQuery)
        );
      }
      if (filtered.length === 0) {
        container.innerHTML = \`<div class="col-span-2 p-4 text-center text-xs text-neutral-500">No matching drug uses found for "\${drugUsesSearchQuery}".</div>\`;
        return;
      }
      container.innerHTML = filtered.map(d => \`
        <div class="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 hover:border-neutral-700 transition">
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="font-bold text-white text-xs sm:text-sm">\${d.drug}</span>
              <div class="text-[10px] text-neutral-400 font-medium">\${d.class}</div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-neutral-950 text-neutral-300 border border-neutral-800 font-mono">High-Yield</span>
          </div>
          <div class="text-xs text-neutral-300 whitespace-pre-line leading-relaxed border-t border-neutral-800/80 pt-2">
            \${d.uses.replace(/• (.*?):/g, '• <strong class="text-white">$1:</strong>')}
          </div>
          <div class="text-[11px] text-neutral-400 bg-neutral-950 p-2 rounded-xl border border-neutral-800/60 leading-relaxed">
            <strong class="text-neutral-200">⚡ Exam Pearl:</strong> \${d.pearl}
          </div>
        </div>
      \`).join('');
    }

    // --- MECHANISM OF ACTION (MOA) FLOWCHARTS RENDERING ---
    let isMoaCollapsed = false;
    function toggleMoaSection() {
      isMoaCollapsed = !isMoaCollapsed;
      const container = document.getElementById('todayMoaContainer');
      const btn = document.getElementById('btnToggleMoa');
      if (container) container.classList.toggle('hidden', isMoaCollapsed);
      if (btn) btn.textContent = isMoaCollapsed ? 'Expand ▾' : 'Collapse ▴';
    }

    function renderTodayMoaDiagrams() {
      const container = document.getElementById('todayMoaContainer');
      if (!container) return;
      const diagrams = MOA_DIAGRAMS_DATA[state.currentDay] || [];
      if (diagrams.length === 0) {
        container.innerHTML = \`<div class="p-4 text-center text-xs text-neutral-500">No MOA flowcharts for this day.</div>\`;
        return;
      }
      container.innerHTML = diagrams.map((diag, idx) => \`
        <div class="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div class="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <span class="font-bold text-white text-xs flex items-center gap-2">
              <span class="text-neutral-400">#\${idx + 1}</span> \${diag.title}
            </span>
            <button onclick="copyMoaDiagram(\${state.currentDay}, \${idx})" class="text-[10px] text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
              📋 Copy
            </button>
          </div>
          <pre class="p-4 text-[11px] font-mono text-neutral-200 overflow-x-auto whitespace-pre leading-relaxed bg-black/60">\${diag.diagram}</pre>
        </div>
      \`).join('');
    }

    function copyMoaDiagram(day, idx) {
      const diag = MOA_DIAGRAMS_DATA[day]?.[idx];
      if (diag) {
        navigator.clipboard.writeText(diag.diagram);
        showToast("✓ MOA diagram copied to clipboard");
      }
    }

    // --- MY STUDY NOTES & CUSTOM SYLLABUS CARD RENDERING ---
    function renderCurrentDayNotesCard() {
      const container = document.getElementById('customNotesRenderArea');
      const badge = document.getElementById('customNotesStatusBadge');
      const resetBtn = document.getElementById('btnResetCustomNotes');
      if (!container) return;
      const dayKey = \`custom_day_\${state.currentDay}\`;
      const savedCustom = localStorage.getItem(dayKey);
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];

      if (savedCustom) {
        if (badge) {
          badge.textContent = "Customized Notes (Saved in Browser)";
          badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-white border border-neutral-700";
        }
        if (resetBtn) resetBtn.classList.remove('hidden');
        try {
          container.innerHTML = marked.parse(savedCustom);
        } catch (e) {
          container.innerHTML = \`<pre class="text-xs font-mono whitespace-pre-wrap">\${savedCustom}</pre>\`;
        }
      } else {
        if (badge) {
          badge.textContent = "Standard Syllabus (Unmodified)";
          badge.className = "text-[10px] px-2 py-0.5 rounded-full bg-neutral-950 text-neutral-500 border border-neutral-800";
        }
        if (resetBtn) resetBtn.classList.add('hidden');
        const defaultMd = getDefaultMarkdownForDay(dayData);
        try {
          container.innerHTML = marked.parse(defaultMd);
        } catch (e) {
          container.innerHTML = \`<pre class="text-xs font-mono whitespace-pre-wrap">\${defaultMd}</pre>\`;
        }
      }
    }

    function getDefaultMarkdownForDay(dayData) {
      return \`# Day \${dayData.day}: \${dayData.title}\\n\\n\` +
        \`### 📖 Core References\\n- **Shanbhag (4th Ed):** \${dayData.shanbhag_ref}\\n- **KD Tripathi (Essentials):** \${dayData.kdt_ref}\\n\\n\` +
        \`### 🎯 High-Yield Milestones\\n\` +
        dayData.objectives.map(o => \`- [ ] \${o}\`).join('\\n') +
        \`\\n\\n### 💡 Guaranteed Marks Pearls\\n\` +
        dayData.pearls.map(p => \`> ⚡ \${p}\`).join('\\n>\\n');
    }

    function toggleObjective(day, idx) {
      const key = \`day-\${day}-\${idx}\`;
      if (state.completedObjectives[key]) {
        delete state.completedObjectives[key];
      } else {
        state.completedObjectives[key] = true;
        addXP(20, "Objective completed");
        playChime('success');
      }
      saveState();
      renderDayView();
      updateHeaderStats();
    }

    function renderDayPickerPills() {
      const container = document.getElementById('dayPickerPills');
      container.innerHTML = '';
      const reviewDue = getSpacedReviewDays(state.currentDay);
      const reviewDays = reviewDue.map(r => r.day);

      DAYS_DATA.forEach(d => {
        const isCurrent = d.day === state.currentDay;
        const isDefeated = !!state.bossesDefeated[d.day];
        const isReviewDue = reviewDays.includes(d.day);

        const btn = document.createElement('button');
        btn.onclick = () => {
          state.currentDay = d.day;
          saveState();
          renderDayView();
        };

        btn.className = \`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 \${isCurrent ? 'bg-white text-black shadow-sm' : 'bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border border-neutral-800'}\`;
        btn.innerHTML = \`
          <span>D\${d.day}</span>
          \${isDefeated ? '<span class="text-[10px] text-white">⭐</span>' : ''}
          \${isReviewDue ? '<span class="text-[10px] text-neutral-400" title="Spaced review due today">🔄</span>' : ''}
        \`;
        container.appendChild(btn);
      });
    }

    function jumpNextDay() {
      if (state.currentDay < 15) {
        state.currentDay++;
        saveState();
        renderDayView();
      }
    }

    function jumpPreviousDay() {
      if (state.currentDay > 1) {
        state.currentDay--;
        saveState();
        renderDayView();
      }
    }

    // --- 7. ACTIVE RECALL CARDS LOGIC & FALLBACKS ---
    let skippedDeckCardIds = [];
    let isHintVisible = false;

    function startTodayDeck() {
      state.cardFilter = 'today';
      switchTab('cards');
      renderCurrentCard();
    }

    function filterCardsByDay(val) {
      if (val === 'today') {
        filterCards('today');
      } else if (val === 'all') {
        filterCards('all');
      } else {
        state.cardFilter = 'day_' + val;
        state.activeCardIndex = 0;
        updateFilterButtonStyles();
        renderCurrentCard();
      }
    }

    function getFilteredCards() {
      let cards = [...FLASHCARDS];
      if (state.cardFilter === 'today') {
        cards = cards.filter(c => c.day === state.currentDay);
      } else if (state.cardFilter && state.cardFilter.startsWith('day_')) {
        const targetDay = parseInt(state.cardFilter.split('_')[1], 10);
        cards = cards.filter(c => c.day === targetDay);
      } else if (state.cardFilter === 'review') {
        const reviewDue = getSpacedReviewDays(state.currentDay);
        const reviewDays = reviewDue.map(r => r.day);
        cards = cards.filter(c => reviewDays.includes(c.day));
      } else if (state.cardFilter === 'red') {
        cards = cards.filter(c => state.cardRatings[c.id] === 'red');
      } else if (state.cardFilter === 'green') {
        cards = cards.filter(c => state.cardRatings[c.id] === 'green');
      } else if (state.cardFilter === 'why') {
        cards = cards.filter(c => c.type === 'why');
      } else if (state.cardFilter === 'doc') {
        cards = cards.filter(c => c.type === 'doc');
      } else if (state.cardFilter === 'antidote') {
        cards = cards.filter(c => c.type === 'antidote');
      }
      return cards;
    }

    function updateFilterButtonStyles() {
      const isToday = state.cardFilter === 'today';
      const isAll = state.cardFilter === 'all';
      const isReview = state.cardFilter === 'review';
      const isRed = state.cardFilter === 'red';
      const isGreen = state.cardFilter === 'green';
      const isWhy = state.cardFilter === 'why';
      const isDoc = state.cardFilter === 'doc';
      const isAntidote = state.cardFilter === 'antidote';

      const btnToday = document.getElementById('btnFilterToday');
      const btnAll = document.getElementById('btnFilterAll');
      const btnReview = document.getElementById('btnFilterReview');
      const btnRed = document.getElementById('btnFilterRed');
      const btnGreen = document.getElementById('btnFilterGreen');
      const btnWhy = document.getElementById('btnFilterWhy');
      const btnDoc = document.getElementById('btnFilterDoc');
      const btnAnti = document.getElementById('btnFilterAntidote');
      const selectDay = document.getElementById('selectCardDay');

      const activeClass = "px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs shadow-sm";
      const inactiveClass = "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800";

      if (btnToday) btnToday.className = isToday ? "px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs shadow-sm flex items-center gap-1.5" : inactiveClass;
      if (btnAll) btnAll.className = isAll ? activeClass : inactiveClass;
      if (btnReview) btnReview.className = isReview ? activeClass : inactiveClass;
      if (btnRed) btnRed.className = isRed ? "px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs shadow-sm" : inactiveClass;
      if (btnGreen) btnGreen.className = isGreen ? "px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-sm" : inactiveClass;
      if (btnWhy) btnWhy.className = isWhy ? activeClass : inactiveClass;
      if (btnDoc) btnDoc.className = isDoc ? activeClass : inactiveClass;
      if (btnAnti) btnAnti.className = isAntidote ? activeClass : inactiveClass;

      if (selectDay) {
        if (state.cardFilter && state.cardFilter.startsWith('day_')) {
          selectDay.value = state.cardFilter.split('_')[1];
        } else if (isToday) {
          selectDay.value = 'today';
        } else if (isAll) {
          selectDay.value = 'all';
        }
      }
    }

    function renderCurrentCard() {
      const todayCards = FLASHCARDS.filter(c => c.day === state.currentDay);
      const cards = getFilteredCards();
      const total = cards.length;

      // Update counters
      const labelToday = document.getElementById('labelFilterTodayDay');
      if (labelToday) labelToday.textContent = state.currentDay;
      const countToday = document.getElementById('countTodayCards');
      if (countToday) countToday.textContent = todayCards.length;
      const countReview = document.getElementById('countReviewCards');
      if (countReview) countReview.textContent = getReviewCardsCount();
      const countAll = document.getElementById('countAll');
      if (countAll) countAll.textContent = FLASHCARDS.length;
      const countRed = document.getElementById('countRed');
      if (countRed) countRed.textContent = FLASHCARDS.filter(c => state.cardRatings[c.id] === 'red').length;
      const countGreen = document.getElementById('countGreen');
      if (countGreen) countGreen.textContent = FLASHCARDS.filter(c => state.cardRatings[c.id] === 'green').length;

      // Update quick badge on today screen
      const quickCount = document.getElementById('quickTodayCardCount');
      if (quickCount) quickCount.textContent = todayCards.length;
      const quickDay = document.getElementById('quickTodayDayNum');
      if (quickDay) quickDay.textContent = state.currentDay;
      const badgeNav = document.getElementById('badgeCardCount');
      if (badgeNav) badgeNav.textContent = FLASHCARDS.length;

      updateFilterButtonStyles();

      // Reset hint
      isHintVisible = false;
      const hintBox = document.getElementById('cardHintBox');
      const hintBtn = document.getElementById('btnCardHint');
      if (hintBox) hintBox.classList.add('hidden');
      if (hintBtn) hintBtn.textContent = '💡 Show Hint Clue';

      if (total === 0) {
        document.getElementById('currentCardIndex').textContent = '0';
        document.getElementById('totalCardsCount').textContent = '0';
        document.getElementById('cardFrontText').textContent = "No cards found for this filter/day.";
        document.getElementById('cardBackText').textContent = "";
        document.getElementById('cardBack').classList.add('hidden');
        document.getElementById('flipPrompt').textContent = "Select another day or click 'Cumulative All'";
        return;
      }

      if (state.activeCardIndex >= total) state.activeCardIndex = 0;
      if (state.activeCardIndex < 0) state.activeCardIndex = total - 1;

      const card = cards[state.activeCardIndex];
      document.getElementById('currentCardIndex').textContent = state.activeCardIndex + 1;
      document.getElementById('totalCardsCount').textContent = total;
      document.getElementById('currentCardTag').textContent = \`Day \${card.day} • \${card.tag}\`;
      document.getElementById('cardFrontText').innerHTML = card.front;
      document.getElementById('cardBackText').innerHTML = card.back;

      // Reset flip state
      state.isCardFlipped = false;
      document.getElementById('cardBack').classList.add('hidden');
      document.getElementById('flipPrompt').textContent = "Click anywhere to flip and see answer (or Spacebar)";
    }

    function flipCurrentCard() {
      const back = document.getElementById('cardBack');
      state.isCardFlipped = !state.isCardFlipped;
      if (state.isCardFlipped) {
        back.classList.remove('hidden');
        document.getElementById('flipPrompt').textContent = "Rate recall below (or press 1 / 2 / 3 / S) ⬇";
      } else {
        back.classList.add('hidden');
        document.getElementById('flipPrompt').textContent = "Click anywhere to flip and see answer";
      }
    }

    function toggleCardHint(e) {
      if (e) e.stopPropagation();
      isHintVisible = !isHintVisible;
      const hintBox = document.getElementById('cardHintBox');
      const btn = document.getElementById('btnCardHint');
      if (!hintBox || !btn) return;

      if (isHintVisible) {
        const cards = getFilteredCards();
        if (!cards.length) return;
        const card = cards[state.activeCardIndex];
        const cleanBack = card.back.replace(/<[^>]*>/g, '');
        const firstSentence = cleanBack.split('.')[0] || cleanBack.slice(0, 90);
        hintBox.textContent = \`💡 Clue: \${firstSentence}...\`;
        hintBox.classList.remove('hidden');
        btn.textContent = '🙈 Hide Hint';
      } else {
        hintBox.classList.add('hidden');
        btn.textContent = '💡 Show Hint Clue';
      }
    }

    function rateCurrentCard(rating) {
      const cards = getFilteredCards();
      if (!cards.length) return;
      const card = cards[state.activeCardIndex];

      state.cardRatings[card.id] = rating;
      if (rating === 'green') {
        addXP(15, "Card mastered");
        playChime('success');
      }

      saveState();
      updateHeaderStats();
      nextCard();
    }

    function skipCurrentCard() {
      const cards = getFilteredCards();
      if (!cards.length) return;
      const card = cards[state.activeCardIndex];
      skippedDeckCardIds.push(card.id);
      showToast("⏭️ Card deferred to end of session");
      nextCard();
    }

    function nextCard() {
      const cards = getFilteredCards();
      if (!cards.length) return;
      state.activeCardIndex = (state.activeCardIndex + 1) % cards.length;
      renderCurrentCard();
    }

    function prevCard() {
      const cards = getFilteredCards();
      if (!cards.length) return;
      state.activeCardIndex = (state.activeCardIndex - 1 + cards.length) % cards.length;
      renderCurrentCard();
    }

    function filterCards(type) {
      state.cardFilter = type;
      state.activeCardIndex = 0;
      renderCurrentCard();
    }

    // --- 8. SEARCHABLE MATRIX (DOC & ANTIDOTES) ---
    function toggleMatrixCategory(cat) {
      state.matrixCategory = cat;
      const btnAll = document.getElementById('btnMatrixAll');
      const btnDoc = document.getElementById('btnMatrixDoc');
      const btnAnti = document.getElementById('btnMatrixAntidote');

      const active = "px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs";
      const inactive = "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800";

      btnAll.className = cat === 'all' ? active : inactive;
      btnDoc.className = cat === 'doc' ? active : inactive;
      btnAnti.className = cat === 'antidote' ? active : inactive;

      renderMatrixTables();
    }

    function renderMatrixTables() {
      const query = (document.getElementById('matrixSearchInput').value || '').toLowerCase().trim();
      const container = document.getElementById('matrixResultsContainer');
      container.innerHTML = '';

      let docs = FLASHCARDS.filter(c => c.type === 'doc');
      let antidotes = FLASHCARDS.filter(c => c.type === 'antidote');

      if (query) {
        docs = docs.filter(c => c.front.toLowerCase().includes(query) || c.back.toLowerCase().includes(query));
        antidotes = antidotes.filter(c => c.front.toLowerCase().includes(query) || c.back.toLowerCase().includes(query));
      }

      if (state.matrixCategory === 'all' || state.matrixCategory === 'doc') {
        const docCard = document.createElement('div');
        docCard.className = "bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4";
        docCard.innerHTML = \`
          <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 class="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
              <span>🎯</span> High-Yield Drugs of Choice (\${docs.length})
            </h3>
            <span class="text-xs text-neutral-400 font-mono">Exam Standard</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            \${docs.map(d => \`
              <div class="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition space-y-1">
                <div class="text-xs text-white font-bold">\${d.front.replace(/<[^>]*>/g, '')}</div>
                <div class="text-xs text-neutral-300 leading-relaxed">\${d.back}</div>
              </div>
            \`).join('')}
          </div>
        \`;
        container.appendChild(docCard);
      }

      if (state.matrixCategory === 'all' || state.matrixCategory === 'antidote') {
        const antiCard = document.createElement('div');
        antiCard.className = "bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-sm space-y-4";
        antiCard.innerHTML = \`
          <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 class="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
              <span>🧪</span> Specific Antidotes & Toxicology (\${antidotes.length})
            </h3>
            <span class="text-xs text-neutral-400 font-mono">Viva & MCQ Favorite</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            \${antidotes.map(a => \`
              <div class="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition space-y-1">
                <div class="text-xs text-white font-bold">\${a.front.replace(/<[^>]*>/g, '')}</div>
                <div class="text-xs text-neutral-300 leading-relaxed">\${a.back}</div>
              </div>
            \`).join('')}
          </div>
        \`;
        container.appendChild(antiCard);
      }
    }

    // --- 9. CLASSIFICATION TREES ---
    function renderClassifications() {
      const container = document.getElementById('classificationsContainer');
      container.innerHTML = '';

      CLASSIFICATIONS.forEach(c => {
        const div = document.createElement('div');
        div.className = "bg-neutral-950 border border-neutral-800 rounded-3xl p-5 shadow-sm space-y-3";
        div.innerHTML = \`
          <div class="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h4 class="font-bold text-white text-sm">\${c.title}</h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800 font-mono">\${c.badge}</span>
          </div>
          <pre class="bg-black p-3.5 rounded-xl text-[11px] font-mono text-neutral-200 overflow-x-auto whitespace-pre leading-relaxed border border-neutral-800">\${c.tree}</pre>
        \`;
        container.appendChild(div);
      });
    }

    // --- 9B. COMMUNITY CLASSIFICATION ATLAS & INTERACTIVE OCCLUSION LOGIC ---
    let atlasState = {
      subView: 'visual',
      selectedSystem: 'all',
      searchQuery: '',
      modalIndex: 0,
      zoomLevel: 1.0,
      occlusionMode: true,
      revealedBoxes: new Set()
    };

    function setAtlasSubView(view) {
      atlasState.subView = view;
      const btnV = document.getElementById('btnSubViewVisual');
      const btnT = document.getElementById('btnSubViewTrees');
      const grid = document.getElementById('visualAtlasGrid');
      const pills = document.getElementById('atlasFilterPillsContainer');
      const trees = document.getElementById('asciiTreesView');

      if (view === 'visual') {
        btnV.className = "px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 bg-white text-black shadow-sm";
        btnT.className = "px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-white transition flex items-center gap-1.5";
        grid.classList.remove('hidden');
        pills.classList.remove('hidden');
        trees.classList.add('hidden');
        renderVisualAtlas();
      } else {
        btnT.className = "px-4 py-2 rounded-lg font-bold transition flex items-center gap-1.5 bg-white text-black shadow-sm";
        btnV.className = "px-4 py-2 rounded-lg font-medium text-neutral-400 hover:text-white transition flex items-center gap-1.5";
        grid.classList.add('hidden');
        pills.classList.add('hidden');
        trees.classList.remove('hidden');
        renderClassifications();
      }
    }

    function filterAtlasBySystem(sys) {
      atlasState.selectedSystem = sys;
      const pills = document.querySelectorAll('#atlasFilterPillsContainer button');
      pills.forEach(p => {
        p.className = "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium whitespace-nowrap border border-neutral-800";
      });
      const activeBtn = document.getElementById(\`atlasFilter\${sys.replace('&', '').replace(' ', '')}\`);
      if (activeBtn) {
        activeBtn.className = "px-3 py-1.5 rounded-lg bg-white text-black font-bold whitespace-nowrap shadow-sm";
      }
      renderVisualAtlas();
    }

    function filterAtlas() {
      atlasState.searchQuery = (document.getElementById('atlasSearchInput').value || '').toLowerCase().trim();
      renderVisualAtlas();
    }

    function getFilteredAtlasData() {
      let list = [...ATLAS_DATA];
      if (atlasState.selectedSystem === 'today') {
        list = list.filter(item => item.days && item.days.includes(state.currentDay));
      } else if (atlasState.selectedSystem !== 'all') {
        list = list.filter(item => item.deck && item.deck.includes(atlasState.selectedSystem));
      }

      if (atlasState.searchQuery) {
        list = list.filter(item => 
          item.title.toLowerCase().includes(atlasState.searchQuery) ||
          item.topic.toLowerCase().includes(atlasState.searchQuery) ||
          item.label.toLowerCase().includes(atlasState.searchQuery) ||
          item.deck.toLowerCase().includes(atlasState.searchQuery)
        );
      }
      return list;
    }

    function renderVisualAtlas() {
      const container = document.getElementById('visualAtlasGrid');
      if (!container) return;
      const list = getFilteredAtlasData();
      container.innerHTML = '';

      if (list.length === 0) {
        container.innerHTML = \`<div class="col-span-full py-12 text-center text-xs text-neutral-500">No classification charts found matching your filters.</div>\`;
        return;
      }

      list.forEach((item, idx) => {
        const fullIndex = ATLAS_DATA.indexOf(item);
        const card = document.createElement('div');
        card.className = "bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition flex flex-col justify-between group cursor-pointer shadow-sm";
        card.onclick = () => openAtlasModal(fullIndex);

        card.innerHTML = \`
          <div>
            <div class="h-44 bg-black overflow-hidden relative border-b border-neutral-800">
              <img src="anki/classification_images/\${item.file}" loading="lazy" alt="\${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-100">
              <div class="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white border border-neutral-700">
                ⚡ \${item.cardCount} Occlusions
              </div>
            </div>
            <div class="p-4 space-y-1.5">
              <div class="flex items-center justify-between text-[10px] text-neutral-400">
                <span>Days \${item.days.join(', ')}</span>
                <span class="truncate max-w-[120px]">\${item.label}</span>
              </div>
              <h4 class="font-bold text-white text-xs line-clamp-1 group-hover:text-neutral-200 transition">\${item.title}</h4>
              <p class="text-[11px] text-neutral-500 line-clamp-1">\${item.topic}</p>
            </div>
          </div>
          <div class="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs">
            <span class="text-[11px] text-neutral-400 font-semibold group-hover:text-white transition">Practice Recall →</span>
            <span class="text-[10px] text-neutral-500 font-mono">Chart #\${idx + 1}</span>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function renderTodayAtlasWidget() {
      const container = document.getElementById('todayAtlasThumbGrid');
      const badge = document.getElementById('todayAtlasCountBadge');
      if (!container) return;

      const todayCharts = ATLAS_DATA.filter(item => item.days && item.days.includes(state.currentDay));
      badge.textContent = \`\${todayCharts.length} Charts\`;
      container.innerHTML = '';

      if (todayCharts.length === 0) {
        container.innerHTML = \`<div class="col-span-full py-4 text-center text-xs text-neutral-500">No community classification charts assigned directly to today. Check full atlas!</div>\`;
        return;
      }

      todayCharts.slice(0, 6).forEach(item => {
        const fullIndex = ATLAS_DATA.indexOf(item);
        const div = document.createElement('div');
        div.className = "rounded-xl overflow-hidden bg-black border border-neutral-800 hover:border-neutral-600 transition cursor-pointer relative group";
        div.onclick = () => openAtlasModal(fullIndex);

        div.innerHTML = \`
          <img src="anki/classification_images/\${item.file}" loading="lazy" class="w-full h-24 object-cover group-hover:scale-105 transition">
          <div class="p-1.5 bg-neutral-950 border-t border-neutral-800">
            <div class="text-[10px] font-bold text-white truncate">\${item.title}</div>
            <div class="text-[9px] text-neutral-400">\${item.cardCount} Cards</div>
          </div>
        \`;
        container.appendChild(div);
      });
    }

    function openAtlasModal(index) {
      atlasState.modalIndex = index;
      atlasState.zoomLevel = 1.0;
      atlasState.revealedBoxes.clear();

      const item = ATLAS_DATA[index];
      document.getElementById('atlasModalTitle').textContent = item.title;
      document.getElementById('atlasModalBadge').textContent = \`Days \${item.days.join(', ')} • \${item.label}\`;
      document.getElementById('atlasModalSubtitle').textContent = \`\${item.deck} • \${item.cardCount} Interactive Occlusion Cards\`;
      document.getElementById('atlasModalNavIndex').textContent = \`Chart \${index + 1} of \${ATLAS_DATA.length}\`;

      const img = document.getElementById('atlasModalImg');
      img.src = \`anki/classification_images/\${item.file}\`;

      img.onload = () => {
        renderOcclusionBoxes();
        updateOcclusionCountBanner();
      };

      document.getElementById('atlasModal').classList.remove('hidden');
    }

    function closeAtlasModal() {
      document.getElementById('atlasModal').classList.add('hidden');
    }

    function navAtlasModal(dir) {
      const nextIdx = atlasState.modalIndex + dir;
      if (nextIdx >= 0 && nextIdx < ATLAS_DATA.length) {
        openAtlasModal(nextIdx);
      }
    }

    function toggleOcclusionMode() {
      atlasState.occlusionMode = !atlasState.occlusionMode;
      const label = document.getElementById('labelOcclusionToggle');
      const btn = document.getElementById('btnToggleOcclusion');
      if (atlasState.occlusionMode) {
        label.textContent = "Occlusion Mode: ON";
        btn.className = "px-3 py-1.5 rounded-lg bg-white text-black font-bold flex items-center gap-1.5 transition";
      } else {
        label.textContent = "Occlusion Mode: OFF";
        btn.className = "px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-400 border border-neutral-800 font-bold flex items-center gap-1.5 transition";
      }
      renderOcclusionBoxes();
    }

    function renderOcclusionBoxes() {
      const overlay = document.getElementById('atlasOcclusionOverlay');
      overlay.innerHTML = '';
      if (!atlasState.occlusionMode) return;

      const item = ATLAS_DATA[atlasState.modalIndex];
      const img = document.getElementById('atlasModalImg');
      const natW = item.w || img.naturalWidth || 800;
      const natH = item.h || img.naturalHeight || 500;

      item.rects.forEach((rect, idx) => {
        const [rx, ry, rw, rh] = rect;
        const leftPct = (rx / natW) * 100;
        const topPct = (ry / natH) * 100;
        const widthPct = (rw / natW) * 100;
        const heightPct = (rh / natH) * 100;

        const isRevealed = atlasState.revealedBoxes.has(idx);

        const box = document.createElement('div');
        box.className = \`absolute pointer-events-auto cursor-pointer transition-all duration-200 rounded flex items-center justify-center font-bold text-[10px] select-none \${isRevealed ? 'opacity-0 hover:opacity-20 bg-neutral-500' : 'bg-neutral-800/90 border border-neutral-600 shadow-md text-white'}\`;
        box.style.left = \`\${leftPct}%\`;
        box.style.top = \`\${topPct}%\`;
        box.style.width = \`\${widthPct}%\`;
        box.style.height = \`\${heightPct}%\`;

        if (!isRevealed) {
          box.textContent = \`?\`;
        }

        box.onclick = (e) => {
          e.stopPropagation();
          toggleSingleBox(idx);
        };

        overlay.appendChild(box);
      });
    }

    function toggleSingleBox(idx) {
      if (atlasState.revealedBoxes.has(idx)) {
        atlasState.revealedBoxes.delete(idx);
      } else {
        atlasState.revealedBoxes.add(idx);
        addXP(5, "Occlusion revealed");
        playChime('success');
      }
      renderOcclusionBoxes();
      updateOcclusionCountBanner();
    }

    function revealAllOcclusionBoxes() {
      const item = ATLAS_DATA[atlasState.modalIndex];
      item.rects.forEach((_, idx) => atlasState.revealedBoxes.add(idx));
      renderOcclusionBoxes();
      updateOcclusionCountBanner();
    }

    function hideAllOcclusionBoxes() {
      atlasState.revealedBoxes.clear();
      renderOcclusionBoxes();
      updateOcclusionCountBanner();
    }

    function updateOcclusionCountBanner() {
      const item = ATLAS_DATA[atlasState.modalIndex];
      const total = item.rects.length;
      const rev = atlasState.revealedBoxes.size;
      document.getElementById('occlusionBoxesCount').textContent = \`\${rev} / \${total} Revealed\`;
    }

    function zoomAtlasImage(delta) {
      atlasState.zoomLevel = Math.max(0.6, Math.min(2.5, atlasState.zoomLevel + delta));
      document.getElementById('atlasStage').style.transform = \`scale(\${atlasState.zoomLevel})\`;
      document.getElementById('atlasZoomLabel').textContent = \`\${Math.round(atlasState.zoomLevel * 100)}%\`;
    }

    function resetAtlasZoom() {
      atlasState.zoomLevel = 1.0;
      document.getElementById('atlasStage').style.transform = 'scale(1.0)';
      document.getElementById('atlasZoomLabel').textContent = '100%';
    }

    // --- 10. DAILY BOSS BATTLE LOGIC ---
    let bossState = {
      day: 1,
      currentHp: 100,
      maxHp: 100,
      questionIndex: 0,
      questions: [],
      score: 0
    };

    function startBossBattle() {
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];
      bossState.day = dayData.day;
      bossState.maxHp = dayData.boss_hp || 100;
      bossState.currentHp = bossState.maxHp;
      bossState.questionIndex = 0;
      bossState.questions = dayData.boss_questions;
      bossState.score = 0;

      document.getElementById('modalBossName').textContent = dayData.boss_name;
      document.getElementById('bossQuestionArea').classList.remove('hidden');
      document.getElementById('bossVictoryArea').classList.add('hidden');
      updateBossHpDisplay();
      renderBossQuestion();

      document.getElementById('bossModal').classList.remove('hidden');
    }

    function updateBossHpDisplay() {
      const hpPct = Math.max(0, (bossState.currentHp / bossState.maxHp) * 100);
      document.getElementById('bossHpBar').style.width = \`\${hpPct}%\`;
      document.getElementById('bossHpText').textContent = \`\${bossState.currentHp} / \${bossState.maxHp} HP\`;
    }

    function renderBossQuestion() {
      const q = bossState.questions[bossState.questionIndex];
      document.getElementById('bossQIndex').textContent = \`Question \${bossState.questionIndex + 1} of \${bossState.questions.length}\`;
      document.getElementById('bossQuestionText').textContent = q.q;

      const optsContainer = document.getElementById('bossOptionsList');
      optsContainer.innerHTML = '';
      document.getElementById('bossExplanationBox').classList.add('hidden');

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs sm:text-sm text-neutral-200 transition font-medium";
        btn.textContent = opt;
        btn.onclick = () => submitBossAnswer(idx);
        optsContainer.appendChild(btn);
      });
    }

    function submitBossAnswer(selectedIdx) {
      const q = bossState.questions[bossState.questionIndex];
      const isCorrect = selectedIdx === q.answer;
      const opts = document.querySelectorAll('#bossOptionsList button');

      opts.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
          btn.className = "w-full text-left p-3 rounded-xl bg-neutral-900 border border-white text-white font-bold text-xs sm:text-sm";
        } else if (idx === selectedIdx) {
          btn.className = "w-full text-left p-3 rounded-xl bg-neutral-950 border border-rose-600 text-rose-300 text-xs sm:text-sm";
        } else {
          btn.className = "w-full text-left p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-500 text-xs sm:text-sm opacity-50";
        }
      });

      const expBox = document.getElementById('bossExplanationBox');
      expBox.classList.remove('hidden');
      expBox.innerHTML = \`
        <div class="font-bold \${isCorrect ? 'text-white' : 'text-rose-400'} mb-1">
          \${isCorrect ? '✓ CRITICAL HIT! (+40 XP)' : '✕ MISSED HIT! Boss retaliates.'}
        </div>
        <div class="text-neutral-300">\${q.explanation}</div>
        <button onclick="advanceBossBattle()" class="mt-3 px-4 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs transition">
          Next Question →
        </button>
      \`;

      if (isCorrect) {
        bossState.score++;
        const damage = Math.round(bossState.maxHp / bossState.questions.length);
        bossState.currentHp = Math.max(0, bossState.currentHp - damage);
        updateBossHpDisplay();
        addXP(40, "Boss hit");
        playChime('boss_hit');
      }
    }

    function advanceBossBattle() {
      bossState.questionIndex++;
      if (bossState.questionIndex >= bossState.questions.length) {
        // Battle end
        if (bossState.currentHp <= 20) {
          document.getElementById('bossQuestionArea').classList.add('hidden');
          document.getElementById('bossVictoryArea').classList.remove('hidden');
          state.bossesDefeated[bossState.day] = true;
          addXP(200, "Boss defeated");
          saveState();
          updateHeaderStats();
          renderDayView();
          playChime('success');
        } else {
          alert(\`Boss survived with \${bossState.currentHp} HP! Try again to claim full victory.\`);
          closeBossModal();
        }
      } else {
        renderBossQuestion();
      }
    }

    function closeBossModal() {
      document.getElementById('bossModal').classList.add('hidden');
    }

    // --- 11. MARKDOWN EDITOR (OFFLINE & GITHUB PAGES RESILIENT) ---
    let currentMdEditorTab = 'edit';

    function setMdTab(tab) {
      currentMdEditorTab = tab;
      const btnEdit = document.getElementById('btnMdTabEdit');
      const btnPreview = document.getElementById('btnMdTabPreview');
      const textarea = document.getElementById('mdEditorTextarea');
      const preview = document.getElementById('mdEditorPreviewArea');

      if (tab === 'edit') {
        btnEdit.className = "px-3 py-1.5 rounded-lg bg-white text-black font-semibold";
        btnPreview.className = "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium";
        textarea.classList.remove('hidden');
        preview.classList.add('hidden');
      } else {
        btnEdit.className = "px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium";
        btnPreview.className = "px-3 py-1.5 rounded-lg bg-white text-black font-semibold";
        textarea.classList.add('hidden');
        preview.classList.remove('hidden');
        try {
          preview.innerHTML = marked.parse(textarea.value || '*No content*');
        } catch (e) {
          preview.textContent = textarea.value;
        }
      }
    }

    function onMdTextareaChange() {
      if (currentMdEditorTab === 'preview') {
        setMdTab('preview');
      }
    }

    function openMarkdownEditor() {
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];
      const dayKey = \`custom_day_\${state.currentDay}\`;
      const savedCustom = localStorage.getItem(dayKey);
      const initialContent = savedCustom || getDefaultMarkdownForDay(dayData);

      document.getElementById('mdModalDayNum').textContent = state.currentDay;
      document.getElementById('mdEditorTextarea').value = initialContent;
      setMdTab('edit');
      document.getElementById('mdEditorModal').classList.remove('hidden');
    }

    function closeMarkdownEditor() {
      document.getElementById('mdEditorModal').classList.add('hidden');
    }

    async function saveMarkdownContent() {
      const text = document.getElementById('mdEditorTextarea').value;
      const dayKey = \`custom_day_\${state.currentDay}\`;
      localStorage.setItem(dayKey, text);

      // Attempt to sync to local node server if running (safe catch for static GitHub Pages)
      try {
        await fetch('/api/save-day', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dayId: \`day-\${String(state.currentDay).padStart(2, '0')}\`,
            content: text
          })
        });
      } catch (e) {
        // Offline / GitHub Pages mode
      }

      closeMarkdownEditor();
      playChime('success');
      showToast(\`✓ Notes for Day \${state.currentDay} saved to browser!\`);
      renderCurrentDayNotesCard();
    }

    function exportMarkdownFile() {
      const text = document.getElementById('mdEditorTextarea').value;
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`Day-\${String(state.currentDay).padStart(2, '0')}-Pharmacology-Notes.md\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✓ Markdown notes file downloaded");
    }

    function importMarkdownFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.md,.txt';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            document.getElementById('mdEditorTextarea').value = ev.target.result;
            if (currentMdEditorTab === 'preview') setMdTab('preview');
            showToast(\`✓ Loaded \${file.name}\`);
          };
          reader.readAsText(file);
        }
      };
      input.click();
    }

    function resetMarkdownContent() {
      if (confirm("Reset current notes back to the default syllabus template?")) {
        const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];
        document.getElementById('mdEditorTextarea').value = getDefaultMarkdownForDay(dayData);
        if (currentMdEditorTab === 'preview') setMdTab('preview');
      }
    }

    function resetCurrentDayNotes() {
      if (confirm(\`Reset Day \${state.currentDay} notes back to the default syllabus?\`)) {
        localStorage.removeItem(\`custom_day_\${state.currentDay}\`);
        renderCurrentDayNotesCard();
        showToast(\`✓ Reset Day \${state.currentDay} to default syllabus\`);
      }
    }

    // --- 12. PROGRESS VAULT & SYNC (BACKUP / RESTORE) ---
    function openProgressModal() {
      document.getElementById('progressModal').classList.remove('hidden');
    }

    function closeProgressModal() {
      document.getElementById('progressModal').classList.add('hidden');
    }

    function exportProgressBackup() {
      const data = {
        app: "Pharma-Pulse",
        version: "2.0",
        exportedAt: new Date().toISOString(),
        pharma_pulse_state: JSON.parse(localStorage.getItem('pharma_pulse_state') || '{}'),
        custom_notes: {}
      };
      for (let i = 1; i <= 15; i++) {
        const note = localStorage.getItem(\`custom_day_\${i}\`);
        if (note) data.custom_notes[\`day_\${i}\`] = note;
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`pharma_pulse_progress_\${new Date().toISOString().slice(0, 10)}.json\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      closeProgressModal();
      showToast("✓ Progress vault backup downloaded");
    }

    function importProgressBackup() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const data = JSON.parse(ev.target.result);
              if (data.pharma_pulse_state) {
                localStorage.setItem('pharma_pulse_state', JSON.stringify(data.pharma_pulse_state));
                if (data.custom_notes) {
                  Object.keys(data.custom_notes).forEach(k => {
                    const dayNum = k.replace('day_', '');
                    localStorage.setItem(\`custom_day_\${dayNum}\`, data.custom_notes[k]);
                  });
                }
                loadState();
                updateHeaderStats();
                renderDayView();
                renderCurrentCard();
                closeProgressModal();
                showToast("✓ Progress vault successfully restored!");
              } else {
                alert("Invalid backup file format.");
              }
            } catch (err) {
              alert("Error parsing backup JSON file: " + err.message);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    }

    // --- 13. ANKI CSV EXPORTER ---
    function openAnkiExporter() {
      document.getElementById('ankiExportModal').classList.remove('hidden');
    }

    function closeAnkiExporter() {
      document.getElementById('ankiExportModal').classList.add('hidden');
    }

    function triggerAnkiDownload() {
      let csv = "#separator:Comma\\n#html:true\\n#tags column:3\\n";
      FLASHCARDS.forEach(c => {
        const f = \`"\${c.front.replace(/"/g, '""')}"\`;
        const b = \`"\${c.back.replace(/"/g, '""')}"\`;
        const t = \`"\${c.tag.replace(/"/g, '""')}"\`;
        csv += \`\${f},\${b},\${t}\\n\`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "pharma_high_yield_anki_deck.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addXP(50, "Anki export");
      closeAnkiExporter();
      showToast("✓ Anki CSV deck downloaded");
    }

    // --- 14. POMODORO TIMER ---
    function togglePomodoro() {
      const btn = document.getElementById('btnPomoToggle');
      if (state.pomoRunning) {
        clearInterval(state.pomoTimerId);
        state.pomoRunning = false;
        btn.textContent = '▶';
      } else {
        state.pomoRunning = true;
        btn.textContent = '⏸';
        state.pomoTimerId = setInterval(() => {
          if (state.pomoSeconds > 0) {
            state.pomoSeconds--;
            updatePomoDisplay();
          } else {
            clearInterval(state.pomoTimerId);
            state.pomoRunning = false;
            btn.textContent = '▶';
            playChime('success');
            addXP(100, "Pomodoro complete");
            alert("⏰ 25-Minute Focus Block Complete! Take a 5-minute breather.");
            state.pomoSeconds = 25 * 60;
            updatePomoDisplay();
          }
        }, 1000);
      }
    }

    function resetPomodoro() {
      clearInterval(state.pomoTimerId);
      state.pomoRunning = false;
      document.getElementById('btnPomoToggle').textContent = '▶';
      state.pomoSeconds = 25 * 60;
      updatePomoDisplay();
    }

    function updatePomoDisplay() {
      const m = Math.floor(state.pomoSeconds / 60);
      const s = state.pomoSeconds % 60;
      document.getElementById('pomoTimer').textContent = \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}\`;
    }

    // --- 15. ZEN FOCUS MODE ---
    let isZenMode = false;
    function toggleFocusMode() {
      isZenMode = !isZenMode;
      const header = document.querySelector('header');
      const progress = document.querySelector('.bg-neutral-950.border-b');
      if (isZenMode) {
        if (header) header.classList.add('hidden');
        if (progress) progress.classList.add('hidden');
      } else {
        if (header) header.classList.remove('hidden');
        if (progress) progress.classList.remove('hidden');
      }
    }

    // --- 16. TAB NAVIGATION ---
    function switchTab(tabId) {
      const tabs = ['today', 'cards', 'matrix', 'classifications', 'timeline'];
      tabs.forEach(t => {
        const section = document.getElementById(\`tab\${t.charAt(0).toUpperCase() + t.slice(1)}\`);
        const btn = document.getElementById(\`tabBtn\${t.charAt(0).toUpperCase() + t.slice(1)}\`);
        if (t === tabId) {
          if (section) section.classList.remove('hidden');
          if (btn) btn.className = "px-4 py-2.5 font-semibold border-b-2 border-white text-white flex items-center gap-2 whitespace-nowrap";
        } else {
          if (section) section.classList.add('hidden');
          if (btn) btn.className = "px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap";
        }
      });

      if (tabId === 'cards') renderCurrentCard();
      if (tabId === 'matrix') renderMatrixTables();
      if (tabId === 'classifications') {
        if (atlasState.subView === 'visual') renderVisualAtlas();
        else renderClassifications();
      }
      if (tabId === 'timeline') renderTimeline();
    }

    // --- 17. 15-DAY TIMELINE MAP ---
    function renderTimeline() {
      const container = document.getElementById('timelineGrid');
      if (!container) return;
      container.innerHTML = '';

      DAYS_DATA.forEach(d => {
        const isCurrent = d.day === state.currentDay;
        const isDefeated = !!state.bossesDefeated[d.day];

        let totalObj = d.objectives.length;
        let doneObj = 0;
        d.objectives.forEach((_, idx) => {
          if (state.completedObjectives[\`day-\${d.day}-\${idx}\`]) doneObj++;
        });

        const card = document.createElement('div');
        card.className = \`p-5 rounded-3xl border transition-all flex flex-col justify-between cursor-pointer \${isCurrent ? 'bg-neutral-900 border-white shadow-md' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}\`;
        card.onclick = () => {
          state.currentDay = d.day;
          saveState();
          switchTab('today');
        };

        card.innerHTML = \`
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800">
                DAY \${d.day}
              </span>
              \${isDefeated ? '<span class="text-xs">⭐ Defeated</span>' : ''}
            </div>
            <h4 class="font-bold text-white text-sm line-clamp-1 mb-1">\${d.title}</h4>
            <div class="text-[11px] text-neutral-400 mb-3">\${d.system}</div>
          </div>
          <div>
            <div class="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
              <span>Milestones:</span>
              <span class="font-mono text-neutral-300">\${doneObj} / \${totalObj}</span>
            </div>
            <div class="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
              <div class="bg-white h-full rounded-full" style="width: \${(doneObj / (totalObj || 1)) * 100}%"></div>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    // --- 18. KEYBOARD SHORTCUTS ---
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const atlasModal = document.getElementById('atlasModal');
      const isAtlasOpen = atlasModal && !atlasModal.classList.contains('hidden');

      if (isAtlasOpen) {
        if (e.code === 'Escape') closeAtlasModal();
        else if (e.code === 'ArrowRight') navAtlasModal(1);
        else if (e.code === 'ArrowLeft') navAtlasModal(-1);
        else if (e.code === 'KeyR') revealAllOcclusionBoxes();
        else if (e.code === 'KeyH') hideAllOcclusionBoxes();
        else if (e.code === 'Space') {
          e.preventDefault();
          const item = ATLAS_DATA[atlasState.modalIndex];
          for (let i = 0; i < item.rects.length; i++) {
            if (!atlasState.revealedBoxes.has(i)) {
              toggleSingleBox(i);
              break;
            }
          }
        }
        return;
      }

      // Flashcard navigation
      if (e.code === 'Space') {
        e.preventDefault();
        flipCurrentCard();
      } else if (e.key === '1') {
        rateCurrentCard('red');
      } else if (e.key === '2') {
        rateCurrentCard('yellow');
      } else if (e.key === '3') {
        rateCurrentCard('green');
      } else if (e.key === '0' || e.key === 's' || e.key === 'S') {
        skipCurrentCard();
      } else if (e.key === 'h' || e.key === 'H') {
        toggleCardHint();
      } else if (e.code === 'ArrowRight') {
        nextCard();
      } else if (e.code === 'ArrowLeft') {
        prevCard();
      }
    });

    // --- 19. APP BOOTSTRAP ---
    window.addEventListener('DOMContentLoaded', () => {
      loadState();
      setTriageMode(state.triageMode || 'pass');
      updateHeaderStats();
      renderDayView();
      renderCurrentCard();
      renderMatrixTables();
      renderClassifications();
      renderVisualAtlas();
      renderTodayAtlasWidget();
      renderTimeline();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlTemplate, 'utf8');
console.log('Successfully wrote updated index.html!');
console.log('File size:', fs.statSync('index.html').size, 'bytes');


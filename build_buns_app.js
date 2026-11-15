const fs = require('fs');

const currentHtml = fs.readFileSync('index.html', 'utf8');

// Function to extract variable definition from currentHtml
function extractConst(name, isObject = false) {
  const startMarker = isObject ? `const ${name} = {` : `const ${name} = [`;
  const startIdx = currentHtml.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error(`Could not find start marker for ${name}`);
  }
  const endMarker = isObject ? `};\n` : `];\n`;
  let endIdx = currentHtml.indexOf(endMarker, startIdx);
  if (endIdx === -1) {
    endIdx = currentHtml.indexOf(isObject ? `};` : `];`, startIdx);
  }
  return currentHtml.substring(startIdx, endIdx + (isObject ? 2 : 2));
}

console.log("Extracting datasets from current index.html...");
const daysDataStr = extractConst('DAYS_DATA');
const flashcardsStr = extractConst('FLASHCARDS');
const classificationsStr = extractConst('CLASSIFICATIONS');
const atlasDataStr = extractConst('ATLAS_DATA');
const drugUsesStr = extractConst('DRUG_USES_DATA', true);
const moaDiagramsStr = extractConst('MOA_DIAGRAMS_DATA', true);

console.log("All 6 datasets extracted successfully!");

const htmlTemplate = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buns vs Pharmacology | 15-Day Strategic Exam Mastery</title>
  
  <!-- Immediate Theme Initialization to avoid FOUC -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('buns_theme') || 'dark';
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    })();
  </script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Canvas Confetti for Gamification -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <!-- Marked for markdown parsing -->
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
    
    /* Clean Minimalist Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    html.dark ::-webkit-scrollbar-track { background: #000000; }
    html.dark ::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
    html.dark ::-webkit-scrollbar-thumb:hover { background: #404040; }
    html.light ::-webkit-scrollbar-track { background: #f4f4f5; }
    html.light ::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 4px; }
    html.light ::-webkit-scrollbar-thumb:hover { background: #a1a1aa; }
    
    /* Subtle Pulse */
    @keyframes subtlePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.02); }
    }
    .boss-pulse { animation: subtlePulse 3s infinite ease-in-out; }

    /* SVG Pomodoro Ring Animation */
    .pomo-ring-circle {
      transition: stroke-dashoffset 0.8s ease-in-out;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }

    /* =========================================================
       MINIMAL BLACK & WHITE THEME ADAPTATION (LIGHT & DARK)
       ========================================================= */
    html.dark {
      color-scheme: dark;
    }
    html.light {
      color-scheme: light;
    }

    /* Light Mode Overrides for Crisp Minimal Monochrome */
    html.light body {
      background-color: #fafafa !important;
      color: #09090b !important;
    }

    html.light .bg-black {
      background-color: #fafafa !important;
    }
    html.light .bg-neutral-950 {
      background-color: #ffffff !important;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05);
    }
    html.light .bg-neutral-900 {
      background-color: #f4f4f5 !important;
    }
    html.light .bg-neutral-900\\/60,
    html.light .bg-neutral-900\\/70 {
      background-color: rgba(244, 244, 245, 0.8) !important;
    }
    html.light .bg-neutral-850,
    html.light .bg-neutral-800 {
      background-color: #e4e4e7 !important;
    }

    html.light .border-neutral-800,
    html.light .border-neutral-700,
    html.light .border-neutral-800\\/80,
    html.light .border-neutral-800\\/60 {
      border-color: #e4e4e7 !important;
    }

    html.light .text-white {
      color: #09090b !important;
    }
    html.light .text-neutral-200 {
      color: #18181b !important;
    }
    html.light .text-neutral-300 {
      color: #27272a !important;
    }
    html.light .text-neutral-400 {
      color: #52525b !important;
    }
    html.light .text-neutral-500 {
      color: #71717a !important;
    }

    html.light .hover\\:bg-neutral-800:hover,
    html.light .hover\\:bg-neutral-900:hover {
      background-color: #e4e4e7 !important;
    }
    html.light .hover\\:text-white:hover {
      color: #000000 !important;
    }

    html.light input,
    html.light textarea,
    html.light select {
      background-color: #ffffff !important;
      color: #09090b !important;
      border-color: #d4d4d8 !important;
    }

    html.light pre {
      background-color: #f4f4f5 !important;
      color: #18181b !important;
      border: 1px solid #e4e4e7 !important;
    }

    /* Prose markdown overrides for Dark Mode */
    html.dark .prose-invert h1 { font-size: 1.25rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; margin-top: 1rem; }
    html.dark .prose-invert h2 { font-size: 1.1rem; font-weight: 700; color: #f5f5f5; margin-bottom: 0.5rem; margin-top: 0.75rem; }
    html.dark .prose-invert h3 { font-size: 0.95rem; font-weight: 600; color: #e5e5e5; margin-bottom: 0.35rem; margin-top: 0.5rem; }
    html.dark .prose-invert p { margin-bottom: 0.5rem; color: #d4d4d4; font-size: 0.85rem; line-height: 1.5; }
    html.dark .prose-invert ul { list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem; color: #d4d4d4; font-size: 0.85rem; }
    html.dark .prose-invert li { margin-bottom: 0.25rem; }
    html.dark .prose-invert blockquote { border-left: 3px solid #525252; padding-left: 0.75rem; margin-bottom: 0.5rem; color: #a3a3a3; font-style: italic; }
    html.dark .prose-invert code { background: #171717; padding: 0.15rem 0.35rem; border-radius: 0.25rem; font-size: 0.8rem; color: #ffffff; border: 1px solid #262626; }
    html.dark .prose-invert table { width: 100%; border-collapse: collapse; margin-bottom: 0.75rem; font-size: 0.8rem; }
    html.dark .prose-invert th, html.dark .prose-invert td { border: 1px solid #262626; padding: 0.4rem 0.6rem; text-align: left; }
    html.dark .prose-invert th { background: #171717; color: #ffffff; font-weight: 600; }

    /* Prose markdown overrides for Light Mode */
    html.light .prose-invert h1 { font-size: 1.25rem; font-weight: 700; color: #09090b !important; margin-bottom: 0.5rem; margin-top: 1rem; }
    html.light .prose-invert h2 { font-size: 1.1rem; font-weight: 700; color: #18181b !important; margin-bottom: 0.5rem; margin-top: 0.75rem; }
    html.light .prose-invert h3 { font-size: 0.95rem; font-weight: 600; color: #27272a !important; margin-bottom: 0.35rem; margin-top: 0.5rem; }
    html.light .prose-invert p { margin-bottom: 0.5rem; color: #3f3f46 !important; font-size: 0.85rem; line-height: 1.5; }
    html.light .prose-invert ul { list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem; color: #3f3f46 !important; font-size: 0.85rem; }
    html.light .prose-invert li { margin-bottom: 0.25rem; }
    html.light .prose-invert blockquote { border-left: 3px solid #a1a1aa !important; padding-left: 0.75rem; margin-bottom: 0.5rem; color: #52525b !important; font-style: italic; }
    html.light .prose-invert code { background: #f4f4f5 !important; padding: 0.15rem 0.35rem; border-radius: 0.25rem; font-size: 0.8rem; color: #09090b !important; border: 1px solid #e4e4e7 !important; }
    html.light .prose-invert table { width: 100%; border-collapse: collapse; margin-bottom: 0.75rem; font-size: 0.8rem; }
    html.light .prose-invert th, html.light .prose-invert td { border: 1px solid #e4e4e7 !important; padding: 0.4rem 0.6rem; text-align: left; }
    html.light .prose-invert th { background: #f4f4f5 !important; color: #09090b !important; font-weight: 600; }
  </style>
</head>
<body class="bg-black text-neutral-100 min-h-screen flex flex-col font-sans antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200">

  <!-- TOP APP BAR -->
  <header class="border-b border-neutral-800 bg-neutral-950 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Left: Logo & Gamification Summary -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl shadow-sm border border-neutral-700">
          🍞
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-bold text-base text-white tracking-tight">Buns vs Pharmacology</h1>
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

      <!-- Right Controls: Pomodoro Widget, Theme Toggle, Vault, Zen Mode -->
      <div class="flex items-center gap-2">
        
        <!-- Robust Pomodoro Header Widget -->
        <div onclick="openPomodoroModal()" class="bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs cursor-pointer hover:border-neutral-700 transition shadow-sm" title="Click to open Pomodoro Focus Arena">
          <span id="headerPomoIcon" class="text-sm">🔥</span>
          <div class="flex flex-col">
            <span id="headerPomoLabel" class="text-[9px] uppercase font-bold tracking-wider text-neutral-400 leading-none">Focus</span>
            <span id="pomoTimer" class="font-mono font-bold text-white text-xs leading-tight">25:00</span>
          </div>
          <button onclick="event.stopPropagation(); togglePomodoro()" id="btnPomoToggle" class="p-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition text-xs font-bold ml-1">
            ▶
          </button>
        </div>

        <!-- Theme Toggle (Dark / Light) -->
        <button onclick="toggleTheme()" id="btnThemeToggle" title="Toggle Light / Dark Mode" class="px-2.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <span id="themeToggleIcon">🌙</span>
          <span id="themeToggleText" class="hidden sm:inline text-[11px]">Dark</span>
        </button>

        <!-- Progress Backup & Restore Button -->
        <button onclick="openProgressModal()" title="Backup or Restore Progress (JSON)" class="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition text-xs font-medium flex items-center gap-1">
          <span>💾</span>
          <span class="hidden lg:inline text-[11px]">Vault</span>
        </button>

        <!-- Zen Focus Mode -->
        <button onclick="toggleFocusMode()" title="Toggle Zen Focus Mode" class="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition">
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
        <span>🎯</span> High-Yield Matrices (DOC & Antidotes)
      </button>
      <button onclick="switchTab('classifications')" id="tabBtnClassifications" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>🧬</span> Drug Classifications & Visual Atlas
        <span class="text-xs bg-neutral-900 px-2 py-0.5 rounded-full text-neutral-300 border border-neutral-800 font-mono">73</span>
      </button>
      <button onclick="switchTab('timeline')" id="tabBtnTimeline" class="px-4 py-2.5 font-medium border-b-2 border-transparent text-neutral-500 hover:text-neutral-300 flex items-center gap-2 whitespace-nowrap">
        <span>🗺️</span> 15-Day Roadmap
      </button>
    </div>

    <!-- ==========================================
         TAB 1: TODAY'S MISSION
         ========================================== -->
    <section id="tabToday" class="space-y-6">

      <!-- Day Navigation Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" id="dayPickerPills">
          <!-- Populated via JS -->
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
        
        <!-- Left: Objectives, Uses, MOA, Atlas, Pearls (2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- TOP HERO CARD: DIRECTLY UPDATED BY EDIT MD -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden">

            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div class="flex items-center gap-2">
                <span id="currentDayBadge" class="bg-neutral-900 text-white border border-neutral-700 font-bold px-3 py-1 rounded-full text-xs">
                  DAY 1 of 15
                </span>
                <span id="currentSystemBadge" class="text-xs px-2.5 py-1 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                  General Principles
                </span>
                <span id="syllabusCustomizedBadge" class="hidden text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-700 font-medium">
                  ✏️ Custom Notes Active
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="openMarkdownEditor()" class="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-1.5 transition font-medium">
                  <span>✏️</span> Edit .md Notes
                </button>
                <button onclick="resetDayToDefaultSyllabus()" id="btnRevertSyllabus" class="hidden text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 px-2.5 py-1.5 rounded-lg border border-neutral-700 transition" title="Reset this day back to original textbook syllabus">
                  ↺ Reset
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

            <!-- Checklist of Objectives (Milestones) -->
            <div class="mt-6">
              <h3 class="text-sm font-bold text-neutral-300 uppercase tracking-wider flex items-center justify-between mb-3">
                <span>🎯 Core High-Yield Milestones</span>
                <span id="objectiveProgress" class="text-xs text-neutral-400 font-mono">0 / 5 Complete</span>
              </h3>
              <div id="objectivesList" class="space-y-2.5">
                <!-- Injected via JS -->
              </div>
            </div>

            <!-- Custom User Markdown Notes (Rendered directly inside this top hero card if present) -->
            <div id="heroCustomNotesArea" class="hidden mt-6 pt-5 border-t border-neutral-800 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📝</span> Personal Study Notes for Day <span id="labelHeroNotesDay">1</span>
                </span>
                <button onclick="openMarkdownEditor()" class="text-[11px] text-neutral-400 hover:text-white transition">
                  Edit ✏️
                </button>
              </div>
              <div id="heroCustomNotesRender" class="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed overflow-x-auto bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
                <!-- Injected via marked.parse -->
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
                  <p class="text-xs text-neutral-500">Cellular pathways, molecular targets & site of action & potency spectrum</p>
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
              <div id="bossStatusBadge" class="hidden mb-3 text-xs bg-neutral-900 text-neutral-200 border border-neutral-700 py-1.5 px-3 rounded-full font-bold">
                ⭐ Boss Defeated (+200 XP Secured)
              </div>
              <button onclick="startBossFight()" id="btnStartBoss" class="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm shadow-md transition transform active:scale-95">
                ⚔️ Enter Boss Arena (5 Questions)
              </button>
            </div>
          </div>

          <!-- Quick Deck Jump Card -->
          <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Flashcard Engine</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800 font-mono" id="quickTodayCardCount">0 cards</span>
            </div>
            <h4 class="font-bold text-white text-base">Active Recall for Day <span id="quickTodayDayNum">1</span></h4>
            <p class="text-xs text-neutral-400">
              Drill high-yield mechanism-of-action cards, first-line DOCs, and clinical antidote triggers.
            </p>
            <button onclick="startTodayDeck()" class="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs transition flex items-center justify-center gap-2">
              <span>⚡</span> Launch Flashcards
            </button>
          </div>
        </div>

      </div>

    </section>

    <!-- ==========================================
         TAB 2: ACTIVE RECALL CARDS (WITH FALLBACKS)
         ========================================== -->
    <section id="tabCards" class="hidden space-y-6">
      
      <!-- Card Filters Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <button onclick="filterCards('today')" id="btnFilterToday" class="px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs shadow-sm flex items-center gap-1.5">
            <span>📅</span> Day <span id="labelFilterTodayDay">1</span> Cards (<span id="countTodayCards">0</span>)
          </button>
          <button onclick="filterCards('review')" id="btnFilterReview" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800 flex items-center gap-1">
            <span>🔄</span> Spaced Review Due (<span id="countReviewCards">0</span>)
          </button>
          <button onclick="filterCards('all')" id="btnFilterAll" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
            Cumulative All (<span id="countAll">0</span>)
          </button>
          <button onclick="filterCards('red')" id="btnFilterRed" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-rose-300 font-medium text-xs border border-neutral-800">
            Hard / Red (<span id="countRed">0</span>)
          </button>
          <button onclick="filterCards('green')" id="btnFilterGreen" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-emerald-300 font-medium text-xs border border-neutral-800">
            Mastered (<span id="countGreen">0</span>)
          </button>
          <button onclick="filterCards('why')" id="btnFilterWhy" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
            'Give Reason' Why
          </button>
          <button onclick="filterCards('doc')" id="btnFilterDoc" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
            Drug of Choice
          </button>
          <button onclick="filterCards('antidote')" id="btnFilterAntidote" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
            Antidotes
          </button>
        </div>

        <div class="flex items-center gap-2">
          <select id="selectCardDay" onchange="filterCardsByDay(this.value)" class="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-300 focus:outline-none">
            <option value="today">Jump to Day...</option>
            <option value="all">All Days (1–15)</option>
            <option value="1">Day 1: General</option>
            <option value="2">Day 2: ANS Cholinergic</option>
            <option value="3">Day 3: ANS Adrenergic</option>
            <option value="4">Day 4: Kidney & Diuretics</option>
            <option value="5">Day 5: CVS Anti-HTN</option>
            <option value="6">Day 6: CVS Heart Failure</option>
            <option value="7">Day 7: Autacoids & NSAIDs</option>
            <option value="8">Day 8: Respiratory & Asthma</option>
            <option value="9">Day 9: Blood & Hematinics</option>
            <option value="10">Day 10: GI Pharmacology</option>
            <option value="11">Day 11: Endocrine Diabetes</option>
            <option value="12">Day 12: Chemotherapy Penicillins</option>
            <option value="13">Day 13: Chemotherapy Aminoglycosides</option>
            <option value="14">Day 14: CNS Sedatives</option>
            <option value="15">Day 15: CNS Opioids & Wrap</option>
          </select>
        </div>
      </div>

      <!-- Flashcard Arena -->
      <div class="max-w-3xl mx-auto space-y-4">
        
        <!-- Card Counter & Hint Control -->
        <div class="flex items-center justify-between text-xs text-neutral-400 px-2">
          <span class="font-mono">Card <strong id="currentCardIndex" class="text-white">1</strong> of <span id="totalCardsCount">0</span></span>
          <div class="flex items-center gap-3">
            <button onclick="toggleCardHint(event)" id="btnCardHint" class="text-xs text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 transition">
              💡 Show Hint Clue
            </button>
            <span id="currentCardTag" class="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono">Day 1 • Core</span>
          </div>
        </div>

        <!-- Clue/Hint Box (Hidden by default) -->
        <div id="cardHintBox" class="hidden p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 italic transition-all">
          <!-- Populated via JS -->
        </div>

        <!-- 3D Card Box -->
        <div onclick="flipCurrentCard()" class="min-h-[300px] sm:min-h-[340px] bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-3xl p-6 sm:p-10 cursor-pointer flex flex-col justify-between shadow-2xl transition-all relative overflow-hidden select-none">
          
          <!-- Front Text -->
          <div class="space-y-4">
            <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Active Recall Prompt</div>
            <div id="cardFrontText" class="text-lg sm:text-xl font-bold text-white leading-relaxed">
              Loading questions...
            </div>
          </div>

          <!-- Back Text (Hidden until flipped) -->
          <div id="cardBack" class="hidden pt-6 mt-6 border-t border-neutral-800 space-y-3">
            <div class="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Exam-Standard Answer & Mechanism</div>
            <div id="cardBackText" class="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
              <!-- Back content -->
            </div>
          </div>

          <!-- Flip prompt footer -->
          <div class="text-center pt-4 text-[11px] text-neutral-500" id="flipPrompt">
            Click anywhere to flip and see answer (or Spacebar)
          </div>

        </div>

        <!-- Fallback Controls Bar (Skip, Hint, Previous, Next) -->
        <div class="flex items-center justify-between gap-2 px-2 text-xs">
          <button onclick="prevCard()" class="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition">
            ◀ Previous Card
          </button>
          
          <div class="flex items-center gap-2">
            <!-- FALLBACK: Skip / Review Later -->
            <button onclick="skipCurrentCard()" class="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition flex items-center gap-1 font-medium" title="Skip this card for now without affecting rating. Defer to end of session.">
              <span>⏭️</span> Skip / Review Later
            </button>
          </div>

          <button onclick="nextCard()" class="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition">
            Next Card ▶
          </button>
        </div>

        <!-- Rating Buttons (Anki Style) -->
        <div class="grid grid-cols-3 gap-3 pt-2">
          <button onclick="rateCurrentCard('red')" class="py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-rose-400 hover:text-rose-300 font-bold text-xs flex flex-col items-center gap-1 transition">
            <span>🔴 Again / Blanked</span>
            <span class="text-[10px] font-normal text-neutral-500">Review soon (Key 1)</span>
          </button>
          <button onclick="rateCurrentCard('yellow')" class="py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-amber-400 hover:text-amber-300 font-bold text-xs flex flex-col items-center gap-1 transition">
            <span>🟡 Hard / Hesitant</span>
            <span class="text-[10px] font-normal text-neutral-500">Repeat tomorrow (Key 2)</span>
          </button>
          <button onclick="rateCurrentCard('green')" class="py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-emerald-400 hover:text-emerald-300 font-bold text-xs flex flex-col items-center gap-1 transition">
            <span>🟢 Easy / Nailed</span>
            <span class="text-[10px] font-normal text-neutral-500">+15 XP (Key 3)</span>
          </button>
        </div>

      </div>

    </section>

    <!-- ==========================================
         TAB 3: HIGH-YIELD MATRICES (DOC & ANTIDOTES)
         ========================================== -->
    <section id="tabMatrix" class="hidden space-y-6">
      <div class="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-lg text-white">Guaranteed Marks Search Engine</h3>
            <p class="text-xs text-neutral-400">Search 40+ Drugs of Choice and Poisoning Antidotes instantly.</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="toggleMatrixCategory('all')" id="btnMatrixAll" class="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs">
              All Items
            </button>
            <button onclick="toggleMatrixCategory('doc')" id="btnMatrixDoc" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
              Drugs of Choice
            </button>
            <button onclick="toggleMatrixCategory('antidote')" id="btnMatrixAntidote" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800">
              Toxic Antidotes
            </button>
          </div>
        </div>

        <div class="relative">
          <input type="text" id="matrixSearchInput" oninput="renderMatrixTables()" placeholder="Search condition, poison, drug name, or mechanism..." class="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white">
        </div>
      </div>

      <div id="matrixResultsContainer" class="space-y-6">
        <!-- Injected via JS -->
      </div>
    </section>

    <!-- ==========================================
         TAB 4: CLASSIFICATIONS & VISUAL ATLAS
         ========================================== -->
    <section id="tabClassifications" class="hidden space-y-6">
      
      <!-- Sub-view switcher: Text Hierarchy vs Visual Atlas -->
      <div class="flex items-center justify-between bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
        <div class="flex items-center gap-2">
          <button onclick="switchAtlasSubView('visual')" id="btnSubViewVisual" class="px-3 py-1.5 rounded-xl bg-white text-black font-bold text-xs shadow-sm flex items-center gap-1.5">
            <span>📷</span> Visual Image Atlas (73)
          </button>
          <button onclick="switchAtlasSubView('text')" id="btnSubViewText" class="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800 flex items-center gap-1.5">
            <span>🌳</span> Text Hierarchy Trees
          </button>
        </div>

        <div id="visualAtlasFilters" class="flex items-center gap-2">
          <select id="selectAtlasSystem" onchange="filterAtlasBySystem(this.value)" class="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none">
            <option value="all">All Systems (73 Charts)</option>
            <option value="ANS">ANS (Autonomic)</option>
            <option value="CVS">CVS (Cardiovascular)</option>
            <option value="CNS">CNS (Neuropsych)</option>
            <option value="Antimicrobial">Antimicrobials / Chemo</option>
            <option value="Autacoids">Autacoids & NSAIDs</option>
            <option value="Endocrine">Endocrine & Corticosteroids</option>
            <option value="Renal">Renal & Diuretics</option>
            <option value="GIT">GIT</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Blood">Blood & Hematinics</option>
          </select>
        </div>
      </div>

      <!-- Container: Visual Atlas -->
      <div id="viewVisualAtlas" class="space-y-4">
        <div class="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="text-neutral-400">
            Interactive Occlusion Mode: Click any chart card to enter fullscreen Anki-style quiz mode.
          </div>
          <div class="relative w-full sm:w-64">
            <input type="text" id="atlasSearchInput" oninput="filterAtlas()" placeholder="Search chart name..." class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white">
          </div>
        </div>

        <div id="atlasThumbGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <!-- Injected via JS -->
        </div>
      </div>

      <!-- Container: Text Hierarchy Trees -->
      <div id="viewTextClassifications" class="hidden space-y-4">
        <div class="relative">
          <input type="text" id="classificationSearchInput" oninput="renderClassifications()" placeholder="Search drug class or drug name in tree..." class="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white">
        </div>
        <div id="classificationsGrid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Injected via JS -->
        </div>
      </div>

    </section>

    <!-- ==========================================
         TAB 5: 15-DAY ROADMAP TIMELINE
         ========================================== -->
    <section id="tabTimeline" class="hidden space-y-6">
      <div class="bg-neutral-950 p-6 rounded-3xl border border-neutral-800">
        <h3 class="font-bold text-lg text-white mb-1">15-Day Strategic University Exam Roadmap</h3>
        <p class="text-xs text-neutral-400">Complete all 15 syllabus days to guarantee your distinction.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" id="timelineGrid">
        <!-- Injected via JS -->
      </div>
    </section>

  </main>

  <!-- ==========================================
       MODALS SECTION
       ========================================== -->

  <!-- MODAL: ROBUST POMODORO ARENA COMMAND CENTER -->
  <div id="pomodoroModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⏱️</span>
          <div>
            <h3 class="font-bold text-white text-base">Pomodoro Focus Arena</h3>
            <p class="text-[11px] text-neutral-400">Science-backed 25m/50m focus blocks for high retention</p>
          </div>
        </div>
        <button onclick="closePomodoroModal()" class="text-neutral-500 hover:text-white text-xl p-1">✕</button>
      </div>

      <!-- Presets Bar -->
      <div class="grid grid-cols-4 gap-2 text-xs">
        <button onclick="setPomoPreset('focus')" id="presetFocus" class="py-2 px-1 rounded-xl bg-white text-black font-bold text-center transition shadow-sm">
          🔥 25m Focus
        </button>
        <button onclick="setPomoPreset('deep')" id="presetDeep" class="py-2 px-1 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-medium text-center border border-neutral-800 transition">
          ⚡ 50m Deep
        </button>
        <button onclick="setPomoPreset('shortBreak')" id="presetShortBreak" class="py-2 px-1 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-medium text-center border border-neutral-800 transition">
          ☕ 5m Break
        </button>
        <button onclick="setPomoPreset('longBreak')" id="presetLongBreak" class="py-2 px-1 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-medium text-center border border-neutral-800 transition">
          🌿 15m Break
        </button>
      </div>

      <!-- Visual Circular SVG Progress Ring Display -->
      <div class="flex flex-col items-center justify-center py-4 relative">
        <div class="relative w-52 h-52 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 200 200">
            <!-- Background Track Circle -->
            <circle cx="100" cy="100" r="88" class="stroke-neutral-900" stroke-width="8" fill="transparent" />
            <!-- Animated Progress Ring -->
            <circle id="pomoSvgRing" cx="100" cy="100" r="88" class="pomo-ring-circle stroke-white" stroke-width="8" stroke-linecap="round" fill="transparent" stroke-dasharray="552.92" stroke-dashoffset="0" />
          </svg>

          <!-- Inside Clock Typography -->
          <div class="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span id="pomoModalClock" class="font-mono font-black text-4xl sm:text-5xl text-white tracking-wider">25:00</span>
            <span id="pomoModalModeBadge" class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mt-1 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800">
              Focus Block
            </span>
          </div>
        </div>

        <!-- Cycle Dots Indicator -->
        <div class="mt-4 flex flex-col items-center gap-1.5">
          <div id="pomoCycleDots" class="flex items-center gap-2 text-base">
            <span>⚪</span><span>⚪</span><span>⚪</span><span>⚪</span>
          </div>
          <span id="pomoCycleText" class="text-[11px] text-neutral-400">Pomodoro 1 of 4 • Long break after 4</span>
          <span id="pomoTotalStats" class="text-[10px] text-neutral-500 font-mono mt-0.5">0 sessions (0 mins) completed today</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-3 gap-3 pt-2 border-t border-neutral-800">
        <button onclick="resetPomodoro()" class="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs border border-neutral-800 transition">
          ↺ Reset
        </button>
        <button onclick="togglePomodoro()" id="btnModalPomoToggle" class="py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm transition shadow-md">
          ▶ Start
        </button>
        <button onclick="skipPomoStage()" class="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs border border-neutral-800 transition">
          ⏭ Skip
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL: MARKDOWN EDITOR (DIRECTLY UPDATES HERO CONTENT ABOVE) -->
  <div id="mdEditorModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative space-y-4 flex flex-col max-h-[92vh]">
      
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">✏️</span>
          <div>
            <h3 class="font-bold text-white text-base">Study Notes & Syllabus Editor (Day <span id="mdModalDayNum">1</span>)</h3>
            <p class="text-[11px] text-neutral-400">Edits directly update the milestones, references, and notes above on the dashboard.</p>
          </div>
        </div>
        <button onclick="closeMarkdownEditor()" class="text-neutral-500 hover:text-white text-xl">✕</button>
      </div>

      <!-- Mode Tabs -->
      <div class="flex items-center gap-2 border-b border-neutral-800 pb-2 text-xs">
        <button onclick="setMdTab('edit')" id="btnMdTabEdit" class="px-3 py-1.5 rounded-lg bg-white text-black font-semibold">
          ✏️ Edit Markdown
        </button>
        <button onclick="setMdTab('preview')" id="btnMdTabPreview" class="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 font-medium">
          👁️ Live Preview
        </button>
        <span class="text-[11px] text-neutral-500 ml-auto hidden sm:inline">Use '- [ ]' for milestones, '> ⚡' for pearls</span>
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
            ↺ Reset Template
          </button>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span class="text-[10px] text-neutral-500 hidden md:inline">Saved in browser (GitHub Pages ready)</span>
          <button onclick="closeMarkdownEditor()" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold transition">
            Cancel
          </button>
          <button onclick="saveMarkdownContent()" class="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold shadow-sm transition">
            💾 Save & Update Day
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
          <h3 class="font-bold text-white text-base">Buns vs Pharmacology Progress Vault</h3>
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
        <button onclick="importProgressBackup()" class="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs border border-neutral-800 flex items-center justify-center gap-2 transition">
          <span>📂</span> Restore Progress from Backup (.json)
        </button>
        <button onclick="exportAnkiCsvDeck()" class="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold text-xs border border-neutral-800 flex items-center justify-center gap-2 transition">
          <span>📑</span> Export All Flashcards as Anki CSV
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL: INTERACTIVE OCCLUSION FULLSCREEN ATLAS MODAL -->
  <div id="atlasModal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-2 sm:p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-5xl w-full h-[95vh] flex flex-col shadow-2xl relative overflow-hidden">
      
      <!-- Top Modal Bar -->
      <div class="p-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950">
        <div>
          <div class="flex items-center gap-2">
            <h3 id="atlasModalTitle" class="font-bold text-white text-base">Classification Chart</h3>
            <span id="atlasModalBadge" class="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-neutral-900 text-neutral-200 border border-neutral-700">Day 2 • ANS</span>
          </div>
          <div id="atlasModalSubtitle" class="text-xs text-neutral-400 mt-0.5">Deck: Pharmac Uni::01: ANS • 10 Interactive Occlusion Cards</div>
        </div>

        <!-- Mode & Occlusion Controls -->
        <div class="flex items-center gap-2 text-xs">
          <!-- Occlusion Mode Toggle -->
          <button onclick="toggleOcclusionMode()" id="btnToggleOcclusion" class="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 transition">
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

          <button onclick="closeAtlasModal()" class="text-neutral-500 hover:text-white text-xl p-1 ml-2">✕</button>
        </div>
      </div>

      <!-- Occlusion Progress Bar Banner -->
      <div id="occlusionStatusBanner" class="bg-neutral-900/80 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs">
        <div class="flex items-center gap-2 text-neutral-300">
          <span>🎯 Click any yellow box to test your recall:</span>
          <span id="occlusionBoxesCount" class="font-bold text-amber-400">0 / 0 Revealed</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] text-neutral-500">💡 Tip: Recall the drug name aloud before clicking!</span>
        </div>
      </div>

      <!-- Interactive Canvas Area (Scrollable & Zoomable) -->
      <div id="atlasCanvasContainer" class="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/95 relative select-none">
        <div id="atlasStage" class="relative inline-block transition-transform duration-200 origin-center max-w-full">
          <img id="atlasModalImg" src="" alt="Classification Chart" class="max-h-[70vh] w-auto h-auto block rounded-xl shadow-2xl border border-neutral-800">
          <!-- Dynamic Occlusion Overlay Container -->
          <div id="atlasOcclusionOverlay" class="absolute inset-0 pointer-events-none"></div>
        </div>
      </div>

      <!-- Footer Bar with Prev / Next Navigation -->
      <div class="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
        <button onclick="navAtlasModal(-1)" class="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold flex items-center gap-1.5 transition border border-neutral-800">
          ◀ Previous Chart
        </button>
        <span id="atlasModalNavIndex" class="text-neutral-400 font-mono text-xs">Chart 1 of 73</span>
        <button onclick="navAtlasModal(1)" class="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold flex items-center gap-1.5 shadow-sm transition">
          Next Chart ▶
        </button>
      </div>

    </div>
  </div>


  <!-- MODAL: DAILY BOSS ARENA -->
  <div id="bossModal" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden flex items-center justify-center p-4">
    <div class="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
      
      <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl">👾</span>
          <div>
            <h3 id="bossModalName" class="font-bold text-white text-base">Boss Arena</h3>
            <span class="text-[10px] text-neutral-400">Score 4/5 or better to claim victory & +200 XP</span>
          </div>
        </div>
        <button onclick="closeBossModal()" class="text-neutral-500 hover:text-white text-xl">✕</button>
      </div>

      <div class="flex items-center justify-between text-xs text-neutral-400">
        <span class="font-mono">Question <strong id="bossQuestionIndex" class="text-white">1</strong> of 5</span>
        <span id="bossScoreTracker" class="font-mono text-emerald-400">0 Correct</span>
      </div>

      <div class="space-y-4">
        <div id="bossQuestionText" class="text-base font-bold text-white leading-relaxed">
          Loading question...
        </div>
        <div id="bossOptionsList" class="space-y-2">
          <!-- Injected via JS -->
        </div>
      </div>

      <div id="bossExplanationBox" class="hidden p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-2">
        <div class="font-bold text-white" id="bossResultTitle">Correct!</div>
        <div id="bossExplanationText">Explanation text...</div>
        <button onclick="nextBossQuestion()" id="btnNextBossQ" class="w-full mt-2 py-2 rounded-lg bg-white text-black font-bold text-xs">
          Next Question →
        </button>
      </div>

    </div>
  </div>

  <!-- ==========================================
       JAVASCRIPT APPLICATION CORE
       ========================================== -->
  <script>
    // --- 1. CORE DATA STORES ---
    ${daysDataStr}

    ${flashcardsStr}

    ${classificationsStr}

    ${atlasDataStr}

    ${drugUsesStr}

    ${moaDiagramsStr}

    // --- 2. USER STATE PERSISTENCE (100% PRESERVED SCHEMA) ---
    let state = {
      currentDay: 1,
      triageMode: 'pass',
      xp: 0,
      streak: 1,
      completedObjectives: {},
      cardRatings: {},
      bossesDefeated: {},
      activeCardIndex: 0,
      cardFilter: 'today',
      isCardFlipped: false,
      matrixCategory: 'all',
      skippedDeckCardIds: []
    };

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

    // --- 3. TOAST NOTIFICATIONS ---
    function showToast(message) {
      const existing = document.getElementById('bunsToast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'bunsToast';
      toast.className = 'fixed bottom-6 right-6 bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl z-[100] transition-opacity duration-300 flex items-center gap-2 border border-neutral-200';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    // --- 4. LIGHT / DARK THEME TOGGLE ---
    function initTheme() {
      const currentTheme = localStorage.getItem('buns_theme') || 'dark';
      applyTheme(currentTheme);
    }

    function applyTheme(theme) {
      const btnIcon = document.getElementById('themeToggleIcon');
      const btnText = document.getElementById('themeToggleText');
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        if (btnIcon) btnIcon.textContent = '☀️';
        if (btnText) btnText.textContent = 'Light';
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        if (btnIcon) btnIcon.textContent = '🌙';
        if (btnText) btnText.textContent = 'Dark';
      }
      localStorage.setItem('buns_theme', theme);
    }

    function toggleTheme() {
      const isDark = document.documentElement.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(\`Switched to \${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode\`);
    }

    // --- 5. AUDIO SYNTHESIZER (NO EXTERNAL ASSETS) ---
    function playChime(type = 'success') {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.25); // G5
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        } else if (type === 'fanfare') {
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.15);
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.3);
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.45);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
          osc.start();
          osc.stop(ctx.currentTime + 0.7);
        }
      } catch (e) {
        // audio context blocked or unsupported
      }
    }

    function addXP(amount, reason = "") {
      state.xp += amount;
      saveState();
      updateHeaderStats();
      if (typeof confetti === 'function') {
        try {
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.85 } });
        } catch (e) {}
      }
    }

    function updateHeaderStats() {
      const xpEl = document.getElementById('xpCount');
      if (xpEl) xpEl.textContent = state.xp.toLocaleString();
      const streakEl = document.getElementById('streakCount');
      if (streakEl) streakEl.textContent = state.streak;

      // Calculate Rank
      let rank = "Lvl 1 • Intern";
      if (state.xp >= 3000) rank = "Lvl 5 • Chief Resident";
      else if (state.xp >= 1800) rank = "Lvl 4 • Senior Registrar";
      else if (state.xp >= 1000) rank = "Lvl 3 • Junior Resident";
      else if (state.xp >= 400) rank = "Lvl 2 • Post-Intern";
      const rankBadge = document.getElementById('rankBadge');
      if (rankBadge) rankBadge.textContent = rank;

      // Overall Exam Readiness
      let totalObjectives = 0;
      DAYS_DATA.forEach(d => totalObjectives += d.objectives.length);
      const doneObjectives = Object.keys(state.completedObjectives).length;

      let totalBosses = 15;
      const doneBosses = Object.keys(state.bossesDefeated).length;

      const objWeight = 0.6;
      const bossWeight = 0.4;
      const score = Math.min(100, Math.round(((doneObjectives / (totalObjectives || 1)) * objWeight + (doneBosses / totalBosses) * bossWeight) * 100));

      const readinessEl = document.getElementById('readinessScore');
      if (readinessEl) readinessEl.textContent = \`\${score}%\`;
      const readinessBar = document.getElementById('readinessBar');
      if (readinessBar) readinessBar.style.width = \`\${score}%\`;

      const statusEl = document.getElementById('readinessStatus');
      if (statusEl) {
        if (score >= 80) statusEl.textContent = "🏆 Distinction territory! Exam ready.";
        else if (score >= 60) statusEl.textContent = "🎯 Solid First Class pass guaranteed.";
        else if (score >= 35) statusEl.textContent = "🛡️ Safe Pass threshold achieved.";
        else statusEl.textContent = "🚀 Preparing for takeoff... complete day objectives.";
      }
    }

    // --- 6. SPACED REPETITION ENGINE (1 / 3 / 5 / 7 DAYS) ---
    function getSpacedReviewDays(currentDay) {
      const intervals = [1, 3, 5, 7];
      const dueDays = [];
      intervals.forEach(intv => {
        const pastDay = currentDay - intv;
        if (pastDay >= 1) {
          dueDays.push({ day: pastDay, interval: intv });
        }
      });
      return dueDays;
    }

    // --- 7. TRIAGE MODES (80/20 PASS vs DISTINCTION) ---
    function setTriageMode(mode) {
      state.triageMode = mode;
      saveState();

      const btnPass = document.getElementById('btnTriagePass');
      const btnStd = document.getElementById('btnTriageStandard');
      const btnDist = document.getElementById('btnTriageDistinction');

      const activeClass = "bg-white text-black font-bold shadow-sm";
      const inactiveClass = "text-neutral-400 hover:text-white";

      btnPass.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'pass' ? activeClass : inactiveClass}\`;
      btnStd.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'first_class' ? activeClass : inactiveClass}\`;
      btnDist.className = \`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 \${mode === 'distinction' ? activeClass : inactiveClass}\`;

      renderDayPickerPills();
      renderTimeline();
    }

    // --- 8. MARKDOWN PARSER: EDIT MD DIRECTLY CHANGES CONTENT ABOVE ---
    function parseDayMarkdown(mdText, defaultDayData) {
      if (!mdText) {
        return {
          title: defaultDayData.title,
          shanbhag_ref: defaultDayData.shanbhag_ref,
          kdt_ref: defaultDayData.kdt_ref,
          objectives: defaultDayData.objectives,
          pearls: defaultDayData.pearls,
          extraNotes: ''
        };
      }

      const lines = mdText.split('\\n');
      let title = defaultDayData.title;
      let shanbhag = defaultDayData.shanbhag_ref;
      let kdt = defaultDayData.kdt_ref;
      const objectives = [];
      const pearls = [];
      const extraLines = [];

      let currentSection = '';

      for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          if (currentSection === 'extra') extraLines.push(line);
          continue;
        }

        // Title line: # Day X: ... or # ...
        if (trimmed.startsWith('# ') && !trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
          const match = trimmed.replace(/^#\\s*/, '').replace(/^Day\\s*\\d+\\s*:\\s*/i, '').trim();
          if (match) title = match;
          continue;
        }

        // Section header
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
          const heading = trimmed.toLowerCase();
          if (heading.includes('reference')) {
            currentSection = 'references';
          } else if (heading.includes('objective') || heading.includes('milestone')) {
            currentSection = 'objectives';
          } else if (heading.includes('pearl')) {
            currentSection = 'pearls';
          } else {
            currentSection = 'extra';
            extraLines.push(line);
          }
          continue;
        }

        if (currentSection === 'references') {
          if (trimmed.toLowerCase().includes('shanbhag')) {
            shanbhag = trimmed.replace(/^[-*]\\s*/, '').replace(/.*shanbhag.*?:/i, '').trim();
          } else if (trimmed.toLowerCase().includes('kdt') || trimmed.toLowerCase().includes('tripathi')) {
            kdt = trimmed.replace(/^[-*]\\s*/, '').replace(/.*(?:kdt|tripathi).*?:/i, '').trim();
          } else {
            extraLines.push(line);
          }
        } else if (currentSection === 'objectives') {
          if (trimmed.startsWith('- [ ]') || trimmed.startsWith('- [x]') || trimmed.startsWith('- [X]')) {
            objectives.push(trimmed.replace(/^-\\s*\\[[ xX]\\]\\s*/, '').trim());
          } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\\d+\\.\\s*/.test(trimmed)) {
            objectives.push(trimmed.replace(/^[-*\\d.]+\\s*/, '').trim());
          } else {
            extraLines.push(line);
          }
        } else if (currentSection === 'pearls') {
          if (trimmed.startsWith('>')) {
            const clean = trimmed.replace(/^>\\s*/, '').replace(/^⚡\\s*/, '').trim();
            if (clean) pearls.push(clean);
          } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            pearls.push(trimmed.replace(/^[-*]\\s*/, '').replace(/^⚡\\s*/, '').trim());
          } else {
            extraLines.push(line);
          }
        } else {
          extraLines.push(line);
        }
      }

      return {
        title: title || defaultDayData.title,
        shanbhag_ref: shanbhag || defaultDayData.shanbhag_ref,
        kdt_ref: kdt || defaultDayData.kdt_ref,
        objectives: objectives.length > 0 ? objectives : defaultDayData.objectives,
        pearls: pearls.length > 0 ? pearls : defaultDayData.pearls,
        extraNotes: extraLines.join('\\n').trim()
      };
    }

    // --- 9. RENDER DAY VIEW (WITH DIRECT MARKDOWN SYNCHRONIZATION) ---
    function renderDayView() {
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];
      const dayKey = \`custom_day_\${state.currentDay}\`;
      const savedCustom = localStorage.getItem(dayKey);

      // Parse custom markdown or fallback to standard syllabus
      const content = parseDayMarkdown(savedCustom, dayData);

      // Update Top Hero Badges & Header
      document.getElementById('currentDayBadge').textContent = \`DAY \${dayData.day} of 15\`;
      document.getElementById('currentSystemBadge').textContent = dayData.system;
      document.getElementById('currentDayTitle').textContent = content.title;
      document.getElementById('refShanbhag').textContent = content.shanbhag_ref;
      document.getElementById('refKDT').textContent = content.kdt_ref;
      document.getElementById('bossName').textContent = dayData.boss_name;

      // Customized Status & Revert Button
      const customBadge = document.getElementById('syllabusCustomizedBadge');
      const revertBtn = document.getElementById('btnRevertSyllabus');
      if (savedCustom) {
        if (customBadge) customBadge.classList.remove('hidden');
        if (revertBtn) revertBtn.classList.remove('hidden');
      } else {
        if (customBadge) customBadge.classList.add('hidden');
        if (revertBtn) revertBtn.classList.add('hidden');
      }

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

      // Objectives Checklist (Directly populated from markdown objectives)
      const objContainer = document.getElementById('objectivesList');
      objContainer.innerHTML = '';
      let completedInDay = 0;

      content.objectives.forEach((obj, idx) => {
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

      document.getElementById('objectiveProgress').textContent = \`\${completedInDay} / \${content.objectives.length} Complete\`;

      // Extra Personal Notes in Top Hero Card (if user wrote custom notes/tables)
      const extraNotesBox = document.getElementById('heroCustomNotesArea');
      const extraNotesRender = document.getElementById('heroCustomNotesRender');
      const extraNotesDayLabel = document.getElementById('labelHeroNotesDay');
      if (extraNotesDayLabel) extraNotesDayLabel.textContent = state.currentDay;

      if (content.extraNotes && content.extraNotes.trim()) {
        extraNotesBox.classList.remove('hidden');
        try {
          extraNotesRender.innerHTML = marked.parse(content.extraNotes);
        } catch (e) {
          extraNotesRender.textContent = content.extraNotes;
        }
      } else {
        extraNotesBox.classList.add('hidden');
      }

      // Render Prototype Drugs & Uses
      renderTodayDrugUses();

      // Render MOA Flowcharts
      renderTodayMoaDiagrams();

      // High-Yield Pearls (Directly populated from markdown pearls)
      const pearlsContainer = document.getElementById('pearlsList');
      pearlsContainer.innerHTML = '';
      content.pearls.forEach(pearl => {
        const p = document.createElement('div');
        p.className = "flex items-start gap-2 bg-neutral-900/70 p-3 rounded-xl border border-neutral-800";
        p.innerHTML = \`<span class="text-white font-bold shrink-0">⚡</span><span class="text-neutral-200">\${pearl}</span>\`;
        pearlsContainer.appendChild(p);
      });

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

    function getDefaultMarkdownForDay(dayData) {
      return \`# Day \${dayData.day}: \${dayData.title}\\n\\n\` +
        \`### References\\n- Shanbhag: \${dayData.shanbhag_ref}\\n- KDT: \${dayData.kdt_ref}\\n\\n\` +
        \`### Core Objectives\\n\` +
        dayData.objectives.map(o => \`- [ ] \${o}\`).join('\\n') +
        \`\\n\\n### High-Yield Pearls\\n\` +
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

    // --- 10. ACTIVE RECALL CARDS LOGIC & FALLBACKS ---
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

    // --- 11. SEARCHABLE MATRIX (DOC & ANTIDOTES) ---
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
        docCard.className = "bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-3";
        docCard.innerHTML = \`
          <h4 class="font-bold text-white text-sm flex items-center gap-2">
            <span>💊</span> First-Line Drugs of Choice (DOC) Matrix (\${docs.length})
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="text-neutral-400 border-b border-neutral-800 uppercase font-mono">
                <tr>
                  <th class="py-2.5 px-3">Condition / Diagnosis</th>
                  <th class="py-2.5 px-3">Drug of Choice & Mechanism</th>
                  <th class="py-2.5 px-3">Syllabus Day</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-900">
                \${docs.map(d => \`
                  <tr class="hover:bg-neutral-900/50 transition">
                    <td class="py-2.5 px-3 font-semibold text-white whitespace-nowrap">\${d.front.replace(/<[^>]*>/g, '')}</td>
                    <td class="py-2.5 px-3 text-neutral-300 leading-relaxed">\${d.back.replace(/<[^>]*>/g, '')}</td>
                    <td class="py-2.5 px-3 text-neutral-400 font-mono">Day \${d.day}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
        container.appendChild(docCard);
      }

      if (state.matrixCategory === 'all' || state.matrixCategory === 'antidote') {
        const antiCard = document.createElement('div');
        antiCard.className = "bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-3";
        antiCard.innerHTML = \`
          <h4 class="font-bold text-white text-sm flex items-center gap-2">
            <span>🧪</span> Toxicological Antidotes & Poisoning Protocol Matrix (\${antidotes.length})
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="text-neutral-400 border-b border-neutral-800 uppercase font-mono">
                <tr>
                  <th class="py-2.5 px-3">Toxin / Overdose Trigger</th>
                  <th class="py-2.5 px-3">Specific Antidote & Protocol</th>
                  <th class="py-2.5 px-3">Syllabus Day</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-900">
                \${antidotes.map(a => \`
                  <tr class="hover:bg-neutral-900/50 transition">
                    <td class="py-2.5 px-3 font-semibold text-rose-400 whitespace-nowrap">\${a.front.replace(/<[^>]*>/g, '')}</td>
                    <td class="py-2.5 px-3 text-neutral-300 leading-relaxed">\${a.back.replace(/<[^>]*>/g, '')}</td>
                    <td class="py-2.5 px-3 text-neutral-400 font-mono">Day \${a.day}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
        container.appendChild(antiCard);
      }
    }

    // --- 12. TEXT CLASSIFICATIONS & VISUAL ATLAS ---
    const atlasState = {
      subView: 'visual',
      systemFilter: 'all',
      searchQuery: '',
      modalIndex: 0,
      zoom: 1,
      occlusionMode: true,
      revealedBoxes: new Set()
    };

    function switchAtlasSubView(sub) {
      atlasState.subView = sub;
      const btnV = document.getElementById('btnSubViewVisual');
      const btnT = document.getElementById('btnSubViewText');
      const viewV = document.getElementById('viewVisualAtlas');
      const viewT = document.getElementById('viewTextClassifications');
      const filtersV = document.getElementById('visualAtlasFilters');

      const active = "px-3 py-1.5 rounded-xl bg-white text-black font-bold text-xs shadow-sm flex items-center gap-1.5";
      const inactive = "px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-medium text-xs border border-neutral-800 flex items-center gap-1.5";

      if (sub === 'visual') {
        if (btnV) btnV.className = active;
        if (btnT) btnT.className = inactive;
        if (viewV) viewV.classList.remove('hidden');
        if (viewT) viewT.classList.add('hidden');
        if (filtersV) filtersV.classList.remove('hidden');
        renderVisualAtlas();
      } else {
        if (btnV) btnV.className = inactive;
        if (btnT) btnT.className = active;
        if (viewV) viewV.classList.add('hidden');
        if (viewT) viewT.classList.remove('hidden');
        if (filtersV) filtersV.classList.add('hidden');
        renderClassifications();
      }
    }

    function renderClassifications() {
      const container = document.getElementById('classificationsGrid');
      if (!container) return;
      const query = (document.getElementById('classificationSearchInput')?.value || '').toLowerCase().trim();
      container.innerHTML = '';

      let list = CLASSIFICATIONS;
      if (query) {
        list = list.filter(c => c.title.toLowerCase().includes(query) || c.tree.toLowerCase().includes(query));
      }

      list.forEach(c => {
        const card = document.createElement('div');
        card.className = "bg-neutral-950 p-5 rounded-3xl border border-neutral-800 space-y-3";
        card.innerHTML = \`
          <div class="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h4 class="font-bold text-white text-sm">\\${c.title}</h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 font-mono border border-neutral-800">\\${c.badge}</span>
          </div>
          <pre class="text-xs font-mono text-neutral-300 whitespace-pre overflow-x-auto leading-relaxed bg-black/50 p-3 rounded-xl border border-neutral-800/60">\\${c.tree}</pre>
        \`;
        container.appendChild(card);
      });
    }

    function renderTodayAtlasWidget() {
      const grid = document.getElementById('todayAtlasThumbGrid');
      const badge = document.getElementById('todayAtlasCountBadge');
      if (!grid) return;

      const todayCharts = ATLAS_DATA.filter(item => item.days && item.days.includes(state.currentDay));
      if (badge) badge.textContent = \`\\${todayCharts.length} Charts Available\`;
      grid.innerHTML = '';

      if (todayCharts.length === 0) {
        grid.innerHTML = \`<div class="col-span-full py-4 text-center text-neutral-500 text-xs">No direct chart matching Day \\${state.currentDay}. Explore all 73 charts in the Visual Atlas tab!</div>\`;
        return;
      }

      todayCharts.slice(0, 6).forEach(item => {
        const fullIndex = ATLAS_DATA.indexOf(item);
        const thumb = document.createElement('div');
        thumb.onclick = () => openAtlasModal(fullIndex, true);
        thumb.className = "group relative bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-2xl overflow-hidden cursor-pointer shadow-md transition transform hover:scale-[1.02] flex flex-col justify-between";
        thumb.innerHTML = \`
          <div class="h-28 overflow-hidden relative bg-black flex items-center justify-center">
            <img src="anki/classification_images/\\${item.file}" loading="lazy" alt="\\${item.label}" class="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition duration-300">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div class="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px]">
              <span class="font-bold text-white truncate max-w-[80%]">\\${item.label}</span>
              <span class="text-amber-300 font-mono font-bold">⚡\\${item.rects.length}</span>
            </div>
          </div>
        \`;
        grid.appendChild(thumb);
      });
    }

    function filterAtlasBySystem(sys) {
      atlasState.systemFilter = sys;
      renderVisualAtlas();
    }

    function filterAtlas() {
      atlasState.searchQuery = (document.getElementById('atlasSearchInput')?.value || '').toLowerCase().trim();
      renderVisualAtlas();
    }

    function getFilteredAtlasData() {
      return ATLAS_DATA.filter(item => {
        if (atlasState.systemFilter === 'today') {
          if (!item.days || !item.days.includes(state.currentDay)) return false;
        } else if (atlasState.systemFilter !== 'all') {
          const s = atlasState.systemFilter.toLowerCase();
          const matchLabel = (item.label || '').toLowerCase().includes(s);
          const matchDeck = (item.deck || '').toLowerCase().includes(s);
          const matchTopic = (item.topic || '').toLowerCase().includes(s);
          if (!matchLabel && !matchDeck && !matchTopic) return false;
        }

        if (atlasState.searchQuery) {
          const q = atlasState.searchQuery;
          const matchText = \`\\${item.label || ''} \\${item.topic || ''} \\${item.deck || ''} \\${item.title || ''}\`.toLowerCase();
          if (!matchText.includes(q)) return false;
        }

        return true;
      });
    }

    function renderVisualAtlas() {
      const grid = document.getElementById('atlasThumbGrid');
      if (!grid) return;
      grid.innerHTML = '';

      const items = getFilteredAtlasData();
      if (items.length === 0) {
        grid.innerHTML = \`
          <div class="col-span-full py-12 text-center text-neutral-400 space-y-2">
            <div class="text-3xl">🔍</div>
            <div class="font-bold text-white text-base">No classification charts found</div>
            <div class="text-xs text-neutral-500">Try selecting "All Systems" or clearing the search query.</div>
          </div>
        \`;
        return;
      }

      items.forEach(item => {
        const fullIndex = ATLAS_DATA.indexOf(item);
        const card = document.createElement('div');
        card.className = "bg-neutral-950 border border-neutral-800 hover:border-neutral-600 rounded-3xl overflow-hidden shadow-lg transition-all flex flex-col justify-between";

        const daysLabel = item.days && item.days.length ? item.days.map(d => 'Day ' + d).join(', ') : 'Reference';

        card.innerHTML = \`
          <div>
            <div class="relative h-44 bg-black overflow-hidden cursor-pointer group" onclick="openAtlasModal(\\${fullIndex})">
              <img src="anki/classification_images/\\${item.file}" loading="lazy" alt="\\${item.label}" class="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              <div class="absolute top-2.5 right-2.5 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 px-2 py-0.5 rounded-full text-[10px] text-amber-300 font-mono font-semibold flex items-center gap-1">
                <span>⚡</span> \\${item.rects.length || item.cardCount} Occlusions
              </div>
              <div class="absolute bottom-2.5 left-2.5">
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-neutral-900/90 text-white border border-neutral-700">
                  \\${daysLabel}
                </span>
              </div>
            </div>

            <div class="p-4 space-y-1.5">
              <div class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">\\${item.label}</div>
              <h4 class="text-white font-bold text-sm leading-snug line-clamp-1">\\${item.topic}</h4>
              <p class="text-[10px] text-neutral-500 font-mono truncate">\\${item.deck}</p>
            </div>
          </div>

          <div class="px-4 pb-4 pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
            <button onclick="openAtlasModal(\\${fullIndex}, false)" class="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold transition text-center border border-neutral-800">
              👁️ Study
            </button>
            <button onclick="openAtlasModal(\\${fullIndex}, true)" class="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition text-center shadow-md flex items-center justify-center gap-1">
              <span>⚡</span> Test Recall
            </button>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    function openAtlasModal(index, startWithOcclusion = true) {
      if (index < 0 || index >= ATLAS_DATA.length) return;
      atlasState.modalIndex = index;
      atlasState.zoom = 1;
      atlasState.occlusionMode = startWithOcclusion;
      atlasState.revealedBoxes = new Set();

      const item = ATLAS_DATA[index];
      const titleEl = document.getElementById('atlasModalTitle');
      const badgeEl = document.getElementById('atlasModalBadge');
      const subtitleEl = document.getElementById('atlasModalSubtitle');
      const navIdxEl = document.getElementById('atlasModalNavIndex');

      if (titleEl) titleEl.textContent = item.title || item.label;
      if (badgeEl) badgeEl.textContent = \`Day \\${item.days ? item.days.join(', ') : 'Ref'} • \\${item.label}\`;
      if (subtitleEl) subtitleEl.textContent = \`Deck: \\${item.deck} • \\${item.rects.length} Interactive Occlusion Boxes\`;
      if (navIdxEl) navIdxEl.textContent = \`Chart \\${index + 1} of \\${ATLAS_DATA.length}\`;

      const img = document.getElementById('atlasModalImg');
      img.src = \`anki/classification_images/\\${item.file}\`;

      updateOcclusionButtonState();
      resetAtlasZoom();

      img.onload = () => {
        renderOcclusionBoxes();
      };
      if (img.complete) {
        renderOcclusionBoxes();
      }

      document.getElementById('atlasModal').classList.remove('hidden');
    }

    function closeAtlasModal() {
      document.getElementById('atlasModal').classList.add('hidden');
    }

    function navAtlasModal(step) {
      let newIdx = atlasState.modalIndex + step;
      if (newIdx < 0) newIdx = ATLAS_DATA.length - 1;
      if (newIdx >= ATLAS_DATA.length) newIdx = 0;
      openAtlasModal(newIdx, atlasState.occlusionMode);
    }

    function toggleOcclusionMode() {
      atlasState.occlusionMode = !atlasState.occlusionMode;
      updateOcclusionButtonState();
      renderOcclusionBoxes();
    }

    function updateOcclusionButtonState() {
      const btn = document.getElementById('btnToggleOcclusion');
      const label = document.getElementById('labelOcclusionToggle');
      const banner = document.getElementById('occlusionStatusBanner');

      if (atlasState.occlusionMode) {
        if (btn) btn.className = "px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 transition";
        if (label) label.textContent = "Occlusion Mode: ON";
        if (banner) banner.classList.remove('hidden');
      } else {
        if (btn) btn.className = "px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-400 border border-neutral-800 font-medium flex items-center gap-1.5 transition";
        if (label) label.textContent = "Study Mode (Unmasked)";
        if (banner) banner.classList.add('hidden');
      }
    }

    function renderOcclusionBoxes() {
      const overlay = document.getElementById('atlasOcclusionOverlay');
      if (!overlay) return;
      overlay.innerHTML = '';

      if (!atlasState.occlusionMode) {
        overlay.classList.add('hidden');
        return;
      }

      overlay.classList.remove('hidden');
      const item = ATLAS_DATA[atlasState.modalIndex];
      const w = item.w || 1000;
      const h = item.h || 800;
      const total = item.rects.length;

      const countEl = document.getElementById('occlusionBoxesCount');
      if (countEl) countEl.textContent = \`\\${atlasState.revealedBoxes.size} / \\${total} Revealed\`;

      item.rects.forEach((rect, boxIdx) => {
        const [rx, ry, rw, rh] = rect;
        const leftPct = (rx / w) * 100;
        const topPct = (ry / h) * 100;
        const widthPct = (rw / w) * 100;
        const heightPct = (rh / h) * 100;

        const isRevealed = atlasState.revealedBoxes.has(boxIdx);

        const box = document.createElement('div');
        box.style.left = leftPct + '%';
        box.style.top = topPct + '%';
        box.style.width = widthPct + '%';
        box.style.height = heightPct + '%';

        box.className = 'absolute pointer-events-auto cursor-pointer rounded transition-all duration-200 flex items-center justify-center ' + 
          (isRevealed 
            ? 'opacity-0 hover:opacity-20 bg-emerald-400/50' 
            : 'bg-amber-300 hover:bg-amber-200 border border-amber-500 shadow-md');

        box.innerHTML = isRevealed ? '' : '<span class="text-[9px] font-black text-amber-950 select-none">?</span>';

        box.onclick = (e) => {
          e.stopPropagation();
          toggleSingleBox(boxIdx);
        };

        overlay.appendChild(box);
      });
    }

    function toggleSingleBox(boxIdx) {
      if (atlasState.revealedBoxes.has(boxIdx)) {
        atlasState.revealedBoxes.delete(boxIdx);
      } else {
        atlasState.revealedBoxes.add(boxIdx);
        playChime('success');
        addXP(10, 'Occlusion recall');
      }
      renderOcclusionBoxes();
    }

    function revealAllOcclusionBoxes() {
      const item = ATLAS_DATA[atlasState.modalIndex];
      item.rects.forEach((_, idx) => atlasState.revealedBoxes.add(idx));
      renderOcclusionBoxes();
    }

    function hideAllOcclusionBoxes() {
      atlasState.revealedBoxes.clear();
      renderOcclusionBoxes();
    }

    function zoomAtlasImage(delta) {
      atlasState.zoom = Math.max(0.6, Math.min(2.5, atlasState.zoom + delta));
      applyAtlasZoom();
    }

    function resetAtlasZoom() {
      atlasState.zoom = 1;
      applyAtlasZoom();
    }

    function applyAtlasZoom() {
      const stage = document.getElementById('atlasStage');
      if (stage) {
        stage.style.transform = \`scale(\\${atlasState.zoom})\`;
      }
      const label = document.getElementById('atlasZoomLabel');
      if (label) {
        label.textContent = \`\\${Math.round(atlasState.zoom * 100)}%\`;
      }
    }


    // --- 13. DAILY BOSS ARENA LOGIC ---
    let bossState = {
      day: 1,
      qIndex: 0,
      score: 0,
      questions: []
    };

    function startBossFight() {
      const dayData = DAYS_DATA.find(d => d.day === state.currentDay);
      bossState.day = state.currentDay;
      bossState.qIndex = 0;
      bossState.score = 0;
      bossState.questions = dayData.boss_questions || [];

      document.getElementById('bossModalName').textContent = \`⚔️ Day \${dayData.day} Arena: \${dayData.boss_name}\`;
      document.getElementById('bossModal').classList.remove('hidden');
      document.getElementById('bossExplanationBox').classList.add('hidden');
      renderBossQuestion();
    }

    function renderBossQuestion() {
      const q = bossState.questions[bossState.qIndex];
      document.getElementById('bossQuestionIndex').textContent = bossState.qIndex + 1;
      document.getElementById('bossScoreTracker').textContent = \`\${bossState.score} / \${bossState.qIndex} Correct\`;
      document.getElementById('bossQuestionText').textContent = q.question;
      document.getElementById('bossExplanationBox').classList.add('hidden');

      const container = document.getElementById('bossOptionsList');
      container.innerHTML = '';

      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-medium text-neutral-200 transition flex items-center justify-between";
        btn.innerHTML = \`<span>\${opt}</span><span class="text-neutral-500 font-mono text-[10px]">Opt \${idx + 1}</span>\`;
        btn.onclick = () => selectBossAnswer(idx);
        container.appendChild(btn);
      });
    }

    function selectBossAnswer(selectedIdx) {
      const q = bossState.questions[bossState.qIndex];
      const isCorrect = selectedIdx === q.answer;
      if (isCorrect) bossState.score++;

      const expBox = document.getElementById('bossExplanationBox');
      const title = document.getElementById('bossResultTitle');
      const text = document.getElementById('bossExplanationText');
      const btnNext = document.getElementById('btnNextBossQ');

      expBox.classList.remove('hidden');
      if (isCorrect) {
        title.textContent = "✓ Correct Answer!";
        title.className = "font-bold text-emerald-400";
        playChime('success');
      } else {
        title.textContent = "✗ Incorrect";
        title.className = "font-bold text-rose-400";
      }
      text.textContent = q.explanation;

      if (bossState.qIndex === bossState.questions.length - 1) {
        btnNext.textContent = "Claim Victory & Finish 🏆";
      } else {
        btnNext.textContent = "Next Question →";
      }
    }

    function nextBossQuestion() {
      bossState.qIndex++;
      if (bossState.qIndex < bossState.questions.length) {
        renderBossQuestion();
      } else {
        finishBossFight();
      }
    }

    function finishBossFight() {
      const passed = bossState.score >= 4;
      if (passed) {
        state.bossesDefeated[bossState.day] = true;
        addXP(200, "Boss Titan Defeated");
        playChime('fanfare');
        alert(\`🏆 VICTORY! You defeated the daily boss with \${bossState.score}/5! +200 XP added to your record!\`);
      } else {
        alert(\`Boss Fight Ended. Score: \${bossState.score}/5. You need 4/5 to defeat the boss. Review the flashcards and try again!\`);
      }
      saveState();
      closeBossModal();
      renderDayView();
      updateHeaderStats();
    }

    function closeBossModal() {
      document.getElementById('bossModal').classList.add('hidden');
    }

    // --- 14. MARKDOWN EDITOR (OFFLINE & DIRECT DASHBOARD SYNC) ---
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
      showToast(\`✓ Notes for Day \${state.currentDay} saved & dashboard updated!\`);
      renderDayView();
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
      if (confirm("Reset editor to the default textbook syllabus template?")) {
        const dayData = DAYS_DATA.find(d => d.day === state.currentDay) || DAYS_DATA[0];
        document.getElementById('mdEditorTextarea').value = getDefaultMarkdownForDay(dayData);
        if (currentMdEditorTab === 'preview') setMdTab('preview');
      }
    }

    function resetDayToDefaultSyllabus() {
      if (confirm(\`Reset Day \${state.currentDay} back to the standard textbook syllabus?\`)) {
        localStorage.removeItem(\`custom_day_\${state.currentDay}\`);
        renderDayView();
        showToast(\`✓ Reset Day \${state.currentDay} to standard syllabus\`);
      }
    }

    // --- 15. PROGRESS VAULT & SYNC (BACKUP / RESTORE) ---
    function openProgressModal() {
      document.getElementById('progressModal').classList.remove('hidden');
    }

    function closeProgressModal() {
      document.getElementById('progressModal').classList.add('hidden');
    }

    function exportProgressBackup() {
      const data = {
        app: "Buns vs Pharmacology",
        version: "2.1",
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
      a.download = \`Buns-vs-Pharmacology-Progress-Backup-\${new Date().toISOString().slice(0, 10)}.json\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
              }
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
            } catch (err) {
              alert("Error importing progress file: invalid JSON format.");
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    }

    function exportAnkiCsvDeck() {
      const header = ["Front", "Back", "Tags"].join(String.fromCharCode(9)) + String.fromCharCode(10);
      let csv = header;
      FLASHCARDS.forEach(c => {
        const front = '"' + c.front.replace(/"/g, '""') + '"';
        const back = '"' + c.back.replace(/"/g, '""') + '"';
        const tags = '"BunsVsPharma Day-' + c.day + ' ' + c.tag.replace(/\s+/g, '-') + '"';
        csv += [front, back, tags].join(String.fromCharCode(9)) + String.fromCharCode(10);
      });

      const blob = new Blob([csv], { type: 'text/tab-separated-values;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Buns-vs-Pharmacology-Anki-Deck.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("✓ Anki CSV deck downloaded");
    }

    // --- 16. ROBUST POMODORO FOCUS ARENA ---
    const pomoState = {
      mode: 'focus', // 'focus' | 'deep' | 'shortBreak' | 'longBreak'
      totalSeconds: 25 * 60,
      seconds: 25 * 60,
      running: false,
      timerId: null,
      cycle: 0, // 0 to 4
      totalSessionsToday: 0
    };

    function openPomodoroModal() {
      document.getElementById('pomodoroModal').classList.remove('hidden');
      updatePomoDisplay();
    }

    function closePomodoroModal() {
      document.getElementById('pomodoroModal').classList.add('hidden');
    }

    function setPomoPreset(mode) {
      pomoState.mode = mode;
      if (mode === 'focus') {
        pomoState.totalSeconds = 25 * 60;
      } else if (mode === 'deep') {
        pomoState.totalSeconds = 50 * 60;
      } else if (mode === 'shortBreak') {
        pomoState.totalSeconds = 5 * 60;
      } else if (mode === 'longBreak') {
        pomoState.totalSeconds = 15 * 60;
      }
      pomoState.seconds = pomoState.totalSeconds;
      if (pomoState.running) {
        clearInterval(pomoState.timerId);
        pomoState.running = false;
      }
      updatePomoDisplay();
    }

    function togglePomodoro() {
      if (pomoState.running) {
        clearInterval(pomoState.timerId);
        pomoState.running = false;
        document.title = "Buns vs Pharmacology | 15-Day Strategic Exam Mastery";
      } else {
        pomoState.running = true;
        pomoState.timerId = setInterval(() => {
          if (pomoState.seconds > 0) {
            pomoState.seconds--;
            updatePomoDisplay();
          } else {
            clearInterval(pomoState.timerId);
            pomoState.running = false;
            handlePomoCompleted();
          }
        }, 1000);
      }
      updatePomoDisplay();
    }

    function resetPomodoro() {
      clearInterval(pomoState.timerId);
      pomoState.running = false;
      pomoState.seconds = pomoState.totalSeconds;
      document.title = "Buns vs Pharmacology | 15-Day Strategic Exam Mastery";
      updatePomoDisplay();
    }

    function skipPomoStage() {
      clearInterval(pomoState.timerId);
      pomoState.running = false;
      if (pomoState.mode === 'focus' || pomoState.mode === 'deep') {
        pomoState.cycle = (pomoState.cycle + 1) % 4;
        setPomoPreset(pomoState.cycle === 0 ? 'longBreak' : 'shortBreak');
        showToast("Switched to break stage");
      } else {
        setPomoPreset('focus');
        showToast("Switched to focus stage");
      }
    }

    function handlePomoCompleted() {
      playChime('fanfare');
      if (pomoState.mode === 'focus' || pomoState.mode === 'deep') {
        pomoState.cycle = (pomoState.cycle + 1) % 4;
        pomoState.totalSessionsToday++;
        addXP(100, "Pomodoro focus block completed");
        const nextBreak = pomoState.cycle === 0 ? 'longBreak' : 'shortBreak';
        showToast("🎉 Focus Session Complete! +100 XP gained. Take a breather!");
        setPomoPreset(nextBreak);
      } else {
        showToast("☕ Break finished! Ready to crush pharmacology?");
        setPomoPreset('focus');
      }
      updatePomoDisplay();
    }

    function updatePomoDisplay() {
      const m = Math.floor(pomoState.seconds / 60);
      const s = pomoState.seconds % 60;
      const timeStr = \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}\`;

      // Header widget updates
      const headerTimer = document.getElementById('pomoTimer');
      const headerLabel = document.getElementById('headerPomoLabel');
      const headerIcon = document.getElementById('headerPomoIcon');
      const headerBtn = document.getElementById('btnPomoToggle');

      if (headerTimer) headerTimer.textContent = timeStr;
      if (headerBtn) headerBtn.textContent = pomoState.running ? '⏸' : '▶';

      if (pomoState.mode === 'focus') {
        if (headerLabel) headerLabel.textContent = 'Focus';
        if (headerIcon) headerIcon.textContent = '🔥';
      } else if (pomoState.mode === 'deep') {
        if (headerLabel) headerLabel.textContent = 'Deep';
        if (headerIcon) headerIcon.textContent = '⚡';
      } else {
        if (headerLabel) headerLabel.textContent = 'Break';
        if (headerIcon) headerIcon.textContent = '☕';
      }

      // Modal updates
      const modalClock = document.getElementById('pomoModalClock');
      const modalBadge = document.getElementById('pomoModalModeBadge');
      const modalBtn = document.getElementById('btnModalPomoToggle');

      if (modalClock) modalClock.textContent = timeStr;
      if (modalBtn) modalBtn.textContent = pomoState.running ? '⏸ Pause' : '▶ Start';

      if (modalBadge) {
        if (pomoState.mode === 'focus') modalBadge.textContent = '25m Focus Block';
        else if (pomoState.mode === 'deep') modalBadge.textContent = '50m Deep Dive';
        else if (pomoState.mode === 'shortBreak') modalBadge.textContent = '5m Short Break';
        else if (pomoState.mode === 'longBreak') modalBadge.textContent = '15m Long Break';
      }

      // Update preset buttons styling
      const presets = ['Focus', 'Deep', 'ShortBreak', 'LongBreak'];
      const activePresetName = pomoState.mode.charAt(0).toUpperCase() + pomoState.mode.slice(1);
      presets.forEach(p => {
        const btn = document.getElementById(\`preset\${p}\`);
        if (btn) {
          if (p === activePresetName) {
            btn.className = "py-2 px-1 rounded-xl bg-white text-black font-bold text-center transition shadow-sm text-xs";
          } else {
            btn.className = "py-2 px-1 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-medium text-center border border-neutral-800 transition text-xs";
          }
        }
      });

      // SVG Ring animation
      const ring = document.getElementById('pomoSvgRing');
      if (ring) {
        const circumference = 552.92;
        const progress = pomoState.seconds / (pomoState.totalSeconds || 1);
        const offset = circumference - (progress * circumference);
        ring.style.strokeDashoffset = offset;
      }

      // Cycle Dots
      const dotsContainer = document.getElementById('pomoCycleDots');
      const cycleText = document.getElementById('pomoCycleText');
      if (dotsContainer) {
        let dots = '';
        for (let i = 0; i < 4; i++) {
          dots += i < pomoState.cycle ? '<span>🍅</span>' : '<span>⚪</span>';
        }
        dotsContainer.innerHTML = dots;
      }
      if (cycleText) {
        cycleText.textContent = \`Pomodoro \${pomoState.cycle + 1} of 4 • Long break after 4\`;
      }

      const totalStats = document.getElementById('pomoTotalStats');
      if (totalStats) {
        const totalMins = pomoState.totalSessionsToday * 25;
        totalStats.textContent = \`\${pomoState.totalSessionsToday} focus blocks (\${totalMins}m studied) today\`;
      }

      // Browser Tab Title
      if (pomoState.running) {
        document.title = \`(\${timeStr}) \${pomoState.mode.includes('Break') ? '☕ Break' : '🔥 Focus'} | Buns vs Pharmacology\`;
      }
    }

    // --- 17. ZEN FOCUS MODE ---
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

    // --- 18. TAB NAVIGATION ---
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

    // --- 19. 15-DAY TIMELINE MAP ---
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

    // --- 20. KEYBOARD SHORTCUTS ---
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const pomoModal = document.getElementById('pomodoroModal');
      const isPomoOpen = pomoModal && !pomoModal.classList.contains('hidden');
      if (isPomoOpen) {
        if (e.code === 'Space') {
          e.preventDefault();
          togglePomodoro();
        } else if (e.code === 'Escape') {
          closePomodoroModal();
        }
        return;
      }

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

    // --- 21. APP BOOTSTRAP ---
    window.addEventListener('DOMContentLoaded', () => {
      initTheme();
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
      updatePomoDisplay();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlTemplate, 'utf8');
console.log("Successfully generated updated index.html for Buns vs Pharmacology!");
console.log("New file size:", fs.statSync('index.html').size, "bytes");

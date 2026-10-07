// ============================================================
//  AI ENGINEER COMMAND CENTER — CORE APPLICATION (app.js)
//  GitHub Pages Hosted | Supabase Cloud | GitHub Auto-Commit
// ============================================================

'use strict';

// ─── CONSTANTS & SECURITY ─────────────────────────────────────
const APP_VERSION = '2.0.0';
const STATE_KEY   = 'aie_cmd_state_v2';
const SCHEMA_VERSION = 2;
const CREDS_KEY   = 'aie_cmd_creds_v1';
const AUTH_KEY    = 'aie_auth_session_v1';

const ALLOWED_EMAIL     = 'tharindudhananjayaekanayaka@gmail.com';
const ALLOWED_PASS_HASH = 'f514af2dc9eefca12301c562d2b787a2aff99bea83103e9559e63b44f49e7eeb';

async function hashPassword(pass) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(pass);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_) {}
  return pass === 'cpYT8654' ? ALLOWED_PASS_HASH : 'invalid';
}

function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'authenticated' ||
         sessionStorage.getItem(AUTH_KEY) === 'authenticated';
}

const ICONS = {
  dashboard: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
  roadmap: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  recall: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`,
  graph: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="8.5" y1="7.5" x2="15.5" y2="16.5"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="9" y1="18" x2="15" y2="18"/></svg>`,
  settings: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  flame: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.8 2.2-2.5 4.3-4.2 6.1C6.1 9.9 5 12.3 5 15c0 3.9 3.1 7 7 7s7-3.1 7-7c0-2.8-1.5-5.3-3.2-7.2-.6 2.3-2.3 3.7-3.8 3.7-.4 0-.8-.1-1.1-.3 1.1-1.8 1.8-3.9 1.1-6.2z"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  calendar: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  spark: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  arrowRight: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  reset: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>`,
  maximize: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
  minimize: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
  mic: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  copy: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  volume: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  book: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  analytics: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
};

const ENGINEER_TITLES = [
  { from: 1,  to: 7,  title: 'Novice Code Artisan',        icon: '🌱' },
  { from: 8,  to: 21, title: 'Backend Systems Builder',     icon: '⚙️' },
  { from: 22, to: 42, title: 'Applied ML Practitioner',     icon: '📊' },
  { from: 43, to: 56, title: 'Generative AI Engineer',      icon: '🤖' },
  { from: 57, to: 70, title: 'Autonomous Agent Architect',  icon: '🧠' },
  { from: 71, to: 84, title: 'Production AI Engineer',      icon: '🚀' },
  { from: 85, to: 90, title: 'Enterprise AI Systems Lead',  icon: '🏆' }
];

const SKILL_KEYS   = ['engineering', 'ml', 'llm', 'agents', 'production'];
const SKILL_LABELS = ['Core Engineering', 'Data & ML', 'LLM Engineering', 'Agentic Systems', 'Production Ops'];

const STREAK_LEVELS = [
  { days: 0,  color: '#475569', emoji: '💤' },
  { days: 3,  color: '#f59e0b', emoji: '🔥' },
  { days: 7,  color: '#f97316', emoji: '🔥' },
  { days: 14, color: '#ef4444', emoji: '🔥' },
  { days: 30, color: '#a855f7', emoji: '⚡' },
  { days: 60, color: '#00e5ff', emoji: '🌊' },
  { days: 90, color: '#00ff96', emoji: '👑' }
];

const DAY_MODES = {
  deep:        { label: '🔥 Deep Day',        minHours: 8,    xpMultiplier: 1.0,  color: '#ef4444', minVoiceSec: 180, noteMinChars: 300, requiresRecall: true,  requiresBuild: true },
  standard:    { label: '🟢 Standard Day',     minHours: 5,    xpMultiplier: 0.8,  color: '#10b981', minVoiceSec: 120, noteMinChars: 200, requiresRecall: true,  requiresBuild: true },
  university:  { label: '🟡 University Day',   minHours: 2,    xpMultiplier: 0.5,  color: '#f59e0b', minVoiceSec: 60,  noteMinChars: 100, requiresRecall: true,  requiresBuild: false },
  maintenance: { label: '🔵 Maintenance Day',  minHours: 0.75, xpMultiplier: 0.25, color: '#60a5fa', minVoiceSec: 60,  noteMinChars: 50,  requiresRecall: true,  requiresBuild: false },
  recovery:    { label: '🌿 Recovery Day',     minHours: 0.5,  xpMultiplier: 0.1,  color: '#34d399', minVoiceSec: 0,   noteMinChars: 30,  requiresRecall: true,  requiresBuild: false }
};

const MASTERY_LEVELS = [
  { key: 'not_attempted', label: 'Not Attempted', icon: '⬜', color: '#475569', order: 0 },
  { key: 'familiar',      label: 'Familiar',      icon: '🔵', color: '#60a5fa', order: 1 },
  { key: 'can_explain',   label: 'Can Explain',   icon: '🟡', color: '#f59e0b', order: 2 },
  { key: 'can_implement', label: 'Can Implement', icon: '🟠', color: '#f97316', order: 3 },
  { key: 'can_debug',     label: 'Can Debug',     icon: '🔴', color: '#ef4444', order: 4 },
  { key: 'can_apply',     label: 'Mastered ✦',    icon: '🟢', color: '#10b981', order: 5 }
];

const MORNING_MOTIVATIONS = [
  "ඔයා code කරනකොට ලෝකයේ 99% දෙනා sleep scroll කරනවා. Let that gap widen.",
  "Day {day} is not a number — it's evidence. Build the evidence.",
  "Last night's reflection was your fuel. Today's build is your proof.",
  "Real engineers don't wait for motivation. They build until it arrives.",
  "Production systems don't care about your mood. Ship something real today.",
  "The voice recording you avoid doing is exactly the thing you need most.",
  "Consistency is not a trait — it's a decision made every morning.",
  "What you build today will commit to GitHub. Make it worth the green square.",
  "අද දිනය ඔබ දැනටමත් හිමිකරගෙන හිටි දිනයක්. Build කරන්නම් ඉන්නේ ඔබ.",
  "Your future self is watching how you spend the next 10 hours."
];

// ─── STATE MANAGEMENT ─────────────────────────────────────────

function defaultState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    version: APP_VERSION,
    userId: null,
    name: '',
    startDate: null,

    // V2: Mission Day is separate from calendar day
    missionDay: 1,        // advances only after verified completion
    currentDay: 1,        // alias kept for backward compat
    targetMode: 'standard', // default workload mode

    completedDays: {},    // { missionDay: { completedAt, hours, mode, xpAwarded, evidenceScore } }
    dailyDrafts: {},      // { missionDay: { ...daily log draft, autosaved } }
    focusSessions: [],    // [ { category, plannedMinutes, actualMinutes, completed, outputEvidence, focusRating, distractionCount, startedAt, endedAt } ]

    // Recall V2
    recallItems: {},      // { conceptId: { lastReviewed, nextReview, interval, ease, attempts, correctCount, confidenceHistory } }
    recallHistory: [],    // legacy compat
    weakTopics: [],       // [ { concept, sourceMissionDay, confidence, failureCount, lastAttempted, nextRemediation, activity } ]

    // Mastery
    mastery: {},          // { conceptId: 'not_attempted'|'familiar'|'can_explain'|'can_implement'|'can_debug'|'can_apply' }

    // XP & Skills
    skillXP: { engineering: 0, ml: 0, llm: 0, agents: 0, production: 0 },
    knowledgeNodes: [],
    sparkIdeas: [],
    weeklyReviews: {},
    monthlyMilestones: {},

    // Competency metrics (V2)
    metrics: {
      verifiedDeepWorkMinutes: 0,
      independentSolveAttempts: 0,
      independentSolves: 0,
      recallCorrect: 0,
      recallTotal: 0,
      featuresShipped: 0,
      testsPassed: 0,
      testsFailed: 0,
      commits: 0,
      deployments: 0,
      aiAssistanceTotal: 0,
      aiAssistanceCount: 0
    },

    // Consistency (V2)
    consistency: {
      plannedSessions: 0,
      completedSessions: 0,
      currentStreak: 0,
      longestStreak: 0
    },

    // Legacy compat
    streak: 0,
    longestStreak: 0,
    totalHours: 0,

    // Sync
    sync: {
      pendingActions: [],
      lastSyncedAt: null,
      version: 0
    }
  };
}

function migrateState(state) {
  if (!state) return defaultState();

  // V1 → V2 migration
  if (!state.schemaVersion || state.schemaVersion < 2) {
    console.log('[V2 Migration] Migrating state from V1 to V2...');
    const v1 = state;
    const v2 = defaultState();

    // Preserve all V1 data
    v2.name        = v1.name || '';
    v2.startDate   = v1.startDate || null;
    v2.missionDay  = v1.currentDay || 1;
    v2.currentDay  = v1.currentDay || 1;
    v2.completedDays = v1.completedDays || {};
    v2.skillXP     = v1.skillXP || v2.skillXP;
    v2.knowledgeNodes = v1.knowledgeNodes || [];
    v2.weakTopics  = v1.weakTopics || [];
    v2.recallHistory = v1.recallHistory || [];
    v2.sparkIdeas  = v1.sparkIdeas || [];
    v2.weeklyReviews = v1.weeklyReviews || {};
    v2.monthlyMilestones = v1.monthlyMilestones || {};
    v2.streak      = v1.streak || 0;
    v2.longestStreak = v1.longestStreak || 0;
    v2.totalHours  = v1.totalHours || 0;
    v2.consistency.currentStreak = v1.streak || 0;
    v2.consistency.longestStreak = v1.longestStreak || 0;

    console.log('[V2 Migration] Complete. Mission Day:', v2.missionDay);
    return v2;
  }

  // Ensure all new fields exist (forward compat)
  return { ...defaultState(), ...state };
}

function loadState() {
  try {
    // Try V2 key first
    let raw = localStorage.getItem(STATE_KEY);
    if (!raw) {
      // Try V1 key for migration
      raw = localStorage.getItem('aie_cmd_state_v1');
    }
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return migrateState(parsed);
  } catch (e) {
    console.warn('State load error:', e);
    return defaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    showToast('⚠️ Local storage save failed', 'error');
  }
}

// V2: Dynamic completion requirements based on day mode
function getCompletionRequirements(mode, roadmapDay) {
  const m = DAY_MODES[mode] || DAY_MODES.standard;
  const isReviewDay = roadmapDay && roadmapDay.isReviewDay;
  return {
    minHours:       m.minHours,
    minVoiceSec:    m.minVoiceSec,
    noteMinChars:   m.noteMinChars,
    requiresRecall: m.requiresRecall,
    requiresBuild:  m.requiresBuild && !isReviewDay,
    requiresReflection: mode !== 'maintenance',
    minReflectionChars: mode === 'deep' ? 100 : 50,
    mode
  };
}

// V2: Pure completion validator — returns { passed, checks, score, missingCount }
function validateDayCompletion(log, requirements) {
  if (!log || !requirements) return { passed: false, checks: [], score: 0, missingCount: 1 };

  const checks = [];

  // Hours check
  const hours = parseFloat(log.hours || log.studyHours || 0);
  const hoursPassed = hours >= requirements.minHours;
  checks.push({
    key: 'hours',
    label: `Focused hours: ${hours.toFixed(1)}h / ${requirements.minHours}h required`,
    passed: hoursPassed
  });

  // Notes check
  const noteLen = (log.studyNotes || log.notes || '').trim().length;
  const notesPassed = noteLen >= requirements.noteMinChars;
  checks.push({
    key: 'notes',
    label: `Study notes: ${noteLen} chars / ${requirements.noteMinChars} required`,
    passed: notesPassed
  });

  // Voice check
  const voiceSec = parseInt(log.voiceDuration || log.voiceSeconds || 0);
  const voicePassed = voiceSec >= requirements.minVoiceSec || !!(log.voiceUrl || log.voiceRecorded);
  checks.push({
    key: 'voice',
    label: `Voice explanation: ${Math.floor(voiceSec/60)}:${String(voiceSec%60).padStart(2,'0')} / ${Math.floor(requirements.minVoiceSec/60)}:00 required`,
    passed: voicePassed
  });

  // Recall check
  if (requirements.requiresRecall) {
    const recallDone = !!(log.recallDone || log.recallCompleted);
    checks.push({
      key: 'recall',
      label: 'Daily recall: ' + (recallDone ? 'completed' : 'not completed'),
      passed: recallDone
    });
  }

  // Build check
  if (requirements.requiresBuild) {
    const buildDone = !!(log.githubCommit || log.buildEvidence || log.commitLink);
    checks.push({
      key: 'build',
      label: 'Build evidence / GitHub commit: ' + (buildDone ? 'present' : 'missing'),
      passed: buildDone
    });
  }

  // Reflection check
  if (requirements.requiresReflection) {
    const reflLen = (log.reflection || log.reflectionText || '').trim().length;
    const reflPassed = reflLen >= requirements.minReflectionChars;
    checks.push({
      key: 'reflection',
      label: `Reflection: ${reflLen} chars / ${requirements.minReflectionChars} required`,
      passed: reflPassed
    });
  }

  const passed = checks.every(c => c.passed);
  const score = Math.round((checks.filter(c => c.passed).length / checks.length) * 100);
  const missingCount = checks.filter(c => !c.passed).length;

  return { passed, checks, score, missingCount };
}

// V2: Evidence-based XP calculation
function calculateDayXP(roadmapDay, log, mode) {
  if (!roadmapDay) return { engineering: 0, ml: 0, llm: 0, agents: 0, production: 0 };
  const modeData = DAY_MODES[mode] || DAY_MODES.standard;
  const baseXP = roadmapDay.xpRewards || { engineering: 10, ml: 0, llm: 0, agents: 0, production: 5 };

  // Evidence score 0-1 based on completion quality
  const reqs = getCompletionRequirements(mode, roadmapDay);
  const validation = validateDayCompletion(log, reqs);
  const evidenceScore = validation.score / 100;

  const result = {};
  for (const skill of SKILL_KEYS) {
    result[skill] = Math.round((baseXP[skill] || 0) * modeData.xpMultiplier * evidenceScore);
  }
  return result;
}

function loadCreds() {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) { return {}; }
}

function saveCreds(creds) {
  try {
    localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
  } catch (e) {
    showToast('⚠️ Credentials save failed', 'error');
  }
}

// ─── SUPABASE CLIENT ──────────────────────────────────────────

let sbClient = null;

function initSupabase(url, key) {
  if (!url || !key) return false;
  try {
    if (typeof window.supabase === 'undefined' || typeof window.supabase.createClient !== 'function') {
      console.warn('Supabase client library not loaded yet');
      return false;
    }
    sbClient = window.supabase.createClient(url, key);
    return true;
  } catch (e) {
    console.error('Supabase init error:', e);
    return false;
  }
}

async function supabaseUpsertDay(dayNum, dayData) {
  if (!sbClient) return false;
  try {
    const { error } = await sbClient
      .from('daily_logs')
      .upsert({
        day_num: dayNum,
        data: dayData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'day_num' });
    if (error) throw error;
    return true;
  } catch (e) {
    console.warn('Supabase upsert error:', e);
    return false;
  }
}

async function supabaseUploadAudio(dayNum, blob) {
  if (!sbClient || !blob) return null;
  try {
    const filename = `day-${String(dayNum).padStart(2,'0')}-voice.webm`;
    const { error } = await sbClient.storage
      .from('voice-notes')
      .upload(filename, blob, {
        contentType: 'audio/webm',
        upsert: true
      });
    if (error) throw error;
    const { data } = sbClient.storage.from('voice-notes').getPublicUrl(filename);
    return data.publicUrl;
  } catch (e) {
    console.warn('Supabase audio upload error:', e);
    return null;
  }
}

async function supabaseSyncState(state) {
  if (!sbClient) return false;
  try {
    const { error } = await sbClient
      .from('app_state')
      .upsert({
        id: 1,
        state: state,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    if (error) throw error;
    return true;
  } catch (e) {
    console.warn('Supabase state sync error:', e);
    return false;
  }
}

async function supabaseLoadState() {
  if (!sbClient) return null;
  try {
    const { data, error } = await sbClient
      .from('app_state')
      .select('state')
      .eq('id', 1)
      .single();
    if (error || !data) return null;
    return data.state;
  } catch (e) { return null; }
}

// ─── GITHUB API ───────────────────────────────────────────────

async function githubCommitDay(dayNum, markdownContent) {
  const creds = loadCreds();
  if (!creds.githubToken || !creds.githubRepo) return false;

  const [owner, repo] = creds.githubRepo.split('/');
  if (!owner || !repo) return false;

  const path = `notes/day-${String(dayNum).padStart(2, '0')}.md`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    // Check if file exists (to get sha for update)
    let sha = null;
    try {
      const check = await fetch(apiBase, {
        headers: {
          'Authorization': `token ${creds.githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (check.ok) {
        const existing = await check.json();
        sha = existing.sha;
      }
    } catch (_) {}

    const body = {
      message: `📚 Day ${dayNum} Complete — AI Engineer Journey`,
      content: btoa(unescape(encodeURIComponent(markdownContent))),
      committer: {
        name: 'AI Engineer Dashboard',
        email: 'dashboard@ai-engineer-journey.com'
      }
    };
    if (sha) body.sha = sha;

    const res = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${creds.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    return true;
  } catch (e) {
    console.warn('GitHub commit error:', e);
    return false;
  }
}

async function githubUpdateReadme(state) {
  const creds = loadCreds();
  if (!creds.githubToken || !creds.githubRepo) return;

  const [owner, repo] = creds.githubRepo.split('/');
  const completedCount = Object.keys(state.completedDays || {}).length;
  const totalHours = Math.round(state.totalHours || 0);
  const streak = state.streak || 0;

  const readme = `# 🤖 AI Engineer 90-Day Journey

> **Strict Evidence-Based Learning** — No checkbox ticking. No fake progress.

## 📊 Live Stats

| Metric | Value |
|--------|-------|
| Days Completed | ${completedCount} / 90 |
| Total Hours | ${totalHours}h |
| Current Streak | 🔥 ${streak} days |
| Engineer Title | ${getEngineerTitle(state.currentDay).icon} ${getEngineerTitle(state.currentDay).title} |
| Progress | ${Math.round((completedCount / 90) * 100)}% |

## 📅 Journey Log

${Object.keys(state.completedDays || {}).sort((a,b)=>Number(a)-Number(b)).map(d => {
  const day = state.completedDays[d];
  const icon = day.type === 'maintenance' ? '🟡' : '🟢';
  return `- ${icon} **Day ${d}** — ${day.hours}h${day.dayTitle ? ` — ${day.dayTitle}` : ''}`;
}).join('\n') || '*(No days completed yet)*'}

## 🗺️ Roadmap

See the [full 90-day roadmap](notes/) in the notes folder.

---
*Auto-generated by [AI Engineer Command Center Dashboard](https://github.com/${owner}/${repo})*
`;

  const path = 'README.md';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    let sha = null;
    try {
      const check = await fetch(apiBase, {
        headers: { 'Authorization': `token ${creds.githubToken}`, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (check.ok) { const ex = await check.json(); sha = ex.sha; }
    } catch(_) {}

    const body = {
      message: `📊 Update README — Day ${state.currentDay} progress`,
      content: btoa(unescape(encodeURIComponent(readme)))
    };
    if (sha) body.sha = sha;

    await fetch(apiBase, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${creds.githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } catch (e) {
    console.warn('README update error:', e);
  }
}

// ─── MARKDOWN GENERATOR ───────────────────────────────────────

function buildDayMarkdown(dayNum, roadmapDay, dayLog) {
  const d = new Date(dayLog.completedAt || new Date());
  const dateStr = d.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  const statusIcon = dayLog.type === 'maintenance' ? '🟡 Maintenance Day' : '🟢 Full Day';

  const xpEntries = Object.entries(dayLog.xpGained || {})
    .filter(([,v]) => v > 0)
    .map(([k,v]) => `  - ${k}: +${v} XP`)
    .join('\n') || '  - N/A';

  return `# 📅 Day ${dayNum} — ${roadmapDay?.title || 'Study Day'}

**Date:** ${dateStr}
**Status:** ${statusIcon}
**Hours Logged:** ${dayLog.hours}h

---

## 📚 Topics Studied

${(roadmapDay?.topics || []).map(t => `- ${t}`).join('\n') || '- (No topics logged)'}

---

## 📝 Study Notes

${dayLog.notes || '*(No notes recorded)*'}

---

## 🏗️ Build Evidence

**Task:** ${roadmapDay?.buildTask || 'Build task'}

**What I Built:**
${dayLog.buildEvidence || '*(No build evidence recorded)*'}

**GitHub Commit/PR:** ${dayLog.githubLink || '*(No link provided)*'}

---

## ⚡ Practice Session

**Task:** ${roadmapDay?.practiceTask || 'Practice task'}

**What I Practised:**
${dayLog.practiceNotes || '*(No practice notes)*'}

---

## 🎙️ Voice Explanation

${dayLog.voiceUrl ? `[Listen to Voice Explanation](${dayLog.voiceUrl})` : '*(Voice explanation not recorded or not synced)*'}

---

## 🪞 Daily Reflection

${dayLog.reflection || '*(No reflection recorded)*'}

**Self-Rating:** ${dayLog.selfRating || 'N/A'} / 5
**Hardest Part:** ${dayLog.hardestPart || 'N/A'}
**Debug Victory:** ${dayLog.debugVictory || 'N/A'}

---

## 🎮 XP Gained

${xpEntries}

---

*Auto-committed by AI Engineer Command Center Dashboard*
`;
}

// ─── UTILITY FUNCTIONS ─────────────────────────────────────────

function getEngineerTitle(day) {
  for (const t of ENGINEER_TITLES) {
    if (day >= t.from && day <= t.to) return t;
  }
  return ENGINEER_TITLES[ENGINEER_TITLES.length - 1];
}

function getStreakLevel(streak) {
  let level = STREAK_LEVELS[0];
  for (const l of STREAK_LEVELS) {
    if (streak >= l.days) level = l;
  }
  return level;
}

function getDayFromStartDate(startDate) {
  if (!startDate) return 1;
  const start = new Date(startDate);
  const now   = new Date();
  start.setHours(0,0,0,0);
  now.setHours(0,0,0,0);
  const diff = Math.floor((now - start) / (1000*60*60*24)) + 1;
  return Math.min(Math.max(diff, 1), 90);
}

function getRoadmapDay(dayNum) {
  if (!window.ROADMAP) return null;
  for (const week of window.ROADMAP) {
    for (const day of week.days) {
      if (day.day === dayNum) return day;
    }
  }
  return null;
}

function getMorningMessage(dayNum, name) {
  const msg = MORNING_MOTIVATIONS[(dayNum - 1) % MORNING_MOTIVATIONS.length];
  return msg.replace('{day}', dayNum).replace('{name}', name || 'Engineer');
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function updateSyncIndicator(status) {
  const dot  = document.getElementById('syncDot');
  const text = document.getElementById('syncText');
  if (!dot || !text) return;
  dot.className = 'sync-dot';
  if (status === 'online')  { dot.classList.add('');        text.textContent = 'Synced'; }
  if (status === 'offline') { dot.classList.add('offline'); text.textContent = 'Offline'; }
  if (status === 'syncing') { dot.classList.add('syncing'); text.textContent = 'Syncing...'; }
}

// ─── LIVE CLOCK & ZEN FOCUS TIMER ─────────────────────────────

let focusDurationSeconds  = 2 * 60 * 60; // default 2 hours (7200s)
let focusRemainingSeconds = 2 * 60 * 60;
let focusTimerInterval    = null;
let isFocusRunning        = false;
let focusTargetLabel      = '2 Hours (Deep Work)';

function getFormattedLocalTime() {
  const d = new Date();
  return d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatCountdown(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Continuous local clock update (every 1s)
setInterval(() => {
  const timeStr = getFormattedLocalTime();
  const el = document.getElementById('liveLocalClock');
  if (el) el.textContent = timeStr;
  const zenEl = document.getElementById('zenLocalClock');
  if (zenEl) zenEl.textContent = `LOCAL TIME • ${timeStr}`;
}, 1000);

function playZenChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const freqs = [528, 660, 792, 1056]; // Solfeggio / Tibetan singing bell frequencies
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.28);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.28);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.28 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.28 + 3.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.28);
      osc.stop(ctx.currentTime + idx * 0.28 + 3.2);
    });
  } catch (e) {
    console.warn('Audio chime error:', e);
  }
}

window.setFocusPreset = function(seconds, label) {
  focusDurationSeconds  = seconds;
  focusRemainingSeconds = seconds;
  focusTargetLabel      = label;
  if (isFocusRunning) {
    clearInterval(focusTimerInterval);
    isFocusRunning = false;
  }
  updateFocusDisplay();

  document.querySelectorAll('.timer-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.seconds == seconds);
  });
};

function updateFocusDisplay() {
  const formatted = formatCountdown(focusRemainingSeconds);
  const cardDigits = document.getElementById('countdownDigits');
  const zenDigits  = document.getElementById('zenTimerDisplay');
  const targetLabelEl = document.getElementById('countdownTargetLabel');
  const zenTargetEl   = document.getElementById('zenTargetBadge');
  const playBtnText   = document.getElementById('focusPlayBtn');
  const zenPlayBtn    = document.getElementById('zenPlayBtn');

  if (cardDigits) {
    cardDigits.textContent = formatted;
    cardDigits.classList.toggle('running', isFocusRunning);
  }
  if (zenDigits) {
    zenDigits.textContent = formatted;
  }
  if (targetLabelEl) targetLabelEl.textContent = `TARGET: ${focusTargetLabel}`;
  if (zenTargetEl) zenTargetEl.textContent = `TARGET: ${focusTargetLabel}`;

  const btnHtml = isFocusRunning
    ? `${ICONS.pause} <span>Pause</span>`
    : `${ICONS.play} <span>Start Focus</span>`;
  if (playBtnText) playBtnText.innerHTML = btnHtml;
  if (zenPlayBtn) zenPlayBtn.innerHTML = btnHtml;
}

window.toggleFocusTimer = function() {
  if (isFocusRunning) {
    // Pause
    clearInterval(focusTimerInterval);
    isFocusRunning = false;
    updateFocusDisplay();
    showToast('⏸️ Focus timer paused', 'info');
  } else {
    // Start
    if (focusRemainingSeconds <= 0) {
      focusRemainingSeconds = focusDurationSeconds;
    }
    isFocusRunning = true;
    updateFocusDisplay();
    showToast(`⚡ Focus started — ${focusTargetLabel}`, 'success');

    focusTimerInterval = setInterval(() => {
      focusRemainingSeconds--;
      updateFocusDisplay();

      if (focusRemainingSeconds <= 0) {
        clearInterval(focusTimerInterval);
        isFocusRunning = false;
        updateFocusDisplay();
        onFocusTimerComplete();
      }
    }, 1000);
  }
};

window.resetFocusTimer = function() {
  clearInterval(focusTimerInterval);
  isFocusRunning = false;
  focusRemainingSeconds = focusDurationSeconds;
  updateFocusDisplay();
  showToast('🔄 Timer reset', 'info');
};

function onFocusTimerComplete() {
  playZenChime();
  if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 400]);

  const hoursGained = +(focusDurationSeconds / 3600).toFixed(1);
  window.currentDayLog = window.currentDayLog || {};
  const currentHours = window.currentDayLog.hours || 0;
  window.currentDayLog.hours = Math.min(12, +(currentHours + hoursGained).toFixed(1));

  // Update slider if present in DOM
  const slider = document.getElementById('hoursSlider');
  const display = document.getElementById('hoursDisplay');
  if (slider) slider.value = window.currentDayLog.hours;
  if (display) display.textContent = `${window.currentDayLog.hours}h`;
  updateLockChecklist();
  triggerAutoSave();

  launchParticles();
  showToast(`🎉 Focus Session Finished! +${hoursGained}h logged to your day.`, 'success', 8000);
}

window.openZenMode = function() {
  const overlay = document.getElementById('zenFocusOverlay');
  if (!overlay) return;
  overlay.classList.add('active');

  // Try standard fullscreen
  try {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } catch (_) {}

  updateFocusDisplay();
};

window.closeZenMode = function() {
  const overlay = document.getElementById('zenFocusOverlay');
  if (overlay) overlay.classList.remove('active');

  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  } catch (_) {}
};

window.openScheduleModal = function() {
  document.getElementById('scheduleModal')?.classList.add('show');
};

window.closeScheduleModal = function() {
  document.getElementById('scheduleModal')?.classList.remove('show');
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeZenMode();
    closeScheduleModal();
    if (typeof closeSparkModal === 'function') closeSparkModal();
  }
});

// ─── PARTICLE EFFECT ──────────────────────────────────────────

function launchParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  canvas.classList.add('show');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4 - 2,
    life: 1,
    decay: Math.random() * 0.02 + 0.01,
    size: Math.random() * 4 + 1,
    color: ['#00ff96','#00e5ff','#f59e0b','#a78bfa'][Math.floor(Math.random()*4)]
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= p.decay;
    });
    if (alive) requestAnimationFrame(animate);
    else { canvas.classList.remove('show'); ctx.clearRect(0,0,canvas.width,canvas.height); }
  }
  animate();
}

// ─── KNOWLEDGE GRAPH ──────────────────────────────────────────

let graphNodes = [], graphEdges = [], graphDragging = null, graphOffset = {x:0,y:0}, graphScale = 1;

function buildKnowledgeGraph(state) {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  try {
    canvas.width  = canvas.offsetWidth || 600;
    canvas.height = canvas.offsetHeight || 500;

  // Build nodes from completed days
  graphNodes = [];
  graphEdges = [];

  const CATEGORIES = {
    'Core Engineering': '#00ff96',
    'Data & ML':        '#00e5ff',
    'LLM Engineering':  '#a78bfa',
    'Agentic Systems':  '#f59e0b',
    'Production Ops':   '#f87171'
  };

  const completed = Object.keys(state.completedDays || {}).map(Number).sort((a,b)=>a-b);
  if (completed.length === 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Complete days to grow your knowledge galaxy...', canvas.width/2, canvas.height/2);
    return;
  }

  completed.forEach((dayNum, i) => {
    const rd = getRoadmapDay(dayNum);
    if (!rd) return;

    const angle = (i / completed.length) * Math.PI * 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.32;
    const x = canvas.width/2  + radius * Math.cos(angle) * (0.6 + Math.random()*0.4);
    const y = canvas.height/2 + radius * Math.sin(angle) * (0.6 + Math.random()*0.4);

    const xpTotal = Object.values(rd.xpRewards || {}).reduce((s,v)=>s+v, 0);
    const size = Math.max(6, Math.min(18, 6 + xpTotal / 10));

    const topSkill = Object.entries(rd.xpRewards || {}).sort((a,b)=>b[1]-a[1])[0];
    const skillKey = topSkill ? topSkill[0] : 'engineering';
    const skillLabel = SKILL_LABELS[SKILL_KEYS.indexOf(skillKey)] || 'Core Engineering';
    const color = CATEGORIES[skillLabel] || '#00ff96';

    graphNodes.push({ dayNum, x, y, size, color, title: rd.title, skillLabel });
  });

  // Edges between consecutive completed days
  for (let i = 1; i < graphNodes.length; i++) {
    graphEdges.push({ from: graphNodes[i-1], to: graphNodes[i] });
  }

  drawGraph(ctx, canvas);
  } catch (err) {
    console.warn('buildKnowledgeGraph error:', err);
  }
}

function drawGraph(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(graphOffset.x, graphOffset.y);
  ctx.scale(graphScale, graphScale);

  // Draw edges
  graphEdges.forEach(e => {
    ctx.beginPath();
    ctx.moveTo(e.from.x, e.from.y);
    ctx.lineTo(e.to.x, e.to.y);
    ctx.strokeStyle = 'rgba(0,255,150,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Draw nodes
  graphNodes.forEach(n => {
    // Glow
    ctx.shadowColor = n.color;
    ctx.shadowBlur  = 15;
    ctx.fillStyle   = n.color;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`D${n.dayNum}`, n.x, n.y - n.size - 3);
  });

  ctx.restore();
}

// ─── RADAR CHART ──────────────────────────────────────────────

function drawRadar(state) {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  try {
    const size = 220;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2, cy = size / 2, r = 85;
    const n = 5;
    const angles = Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);

    // Calculate max possible XP for normalization
    const maxXP = 90 * 25; // rough max per skill
    const skillXP = state?.skillXP || {};
    const values = SKILL_KEYS.map(k => Math.min(1, ((skillXP[k] || 0) / maxXP)));

    ctx.clearRect(0, 0, size, size);

  // Background grid
  [0.2, 0.4, 0.6, 0.8, 1].forEach(level => {
    ctx.beginPath();
    angles.forEach((a, i) => {
      const x = cx + r * level * Math.cos(a);
      const y = cy + r * level * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Axes
  angles.forEach(a => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.stroke();
  });

  // Data polygon
  ctx.beginPath();
  angles.forEach((a, i) => {
    const x = cx + r * values[i] * Math.cos(a);
    const y = cy + r * values[i] * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#10B981';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Dots
  angles.forEach((a, i) => {
    const x = cx + r * values[i] * Math.cos(a);
    const y = cy + r * values[i] * Math.sin(a);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#10B981';
    ctx.fill();
  });

  // Labels
  ctx.font = '9px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.textAlign = 'center';
  const shortLabels = ['Eng', 'ML', 'LLM', 'Agents', 'Ops'];
  angles.forEach((a, i) => {
    const x = cx + (r + 16) * Math.cos(a);
    const y = cy + (r + 16) * Math.sin(a);
    ctx.fillText(shortLabels[i], x, y + 3);
  });
  } catch(err) {
    console.warn('drawRadar error:', err);
  }
}

// ─── VOICE RECORDER ───────────────────────────────────────────

let mediaRecorder = null;
let audioChunks   = [];
let recordingTimer = null;
let recordingSeconds = 0;
let recordedBlob = null;

function initVoiceRecorder(dayNum) {
  const btn      = document.getElementById('recordBtn');
  const timer    = document.getElementById('voiceTimer');
  const status   = document.getElementById('voiceStatus');
  const playback = document.getElementById('voicePlayback');
  const dlBtn    = document.getElementById('voiceDownload');
  const uploadBtn = document.getElementById('voiceUpload');

  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // Stop recording
      mediaRecorder.stop();
      btn.classList.remove('recording');
      btn.innerHTML = '<span class="record-dot"></span> Start Recording';
      clearInterval(recordingTimer);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      recordedBlob = null;
      recordingSeconds = 0;

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data); };

      mediaRecorder.onstop = () => {
        recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(recordedBlob);
        if (playback) { playback.src = url; playback.style.display = 'block'; }
        if (dlBtn) dlBtn.style.display = 'inline-flex';
        if (uploadBtn) uploadBtn.style.display = 'inline-flex';
        if (status) status.textContent = `✅ Recorded ${formatTime(recordingSeconds)} — Ready to save`;
        stream.getTracks().forEach(t => t.stop());

        // Auto-mark voice as done
        window.currentDayLog = window.currentDayLog || {};
        window.currentDayLog.voiceRecorded = true;
        updateLockChecklist();
      };

      mediaRecorder.start();
      btn.classList.add('recording');
      btn.innerHTML = '<span class="record-dot"></span> Stop Recording';
      if (status) status.textContent = '🔴 Recording... speak clearly and explain the concept';

      recordingTimer = setInterval(() => {
        recordingSeconds++;
        if (timer) timer.textContent = formatTime(recordingSeconds);
      }, 1000);
    } catch (e) {
      showToast('🎙️ Microphone access denied. Please allow microphone permission.', 'error');
    }
  });

  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      if (!recordedBlob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(recordedBlob);
      a.download = `Day-${String(dayNum).padStart(2,'0')}-Voice-Explanation.webm`;
      a.click();
      showToast('⬇️ Voice recording downloaded!', 'success');
    });
  }

  if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
      if (!recordedBlob) return;
      uploadBtn.disabled = true;
      uploadBtn.textContent = '⬆️ Uploading...';
      updateSyncIndicator('syncing');

      const url = await supabaseUploadAudio(dayNum, recordedBlob);
      if (url) {
        window.currentDayLog = window.currentDayLog || {};
        window.currentDayLog.voiceUrl = url;
        showToast('☁️ Voice uploaded to Supabase!', 'success');
        if (status) status.textContent = `☁️ Uploaded to cloud — ${url.slice(0,40)}...`;
        updateSyncIndicator('online');
      } else {
        showToast('⚠️ Upload failed. Will save locally on day complete.', 'warning');
        updateSyncIndicator('offline');
      }
      uploadBtn.disabled = false;
      uploadBtn.textContent = '☁️ Upload to Cloud';
    });
  }
}

// ─── LOCK CHECKLIST ───────────────────────────────────────────

const LOCK_ITEMS = [
  { id: 'notes',          label: 'Study Notes written (min 100 chars)' },
  { id: 'buildEvidence',  label: 'Build Evidence / GitHub link added'  },
  { id: 'practiceNotes',  label: 'Practice session notes logged'       },
  { id: 'voiceRecorded',  label: 'Voice explanation recorded'          },
  { id: 'reflection',     label: 'Daily reflection completed'          },
  { id: 'hours',          label: 'Actual hours logged'                 }
];

function updateLockChecklist() {
  const log = window.currentDayLog || {};
  let allDone = true;

  LOCK_ITEMS.forEach(item => {
    const el = document.getElementById(`lock-${item.id}`);
    if (!el) return;

    let done = false;
    if (item.id === 'notes')         done = (log.notes || '').trim().length >= 100;
    if (item.id === 'buildEvidence') done = (log.buildEvidence || '').trim().length > 10;
    if (item.id === 'practiceNotes') done = (log.practiceNotes || '').trim().length > 10;
    if (item.id === 'voiceRecorded') done = !!log.voiceRecorded;
    if (item.id === 'reflection')    done = (log.reflection || '').trim().length >= 50;
    if (item.id === 'hours')         done = (log.hours || 0) > 0;

    el.className = `lock-item ${done ? 'done' : ''}`;
    const iconEl = el.querySelector('.lock-icon');
    if (iconEl) iconEl.textContent = done ? '✅' : '⬜';
    if (!done) allDone = false;
  });

  const completeDayBtn = document.getElementById('completeDay');
  if (completeDayBtn) {
    completeDayBtn.disabled = !allDone;
    completeDayBtn.textContent = allDone
      ? '🚀 Complete Day & Commit to GitHub'
      : '🔒 Complete All Blocks to Unlock';
  }
}

// ─── AUTO-SAVE ────────────────────────────────────────────────

let autoSaveTimer = null;
function triggerAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    const state = window.appState;
    if (!state) return;
    saveState(state);
  }, 1500);
}

// ─── PAGE ROUTER ──────────────────────────────────────────────

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });

  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Page-specific init
  if (pageId === 'graph')     buildKnowledgeGraph(window.appState || defaultState());
  if (pageId === 'recall')    renderRecallPage();
  if (pageId === 'roadmap')   renderRoadmapPage();
  if (pageId === 'english')   renderEnglishPage();
  if (pageId === 'analytics') renderAnalyticsPage();
  if (pageId === 'settings')  renderSettingsPage();
}

// ─── LOGIN & SECURITY SCREEN ───────────────────────────────────

function renderLoginScreen() {
  if (window.dismissLoader) window.dismissLoader();
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div id="page-login" class="page active" style="display:flex; align-items:center; justify-content:center; min-height:100vh; padding:40px 24px;">
      <div class="login-wrapper fade-in" id="loginCard">
        <div class="setup-header" style="margin-bottom:28px;text-align:center">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:14px;background:rgba(16,185,129,0.1);color:var(--accent-emerald);border:1px solid rgba(16,185,129,0.25);margin-bottom:16px">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 style="font-size:22px;font-weight:700;letter-spacing:-0.5px">COMMAND ACCESS GATE</h1>
          <p style="color:var(--accent-emerald);font-family:var(--font-mono);font-size:12px;margin-top:6px;letter-spacing:0.5px">
            RESTRICTED SYSTEM • AUTHORIZED OPERATOR ONLY
          </p>
        </div>

        <div class="glass-card" style="padding:28px">
          <form onsubmit="handleLoginSubmit(event)" id="loginForm">
            <div class="form-group" style="margin-bottom:20px">
              <label class="form-label">Operator Clearance Email</label>
              <input class="form-input" id="loginEmail" type="email" autocomplete="username" placeholder="tharindudhananjayaekanayaka@gmail.com" required style="font-family:var(--font-mono);font-size:13px">
            </div>

            <div class="form-group" style="margin-bottom:20px">
              <label class="form-label">Security Passkey</label>
              <div style="position:relative">
                <input class="form-input" id="loginPassword" type="password" autocomplete="current-password" placeholder="••••••••" required style="font-family:var(--font-mono);padding-right:42px">
                <button type="button" onclick="togglePassVisibility()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px" title="Show/Hide">
                  👁️
                </button>
              </div>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
              <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);cursor:pointer">
                <input type="checkbox" id="loginRemember" checked style="accent-color:var(--accent-emerald)">
                <span>Remember this terminal</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-full btn-lg" id="loginSubmitBtn">
              Authenticate &amp; Access
            </button>

            <div id="loginFeedback" style="margin-top:16px;text-align:center;font-size:12px;font-family:var(--font-mono);display:none"></div>
          </form>
        </div>

        <p style="text-align:center;color:var(--text-muted);font-size:11px;margin-top:20px;font-family:var(--font-mono)">
          Protected by SHA-256 Authentication Protocol • 90-Day Mission Log
        </p>
      </div>
    </div>
  `;

  setTimeout(() => {
    const emailInput = document.getElementById('loginEmail');
    const passInput  = document.getElementById('loginPassword');
    if (emailInput && !emailInput.value) {
      emailInput.focus?.();
    } else if (passInput) {
      passInput.focus?.();
    }
  }, 100);
}

window.togglePassVisibility = function() {
  const p = document.getElementById('loginPassword');
  if (p) p.type = p.type === 'password' ? 'text' : 'password';
};

window.handleLoginSubmit = async function(e) {
  if (e && e.preventDefault) e.preventDefault();
  const emailInput = document.getElementById('loginEmail');
  const passInput  = document.getElementById('loginPassword');
  const remember   = document.getElementById('loginRemember')?.checked;
  const feedback   = document.getElementById('loginFeedback');
  const card       = document.getElementById('loginCard');
  const btn        = document.getElementById('loginSubmitBtn');

  const email = emailInput?.value?.trim().toLowerCase();
  const pass  = passInput?.value || '';

  if (!email || !pass) {
    showToast('⚠️ Please enter both email and password', 'warning');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = '🔒 Verifying Clearance...';
  }

  const hash = await hashPassword(pass);
  const isMatch = (email === ALLOWED_EMAIL.toLowerCase()) && (hash === ALLOWED_PASS_HASH || pass === 'cpYT8654');

  if (isMatch) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = 'var(--neon-green)';
      feedback.textContent = '✅ CLEARANCE VERIFIED • Welcome, Engineer Tharindu.';
    }
    if (remember) {
      localStorage.setItem(AUTH_KEY, 'authenticated');
    } else {
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
    }

    showToast('✅ Access Granted. Welcome, Engineer Tharindu!', 'success');

    setTimeout(() => {
      boot();
    }, 400);
  } else {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '⚡ Authenticate & Access';
    }
    if (card) {
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.textContent = '⛔ ACCESS DENIED • Invalid operator credentials.';
    }
    showToast('⛔ Access Denied: Unauthorized credentials.', 'error');
    if (passInput) {
      passInput.value = '';
      passInput.focus?.();
    }
  }
};

window.logoutUser = function() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  showToast('🔒 Terminal Locked', 'info');
  renderLoginScreen();
};

// ─── SETUP SCREEN ─────────────────────────────────────────────

function renderSetupScreen() {
  if (window.dismissLoader) window.dismissLoader();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="page-setup" class="page active" style="display:flex; align-items:center; justify-content:center; min-height:100vh; padding:40px 24px;">
      <div class="setup-wrapper fade-in">
        <div class="setup-header">
          <div style="font-size:48px;margin-bottom:16px">🤖</div>
          <h1>AI ENGINEER COMMAND CENTER</h1>
          <p>90-Day Evidence-Based Training System — Let's configure your mission.</p>
        </div>

        <div class="glass-card" style="padding:28px">

          <div class="setup-section">
            <div class="setup-section-title">👤 Your Identity</div>
            <div class="form-group">
              <label class="form-label">Your Name / Callsign</label>
              <input class="form-input" id="s-name" type="text" placeholder="Engineer WW" value="Engineer">
            </div>
            <div class="form-group">
              <label class="form-label">Mission Start Date</label>
              <input class="form-input" id="s-date" type="date">
            </div>
            <div class="form-group">
              <label class="form-label">Daily Target Hours</label>
              <div class="hours-row">
                <input class="hours-slider" id="s-hours" type="range" min="4" max="12" value="10">
                <span class="hours-display" id="s-hours-display">10h</span>
              </div>
            </div>
          </div>

          <div class="setup-section">
            <div class="setup-section-title">🐙 GitHub Integration (Auto-Commit Notes)</div>
            <div class="form-group">
              <label class="form-label">GitHub Repository</label>
              <input class="form-input" id="s-repo" type="text" placeholder="username/repo-name" value="tharindudhananjayaekanayaka-hub/AI_engineer_work_plan">
              <div class="form-hint">Your repo: tharindudhananjayaekanayaka-hub/AI_engineer_work_plan</div>
            </div>
            <div class="form-group">
              <label class="form-label">GitHub Personal Access Token (PAT)</label>
              <input class="form-input" id="s-token" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx">
              <div class="form-hint">
                <a href="https://github.com/settings/tokens" target="_blank">Generate token here</a> → 
                Settings → Developer Settings → Tokens (classic) → Select "repo" scope
              </div>
            </div>
          </div>

          <div class="setup-section">
            <div class="setup-section-title">☁️ Supabase Cloud (Voice + Sync)</div>
            <div class="form-group">
              <label class="form-label">Supabase Project URL</label>
              <input class="form-input" id="s-supa-url" type="text" value="https://liwogqucisllytbimywh.supabase.co">
            </div>
            <div class="form-group">
              <label class="form-label">Supabase Anon / Public Key</label>
              <input class="form-input" id="s-supa-key" type="password" value="sb_publishable_nilZHxYBDAt3EmldAF3GNw_cpvBaXEt">
            </div>
            <div class="form-hint" style="margin-top:8px">
              ✅ Your Supabase project is pre-configured. You can change these in Settings later.
            </div>
          </div>

          <button class="btn btn-primary btn-full btn-lg" id="s-launch" onclick="launchDashboard()">
            🚀 Initialize Command Center
          </button>
        </div>
    </div>
  `;

  // Set today as default date
  const dateInput = document.getElementById('s-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  // Hours slider
  const slider = document.getElementById('s-hours');
  const display = document.getElementById('s-hours-display');
  if (slider && display) {
    slider.addEventListener('input', () => {
      display.textContent = slider.value + 'h';
    });
  }
}

function launchDashboard() {
  const name      = document.getElementById('s-name')?.value?.trim() || 'Engineer';
  const dateInput = document.getElementById('s-date');
  const startDate = dateInput?.value || new Date().toISOString().split('T')[0];
  const targetH   = parseInt(document.getElementById('s-hours')?.value || 10, 10);
  const repo      = document.getElementById('s-repo')?.value?.trim() || 'tharindudhananjayaekanayaka-hub/AI_engineer_work_plan';
  const token     = document.getElementById('s-token')?.value?.trim() || '';
  const supaUrl   = document.getElementById('s-supa-url')?.value?.trim() || '';
  const supaKey   = document.getElementById('s-supa-key')?.value?.trim() || '';

  if (dateInput && !dateInput.value) {
    dateInput.value = startDate;
  }

  // Save creds
  const creds = { githubRepo: repo, githubToken: token, supabaseUrl: supaUrl, supabaseKey: supaKey };
  saveCreds(creds);

  // Init supabase
  if (supaUrl && supaKey) {
    initSupabase(supaUrl, supaKey);
  }

  // Create state
  const state = defaultState();
  state.name        = name;
  state.startDate   = startDate;
  state.targetHours = targetH;
  state.currentDay  = getDayFromStartDate(startDate);
  saveState(state);

  window.appState = state;
  renderMainApp(state);
}

// ─── MAIN APP ──────────────────────────────────────────────────

function renderMainApp(state) {
  try {
    if (window.dismissLoader) window.dismissLoader();
    const appEl = document.getElementById('app');
    if (!appEl) throw new Error('No #app element found in DOM');

    appEl.innerHTML = buildAppShell(state);
    renderDashboardPage(state);

    // Nav listeners (desktop & mobile)
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.page));
    });

    document.addEventListener('keydown', e => {
      if ((e.altKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        openSparkModal();
      }
    });

  } catch (err) {
    console.error('renderMainApp CRASH:', err);
    const appEl = document.getElementById('app');
    if (appEl) {
      appEl.style.cssText = 'background:#0a0a0a;color:#ff4444;padding:40px;font-family:monospace;min-height:100vh;';
      appEl.innerHTML = `
        <h2 style="color:#ff4444;margin-bottom:16px">⚠️ Dashboard Render Error</h2>
        <p style="color:#fff;margin-bottom:8px"><strong>${err.message}</strong></p>
        <pre style="background:#1a1a2e;padding:16px;border-radius:8px;overflow:auto;font-size:11px;color:#aaa;margin-bottom:24px;white-space:pre-wrap">${err.stack || 'No stack available'}</pre>
        <button onclick="localStorage.clear();location.reload();"
          style="background:#ef4444;color:#fff;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:14px">
          🔄 Full Reset &amp; Reload
        </button>
        <button onclick="localStorage.removeItem('aie_cmd_state_v1');location.reload();"
          style="background:#7c3aed;color:#fff;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-size:14px;margin-left:12px">
          🔧 Reset State Only
        </button>
      `;
    }
  }
}

function buildAppShell(state) {
  const title = getEngineerTitle(state.currentDay);
  const sLevel = getStreakLevel(state.streak || 0);
  const completedCount = Object.keys(state.completedDays || {}).length;
  const progress = Math.round((completedCount / 90) * 100);
  const consistencyRate = (state.consistency?.plannedSessions > 0)
    ? Math.round((state.consistency.completedSessions / state.consistency.plannedSessions) * 100)
    : (state.streak > 0 ? 100 : 0);

  return `
    <div id="topbar">
      <div class="topbar-logo">
        <div class="logo-icon">${ICONS.spark}</div>
        <span>AI COMMAND</span>
      </div>

      <nav class="topbar-nav">
        <button class="nav-btn active" data-page="dashboard">${ICONS.dashboard}<span>Dashboard</span></button>
        <button class="nav-btn" data-page="roadmap">${ICONS.roadmap}<span>Roadmap</span></button>
        <button class="nav-btn" data-page="english">${ICONS.mic}<span>English Hub</span></button>
        <button class="nav-btn" data-page="analytics">${ICONS.analytics}<span>Analytics</span></button>
        <button class="nav-btn" data-page="recall">${ICONS.recall}<span>Recall</span></button>
        <button class="nav-btn" data-page="graph">${ICONS.graph}<span>Knowledge</span></button>
        <button class="nav-btn" data-page="settings">${ICONS.settings}<span>Settings</span></button>
      </nav>

      <div class="topbar-right">
        <div class="sync-indicator">
          <div class="sync-dot" id="syncDot"></div>
          <span id="syncText">Ready</span>
        </div>
        <div class="streak-display" style="margin-right: 8px;">
          <span class="streak-flame">${ICONS.calendar}</span>
          <span style="font-size:12px; font-weight: 600;">Mission ${state.missionDay || state.currentDay} • Cal Day ${state.startDate ? Math.floor((Date.now() - new Date(state.startDate)) / 86400000) + 1 : state.currentDay}</span>
        </div>
        <div class="streak-display" title="Consistency Rate" style="margin-right: 8px;">
          <span class="streak-flame">📈</span>
          <span style="font-size:12px; font-weight: 600;">${consistencyRate}%</span>
          <span style="font-size:10px;opacity:0.7">rate</span>
        </div>
        <div class="streak-display">
          <span class="streak-flame">${ICONS.flame}</span>
          <span id="streakCount">${state.streak || 0}</span>
          <span style="font-size:11px;opacity:0.7">streak</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="logoutUser()" title="Lock Terminal" style="padding:6px 12px;font-size:12px;margin-left:6px;gap:6px">${ICONS.lock} <span>Lock</span></button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <nav id="mobileNav">
      <button class="mobile-nav-btn active" data-page="dashboard">
        ${ICONS.dashboard}
        <span>Dashboard</span>
      </button>
      <button class="mobile-nav-btn" data-page="roadmap">
        ${ICONS.roadmap}
        <span>Roadmap</span>
      </button>
      <button class="mobile-nav-btn" data-page="english">
        ${ICONS.mic}
        <span>English</span>
      </button>
      <button class="mobile-nav-btn" data-page="analytics">
        ${ICONS.analytics}
        <span>Analytics</span>
      </button>
      <button class="mobile-nav-btn" data-page="recall">
        ${ICONS.recall}
        <span>Recall</span>
      </button>
      <button class="mobile-nav-btn" data-page="settings">
        ${ICONS.settings}
        <span>Settings</span>
      </button>
    </nav>

    <!-- Pages -->
    <div id="page-dashboard" class="page active">
      <div class="container" id="dashboardContent"></div>
    </div>
    <div id="page-roadmap" class="page">
      <div class="container" id="roadmapContent"></div>
    </div>
    <div id="page-english" class="page">
      <div class="container" id="englishContent"></div>
    </div>
    <div id="page-analytics" class="page">
      <div class="container" id="analyticsContent"></div>
    </div>
    <div id="page-recall" class="page">
      <div class="container" id="recallContent"></div>
    </div>
    <div id="page-graph" class="page">
      <div class="container">
        <div class="section-label" style="margin-bottom:20px">🌌 Knowledge Galaxy — Your Learning Universe</div>
        <canvas id="graphCanvas"></canvas>
        <p style="text-align:center;color:var(--text-muted);font-size:12px;margin-top:12px;font-family:var(--font-mono)">
          Each node = 1 completed day. Click & drag to explore.
        </p>
      </div>
    </div>
    <div id="page-settings" class="page">
      <div class="container" id="settingsContent"></div>
    </div>

    <!-- Celebration -->
    <canvas id="particleCanvas"></canvas>
    <div id="celebrationOverlay">
      <div class="celebration-card" id="celebrationCard"></div>
    </div>

    <!-- Spark Modal -->
    <div class="modal-overlay" id="sparkModal">
      <div class="modal-box">
        <div class="modal-title">⚡ Innovation Spark — Alt+I</div>
        <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Capture your idea before it escapes</p>
        <textarea class="form-textarea" id="sparkInput" placeholder="Your idea, insight, or breakthrough..." rows="4" style="margin-bottom:12px"></textarea>
        <div class="flex gap-2">
          <button class="btn btn-primary" onclick="saveSparkIdea()">⚡ Save Spark</button>
          <button class="btn btn-secondary" onclick="closeSparkModal()">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Zen Fullscreen Focus Mode -->
    <div id="zenFocusOverlay">
      <div class="zen-ambient-glow"></div>
      <div class="zen-topbar">
        <div class="zen-badge">
          <span class="live-pulse-dot"></span>
          <span>ZEN FOCUS MODE</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="closeZenMode()" style="gap:6px">
          ${ICONS.minimize} <span>Exit Fullscreen (Esc)</span>
        </button>
      </div>

      <div class="zen-center">
        <div class="zen-target-badge" id="zenTargetBadge">TARGET: 2 HOURS (DEEP WORK)</div>
        <div class="zen-timer-display" id="zenTimerDisplay">02:00:00</div>
        <div class="zen-local-clock" id="zenLocalClock">LOCAL TIME • 00:00:00</div>
        <div class="zen-quote">"While 99% of people sleep-scroll, you are compounding skills that define the next decade."</div>
      </div>

      <div class="zen-footer-controls">
        <button class="btn btn-primary btn-lg" onclick="toggleFocusTimer()" id="zenPlayBtn" style="gap:8px;padding:12px 28px;font-size:15px">
          ${ICONS.play} <span>Start Focus</span>
        </button>
        <button class="btn btn-secondary btn-lg" onclick="resetFocusTimer()" style="gap:8px;padding:12px 20px;font-size:15px">
          ${ICONS.reset} <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- 10-Hour Master Schedule Modal -->
    <div class="modal-overlay" id="scheduleModal">
      <div class="modal-box" style="max-width:680px;max-height:90vh;overflow-y:auto">
        <div class="flex justify-between items-center" style="margin-bottom:12px">
          <div class="modal-title" style="margin:0">📅 10-Hour Master Daily Schedule</div>
          <button class="btn btn-secondary btn-sm" onclick="closeScheduleModal()" style="padding:4px 10px">✕</button>
        </div>
        <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">
          Scientifically balanced time-blocking to conquer 10 deep hours without burnout.
        </p>

        <div style="overflow-x:auto">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>Time Window</th>
                <th>Session</th>
                <th>Focus &amp; Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="schedule-time">05:30 – 06:00</td>
                <td><span class="schedule-block-tag" style="background:rgba(255,255,255,0.06);color:var(--text-secondary)">30m Kickstart</span></td>
                <td>Sunlight, hydration, light stretch, daily mission preview</td>
              </tr>
              <tr>
                <td class="schedule-time">06:00 – 08:00</td>
                <td><span class="schedule-block-tag" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald)">Block 1 • 2h</span></td>
                <td><strong>Deep Study:</strong> First-principles theory, architecture, whitepapers</td>
              </tr>
              <tr>
                <td class="schedule-time">08:00 – 09:00</td>
                <td><span class="schedule-block-tag" style="background:rgba(245,158,11,0.15);color:var(--accent-amber)">60m Rest</span></td>
                <td>Breakfast &amp; true mental detachment from screens</td>
              </tr>
              <tr>
                <td class="schedule-time">09:00 – 13:00</td>
                <td><span class="schedule-block-tag" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan)">Block 2 • 4h</span></td>
                <td><strong>Deep Build:</strong> Hands-on production code &amp; capstone milestone</td>
              </tr>
              <tr>
                <td class="schedule-time">13:00 – 14:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(245,158,11,0.15);color:var(--accent-amber)">90m Recharge</span></td>
                <td>Lunch + 20-30 min power nap to restore cognitive power</td>
              </tr>
              <tr>
                <td class="schedule-time">14:30 – 16:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(168,85,247,0.15);color:var(--accent-purple)">Block 3 • 2h</span></td>
                <td><strong>Practice:</strong> LeetCode / DSA / Hands-on debugging (No tutorials)</td>
              </tr>
              <tr>
                <td class="schedule-time">16:30 – 17:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(255,255,255,0.06);color:var(--text-secondary)">60m Refresh</span></td>
                <td>Workout, outdoor walk, evening tea, fresh air</td>
              </tr>
              <tr>
                <td class="schedule-time">17:30 – 19:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(16,185,129,0.15);color:var(--accent-emerald)">Block 4 • 2h</span></td>
                <td><strong>English Mastery:</strong> Feynman speech out loud + AI voice interview</td>
              </tr>
              <tr>
                <td class="schedule-time">19:30 – 20:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(245,158,11,0.15);color:var(--accent-amber)">60m Dinner</span></td>
                <td>Dinner &amp; relaxing with family</td>
              </tr>
              <tr>
                <td class="schedule-time">20:30 – 21:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(6,182,212,0.15);color:var(--accent-cyan)">Block 5 • 1h</span></td>
                <td><strong>Reflection &amp; Lock:</strong> Notes review, GitHub auto-commit, terminal lock</td>
              </tr>
              <tr>
                <td class="schedule-time">22:00 – 05:30</td>
                <td><span class="schedule-block-tag" style="background:rgba(255,255,255,0.06);color:var(--text-muted)">7.5h Sleep</span></td>
                <td>Deep restorative sleep for neural memory consolidation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:20px;text-align:right">
          <button class="btn btn-primary btn-sm" onclick="closeScheduleModal()">Got It</button>
        </div>
      </div>
    </div>
  `;
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────

function renderDashboardPage(state) {
  const container = document.getElementById('dashboardContent');
  if (!container) return;

  const currentDay = state.currentDay || 1;
  const roadmapDay = getRoadmapDay(currentDay);
  const title      = getEngineerTitle(currentDay);
  const completedCount = Object.keys(state.completedDays || {}).length;
  const progress   = Math.round((completedCount / 90) * 100);
  const totalHours = Math.round(state.totalHours || 0);
  const morningMsg = getMorningMessage(currentDay, state.name);
  const isDayDone  = !!state.completedDays?.[currentDay];
  const isMaintenanceMode = false; // Can be toggled

  // Init day log
  window.currentDayLog = window.currentDayLog || {};

  container.innerHTML = `
    <!-- Morning Greeting -->
    <div class="morning-greeting fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px">
        <div class="greeting-day-label">DAY ${currentDay} OF 90 • ${new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).toUpperCase()}</div>
        <div class="title-badge">${title.icon} ${title.title}</div>
      </div>
      <h2 class="greeting-title">
        ${isDayDone ? 'Day Completed!' : `Today's Mission: <span>${roadmapDay?.title || 'Study Day'}</span>`}
      </h2>
      <p class="greeting-mission">${morningMsg}</p>
      <div class="greeting-meta">
        <div class="meta-chip green">${ICONS.calendar} Day ${currentDay}/90</div>
        <div class="meta-chip amber">${ICONS.clock} Target: ${state.targetHours || 10}h</div>
        <div class="meta-chip cyan">${ICONS.spark} ${progress}% Complete</div>
        <div class="meta-chip">${ICONS.check} ${completedCount} Days Done</div>
      </div>
    </div>

    <!-- Focus Timer & Live Clock Widget -->
    <div class="focus-timer-card fade-in">
      <div class="focus-timer-header">
        <div class="local-clock-badge">
          <span class="live-pulse-dot"></span>
          <span>LIVE CLOCK:</span>
          <span id="liveLocalClock">${getFormattedLocalTime()}</span>
        </div>

        <div class="timer-presets">
          <span style="font-size:11px;font-family:var(--font-mono);color:var(--text-muted);margin-right:4px">PRESET:</span>
          <button class="timer-preset-btn ${focusDurationSeconds === 7200 ? 'active' : ''}" data-seconds="7200" onclick="setFocusPreset(7200, '2 Hours (Deep Work)')">2 Hours</button>
          <button class="timer-preset-btn ${focusDurationSeconds === 3600 ? 'active' : ''}" data-seconds="3600" onclick="setFocusPreset(3600, '1 Hour (Focus)')">1 Hour</button>
          <button class="timer-preset-btn ${focusDurationSeconds === 1500 ? 'active' : ''}" data-seconds="1500" onclick="setFocusPreset(1500, '25 Min (Pomodoro)')">25 Min</button>
        </div>
      </div>

      <div class="focus-timer-body">
        <div class="countdown-wrapper">
          <div class="countdown-digits ${isFocusRunning ? 'running' : ''}" id="countdownDigits">${formatCountdown(focusRemainingSeconds)}</div>
          <div class="countdown-target-label" id="countdownTargetLabel">TARGET: ${focusTargetLabel}</div>
        </div>

        <div class="timer-controls-row">
          <button class="btn btn-primary" id="focusPlayBtn" onclick="toggleFocusTimer()" style="gap:8px">
            ${isFocusRunning ? `${ICONS.pause} <span>Pause</span>` : `${ICONS.play} <span>Start Focus</span>`}
          </button>
          <button class="btn btn-secondary" onclick="resetFocusTimer()" title="Reset Session" style="gap:6px">
            ${ICONS.reset} <span>Reset</span>
          </button>
          <button class="btn btn-secondary" onclick="openZenMode()" title="Zen Fullscreen Mode" style="gap:6px;border-color:rgba(16,185,129,0.3)">
            ${ICONS.maximize} <span>Zen Fullscreen</span>
          </button>
          <button class="btn btn-secondary" onclick="openScheduleModal()" title="10-Hour Master Schedule" style="gap:6px">
            ${ICONS.clock} <span>10h Schedule</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row fade-in">
      <div class="glass-card stat-card">
        <div class="stat-card-header">
          <span class="stat-label">Day Streak</span>
          <div class="stat-icon" style="color:var(--accent-amber)">${ICONS.flame}</div>
        </div>
        <div class="stat-value">${state.streak || 0}</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-card-header">
          <span class="stat-label">Total Hours</span>
          <div class="stat-icon" style="color:var(--accent-cyan)">${ICONS.clock}</div>
        </div>
        <div class="stat-value cyan">${totalHours}h</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-card-header">
          <span class="stat-label">Days Complete</span>
          <div class="stat-icon" style="color:var(--accent-emerald)">${ICONS.check}</div>
        </div>
        <div class="stat-value">${completedCount}</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-card-header">
          <span class="stat-label">Spark Ideas</span>
          <div class="stat-icon" style="color:var(--accent-purple)">${ICONS.spark}</div>
        </div>
        <div class="stat-value amber">${state.sparkIdeas?.length || 0}</div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="glass-card fade-in" style="padding:18px 24px;margin-bottom:24px">
      <div class="flex justify-between items-center" style="margin-bottom:10px">
        <span class="font-mono" style="font-size:11px;font-weight:600;letter-spacing:0.8px;color:var(--text-muted)">90-DAY MISSION TIMELINE</span>
        <span class="font-mono" style="font-size:13px;font-weight:700;color:var(--accent-emerald)">${progress}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
    </div>

    ${isDayDone ? renderDayComplete(currentDay, state) : renderDayBlocks(currentDay, roadmapDay, state)}
  `;

  // Update focus timer display if running
  updateFocusDisplay();

  // Skill bars
  renderSkillBars(state);
  drawRadar(state);

  // Init voice recorder if day not done
  if (!isDayDone) {
    initVoiceRecorder(currentDay);
    initBlockListeners(currentDay, roadmapDay, state);
  }
}

function renderDayComplete(currentDay, state) {
  const log = state.completedDays[currentDay] || {};
  const nextDay = currentDay + 1;
  const nextRD  = getRoadmapDay(nextDay);

  return `
    <div class="glass-card fade-in" style="padding:32px;text-align:center;border-color:rgba(16,185,129,0.3)">
      <div style="font-size:48px;margin-bottom:16px">🎉</div>
      <h3 style="color:var(--accent-emerald);font-family:var(--font-mono);font-size:20px;margin-bottom:8px">
        Day ${currentDay} Complete!
      </h3>
      <p style="color:var(--text-secondary);margin-bottom:24px">${log.hours}h logged • GitHub committed • ${log.voiceUrl ? 'Voice synced' : 'Voice local'}</p>

      ${nextRD ? `
        <div style="padding:16px;background:rgba(6,182,212,0.06);border-radius:14px;border:1px solid rgba(6,182,212,0.2);text-align:left">
          <div class="section-label">Tomorrow's Mission</div>
          <div style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:4px">Day ${nextDay}: ${nextRD.title}</div>
          <div style="font-size:13px;color:var(--text-muted)">${(nextRD.topics || []).slice(0,3).join(' • ')}</div>
        </div>
      ` : '<p style="color:var(--accent-emerald);font-size:18px;font-weight:700">🏆 Journey Complete! You are an AI Engineer!</p>'}
    </div>
  `;
}

window.toggleBlock = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('expanded');
};

window.hexToRgb = function(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : '0,0,0';
};

window.setDayMode = function(mode) {
  if (!DAY_MODES[mode]) return;
  window.appState = window.appState || {};
  window.appState.targetMode = mode;
  saveState(window.appState);
  // Re-render current day
  if (typeof renderCurrentDay === 'function') renderCurrentDay();
  else if (typeof showPage === 'function') showPage('roadmap');
  showToast(`${DAY_MODES[mode].label} activated`, 'success');
};

// V2: Focus Session Tracking
window._sprintInterval = null;
window._sprintData = null;

window.startFocusSprint = function(workMin, breakMin, category) {
  if (window._sprintInterval) {
    showToast('A sprint is already running!', 'warning');
    return;
  }
  const totalSec = workMin * 60;
  let elapsed = 0;
  window._sprintData = {
    category,
    plannedMinutes: workMin,
    breakMinutes: breakMin,
    startedAt: new Date().toISOString(),
    distractionCount: 0
  };

  const card = document.getElementById('activeSprintCard');
  const presets = document.getElementById('sprintPresets');
  if (card) card.style.display = 'block';
  if (presets) presets.style.opacity = '0.4';

  window._sprintInterval = setInterval(() => {
    elapsed++;
    const remaining = totalSec - elapsed;
    if (remaining <= 0) {
      clearInterval(window._sprintInterval);
      window._sprintInterval = null;
      window.endFocusSprint(true);
      return;
    }
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    const display = document.getElementById('sprintTimerDisplay');
    if (display) display.textContent = `${m}:${s}`;
  }, 1000);

  showToast(`🔥 ${workMin}min sprint started!`, 'success');
};

window.endFocusSprint = function(auto) {
  if (window._sprintInterval) {
    clearInterval(window._sprintInterval);
    window._sprintInterval = null;
  }
  const card = document.getElementById('activeSprintCard');
  const presets = document.getElementById('sprintPresets');
  if (card) card.style.display = 'none';
  if (presets) presets.style.opacity = '1';

  if (!window._sprintData) return;
  const ended = new Date();
  const startedAt = new Date(window._sprintData.startedAt);
  const actualMin = Math.round((ended - startedAt) / 60000);

  // Show confirmation modal
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center';
  overlay.innerHTML = `
    <div style="background:#0C1017;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;max-width:360px;width:90%">
      <div style="font-size:16px;font-weight:700;margin-bottom:4px">Sprint Complete ${auto ? '✅' : '⏹️'}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">Actual time: ~${actualMin} minutes</div>
      <div style="margin-bottom:12px">
        <label style="font-size:12px;color:var(--text-muted)">Was this a productive session?</label>
        <div style="display:flex;gap:8px;margin-top:6px">
          <button onclick="window.confirmSprint(true, ${actualMin})" style="flex:1;padding:8px;border-radius:6px;border:1px solid #10b981;background:rgba(16,185,129,0.1);color:#10b981;cursor:pointer;font-size:12px">✅ Yes, productive</button>
          <button onclick="window.confirmSprint(false, ${actualMin})" style="flex:1;padding:8px;border-radius:6px;border:1px solid #64748b;background:transparent;color:#64748b;cursor:pointer;font-size:12px">😐 Partially</button>
        </div>
      </div>
      <div style="margin-bottom:12px">
        <label style="font-size:12px;color:var(--text-muted)">Focus quality (1-5)</label>
        <div style="display:flex;gap:6px;margin-top:6px">
          ${[1,2,3,4,5].map(n => `<button onclick="window._focusRating=${n};this.parentElement.querySelectorAll('button').forEach(b=>b.style.background='transparent');this.style.background='rgba(16,185,129,0.2)'" style="flex:1;padding:6px;border-radius:4px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:13px">${n}</button>`).join('')}
        </div>
      </div>
      <button onclick="document.body.removeChild(this.closest('[style*=fixed]'))" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:12px;margin-top:8px">Skip confirmation</button>
    </div>`;
  document.body.appendChild(overlay);

  window._pendingSprintData = { ...window._sprintData, actualMinutes: actualMin, endedAt: ended.toISOString() };
  window._sprintData = null;
};

window.confirmSprint = function(productive, actualMin) {
  const overlay = document.querySelector('[style*="position:fixed"][style*="z-index:9999"]');
  if (overlay) document.body.removeChild(overlay);

  if (!window._pendingSprintData) return;
  const session = {
    ...window._pendingSprintData,
    completed: productive,
    focusRating: window._focusRating || 3,
    actualMinutes: actualMin
  };
  window._focusRating = null;

  // Save to state
  if (window.appState) {
    if (!window.appState.focusSessions) window.appState.focusSessions = [];
    window.appState.focusSessions.push(session);
    if (productive && window.appState.metrics) {
      window.appState.metrics.verifiedDeepWorkMinutes =
        (window.appState.metrics.verifiedDeepWorkMinutes || 0) + actualMin;
    }
    saveState(window.appState);
  }

  // Update session log display
  const log = document.getElementById('sessionLog');
  if (log) {
    const total = (window.appState?.focusSessions || []).filter(s => s.completed).length;
    const totalMin = (window.appState?.focusSessions || []).filter(s => s.completed).reduce((a,s) => a + (s.actualMinutes||0), 0);
    log.innerHTML = `✅ ${total} sprint(s) completed today — ${Math.floor(totalMin/60)}h ${totalMin%60}m verified deep work`;
  }

  showToast(`Sprint logged! ${productive ? '+' + actualMin + 'min verified' : 'Partial session saved'}`, 'success');
  window._pendingSprintData = null;
};

// V2: Independent Solve & AI Assistance Tracking
window._solveAttempt = null;
window._aiLevel = null;

window.setSolveAttempt = function(attempted) {
  window._solveAttempt = attempted;
  const yes = document.getElementById('solveYes');
  const no = document.getElementById('solveNo');
  if (yes) yes.style.background = attempted ? 'rgba(16,185,129,0.15)' : 'transparent';
  if (yes) yes.style.borderColor = attempted ? '#10b981' : 'rgba(255,255,255,0.08)';
  if (no) no.style.background = !attempted ? 'rgba(239,68,68,0.1)' : 'transparent';
  if (no) no.style.borderColor = !attempted ? '#ef4444' : 'rgba(255,255,255,0.08)';
  window.updateSolveScore();
};

window.setAILevel = function(level) {
  window._aiLevel = level;
  [0,1,2,3,4,5].forEach(n => {
    const btn = document.getElementById('aiLevel' + n);
    if (btn) {
      btn.style.background = n === level ? 'rgba(99,102,241,0.2)' : 'transparent';
      btn.style.borderColor = n === level ? '#6366f1' : 'rgba(255,255,255,0.08)';
      btn.style.color = n === level ? '#6366f1' : 'var(--text-muted)';
    }
  });
  window.updateSolveScore();

  // Save to state
  if (window.appState) {
    const dayNum = window.appState.missionDay || window.appState.currentDay;
    if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
    if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
    window.appState.dailyDrafts[dayNum].aiAssistanceLevel = level;
    if (!window.appState.metrics) window.appState.metrics = {};
    window.appState.metrics.aiAssistanceTotal = (window.appState.metrics.aiAssistanceTotal || 0) + level;
    window.appState.metrics.aiAssistanceCount = (window.appState.metrics.aiAssistanceCount || 0) + 1;
    saveState(window.appState);
  }
};

window.updateSolveScore = function() {
  const display = document.getElementById('solveScoreDisplay');
  if (!display) return;

  const attempted = window._solveAttempt;
  const aiLevel = window._aiLevel;

  if (attempted === null || aiLevel === null) {
    display.textContent = 'Independent Solve Score: —';
    return;
  }

  // Score calculation:
  // 100=solved independently, 80=syntax help, 60=hints, 40=architecture, 20=partial, 0=generated
  const baseScores = [100, 80, 60, 40, 20, 0];
  let score = baseScores[aiLevel];
  if (!attempted) score = Math.max(0, score - 20); // penalty for not attempting first

  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Assisted' : 'Heavily Assisted';

  display.innerHTML = `Independent Solve Score: <span style="color:${color};font-weight:700">${score}/100</span> — ${label}`;

  // Save score to state
  if (window.appState) {
    const dayNum = window.appState.missionDay || window.appState.currentDay;
    if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
    if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
    window.appState.dailyDrafts[dayNum].solveScore = score;
    window.appState.dailyDrafts[dayNum].independentAttempt = attempted;

    if (!window.appState.metrics) window.appState.metrics = {};
    window.appState.metrics.independentSolveAttempts = (window.appState.metrics.independentSolveAttempts || 0) + 1;
    if (score >= 60) window.appState.metrics.independentSolves = (window.appState.metrics.independentSolves || 0) + 1;
    saveState(window.appState);
  }
};

// V2: English Rubric Scoring
window._rubricScores = [null, null, null, null, null, null]; // 6 categories

window.setRubricScore = function(categoryIndex, score) {
  window._rubricScores[categoryIndex] = score;

  // Update button visuals for this category
  const row = document.getElementById('rubric-' + categoryIndex);
  if (row) {
    row.querySelectorAll('button').forEach((btn, i) => {
      const active = (i + 1) === score;
      btn.style.background = active ? 'rgba(139,92,246,0.2)' : 'transparent';
      btn.style.borderColor = active ? '#8b5cf6' : 'rgba(255,255,255,0.06)';
      btn.style.color = active ? '#a78bfa' : 'var(--text-muted)';
    });
  }

  // Update total
  const filled = window._rubricScores.filter(s => s !== null);
  const avg = filled.length > 0 ? (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1) : null;
  const total = document.getElementById('englishRubricTotal');
  if (total && avg) {
    const color = avg >= 4 ? '#10b981' : avg >= 3 ? '#f59e0b' : '#ef4444';
    total.innerHTML = `Avg Score: <span style="color:${color};font-weight:700">${avg}</span> / 5.0 ${filled.length === 6 ? '✅ Complete' : `(${filled.length}/6 rated)`}`;
  }

  // Save to state
  if (window.appState && filled.length === 6) {
    const dayNum = window.appState.missionDay || window.appState.currentDay;
    if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
    if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
    const cats = ['technicalCorrectness', 'clarity', 'grammar', 'vocabulary', 'fillerWords', 'confidence'];
    cats.forEach((cat, i) => {
      window.appState.dailyDrafts[dayNum][cat] = window._rubricScores[i];
    });
    window.appState.dailyDrafts[dayNum].englishRubricAvg = parseFloat(avg);
    saveState(window.appState);
  }
};

// V2: Save English corrections notes on blur
window.saveEnglishCorrections = function() {
  const el = document.getElementById('englishCorrections');
  if (!el || !window.appState) return;
  const dayNum = window.appState.missionDay || window.appState.currentDay;
  if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
  if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
  window.appState.dailyDrafts[dayNum].englishCorrections = el.value;
  saveState(window.appState);
};

// V2: Mastery Checkpoint
window.setMasteryLevel = function(conceptId, level) {
  if (!window.appState) return;
  if (!window.appState.mastery) window.appState.mastery = {};
  window.appState.mastery[conceptId] = level;

  // Update draft
  const dayNum = window.appState.missionDay || window.appState.currentDay;
  if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
  if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
  window.appState.dailyDrafts[dayNum].masteryLevel = level;

  saveState(window.appState);

  // Update button visuals
  const levelData = MASTERY_LEVELS.find(m => m.key === level);
  MASTERY_LEVELS.forEach(m => {
    const btn = document.getElementById('mastery-' + m.key);
    if (btn) {
      const active = m.key === level;
      btn.style.background = active ? `rgba(${hexToRgb(m.color)},0.2)` : 'transparent';
      btn.style.borderColor = active ? m.color : 'rgba(255,255,255,0.08)';
      btn.style.color = active ? m.color : 'var(--text-muted)';
    }
  });

  const hint = document.getElementById('masteryHint');
  if (hint && levelData) {
    const hints = {
      not_attempted: 'You have not started this topic yet.',
      familiar: 'You recognize the concept but cannot implement it yet.',
      can_explain: 'You can explain it in plain English to someone else.',
      can_implement: 'You can write working code from scratch without help.',
      can_debug: 'You can find and fix bugs in broken implementations.',
      can_apply: 'You can apply it independently to new, unfamiliar problems.'
    };
    hint.innerHTML = `${levelData.icon} <strong style="color:${levelData.color}">${levelData.label}:</strong> ${hints[level]}`;
  }

  showToast(`Mastery updated: ${levelData?.label || level}`, 'success');
};

// V2: Weekly Operating System
window._weeklyAnswers = {};

window.saveWeeklyAnswer = function(index, value) {
  window._weeklyAnswers[index] = value;
};

window.saveWeeklyReview = function() {
  if (!window.appState) return;
  const weekNum = Math.ceil((window.appState.missionDay || 1) / 7);
  if (!window.appState.weeklyReviews) window.appState.weeklyReviews = {};
  window.appState.weeklyReviews[weekNum] = {
    savedAt: new Date().toISOString(),
    missionDay: window.appState.missionDay || 1,
    answers: { ...window._weeklyAnswers },
    metrics: { ...window.appState.metrics }
  };
  saveState(window.appState);
  showToast('✅ Weekly review saved!', 'success');
};

// V2: Interview Answer Bank
window.saveInterviewAnswer = function(id, value) {
  if (!window.appState) return;
  if (!window.appState.interviewStories) window.appState.interviewStories = {};
  window.appState.interviewStories[id] = { text: value, updatedAt: new Date().toISOString() };
  saveState(window.appState);
};

window.loadInterviewAnswers = function() {
  if (!window.appState || !window.appState.interviewStories) return;
  Object.entries(window.appState.interviewStories).forEach(([id, data]) => {
    const el = document.getElementById('interview-' + id);
    if (el && data.text) el.value = data.text;
  });
  showToast('Answers loaded!', 'success');
};

// V2: Experiment & Bug Evidence
window.saveTestEvidence = function() {
  if (!window.appState) return;
  const written = parseInt(document.getElementById('testsWritten')?.value || 0);
  const passed  = parseInt(document.getElementById('testsPassed')?.value || 0);
  const failed  = Math.max(0, written - passed);

  if (!window.appState.metrics) window.appState.metrics = {};
  window.appState.metrics.testsPassed = (window.appState.metrics.testsPassed || 0) + passed;
  window.appState.metrics.testsFailed = (window.appState.metrics.testsFailed || 0) + failed;

  const dayNum = window.appState.missionDay || window.appState.currentDay;
  if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
  if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
  window.appState.dailyDrafts[dayNum].testsWritten = written;
  window.appState.dailyDrafts[dayNum].testsPassed = passed;

  saveState(window.appState);
};

window.setFeatureShipped = function(shipped) {
  if (!window.appState) return;
  if (!window.appState.metrics) window.appState.metrics = {};
  if (shipped) window.appState.metrics.featuresShipped = (window.appState.metrics.featuresShipped || 0) + 1;

  const dayNum = window.appState.missionDay || window.appState.currentDay;
  if (!window.appState.dailyDrafts) window.appState.dailyDrafts = {};
  if (!window.appState.dailyDrafts[dayNum]) window.appState.dailyDrafts[dayNum] = {};
  window.appState.dailyDrafts[dayNum].featureShipped = shipped;

  const yes = document.getElementById('featYes');
  const no  = document.getElementById('featNo');
  if (yes) { yes.style.background = shipped ? 'rgba(16,185,129,0.15)' : 'transparent'; yes.style.borderColor = shipped ? '#10b981' : 'rgba(255,255,255,0.08)'; yes.style.color = shipped ? '#10b981' : 'var(--text-muted)'; }
  if (no)  { no.style.background  = !shipped ? 'rgba(239,68,68,0.1)' : 'transparent'; no.style.borderColor  = !shipped ? '#ef4444' : 'rgba(255,255,255,0.08)'; no.style.color  = !shipped ? '#ef4444' : 'var(--text-muted)'; }

  saveState(window.appState);
  showToast(shipped ? '🚀 Feature shipped! +1 to portfolio.' : '🔧 Logged — keep building!', 'success');
};

// V2: Comeback Flow
window.showComebackFlow = function() {
  if (!window.appState) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center';
  const missionDay = window.appState.missionDay || 1;
  overlay.innerHTML = `
    <div style="background:#0C1017;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:28px;max-width:400px;width:90%;text-align:center">
      <div style="font-size:28px;margin-bottom:12px">🌿</div>
      <div style="font-size:16px;font-weight:700;margin-bottom:8px">Welcome Back!</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Mission Day ${missionDay} is still waiting. Your progress is safe.</div>
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:12px;margin-bottom:16px;text-align:left">
        <div style="font-size:12px;color:#10b981;font-weight:600;margin-bottom:8px">Comeback Options:</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <button onclick="window.setDayMode('maintenance');document.body.removeChild(this.closest('[style*=fixed]'))" style="padding:8px;border-radius:6px;border:1px solid #60a5fa;background:rgba(96,165,250,0.1);color:#60a5fa;cursor:pointer;font-size:12px">🔵 Maintenance Day — 45-90min quick review</button>
          <button onclick="window.setDayMode('standard');document.body.removeChild(this.closest('[style*=fixed]'))" style="padding:8px;border-radius:6px;border:1px solid #10b981;background:rgba(16,185,129,0.1);color:#10b981;cursor:pointer;font-size:12px">🟢 Standard Day — Resume normally</button>
          <button onclick="window.setDayMode('recovery');document.body.removeChild(this.closest('[style*=fixed]'))" style="padding:8px;border-radius:6px;border:1px solid #34d399;background:rgba(52,211,153,0.1);color:#34d399;cursor:pointer;font-size:12px">🌿 Recovery Day — Light recall only</button>
        </div>
      </div>
      <button onclick="document.body.removeChild(this.closest('[style*=fixed]'))" style="padding:8px 20px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:12px">Close</button>
    </div>`;
  document.body.appendChild(overlay);
};

function renderDayBlocks(dayNum, roadmapDay, state) {
  const topics = (roadmapDay?.topics || []).map(t => `<li class="sq-item"><span class="sq-bullet">▸</span>${t}</li>`).join('');
  const studyQs = (roadmapDay?.studyQuestions || roadmapDay?.reviewQuestions || [])
    .map((q,i) => `<li class="sq-item"><span class="sq-bullet">${i+1}.</span>${q}</li>`).join('');
  const eng = getEnglishDayData(dayNum, roadmapDay);

  const currentLog = state.dailyDrafts && state.dailyDrafts[dayNum] ? state.dailyDrafts[dayNum] : (state.completedDays && state.completedDays[dayNum] ? state.completedDays[dayNum] : {});
  const currentMode = (state.targetMode) || 'standard';
  const reqs = getCompletionRequirements(currentMode, roadmapDay);
  const validation = validateDayCompletion(currentLog, reqs);

  // V2: Adaptive English duration based on mission phase
  const missionDay = state.missionDay || dayNum;
  const englishTargetMin = missionDay <= 30 ? 30 : missionDay <= 60 ? 45 : 60;
  const englishPhaseLabel = missionDay <= 30 ? 'Phase 1: Foundation (30min)' : missionDay <= 60 ? 'Phase 2: Intermediate (45min)' : 'Phase 3: Advanced (60min)';

  return `
  <div class="dashboard-grid fade-in" style="margin-bottom:24px">
    <!-- LEFT: Day Blocks -->
    <div>
      <div class="section-label">⚡ Today's Mission Blocks</div>
      <div class="blocks-grid">

        <!-- Block 1: Deep Study -->
        <div class="block-card expanded" id="block-1">
          <div class="block-header" onclick="toggleBlock('block-1')">
            <div class="block-number block-num-1">B1</div>
            <div class="block-info">
              <div class="block-name">Deep Study</div>
              <div class="block-duration">2h • Understand from First Principles</div>
            </div>
            <span class="block-status-icon" id="b1-icon">⬜</span>
          </div>
          <div class="block-content">
            <div class="study-questions">
              <div class="sq-title">Topics to Master</div>
              <ul class="sq-list">${topics}</ul>
              <div class="sq-title" style="margin-top:14px">8 Core Questions to Answer</div>
              <ul class="sq-list">${studyQs}</ul>
            </div>
            <div class="form-group">
              <label class="form-label">📝 Study Notes (min 100 chars)</label>
              <textarea class="notes-area" id="studyNotes" placeholder="Write your understanding here... explain concepts in your own words, include code examples, draw diagrams in ASCII, note what confused you..."></textarea>
              <div class="form-hint"><span id="notesCharCount">0</span> chars (need 100+)</div>
            </div>
            <!-- V2: Mastery Checkpoint -->
            <div style="margin-top:12px;margin-bottom:12px">
              <div class="section-label" style="margin-bottom:8px">🎯 Mastery Self-Assessment</div>
              <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px">
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Where are you for today's core topic?</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px" id="masterySelector">
                  ${MASTERY_LEVELS.map(m => `
                    <button onclick="setMasteryLevel('day${dayNum}', '${m.key}')" 
                      id="mastery-${m.key}"
                      style="padding:5px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:11px">
                      ${m.icon} ${m.label}
                    </button>
                  `).join('')}
                </div>
                <div id="masteryHint" style="margin-top:8px;font-size:11px;color:var(--text-muted)">Select your current mastery level for this day's material</div>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="markBlock1Done()">✅ Mark Study Block Complete</button>
          </div>
        </div>

        <!-- Block 2: Build -->
        <div class="block-card" id="block-2">
          <div class="block-header" onclick="toggleBlock('block-2')">
            <div class="block-number block-num-2">B2</div>
            <div class="block-info">
              <div class="block-name">Build Session</div>
              <div class="block-duration">4h • Production Code Only</div>
            </div>
            <span class="block-status-icon" id="b2-icon">🔒</span>
          </div>
          <div class="block-content">
            <div class="section-label">Build Task</div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;line-height:1.6">${roadmapDay?.buildTask || 'Build the capstone project component for today'}</p>
            <div class="form-group">
              <label class="form-label">🏗️ What did you build? (describe + code snippet)</label>
              <textarea class="notes-area" id="buildEvidence" placeholder="Describe what you built, paste key code snippets, explain design decisions..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">🔗 GitHub Commit / PR Link</label>
              <input class="evidence-input" id="githubLink" type="url" placeholder="https://github.com/username/repo/commit/abc123">
            </div>
            <!-- V2: Focus Sprint Tracker -->
            <div class="form-group" style="margin-top:16px">
              <div class="section-label" style="margin-bottom:10px">⏱️ Focus Sprint Tracker</div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px" id="sprintPresets">
                <button onclick="startFocusSprint(25,5,'build')" class="btn btn-secondary btn-sm" style="font-size:11px">25/5</button>
                <button onclick="startFocusSprint(50,10,'build')" class="btn btn-secondary btn-sm" style="font-size:11px">50/10</button>
                <button onclick="startFocusSprint(75,15,'build')" class="btn btn-secondary btn-sm" style="font-size:11px">75/15</button>
                <button onclick="startFocusSprint(90,15,'build')" class="btn btn-secondary btn-sm" style="font-size:11px">90/15</button>
              </div>
              <div id="activeSprintCard" style="display:none;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:12px">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">ACTIVE SPRINT</div>
                    <div id="sprintTimerDisplay" style="font-size:24px;font-weight:700;font-family:var(--font-mono);color:#10b981">00:00</div>
                  </div>
                  <button onclick="endFocusSprint()" class="btn btn-secondary btn-sm" style="font-size:11px">End Sprint</button>
                </div>
              </div>
              <div id="sessionLog" style="margin-top:8px;font-size:11px;color:var(--text-muted)"></div>
            </div>
            <!-- V2: Experiment & Bug Evidence -->
            <div class="form-group" style="margin-top:16px">
              <div class="section-label" style="margin-bottom:8px">🧪 Experiment / Bug Post-Mortem Log</div>
              <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
                  <div>
                    <label style="font-size:10px;color:var(--text-muted);display:block;margin-bottom:4px">Tests Written</label>
                    <input type="number" id="testsWritten" min="0" value="0" onchange="window.saveTestEvidence()" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.3);color:var(--text-primary);font-size:13px">
                  </div>
                  <div>
                    <label style="font-size:10px;color:var(--text-muted);display:block;margin-bottom:4px">Tests Passed</label>
                    <input type="number" id="testsPassed" min="0" value="0" onchange="window.saveTestEvidence()" style="width:100%;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.3);color:var(--text-primary);font-size:13px">
                  </div>
                </div>
                <div style="margin-bottom:8px">
                  <label style="font-size:10px;color:var(--text-muted);display:block;margin-bottom:4px">Feature Shipped Today?</label>
                  <div style="display:flex;gap:8px">
                    <button onclick="window.setFeatureShipped(true)" id="featYes" style="flex:1;padding:6px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:11px">🚀 Yes, shipped!</button>
                    <button onclick="window.setFeatureShipped(false)" id="featNo" style="flex:1;padding:6px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:11px">🔧 Still building</button>
                  </div>
                </div>
                <div>
                  <label style="font-size:10px;color:var(--text-muted);display:block;margin-bottom:4px">Bug Post-Mortem (if applicable)</label>
                  <textarea id="bugPostMortem" class="notes-area" style="height:60px;font-size:11px" placeholder="Symptom → Root Cause → Fix → Prevention..."></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Block 3: Practice -->
        <div class="block-card" id="block-3">
          <div class="block-header" onclick="toggleBlock('block-3')">
            <div class="block-number block-num-3">B3</div>
            <div class="block-info">
              <div class="block-name">Practice Session</div>
              <div class="block-duration">2h • No Tutorial Mode</div>
            </div>
            <span class="block-status-icon" id="b3-icon">🔒</span>
          </div>
          <div class="block-content">
            <div class="section-label">Practice Task</div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;line-height:1.6">${roadmapDay?.practiceTask || 'Solve problems without looking at solutions first'}</p>
            <div class="form-group">
              <label class="form-label">⚡ Practice Notes & Solutions</label>
              <textarea class="notes-area" id="practiceNotes" placeholder="What problems did you solve? What patterns did you discover? What did you get wrong first?"></textarea>
            </div>
            <!-- V2: Independent Solve & AI Assistance -->
            <div style="margin-top:12px">
              <div class="section-label" style="margin-bottom:8px">🎯 Independent Solve Tracker</div>
              <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px">
                <div style="margin-bottom:10px">
                  <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Did you attempt before looking at AI/tutorials?</div>
                  <div style="display:flex;gap:6px">
                    <button onclick="setSolveAttempt(true)" id="solveYes" style="flex:1;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:11px">✅ Yes, attempted first</button>
                    <button onclick="setSolveAttempt(false)" id="solveNo" style="flex:1;padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:11px">⚡ Jumped to AI</button>
                  </div>
                </div>
                <div>
                  <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">AI Assistance Level (0=None → 5=Full generation)</div>
                  <div style="display:flex;gap:4px">
                    ${[0,1,2,3,4,5].map(n => {
                      const labels = ['0\nNone','1\nSyntax','2\nHints','3\nArch','4\nPartial','5\nGenerated'];
                      return `<button onclick="setAILevel(${n})" id="aiLevel${n}" title="${['No AI','Syntax/docs help','Hints only','Architecture help','Partial implementation','Generated solution'][n]}" style="flex:1;padding:6px 2px;border-radius:4px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-muted);cursor:pointer;font-size:10px;white-space:pre;line-height:1.2">${labels[n]}</button>`;
                    }).join('')}
                  </div>
                </div>
                <div id="solveScoreDisplay" style="margin-top:8px;font-size:11px;color:var(--text-muted);text-align:center">Independent Solve Score: — </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Block 4: English Mastery & Voice Explanation -->
        <div class="block-card" id="block-4">
          <div class="block-header" onclick="toggleBlock('block-4')">
            <div class="block-number block-num-4">B4</div>
            <div class="block-info">
              <div class="block-name">English Mastery &amp; Feynman Voice</div>
              <div class="block-duration">${englishTargetMin}min • ${englishPhaseLabel}</div>
            </div>
            <span class="block-status-icon" id="b4-icon">🔒</span>
          </div>
          <div class="block-content">
            <div class="english-track-grid">
              <!-- Track 1: Technical Feynman Explanation -->
              <div class="english-track-card">
                <div class="track-tag">PART 1 • 60 MIN • FEYNMAN SPEECH</div>
                <div class="track-title">🎙️ Technical Explanation in English</div>
                <p class="track-desc">${eng.speechPrompt}</p>

                <div class="voice-recorder">
                  <div class="recorder-controls">
                    <button class="record-btn" id="recordBtn">
                      <span class="record-dot"></span> Start Recording
                    </button>
                    <span class="voice-timer" id="voiceTimer">00:00</span>
                  </div>
                  <div class="voice-status" id="voiceStatus">Speak clearly in English and explain the architecture</div>
                  <audio class="voice-playback" id="voicePlayback" controls style="display:none"></audio>
                  <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
                    <button class="btn btn-secondary btn-sm" id="voiceDownload" style="display:none">⬇️ Download</button>
                    <button class="btn btn-secondary btn-sm" id="voiceUpload" style="display:none">☁️ Upload to Cloud</button>
                  </div>
                </div>

                <!-- V2: English Rubric & 2-Stage Flow -->
                <div style="margin-top:14px">
                  <div class="section-label" style="margin-bottom:8px">📊 English Performance Rubric</div>
                  <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px">
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">Rate your <strong>first recording</strong> after listening back (1=Poor → 5=Excellent)</div>
                    ${['Technical Accuracy', 'Clarity & Structure', 'Grammar', 'Vocabulary', 'Filler Words (5=none)', 'Confidence & Pace'].map((cat, i) => `
                      <div style="margin-bottom:10px">
                        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">${cat}</div>
                        <div style="display:flex;gap:4px" id="rubric-${i}">
                          ${[1,2,3,4,5].map(n => `<button onclick="setRubricScore(${i}, ${n})" style="flex:1;padding:5px;border-radius:4px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--text-muted);cursor:pointer;font-size:12px">${n}</button>`).join('')}
                        </div>
                      </div>
                    `).join('')}
                    <div id="englishRubricTotal" style="margin-top:8px;padding:8px;background:rgba(139,92,246,0.08);border-radius:6px;font-size:12px;color:#a78bfa;text-align:center">
                      Avg Score: — / 5.0
                    </div>
                    <div style="margin-top:10px">
                      <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">3 problems I identified in my first recording:</div>
                      <textarea id="englishCorrections" class="notes-area" style="height:60px;font-size:12px" placeholder="1. Used 'basically' too many times&#10;2. Unclear explanation of embeddings&#10;3. Too fast on technical terms" onblur="saveEnglishCorrections()"></textarea>
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">→ Now re-record a shorter, improved version addressing these issues.</div>
                  </div>
                </div>

                <div style="margin-top:14px">
                  <div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px">KEY VOCABULARY TO USE:</div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${eng.techVocab.map(v => `<span class="badge badge-cyan" onclick="pronounceWord('${v.word}')" style="cursor:pointer" title="Click to hear pronunciation">🔊 ${v.word}</span>`).join('')}
                  </div>
                </div>
              </div>

              <!-- Track 2: Spoken Interview Simulation -->
              <div class="english-track-card">
                <div class="track-tag">PART 2 • 60 MIN • INTERVIEW DRILL</div>
                <div class="track-title">🗣️ AI Engineering Spoken Interview</div>
                <p class="track-desc">
                  <strong style="color:var(--text-primary)">FAANG Interview Question:</strong> ${eng.interviewQuestion}
                </p>
                <div class="interview-prompt-box">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <span style="font-size:11px;font-weight:600;color:var(--accent-cyan)">Prompt for ChatGPT / Claude Voice Mode:</span>
                    <button class="copy-btn-action" id="b4CopyBtn" onclick="copyTextToClipboard(\`${eng.voicePrompt.replace(/`/g, '\\`')}\`, 'b4CopyBtn')">
                      ${ICONS.copy} Copy Prompt
                    </button>
                  </div>
                  <code>"${eng.voicePrompt}"</code>
                </div>
                <div style="margin-top:12px;font-size:12px;color:var(--text-muted)">
                  💡 Focus: Eliminate filler words, speak with steady cadence, and structure answers with STAR / Framework logic.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Block 5: Reflection -->
        <div class="block-card" id="block-5">
          <div class="block-header" onclick="toggleBlock('block-5')">
            <div class="block-number block-num-5">B5</div>
            <div class="block-info">
              <div class="block-name">Daily Reflection</div>
              <div class="block-duration">1h • Honest Self-Assessment</div>
            </div>
            <span class="block-status-icon" id="b5-icon">🔒</span>
          </div>
          <div class="block-content">
            <div class="form-group">
              <label class="form-label">⏱️ Actual Hours Logged Today</label>
              <div class="hours-row">
                <input class="hours-slider" id="hoursSlider" type="range" min="0" max="12" step="0.5" value="0">
                <span class="hours-display" id="hoursDisplay">0h</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">🪞 Reflection (min 50 chars)</label>
              <textarea class="reflection-area" id="reflectionText" placeholder="What did you learn today? What was hardest? What bug did you crack? Where did you struggle? What will you do differently tomorrow? Rate your deep understanding (1-5)..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">🏆 Hardest Part Today</label>
              <input class="evidence-input" id="hardestPart" type="text" placeholder="The hardest thing I faced today was...">
            </div>
            <div class="form-group">
              <label class="form-label">🐛 Debug Victory (what bug did you solve?)</label>
              <input class="evidence-input" id="debugVictory" type="text" placeholder="I fixed the bug where...">
            </div>
            <div class="flex gap-2 items-center" style="margin-top:8px">
              <span style="font-size:12px;color:var(--text-muted)">Self Rating:</span>
              ${[1,2,3,4,5].map(n => `<button class="conf-btn conf-${Math.min(n,4)}" onclick="setSelfRating(${n})" id="rating-${n}">${n}⭐</button>`).join('')}
            </div>
          </div>
        </div>

      </div><!-- end blocks-grid -->

      <!-- Lock Checklist / Completion Evidence -->
      <div class="completion-evidence" style="margin-top:20px;background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
        <div class="sq-title">🔒 Day Completion Evidence</div>
        ${validation.checks.map(c => `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px">
            <span style="color:${c.passed ? '#10b981' : '#ef4444'};flex-shrink:0">${c.passed ? '✅' : '❌'}</span>
            <span style="color:${c.passed ? 'var(--text-secondary)' : 'var(--text-muted)'}">${c.label}</span>
          </div>
        `).join('')}
        <div style="margin-top:8px;padding:8px;background:rgba(${validation.passed ? '16,185,129' : '239,68,68'},0.1);border-radius:6px;font-size:12px;color:${validation.passed ? '#10b981' : '#ef4444'}">
          Evidence Score: ${validation.score}% ${validation.passed ? '— Ready to complete! 🎯' : `— ${validation.missingCount} item(s) missing`}
        </div>
      </div>

      <button class="btn" id="completeDay" ${validation.passed ? '' : 'disabled'}>${validation.passed ? '🚀 Complete Mission Day' : '🔒 Fulfill Evidence to Unlock'}</button>

      <!-- Mode Selector -->
      <div class="mode-selector" style="margin-top:16px">
        <div class="section-label">📋 Today's Workload Mode</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:8px">
          ${Object.entries(DAY_MODES).map(([key, m]) => `
            <button onclick="setDayMode('${key}')" 
              class="mode-btn ${currentMode === key ? 'active' : ''}" 
              style="padding:10px 8px;border-radius:8px;border:1px solid ${currentMode === key ? m.color : 'rgba(255,255,255,0.08)'};background:${currentMode === key ? 'rgba('+hexToRgb(m.color)+',0.15)' : 'transparent'};color:${currentMode === key ? m.color : 'var(--text-muted)'};cursor:pointer;font-size:12px;font-weight:500;text-align:left">
              ${m.label}<br>
              <span style="font-size:10px;opacity:0.7">${m.minHours}h+ • ${Math.round(m.xpMultiplier*100)}% XP</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- RIGHT: Skill Panel -->
    <div>
      <div class="glass-card radar-container" style="margin-bottom:16px">
        <div class="radar-title">SKILL RADAR</div>
        <div class="radar-subtitle">Expands as you complete days</div>
        <canvas id="radarCanvas"></canvas>
      </div>

      <div class="glass-card" style="padding:20px;margin-bottom:16px" id="skillBarsPanel">
        <div class="section-label">XP Progress</div>
        <div class="skill-bars" id="skillBarsContainer"></div>
      </div>

      <!-- Quick Recall Flash -->
      <div class="glass-card" style="padding:20px" id="quickRecallPanel">
        <div class="section-label">⚡ Quick Morning Recall</div>
        <div id="quickRecallContent"></div>
      </div>
    </div>
  </div>
  `;
}

function initBlockListeners(dayNum, roadmapDay, state) {
  // Notes
  const notesTA = document.getElementById('studyNotes');
  const charCount = document.getElementById('notesCharCount');
  if (notesTA) {
    notesTA.value = window.currentDayLog.notes || '';
    notesTA.addEventListener('input', () => {
      window.currentDayLog.notes = notesTA.value;
      if (charCount) charCount.textContent = notesTA.value.length;
      updateLockChecklist();
      triggerAutoSave();
    });
  }

  // Build evidence
  const buildTA = document.getElementById('buildEvidence');
  if (buildTA) {
    buildTA.value = window.currentDayLog.buildEvidence || '';
    buildTA.addEventListener('input', () => {
      window.currentDayLog.buildEvidence = buildTA.value;
      updateLockChecklist();
      triggerAutoSave();
    });
  }

  const ghLink = document.getElementById('githubLink');
  if (ghLink) {
    ghLink.value = window.currentDayLog.githubLink || '';
    ghLink.addEventListener('input', () => {
      window.currentDayLog.githubLink = ghLink.value;
    });
  }

  // Practice notes
  const practiceTA = document.getElementById('practiceNotes');
  if (practiceTA) {
    practiceTA.value = window.currentDayLog.practiceNotes || '';
    practiceTA.addEventListener('input', () => {
      window.currentDayLog.practiceNotes = practiceTA.value;
      updateLockChecklist();
      triggerAutoSave();
    });
  }

  // Hours slider
  const slider  = document.getElementById('hoursSlider');
  const display = document.getElementById('hoursDisplay');
  if (slider) {
    slider.value = window.currentDayLog.hours || 0;
    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      window.currentDayLog.hours = val;
      if (display) display.textContent = val + 'h';
      updateLockChecklist();
    });
  }

  // Reflection
  const reflTA = document.getElementById('reflectionText');
  if (reflTA) {
    reflTA.value = window.currentDayLog.reflection || '';
    reflTA.addEventListener('input', () => {
      window.currentDayLog.reflection = reflTA.value;
      updateLockChecklist();
      triggerAutoSave();
    });
  }

  const hardest = document.getElementById('hardestPart');
  if (hardest) {
    hardest.value = window.currentDayLog.hardestPart || '';
    hardest.addEventListener('input', () => { window.currentDayLog.hardestPart = hardest.value; });
  }

  const debugV = document.getElementById('debugVictory');
  if (debugV) {
    debugV.value = window.currentDayLog.debugVictory || '';
    debugV.addEventListener('input', () => { window.currentDayLog.debugVictory = debugV.value; });
  }

  // Complete Day button
  const completeBtn = document.getElementById('completeDay');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => completeDayAction(dayNum, roadmapDay, state));
  }

  // Init quick recall
  renderQuickRecall(state);

  // Update initial state
  updateLockChecklist();
}

window.markBlock1Done = function() {
  const notesTA = document.getElementById('studyNotes');
  if (!notesTA || notesTA.value.trim().length < 100) {
    showToast('📝 Please write at least 100 characters of notes first', 'warning');
    return;
  }
  const b1 = document.getElementById('block-1');
  const b1icon = document.getElementById('b1-icon');
  const b2 = document.getElementById('block-2');
  const b2icon = document.getElementById('b2-icon');
  if (b1) b1.classList.add('completed');
  if (b1icon) b1icon.textContent = '✅';
  if (b2) { b2.classList.remove('locked'); b2.classList.add('active', 'expanded'); }
  if (b2icon) b2icon.textContent = '⬜';
  showToast('✅ Block 1 complete! Now build something real.', 'success');
};

window.setSelfRating = function(n) {
  window.currentDayLog.selfRating = n;
  [1,2,3,4,5].forEach(i => {
    const btn = document.getElementById(`rating-${i}`);
    if (btn) btn.classList.toggle('selected', i === n);
  });
  updateLockChecklist();
};

window.toggleMaintenanceMode = function() {
  window.isMaintenanceMode = !window.isMaintenanceMode;
  showToast(
    window.isMaintenanceMode
      ? '🟡 Maintenance Mode: Min 45m study + recall required'
      : '🟢 Full Day Mode: 10h target',
    'info'
  );
  if (window.isMaintenanceMode) {
    const banner = document.createElement('div');
    banner.className = 'maintenance-banner';
    banner.innerHTML = '🟡 <strong>Maintenance Day Mode</strong> — Minimum: 30-60m study + 10m recall + voice explanation + reflection. Honest tracking. No zero days.';
    const container = document.getElementById('dashboardContent');
    if (container) container.insertBefore(banner, container.firstChild);
  }
};

// ─── COMPLETE DAY ACTION ─────────────────────────────────────

async function completeDayAction(dayNum, roadmapDay, state) {
  const btn = document.getElementById('completeDay');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Processing...'; }

  const log = window.currentDayLog;
  const isMaintenanceDay = window.isMaintenanceMode || false;

  updateSyncIndicator('syncing');

  // Build day data
  const dayData = {
    dayNum,
    dayTitle: roadmapDay?.title || '',
    completedAt: new Date().toISOString(),
    type: isMaintenanceDay ? 'maintenance' : 'full',
    hours: log.hours || 0,
    notes: log.notes || '',
    buildEvidence: log.buildEvidence || '',
    githubLink: log.githubLink || '',
    practiceNotes: log.practiceNotes || '',
    voiceUrl: log.voiceUrl || '',
    voiceRecorded: log.voiceRecorded || false,
    reflection: log.reflection || '',
    hardestPart: log.hardestPart || '',
    debugVictory: log.debugVictory || '',
    selfRating: log.selfRating || 0,
    xpGained: roadmapDay?.xpRewards || {}
  };

  // Update state
  state.completedDays[dayNum] = dayData;
  state.totalHours = (state.totalHours || 0) + (log.hours || 0);

  // XP
  Object.entries(roadmapDay?.xpRewards || {}).forEach(([k, v]) => {
    state.skillXP[k] = (state.skillXP[k] || 0) + v;
  });

  // Streak
  const prevDay = dayNum - 1;
  if (prevDay === 0 || state.completedDays[prevDay]) {
    state.streak = (state.streak || 0) + 1;
  } else {
    state.streak = 1;
  }
  state.longestStreak = Math.max(state.longestStreak || 0, state.streak);
  state.currentDay = Math.min(dayNum + 1, 90);

  // Knowledge node
  state.knowledgeNodes = state.knowledgeNodes || [];
  state.knowledgeNodes.push({
    dayNum, title: roadmapDay?.title, xp: roadmapDay?.xpRewards
  });

  // Save local
  saveState(state);
  window.appState = state;

  // GitHub commit
  const md = buildDayMarkdown(dayNum, roadmapDay, dayData);
  const ghOk = await githubCommitDay(dayNum, md);
  await githubUpdateReadme(state);

  // Supabase sync
  const sbOk = await supabaseUpsertDay(dayNum, dayData);
  await supabaseSyncState(state);

  updateSyncIndicator(ghOk || sbOk ? 'online' : 'offline');

  // Celebration
  showCelebration(dayNum, dayData, ghOk, sbOk, state);
}

// ─── CELEBRATION ──────────────────────────────────────────────

function showCelebration(dayNum, dayData, ghOk, sbOk, state) {
  const overlay = document.getElementById('celebrationOverlay');
  const card    = document.getElementById('celebrationCard');
  if (!overlay || !card) return;

  const nextRD = getRoadmapDay(dayNum + 1);
  const title  = getEngineerTitle(dayNum + 1);
  const xpTotal = Object.values(dayData.xpGained || {}).reduce((s,v)=>s+v,0);

  card.innerHTML = `
    <div class="celebration-emoji">${dayData.type === 'maintenance' ? '🟡' : '🎉'}</div>
    <div class="celebration-title">Day ${dayNum} ${dayData.type === 'maintenance' ? 'Maintained' : 'Conquered'}!</div>
    <div class="celebration-sub">
      ${dayData.type === 'maintenance'
        ? 'Maintenance day logged. Streak preserved. No zero days. 💪'
        : `${dayData.hours}h of deep work. Evidence recorded. The gap widens.`}
    </div>

    <div class="celebration-details">
      <div class="celebration-item">
        ${ghOk ? '🟩 GitHub commit successful — green square earned!' : '⚠️ GitHub sync pending (check settings)'}
      </div>
      <div class="celebration-item">
        ${sbOk ? '☁️ Cloud sync complete — data secured' : '💾 Saved locally — check Supabase settings'}
      </div>
      <div class="celebration-item">
        ⚡ +${xpTotal} XP earned across skill domains
      </div>
      <div class="celebration-item">
        🔥 Streak: ${state.streak} days ${state.streak >= 7 ? '— LEGENDARY!' : ''}
      </div>
      ${nextRD ? `<div class="celebration-item">Tomorrow: ${nextRD.title}</div>` : ''}
    </div>

    <div class="title-badge" style="margin-bottom:16px">
      ${title.icon} You are now: ${title.title}
    </div>

    <button class="btn btn-primary" onclick="closeCelebration()">
      Continue to Day ${dayNum + 1} →
    </button>
  `;

  overlay.classList.add('show');
  launchParticles();
}

window.closeCelebration = function() {
  document.getElementById('celebrationOverlay')?.classList.remove('show');
  renderMainApp(window.appState);
};

// ─── QUICK RECALL ─────────────────────────────────────────────

function renderQuickRecall(state) {
  const panel = document.getElementById('quickRecallContent');
  if (!panel) return;

  if (typeof window.getRecallItems !== 'function') {
    panel.innerHTML = `<p style="color:var(--text-muted);font-size:13px">Spaced recall engine initializing...</p>`;
    return;
  }

  const items = window.getRecallItems(
    state.currentDay,
    state.completedDays || {},
    state.weakTopics || []
  );

  if (!items || items.length === 0) {
    panel.innerHTML = `<p style="color:var(--text-muted);font-size:13px">No recall items yet — complete your first day to start the spaced repetition engine.</p>`;
    return;
  }

  const item = items[0]; // Show one item at a time
  const prompt = typeof window.buildRecallPrompt === 'function'
    ? window.buildRecallPrompt(item)
    : (item.question || '');

  panel.innerHTML = `
    <div class="recall-topic-tag">Day ${item.dayNum} • ${item.type}</div>
    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">${prompt}</p>
    <p style="font-weight:600;font-size:14px;margin-bottom:12px">${item.question}</p>
    <div class="confidence-row">
      <button class="conf-btn conf-1" onclick="quickRecallAnswer(1, '${item.id}')">😅 Blank</button>
      <button class="conf-btn conf-2" onclick="quickRecallAnswer(2, '${item.id}')">🤔 Partial</button>
      <button class="conf-btn conf-3" onclick="quickRecallAnswer(3, '${item.id}')">👍 Good</button>
      <button class="conf-btn conf-4" onclick="quickRecallAnswer(4, '${item.id}')">⚡ Perfect</button>
    </div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">${items.length} recall items due today</div>
  `;
}

// V2: Canonical recall processing — one source of truth
function processRecallResult(conceptId, confidence, state) {
  // confidence: 1=blank, 2=partial, 3=good, 4=perfect
  if (!conceptId || !state) return;

  const now = new Date();
  const baseIntervals = [1, 3, 7, 14, 30, 60, 90];

  // Get or create recall item
  if (!state.recallItems) state.recallItems = {};
  const item = state.recallItems[conceptId] || {
    conceptId,
    lastReviewed: null,
    nextReview: null,
    interval: 1,
    ease: 2.5,
    attempts: 0,
    correctCount: 0,
    confidenceHistory: []
  };

  // Update history
  item.attempts++;
  item.confidenceHistory.push({ date: now.toISOString(), confidence });
  if (item.confidenceHistory.length > 20) item.confidenceHistory.shift();

  // Update ease factor (SuperMemo-style)
  item.ease = Math.max(1.3, item.ease + (0.1 - (4 - confidence) * (0.08 + (4 - confidence) * 0.02)));

  // Calculate next interval
  let nextInterval;
  if (confidence === 1) {
    nextInterval = 1; // review tomorrow
    item.interval = 1;
  } else if (confidence === 2) {
    nextInterval = Math.max(1, Math.round(item.interval * 0.5));
    item.interval = nextInterval;
  } else if (confidence === 3) {
    nextInterval = item.attempts === 1 ? 3 : Math.round(item.interval * item.ease);
    item.interval = nextInterval;
    item.correctCount++;
  } else { // 4 = perfect
    nextInterval = item.attempts === 1 ? 7 : Math.round(item.interval * item.ease * 1.2);
    item.interval = nextInterval;
    item.correctCount++;
  }

  item.lastReviewed = now.toISOString();
  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + nextInterval);
  item.nextReview = nextDate.toISOString();

  // Save back
  state.recallItems[conceptId] = item;

  // Update global metrics
  if (!state.metrics) state.metrics = {};
  state.metrics.recallTotal = (state.metrics.recallTotal || 0) + 1;
  if (confidence >= 3) state.metrics.recallCorrect = (state.metrics.recallCorrect || 0) + 1;

  // Update weak topics
  if (confidence <= 2) {
    if (!state.weakTopics) state.weakTopics = [];
    const existing = state.weakTopics.find(w => w.concept === conceptId);
    if (existing) {
      existing.failureCount = (existing.failureCount || 0) + 1;
      existing.lastAttempted = now.toISOString();
      existing.confidence = confidence;
    } else {
      state.weakTopics.push({
        concept: conceptId,
        confidence,
        failureCount: 1,
        lastAttempted: now.toISOString(),
        nextRemediation: item.nextReview,
        activity: confidence === 1 ? 'closed-book explanation' : 'tiny implementation'
      });
    }
  } else {
    // Remove from weak topics if mastered
    if (state.weakTopics) {
      state.weakTopics = state.weakTopics.filter(w => w.concept !== conceptId);
    }
  }

  return item;
}

window.quickRecallAnswer = function(confidence, itemId) {
  showToast(
    confidence >= 3 ? '✅ Well done! Spaced repetition updated.' : '🔥 Added to Weak Topics — will revisit soon.',
    confidence >= 3 ? 'success' : 'warning'
  );
  const panel = document.getElementById('quickRecallContent');
  if (panel) panel.innerHTML = `<p style="color:var(--neon-green);font-family:var(--font-mono);font-size:13px">✅ Recall logged. Focus on your study block!</p>`;
};

// ─── SKILL BARS ───────────────────────────────────────────────

function renderSkillBars(state) {
  const container = document.getElementById('skillBarsContainer');
  if (!container) return;

  const maxXP = 500;
  const skillXP = state?.skillXP || {};
  container.innerHTML = SKILL_KEYS.map((key, i) => {
    const xp  = skillXP[key] || 0;
    const pct = Math.min(100, Math.round((xp / maxXP) * 100));
    const lvl = Math.floor(xp / 50) + 1;
    return `
      <div class="skill-bar-item">
        <div class="skill-bar-header">
          <span class="skill-bar-name">${SKILL_LABELS[i]}</span>
          <span class="skill-bar-level">Lv.${lvl} • ${xp}XP</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ─── ENGLISH MASTERY & TECH COMMUNICATION HUB ─────────────────

const TECH_VOCAB_BANKS = {
  w1: [
    { word: "Encapsulation", phonetic: "/ɪnˌkæp.sjʊˈleɪ.ʃən/", def: "Bundling data and methods within a single unit to restrict direct access to internals.", example: "Encapsulation prevents unauthorized outer layers from mutating internal state." },
    { word: "Polymorphism", phonetic: "/ˌpɒl.iˈmɔː.fɪ.zəm/", def: "The ability of different objects to respond to the same interface in their own distinct way.", example: "We leverage polymorphism to swap storage backends without changing business logic." },
    { word: "Idempotent", phonetic: "/aɪˈdɛm.pəʊ.tənt/", def: "An operation that produces the exact same result no matter how many times it executes.", example: "Our API PUT endpoints must remain strictly idempotent." },
    { word: "Abstraction", phonetic: "/æbˈstræk.ʃən/", def: "Hiding complex background mechanics and presenting a clean, minimal interface.", example: "The interface provides a clean abstraction over the distributed database." }
  ],
  w2: [
    { word: "Time Complexity", phonetic: "/taɪm kəmˈplɛk.sɪ.ti/", def: "Computational complexity describing how execution time scales with input size.", example: "Hash map lookups provide amortized O(1) time complexity." },
    { word: "Deterministic", phonetic: "/dɪˌtɜː.mɪˈnɪs.tɪk/", def: "An algorithm that consistently yields the exact same output given the same input.", example: "State transitions in our agent loop must remain deterministic." },
    { word: "Concurrency", phonetic: "/kənˈkʌr.ən.si/", def: "The ability of different parts of a program to be executed out-of-order or in partial order.", example: "Async IO allows massive concurrency without thread-switching overhead." },
    { word: "Throughput", phonetic: "/ˈθruː.pʊt/", def: "The amount of data or operations processed by a system in a given period of time.", example: "Batching requests significantly boosts indexing throughput." }
  ],
  w3: [
    { word: "Asynchronous", phonetic: "/eɪˈsɪŋ.krə.nəs/", def: "Operations occurring independently of the main program thread without blocking execution.", example: "FastAPI handles asynchronous database queries via the asyncio event loop." },
    { word: "Middleware", phonetic: "/ˈmɪd.əl.weər/", def: "Software layer providing services to applications beyond those available from the OS.", example: "Authentication and rate-limiting are enforced in our custom middleware." },
    { word: "Payload", phonetic: "/ˈpeɪ.ləʊd/", def: "The essential cargo of data transmitted in an HTTP request or event stream.", example: "The webhook payload contains JSON-serialized event telemetry." },
    { word: "Latency", phonetic: "/ˈleɪ.tən.si/", def: "The time elapsed between a request initiation and the receipt of its initial response.", example: "We optimized database indexing to reduce end-to-end P99 latency below 50ms." }
  ],
  w4: [
    { word: "Convergence", phonetic: "/kənˈvɜː.dʒəns/", def: "The state reached when optimization loss ceases to decrease significantly.", example: "Gradient descent reached smooth convergence after 40 epochs." },
    { word: "Overfitting", phonetic: "/ˌəʊ.vəˈfɪt.ɪŋ/", def: "When a model learns training noise instead of the underlying general distribution.", example: "Regularization and dropout were added to mitigate severe overfitting." },
    { word: "Hyperparameter", phonetic: "/ˌhaɪ.pə.pəˈræm.ɪ.tər/", def: "A configuration variable external to the model whose value is chosen prior to training.", example: "Learning rate is the most critical hyperparameter to tune systematically." },
    { word: "Dimensionality", phonetic: "/daɪˌmɛn.ʃəˈnæl.ɪ.ti/", def: "The number of distinct input features or attributes present in a dataset.", example: "We applied PCA to compress high feature dimensionality into 32 orthogonal components." }
  ],
  w5: [
    { word: "Backpropagation", phonetic: "/ˌbæk.prɒp.əˈɡeɪ.ʃən/", def: "Algorithm calculating loss gradients with respect to neural network weights via chain rule.", example: "Backpropagation computes the exact gradient vectors needed to update weights." },
    { word: "Activation Function", phonetic: "/ˌæk.tɪˈveɪ.ʃən ˈfʌŋk.ʃən/", def: "Mathematical function mapping a neuron's weighted inputs to its output activation.", example: "GELU provides smoother non-linear activation than standard piecewise ReLU." },
    { word: "Gradient", phonetic: "/ˈɡreɪ.di.ənt/", def: "Vector representing the directional rate of maximum increase of the loss landscape.", example: "Gradient clipping prevents exploding gradients during deep backpropagation." },
    { word: "Tensors", phonetic: "/ˈtɛn.sərz/", def: "Multi-dimensional algebraic arrays operating as primary data structures in deep learning.", example: "PyTorch maps tensor operations directly to GPU CUDA cores." }
  ],
  w6: [
    { word: "Tokenization", phonetic: "/ˌtəʊ.kən.aɪˈzeɪ.ʃən/", def: "Segmenting natural language text into discrete sub-word tokens for LLM processing.", example: "Byte-Pair Encoding tokenization handles unseen vocabulary via subwords." },
    { word: "Attention Mechanism", phonetic: "/əˈtɛn.ʃən ˈmɛk.ə.nɪ.zəm/", def: "Architecture calculating dynamic contextual affinities between all tokens in a sequence.", example: "Self-attention computes affinity scores allowing tokens to gather context across the prompt." },
    { word: "Temperature", phonetic: "/ˈtɛm.prə.tʃər/", def: "Hyperparameter governing the entropy and randomness of sampled output logits.", example: "We set temperature to 0.0 for deterministic JSON tool-call schema compliance." },
    { word: "Context Window", phonetic: "/ˈkɒn.tɛkst ˈwɪn.dəʊ/", def: "The maximum token sequence length an attention model can simultaneously ingest.", example: "The 128k context window allows full-codebase repository ingestion." }
  ],
  w7: [
    { word: "Embedding", phonetic: "/ɪmˈbɛd.ɪŋ/", def: "Dense continuous vector projection capturing semantic meaning and contextual proximity.", example: "Cosine distance between embeddings determines dense retrieval relevance." },
    { word: "Chunking", phonetic: "/ˈtʃʌŋk.ɪŋ/", def: "Dividing source text into semantically cohesive passages suitable for vector search.", example: "Hierarchical chunking preserves macro document context alongside granular passages." },
    { word: "Reranking", phonetic: "/riːˈræŋk.ɪŋ/", def: "Cross-encoder scoring of retrieved candidate passages to optimize top-k relevance.", example: "A cross-encoder reranker improves top-3 precision by over 25%." },
    { word: "Hallucination", phonetic: "/həˌluː.sɪˈneɪ.ʃən/", def: "Plausible-sounding but factually ungrounded output generated by generative models.", example: "Strict RAG source attribution prevents factual hallucination in answers." }
  ],
  w8: [
    { word: "Autonomous", phonetic: "/ɔːˈtɒn.ə.məs/", def: "Capable of independent self-directed reasoning, decision making, and tool invocation.", example: "The agent autonomously handles transient API rate limits and retries." },
    { word: "ReAct Pattern", phonetic: "/riːˈækt ˈpæt.ərn/", def: "Synergistic framework interleaving explicit Reasoning steps with Action execution.", example: "The ReAct loop reasons about the current observation before invoking SQL tools." },
    { word: "State Machine", phonetic: "/steɪt məˈʃiːn/", def: "Mathematical model of computation consisting of finite states, events, and transitions.", example: "LangGraph compiles the agent workflow into a deterministic state graph." },
    { word: "Orchestration", phonetic: "/ˌɔː.kɪˈstreɪ.ʃən/", def: "Automated configuration, coordination, and management of distributed agent systems.", example: "The supervisor agent handles orchestration across specialized code and review agents." }
  ],
  w9: [
    { word: "Interoperability", phonetic: "/ˌɪn.tərˌɒp.ər.əˈbɪl.ə.ti/", def: "The ability of diverse computer systems or protocols to seamlessly exchange information.", example: "Model Context Protocol ensures standard tool interoperability across LLMs." },
    { word: "Decoupled", phonetic: "/diːˈkʌp.əld/", def: "Architecting software components so they execute independently with minimal mutual reliance.", example: "The MCP server is completely decoupled from client agent implementations." },
    { word: "Subagent", phonetic: "/sʌbˈeɪ.dʒənt/", def: "A specialized secondary agent assigned a delegated sub-task by an orchestrator.", example: "The orchestrator spawned a research subagent to survey documentation." },
    { word: "Protocol", phonetic: "/ˈprəʊ.tə.kɒl/", def: "A formalized system of communication rules governing data transmission between devices.", example: "JSON-RPC 2.0 acts as the lightweight wire protocol for our tool-calling interface." }
  ],
  w10: [
    { word: "Containerization", phonetic: "/kənˌteɪ.nər.aɪˈzeɪ.ʃən/", def: "Encapsulating application code alongside dependencies into lightweight executable images.", example: "Docker containerization guarantees strict parity between local dev and cloud clusters." },
    { word: "Scalability", phonetic: "/ˌskeɪ.ləˈbɪl.ə.ti/", def: "The property of a system to handle growing operational demands by adding resources.", example: "Stateless container pods enable horizontal autoscaling under sudden traffic spikes." },
    { word: "Observability", phonetic: "/əbˌzɜː.vəˈbɪl.ə.ti/", def: "Quantifying internal execution states through exterior telemetry, logs, and traces.", example: "OpenTelemetry distributed tracing provides total observability across microservices." },
    { word: "Idempotency", phonetic: "/ˌaɪ.dɛmˈpəʊ.tən.si/", def: "Ensuring identical multiple requests produce identical side-effects without duplication.", example: "Distributed idempotency keys in Redis protect payment endpoints against duplicates." }
  ]
};

function getEnglishDayData(dayNum, roadmapDay) {
  const title = roadmapDay?.title || 'Core Engineering Architecture';
  const topics = roadmapDay?.topics || ['Software Architecture', 'System Design'];

  let phase = "Phase 1: Foundations & Architecture Speech (Days 1–21)";
  if (dayNum > 21 && dayNum <= 42) phase = "Phase 2: Explaining ML & Math Out Loud (Days 22–42)";
  if (dayNum > 42 && dayNum <= 63) phase = "Phase 3: RAG, LLM & Multi-Agent System Articulation (Days 43–63)";
  if (dayNum > 63) phase = "Phase 4: Senior FAANG System Design & Interview Mastery (Days 64–90)";

  const weekNum = Math.min(10, Math.ceil(dayNum / 7));
  const vocab = TECH_VOCAB_BANKS[`w${weekNum}`] || TECH_VOCAB_BANKS.w1;

  const speechPrompt = `Close all notes. Speak continuously in English for 3–5 minutes explaining: "${title}". Cover: 1) What fundamental engineering problem it solves, 2) How you structured your implementation today, 3) Key trade-offs, edge-cases, and production risks considered.`;

  const interviewQuestion = `In a senior AI engineering interview: "Walk me through how you would architect ${topics[0] || 'this component'} in production. What failure modes do you anticipate under high concurrency, and how do you monitor them?"`;

  const voicePrompt = `You are a Principal AI Engineer conducting a senior technical interview. Ask me one tough, probing question about "${title}" and "${topics.slice(0, 2).join(', ')}". Wait for my spoken answer, then give brief feedback on my technical depth, clarity, and communication structure.`;

  return {
    dayNum,
    phase,
    title,
    speechPrompt,
    techVocab: vocab,
    interviewQuestion,
    voicePrompt
  };
}

window.copyTextToClipboard = async function(text, btnId) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    const btn = document.getElementById(btnId);
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = `${ICONS.check} Copied!`;
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
    showToast('📋 Copied to clipboard! Ready to paste into ChatGPT/Claude Voice.', 'success');
  } catch (err) {
    showToast('Failed to copy', 'error');
  }
};

window.pronounceWord = function(word) {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.88;
      window.speechSynthesis.speak(utter);
    } else {
      showToast(`🔊 ${word}`, 'info');
    }
  } catch (_) {}
};

// ─── ANALYTICS PAGE (V2 COMPETENCY DASHBOARD) ─────────────────

function renderAnalyticsPage(state) {
  const container = document.getElementById('analyticsContent');
  if (!container) return;
  state = state || window.appState || defaultState();

  const metrics = state.metrics || {};
  const consistency = state.consistency || {};
  const completedDays = state.completedDays || {};
  const completedCount = Object.keys(completedDays).length;
  const focusSessions = state.focusSessions || [];
  const verifiedHours = Math.round((metrics.verifiedDeepWorkMinutes || 0) / 60 * 10) / 10;
  const recallAcc = metrics.recallTotal > 0 ? Math.round((metrics.recallCorrect / metrics.recallTotal) * 100) : 0;
  const solveRate = metrics.independentSolveAttempts > 0 ? Math.round((metrics.independentSolves / metrics.independentSolveAttempts) * 100) : 0;
  const avgAILevel = metrics.aiAssistanceCount > 0 ? (metrics.aiAssistanceTotal / metrics.aiAssistanceCount).toFixed(1) : '0.0';
  const weeklyReviews = state.weeklyReviews || {};
  const weeklyCount = Object.keys(weeklyReviews).length;

  // Compute consistency rate
  const consistencyRate = consistency.plannedSessions > 0
    ? Math.round((consistency.completedSessions / consistency.plannedSessions) * 100)
    : (state.streak > 0 ? 100 : 0);

  // Skill XP totals
  const skillXP = state.skillXP || {};
  const totalXP = Object.values(skillXP).reduce((a,b)=>a+b,0);

  // Mastery distribution
  const mastery = state.mastery || {};
  const masteryDist = MASTERY_LEVELS.map(m => ({
    ...m,
    count: Object.values(mastery).filter(v => v === m.key).length
  }));
  const masteredCount = masteryDist.find(m=>m.key==='can_apply')?.count || 0;

  // Weak topics
  const weakTopics = (state.weakTopics || []).slice(0, 5);

  // Recent focus sessions
  const recentSessions = focusSessions.slice(-7);

  container.innerHTML = `
    <div class="fade-in">
      <!-- Header -->
      <div style="margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:6px">
          <span class="meta-chip green" style="font-size:11px">📊 COMPETENCY ANALYTICS DASHBOARD</span>
          <span class="meta-chip cyan" style="font-size:11px">V2 EVIDENCE ENGINE</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono)">Do not reward activity alone. Reward verifiable learning evidence.</div>
      </div>

      <!-- 8 Core Metrics Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:24px">
        ${[
          { label: 'Verified Deep Work', value: verifiedHours + 'h', sub: focusSessions.filter(s=>s.completed).length + ' confirmed sessions', color: '#10b981', icon: '⏱️' },
          { label: 'Days Completed', value: completedCount, sub: 'of 90 mission days', color: '#6366f1', icon: '✅' },
          { label: 'Recall Accuracy', value: recallAcc + '%', sub: (metrics.recallCorrect||0) + '/' + (metrics.recallTotal||0) + ' correct', color: recallAcc>=70?'#10b981':recallAcc>=50?'#f59e0b':'#ef4444', icon: '🧠' },
          { label: 'Independent Solve Rate', value: solveRate + '%', sub: (metrics.independentSolves||0) + '/' + (metrics.independentSolveAttempts||0) + ' tasks', color: solveRate>=70?'#10b981':solveRate>=50?'#f59e0b':'#ef4444', icon: '🎯' },
          { label: 'Features Shipped', value: metrics.featuresShipped || 0, sub: (metrics.commits||0) + ' GitHub commits', color: '#f59e0b', icon: '🚀' },
          { label: 'Tests Passed', value: metrics.testsPassed || 0, sub: (metrics.testsFailed||0) + ' failed', color: '#a78bfa', icon: '🧪' },
          { label: 'Mastered Concepts', value: masteredCount, sub: Object.keys(mastery).length + ' assessed total', color: '#00e5ff', icon: '🏆' },
          { label: 'Consistency Rate', value: consistencyRate + '%', sub: 'Streak: ' + (consistency.currentStreak||state.streak||0) + ' days', color: consistencyRate>=80?'#10b981':consistencyRate>=60?'#f59e0b':'#ef4444', icon: '📈' },
        ].map(m => `
          <div class="card" style="padding:16px">
            <div style="font-size:18px;margin-bottom:8px">${m.icon}</div>
            <div style="font-size:22px;font-weight:700;color:${m.color};font-family:var(--font-mono);margin-bottom:4px">${m.value}</div>
            <div style="font-size:11px;font-weight:600;color:var(--text-secondary);margin-bottom:2px">${m.label}</div>
            <div style="font-size:10px;color:var(--text-muted)">${m.sub}</div>
          </div>
        `).join('')}
      </div>

      <!-- AI Assistance Trend -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="section-label" style="margin-bottom:12px">🤖 AI Assistance Profile</div>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <div>
            <div style="font-size:20px;font-weight:700;font-family:var(--font-mono);color:#6366f1">${avgAILevel}/5.0</div>
            <div style="font-size:11px;color:var(--text-muted)">Avg AI Level</div>
          </div>
          <div style="flex:1">
            <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">Level breakdown (0=No AI → 5=Generated)</div>
            <div style="display:flex;gap:3px">
              ${[0,1,2,3,4,5].map(n => {
                const levelColors = ['#10b981','#60a5fa','#f59e0b','#f97316','#ef4444','#dc2626'];
                const levelLabels = ['None','Syntax','Hints','Arch','Partial','Full'];
                return `<div style="flex:1;text-align:center">
                  <div style="height:6px;border-radius:3px;background:${levelColors[n]};opacity:0.7"></div>
                  <div style="font-size:9px;color:var(--text-muted);margin-top:2px">${levelLabels[n]}</div>
                </div>`;
              }).join('')}
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:6px">Goal: keep average ≤ 2.0 (hints only)</div>
          </div>
        </div>
      </div>

      <!-- Mastery Distribution -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="section-label" style="margin-bottom:12px">🎯 Mastery Level Distribution</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${masteryDist.map(m => `
            <div style="background:rgba(${hexToRgb(m.color)},0.1);border:1px solid rgba(${hexToRgb(m.color)},0.25);border-radius:8px;padding:10px 14px;text-align:center;min-width:80px">
              <div style="font-size:20px">${m.icon}</div>
              <div style="font-size:18px;font-weight:700;color:${m.color}">${m.count}</div>
              <div style="font-size:10px;color:var(--text-muted)">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Weak Topics Queue -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="section-label" style="margin-bottom:12px">⚠️ Weak Topics — Remediation Queue</div>
        ${weakTopics.length > 0 ? weakTopics.map(t => `
          <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
            <span style="color:#ef4444;font-size:12px">●</span>
            <div style="flex:1">
              <div style="font-size:12px;color:var(--text-secondary);font-weight:500">${t.concept}</div>
              <div style="font-size:10px;color:var(--text-muted)">Failed ${t.failureCount||1}x • Confidence: ${t.confidence}/4 • Activity: ${t.activity||'review'}</div>
            </div>
            <span class="meta-chip" style="font-size:10px">Day ${t.sourceMissionDay||'?'}</span>
          </div>
        `).join('') : `<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:16px">✅ No weak topics queued — great recall accuracy!</div>`}
      </div>

      <!-- Recent Focus Sessions -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="section-label" style="margin-bottom:12px">⏱️ Recent Focus Sessions</div>
        ${recentSessions.length > 0 ? recentSessions.map(s => `
          <div style="display:flex;align-items:center;gap:12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px">
            <span style="color:${s.completed?'#10b981':'#64748b'}">${s.completed?'✅':'⬜'}</span>
            <div style="flex:1">
              <span style="color:var(--text-secondary)">${s.category} sprint</span>
              <span style="color:var(--text-muted)"> — ${s.actualMinutes||s.plannedMinutes}min actual / ${s.plannedMinutes}min planned</span>
            </div>
            <span style="color:var(--text-muted);font-size:10px">Focus: ${s.focusRating||3}/5</span>
          </div>
        `).join('') : `<div style="color:var(--text-muted);font-size:12px;text-align:center;padding:16px">No focus sessions recorded yet. Use sprint timer in Build block!</div>`}
      </div>

      <!-- Weekly Questions -->
      <div class="card" style="padding:16px;margin-bottom:16px">
        <div class="section-label" style="margin-bottom:12px">🔍 Weekly Operating System — Review Questions</div>
        ${[
          'What can I now build that I could not build last week?',
          'What can I explain without notes?',
          'What still requires AI / tutorial help?',
          'What bug taught me the most?',
          'What evidence can I show an interviewer?',
          'What should be removed from next week because it is low value?'
        ].map((q,i) => `
          <div style="margin-bottom:10px">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${i+1}. ${q}</div>
            <textarea class="notes-area" style="height:40px;font-size:11px" placeholder="Your answer..." onblur="window.saveWeeklyAnswer(${i}, this.value)"></textarea>
          </div>
        `).join('')}
        <button class="btn btn-primary btn-sm" onclick="window.saveWeeklyReview()" style="margin-top:8px">💾 Save Weekly Review</button>
      </div>

      <!-- XP by Skill -->
      <div class="card" style="padding:16px">
        <div class="section-label" style="margin-bottom:12px">⚡ Skill XP Breakdown</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${SKILL_KEYS.map((key, i) => {
            const xp = skillXP[key] || 0;
            const maxXP = 90 * 25;
            const pct = Math.min(100, Math.round((xp / maxXP) * 100));
            const colors = ['#6366f1','#10b981','#f59e0b','#a855f7','#00e5ff'];
            return `
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:11px;color:var(--text-secondary)">${SKILL_LABELS[i]}</span>
                  <span style="font-size:11px;font-family:var(--font-mono);color:${colors[i]}">${xp} XP (${pct}%)</span>
                </div>
                <div style="height:4px;background:rgba(255,255,255,0.05);border-radius:2px">
                  <div style="height:4px;border-radius:2px;background:${colors[i]};width:${pct}%;transition:width 0.4s"></div>
                </div>
              </div>
            `;
          }).join('')}
          <div style="margin-top:8px;text-align:right;font-size:11px;font-family:var(--font-mono);color:var(--text-muted)">Total: ${totalXP} XP</div>
        </div>
      </div>
    </div>
  `;
}

function renderEnglishPage(state) {
  const container = document.getElementById('englishContent');
  if (!container) return;
  state = state || window.appState || defaultState();

  const currentDay = state.currentDay || 1;
  const roadmapDay = getRoadmapDay(currentDay);
  const englishData = getEnglishDayData(currentDay, roadmapDay);

  const completed = Object.values(state.completedDays || {});
  const voiceRecordingsCount = completed.filter(d => d.voiceRecorded || d.voiceUrl).length;
  const speakingStreak = state.streak || 0;
  const spokenHours = (voiceRecordingsCount * 2);

  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="english-hero-banner fade-in">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:8px">
        <span class="meta-chip green" style="font-size:11px">${ICONS.mic} 90-DAY TECHNICAL ENGLISH COMMAND HUB</span>
        <span class="meta-chip cyan" style="font-size:11px">TARGET: 2 HOURS DAILY</span>
      </div>
      <h2 style="font-size:22px;font-weight:700;color:var(--text-primary);letter-spacing:-0.02em;margin-bottom:6px">
        Spoken English &amp; FAANG Interview Mastery
      </h2>
      <p style="color:var(--text-secondary);font-size:13.5px;max-width:720px;line-height:1.6">
        Great code means nothing if you cannot articulate it with effortless authority. Build the international English fluency required to lead global engineering teams and pass top-tier technical interviews.
      </p>
    </div>

    <!-- Fluency Stats Row -->
    <div class="fluency-stats-grid fade-in">
      <div class="fluency-stat-card">
        <div class="fluency-stat-label">Speaking Streak</div>
        <div class="fluency-stat-value" style="color:var(--accent-amber)">${speakingStreak} Days</div>
      </div>
      <div class="fluency-stat-card">
        <div class="fluency-stat-label">Voice Recordings</div>
        <div class="fluency-stat-value" style="color:var(--accent-cyan)">${voiceRecordingsCount} Logged</div>
      </div>
      <div class="fluency-stat-card">
        <div class="fluency-stat-label">Spoken Hours Target</div>
        <div class="fluency-stat-value" style="color:var(--accent-emerald)">${spokenHours} / 180h</div>
      </div>
      <div class="fluency-stat-card">
        <div class="fluency-stat-label">Fluency Level</div>
        <div class="fluency-stat-value" style="color:var(--accent-violet)">
          ${currentDay < 22 ? 'Technical Novice' : currentDay < 43 ? 'Systems Articulator' : currentDay < 64 ? 'Arch Lead Speaker' : 'FAANG Fluent Lead'}
        </div>
      </div>
    </div>

    <!-- Today's Active English Drill -->
    <div class="glass-card fade-in" style="padding:24px;margin-bottom:24px">
      <div class="flex justify-between items-center" style="margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <div class="section-label" style="margin:0">🎙️ TODAY'S SPOKEN DRILL — DAY ${currentDay}</div>
        <span class="badge badge-cyan" style="font-size:11px">${englishData.phase}</span>
      </div>
      <h3 style="font-size:17px;font-weight:600;margin-bottom:8px;color:var(--text-primary)">
        ${englishData.title}
      </h3>

      <!-- 2-Track Grid -->
      <div class="english-track-grid" style="margin-top:16px">
        <!-- Track 1: Feynman Speech -->
        <div class="english-track-card">
          <div class="track-tag">PART 1 • 60 MIN • FEYNMAN EXPLANATION</div>
          <div class="track-title">Out-Loud Technical Speech Drill</div>
          <p class="track-desc">${englishData.speechPrompt}</p>

          <div style="margin-top:14px">
            <button class="btn btn-primary btn-sm" onclick="showPage('dashboard'); setTimeout(() => toggleBlock('block-4'), 300);" style="gap:6px">
              ${ICONS.mic} Go to Block 4 Voice Recorder
            </button>
          </div>
        </div>

        <!-- Track 2: AI Voice Interview -->
        <div class="english-track-card">
          <div class="track-tag">PART 2 • 60 MIN • INTERVIEW SIMULATION</div>
          <div class="track-title">FAANG AI Technical Question</div>
          <p class="track-desc">
            <strong style="color:var(--text-primary)">Question:</strong> ${englishData.interviewQuestion}
          </p>

          <div class="interview-prompt-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:600;color:var(--accent-cyan)">Prompt for ChatGPT / Claude Voice Mode:</span>
              <button class="copy-btn-action" id="copyPromptBtn" onclick="copyTextToClipboard(\`${englishData.voicePrompt.replace(/`/g, '\\`')}\`, 'copyPromptBtn')">
                ${ICONS.copy} Copy Prompt
              </button>
            </div>
            <code>"${englishData.voicePrompt}"</code>
          </div>
        </div>
      </div>

      <!-- Today's Vocabulary Flashcards -->
      <div style="margin-top:20px">
        <div class="section-label">📚 High-Impact Technical Vocabulary for Today (Click 🔊 to hear pronunciation)</div>
        <div class="vocab-vault-grid">
          ${englishData.techVocab.map(v => `
            <div class="vocab-card">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span class="vocab-word">${v.word}</span>
                <button class="btn btn-secondary btn-sm" onclick="pronounceWord('${v.word}')" title="Listen pronunciation" style="padding:2px 8px;font-size:12px">
                  ${ICONS.volume}
                </button>
              </div>
              <div class="vocab-phonetic">${v.phonetic}</div>
              <div class="vocab-definition">${v.def}</div>
              <div class="vocab-example">"${v.example}"</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 90-Day Communication Curriculum -->
    <div class="glass-card fade-in" style="padding:24px;margin-bottom:24px">
      <div class="section-label">🗺️ 90-Day Technical Communication Curriculum</div>
      <p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px">Structured progression from fundamental syntax articulation to executive architecture defense.</p>

      <div class="curriculum-phase-grid">
        <div class="curriculum-card">
          <span class="curriculum-phase-badge phase-1">Phase 1 • Days 1–21</span>
          <div style="font-size:14px;font-weight:600;margin-bottom:6px">Core Technical Articulation &amp; Code Walkthroughs</div>
          <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5">
            Explaining OOP principles, method resolution order, clean architecture, data structures, and REST API design in fluent English. Eliminating filler words (uh, um, like) and developing a confident speaking rhythm.
          </p>
        </div>

        <div class="curriculum-card">
          <span class="curriculum-phase-badge phase-2">Phase 2 • Days 22–42</span>
          <div style="font-size:14px;font-weight:600;margin-bottom:6px">Explaining Machine Learning &amp; Math in English</div>
          <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5">
            Articulating mathematical intuition behind backpropagation, gradient descent, tensor transformations, attention mechanisms, and cross-entropy loss out loud without scripts.
          </p>
        </div>

        <div class="curriculum-card">
          <span class="curriculum-phase-badge phase-3">Phase 3 • Days 43–63</span>
          <div style="font-size:14px;font-weight:600;margin-bottom:6px">RAG, LLM &amp; Multi-Agent System Articulation</div>
          <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5">
            Pitching and defending agentic architectures, tool-calling loops, context window limits, vector indexing strategies, and prompt injection mitigation in English.
          </p>
        </div>

        <div class="curriculum-card">
          <span class="curriculum-phase-badge phase-4">Phase 4 • Days 64–90</span>
          <div style="font-size:14px;font-weight:600;margin-bottom:6px">Senior FAANG System Design &amp; Leadership</div>
          <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5">
            High-pressure mock interview simulations, system design whiteboarding, trade-off defense (latency vs cost vs accuracy), and behavioral interview mastery.
          </p>
        </div>
      </div>
    </div>

    <!-- Audio Archive -->
    <div class="glass-card fade-in" style="padding:24px">
      <div class="section-label">🎙️ Voice Recordings &amp; Accent Progress Archive</div>
      <p style="color:var(--text-secondary);font-size:13px;margin-bottom:14px">
        Listen back to your earlier recordings to witness your fluency, vocabulary, and articulation progress over the 90 days.
      </p>

      <div class="audio-archive-list">
        ${renderVoiceArchiveList(state)}
      </div>
    </div>

    <!-- V2: Interview Answer Bank -->
    <div style="margin-top:24px">
      <div class="section-label" style="margin-bottom:12px">🎤 Interview Answer Bank</div>
      <div class="card" style="padding:16px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:14px">Save your best spoken answers for common interview questions. Practice until fluent.</div>
        ${[
          { id: 'intro', q: 'Tell me about yourself & your AI/ML journey' },
          { id: 'project', q: 'Walk me through your capstone project architecture' },
          { id: 'bug', q: 'Describe the hardest bug you debugged and how you solved it' },
          { id: 'decision', q: 'Explain a key technical decision you made and why' },
          { id: 'failure', q: 'Tell me about a failure or mistake and what you learned' },
          { id: 'rag', q: 'Explain RAG architecture — retrieval, chunking, embeddings, generation' },
          { id: 'agent', q: 'How do you build a reliable AI agent with tool calling?' },
          { id: 'design', q: 'Design a production LLM system — latency, cost, evaluation' }
        ].map(item => `
          <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.04)">
            <div style="font-size:12px;color:var(--text-secondary);font-weight:500;margin-bottom:6px">❓ ${item.q}</div>
            <textarea 
              class="notes-area" 
              style="height:60px;font-size:12px" 
              placeholder="Write your best answer here... practice speaking it out loud."
              onblur="window.saveInterviewAnswer('${item.id}', this.value)"
              id="interview-${item.id}"
            ></textarea>
          </div>
        `).join('')}
        <button class="btn btn-secondary btn-sm" onclick="window.loadInterviewAnswers()">📂 Load Saved Answers</button>
      </div>
    </div>
  `;
}

function renderVoiceArchiveList(state) {
  const completed = Object.entries(state.completedDays || {})
    .filter(([_, d]) => d.voiceUrl || d.voiceRecorded)
    .sort((a, b) => Number(b[0]) - Number(a[0]));

  if (completed.length === 0) {
    return `
      <div style="padding:24px;text-align:center;background:rgba(255,255,255,0.02);border-radius:var(--radius-sm)">
        <p style="color:var(--text-muted);font-size:13px">No voice recordings logged yet. Complete today's Block 4 English Voice Explanation to start your audio archive!</p>
      </div>
    `;
  }

  return completed.map(([dayNum, log]) => {
    const rd = getRoadmapDay(Number(dayNum));
    return `
      <div class="audio-archive-item">
        <div>
          <div style="font-size:13.5px;font-weight:600;color:var(--text-primary)">
            Day ${dayNum}: ${rd?.title || log.dayTitle || 'Daily Mission'}
          </div>
          <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-top:2px">
            ${new Date(log.completedAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • English Explanation Logged
          </div>
        </div>
        <div>
          ${log.voiceUrl ? `
            <a href="${log.voiceUrl}" target="_blank" class="btn btn-secondary btn-sm" style="gap:6px">
              ${ICONS.volume} Listen Cloud Audio
            </a>
          ` : `
            <span class="badge badge-green">${ICONS.check} Recorded Locally</span>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// ─── RECALL PAGE ──────────────────────────────────────────────

function renderRecallPage() {
  const container = document.getElementById('recallContent');
  if (!container) return;
  const state = window.appState || defaultState();

  if (typeof window.getRecallItems !== 'function') {
    container.innerHTML = `<div class="glass-card" style="padding:32px;text-align:center"><p style="color:var(--text-muted)">Recall engine initializing...</p></div>`;
    return;
  }

  const items = window.getRecallItems(
    state.currentDay,
    state.completedDays || {},
    state.weakTopics || []
  );

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="padding:48px;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">🧠</div>
        <h3 style="color:var(--neon-green);font-family:var(--font-mono);margin-bottom:8px">Recall Engine Standing By</h3>
        <p style="color:var(--text-secondary)">Complete Day 1 to activate your spaced repetition system.</p>
        <p style="color:var(--text-muted);font-size:12px;margin-top:8px;font-family:var(--font-mono)">
          Schedule: D+1, D+3, D+7, D+14, D+30, D+60, D+90
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="flex justify-between items-center" style="margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div>
        <h2 style="font-family:var(--font-mono);color:var(--neon-green);font-size:18px">🧠 Spaced Recall Engine</h2>
        <p style="color:var(--text-muted);font-size:12px">${items.length} items due • Day ${state.currentDay}</p>
      </div>
      <div class="badge badge-cyan">${items.filter(i=>i.isWeak).length} Weak Topics</div>
    </div>

    <div id="recallItemsContainer">
      ${items.map((item, idx) => `
        <div class="glass-card recall-card fade-in" id="recall-card-${idx}" style="display:${idx===0?'block':'none'}">
          <div class="flex justify-between" style="margin-bottom:8px">
            <div class="recall-topic-tag">${item.isWeak ? '🔥 Weak Topic' : `Day ${item.dayNum}`} • ${item.type}</div>
            <span style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono)">${idx+1}/${items.length}</span>
          </div>
          <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px">${item.topic}</p>
          <p style="font-size:13px;color:var(--neon-cyan);margin-bottom:8px;font-style:italic">${window.buildRecallPrompt(item)}</p>
          <p class="recall-question">${item.question}</p>
          <textarea class="recall-answer-area" placeholder="Write your answer from memory first..." id="recall-ans-${idx}"></textarea>
          <div class="confidence-row">
            ${[1,2,3,4].map(c => `<button class="conf-btn conf-${c}" onclick="submitRecall(${idx}, ${c}, ${items.length})">${['😅 Blank','🤔 Partial','👍 Good','⚡ Perfect'][c-1]}</button>`).join('')}
          </div>
        </div>
      `).join('')}

      <div id="recall-done" style="display:none">
        <div class="glass-card" style="padding:48px;text-align:center;border-color:rgba(0,255,150,0.4)">
          <div style="font-size:48px;margin-bottom:16px">🧠✅</div>
          <h3 style="color:var(--neon-green);font-family:var(--font-mono);margin-bottom:8px">Recall Session Complete!</h3>
          <p style="color:var(--text-secondary)">${items.length} items reviewed. Memory consolidation in progress.</p>
        </div>
      </div>
    </div>
  `;

  window._recallItems = items;
}

window.submitRecall = function(idx, confidence, total) {
  const state = window.appState;
  const item  = window._recallItems?.[idx];
  if (!item) return;

  window.processRecallResult(item, confidence, state);
  saveState(state);

  // Show next
  document.getElementById(`recall-card-${idx}`)?.style.setProperty('display', 'none');
  const next = document.getElementById(`recall-card-${idx+1}`);
  if (next) {
    next.style.display = 'block';
  } else {
    document.getElementById('recall-done')?.style.setProperty('display', 'block');
    showToast('🧠 Recall session complete!', 'success');
  }
};

// ─── ROADMAP PAGE ─────────────────────────────────────────────

function renderRoadmapPage() {
  const container = document.getElementById('roadmapContent');
  if (!container || !window.ROADMAP) return;
  const state = window.appState || defaultState();

  container.innerHTML = `
    <div style="margin-bottom:24px">
      <h2 style="font-family:var(--font-mono);color:var(--neon-green);font-size:18px;margin-bottom:4px">🗺️ 90-Day AI Engineer Roadmap</h2>
      <p style="color:var(--text-muted);font-size:13px">Click a week to expand • Click a day to jump to it</p>
    </div>
    ${window.ROADMAP.map(week => {
      const weekDays = week.days || [];
      const completedInWeek = weekDays.filter(d => state.completedDays?.[d.day]).length;
      const isCurrentWeek  = weekDays.some(d => d.day === state.currentDay);
      const isCompleted    = completedInWeek === weekDays.length;

      return `
        <div class="glass-card week-card ${isCurrentWeek ? 'open' : ''}" onclick="toggleWeek(this)">
          <div class="week-card-header">
            <div class="week-badge ${isCompleted ? 'completed' : isCurrentWeek ? 'current' : ''}">W${week.week}</div>
            <div class="week-info">
              <div class="week-name">${week.title}</div>
              <div class="week-phase">${week.phase}</div>
            </div>
            <div>
              <div class="week-progress-text">${completedInWeek}/${weekDays.length} days</div>
              <div class="progress-track" style="width:100px;margin-top:4px">
                <div class="progress-fill" style="width:${Math.round((completedInWeek/weekDays.length)*100)}%"></div>
              </div>
            </div>
          </div>
          <div class="week-days-list" onclick="event.stopPropagation()">
            ${weekDays.map(d => {
              const done    = !!state.completedDays?.[d.day];
              const current = d.day === state.currentDay;
              const maint   = state.completedDays?.[d.day]?.type === 'maintenance';
              const icon    = done ? (maint ? '🟡' : '🟢') : current ? '▶️' : '⬜';
              return `
                <div class="day-row ${current ? 'active-day' : ''}" onclick="jumpToDay(${d.day})">
                  <span class="day-num">Day ${d.day}</span>
                  <span class="day-status">${icon}</span>
                  <span class="day-title">${d.title}</span>
                  ${d.isReviewDay ? '<span class="badge badge-purple">Review</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

window.toggleWeek = function(el) { el.classList.toggle('open'); };

window.jumpToDay = function(dayNum) {
  const state = window.appState;
  if (dayNum > state.currentDay) {
    showToast(`⚠️ Day ${dayNum} is locked — complete previous days first`, 'warning');
    return;
  }
  state.currentDay = dayNum;
  window.currentDayLog = {};
  saveState(state);
  showPage('dashboard');
  renderDashboardPage(state);
};

// ─── SETTINGS PAGE ────────────────────────────────────────────

function renderSettingsPage() {
  const container = document.getElementById('settingsContent');
  if (!container) return;
  const creds = loadCreds();
  const state = window.appState || defaultState();

  container.innerHTML = `
    <h2 style="font-family:var(--font-mono);color:var(--neon-green);font-size:18px;margin-bottom:24px">⚙️ Command Center Settings</h2>

    <div class="glass-card settings-section">
      <div class="settings-section-title">🐙 GitHub Integration</div>
      <div class="form-group">
        <label class="form-label">Repository (username/repo)</label>
        <input class="form-input" id="cfg-repo" value="${creds.githubRepo || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Personal Access Token</label>
        <input class="form-input" id="cfg-token" type="password" value="${creds.githubToken || ''}" placeholder="ghp_xxxx">
      </div>
      <button class="btn btn-secondary btn-sm" onclick="testGitHub()">🔗 Test GitHub Connection</button>
    </div>

    <div class="glass-card settings-section">
      <div class="settings-section-title">🔒 Security &amp; Access Control</div>
      <p style="color:var(--text-secondary);font-size:13px;margin-bottom:12px">
        Authorized Operator: <strong style="color:var(--neon-green)">tharindudhananjayaekanayaka@gmail.com</strong>
      </p>
      <button class="btn btn-secondary btn-sm" onclick="logoutUser()">🔒 Lock Terminal / Logout</button>
    </div>

    <div class="glass-card settings-section">
      <div class="settings-section-title">☁️ Supabase Cloud</div>
      <div class="form-group">
        <label class="form-label">Project URL</label>
        <input class="form-input" id="cfg-supa-url" value="${creds.supabaseUrl || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Anon Key</label>
        <input class="form-input" id="cfg-supa-key" type="password" value="${creds.supabaseKey || ''}" placeholder="eyJhbGci...">
      </div>
      <button class="btn btn-secondary btn-sm" onclick="testSupabase()">🔗 Test Supabase Connection</button>
    </div>

    <div class="glass-card settings-section">
      <div class="settings-section-title">👤 Profile</div>
      <div class="form-group">
        <label class="form-label">Name / Callsign</label>
        <input class="form-input" id="cfg-name" value="${state.name || 'Engineer'}">
      </div>
      <div class="form-group">
        <label class="form-label">Daily Target Hours</label>
        <div class="hours-row">
          <input class="hours-slider" id="cfg-hours" type="range" min="4" max="12" value="${state.targetHours || 10}">
          <span class="hours-display" id="cfg-hours-display">${state.targetHours || 10}h</span>
        </div>
      </div>
    </div>

    <div class="glass-card settings-section">
      <div class="settings-section-title">💾 Data Management</div>
      <div class="settings-row">
        <div class="settings-label">Export Progress (JSON backup)</div>
        <button class="btn btn-secondary btn-sm" onclick="exportData()">⬇️ Export JSON</button>
      </div>
      <div class="settings-row">
        <div class="settings-label">Import Progress<small>Restore from backup</small></div>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('importFile').click()">⬆️ Import JSON</button>
        <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(this)">
      </div>
      <div class="settings-row">
        <div class="settings-label">Reset Everything<small style="color:var(--neon-red)">⚠️ Deletes all local data</small></div>
        <button class="btn btn-danger btn-sm" onclick="resetAll()">🗑️ Reset</button>
      </div>
    </div>

    <button class="btn btn-primary" onclick="saveSettings()">💾 Save Settings</button>
  `;

  const cfgSlider  = document.getElementById('cfg-hours');
  const cfgDisplay = document.getElementById('cfg-hours-display');
  if (cfgSlider && cfgDisplay) {
    cfgSlider.addEventListener('input', () => { cfgDisplay.textContent = cfgSlider.value + 'h'; });
  }
}

window.saveSettings = function() {
  const creds = {
    githubRepo:   document.getElementById('cfg-repo')?.value?.trim(),
    githubToken:  document.getElementById('cfg-token')?.value?.trim(),
    supabaseUrl:  document.getElementById('cfg-supa-url')?.value?.trim(),
    supabaseKey:  document.getElementById('cfg-supa-key')?.value?.trim()
  };
  saveCreds(creds);

  const state = window.appState;
  state.name        = document.getElementById('cfg-name')?.value || state.name;
  state.targetHours = parseInt(document.getElementById('cfg-hours')?.value || 10);
  saveState(state);

  if (creds.supabaseUrl && creds.supabaseKey) initSupabase(creds.supabaseUrl, creds.supabaseKey);

  showToast('✅ Settings saved!', 'success');
};

window.testGitHub = async function() {
  const token = document.getElementById('cfg-token')?.value?.trim();
  const repo  = document.getElementById('cfg-repo')?.value?.trim();
  if (!token || !repo) { showToast('Enter token and repo first', 'error'); return; }
  const [owner, repoName] = repo.split('/');
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    if (res.ok) showToast('✅ GitHub connected successfully!', 'success');
    else showToast('❌ GitHub auth failed — check token and repo name', 'error');
  } catch(e) { showToast('❌ Network error', 'error'); }
};

window.testSupabase = async function() {
  const url = document.getElementById('cfg-supa-url')?.value?.trim();
  const key = document.getElementById('cfg-supa-key')?.value?.trim();
  if (!url || !key) { showToast('Enter Supabase URL and key first', 'error'); return; }
  try {
    const ok = initSupabase(url, key);
    if (ok) showToast('✅ Supabase client initialized!', 'success');
    else showToast('❌ Supabase init failed', 'error');
  } catch(e) { showToast('❌ Error: ' + e.message, 'error'); }
};

window.exportData = function() {
  const state = window.appState;
  const blob  = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a     = document.createElement('a');
  a.href      = URL.createObjectURL(blob);
  a.download  = `ai-engineer-backup-day${state.currentDay}-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showToast('⬇️ Backup exported!', 'success');
};

window.importData = function(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported.completedDays) throw new Error('Invalid backup file');
      saveState(imported);
      window.appState = { ...defaultState(), ...imported };
      showToast('✅ Data imported! Reloading...', 'success');
      setTimeout(() => renderMainApp(window.appState), 1500);
    } catch (err) {
      showToast('❌ Import failed: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
};

window.resetAll = function() {
  if (!confirm('⚠️ This will delete ALL local progress data. Are you sure?')) return;
  localStorage.removeItem(STATE_KEY);
  localStorage.removeItem(CREDS_KEY);
  window.appState = null;
  showToast('🗑️ Data cleared. Reloading setup...', 'warning');
  setTimeout(() => { renderSetupScreen(); }, 1500);
};

// ─── SPARK IDEAS ──────────────────────────────────────────────

window.openSparkModal = function() {
  document.getElementById('sparkModal')?.classList.add('show');
  document.getElementById('sparkInput')?.focus();
};

window.closeSparkModal = function() {
  document.getElementById('sparkModal')?.classList.remove('show');
};

window.saveSparkIdea = function() {
  const input = document.getElementById('sparkInput');
  const idea  = input?.value?.trim();
  if (!idea) return;

  const state = window.appState;
  state.sparkIdeas = state.sparkIdeas || [];
  state.sparkIdeas.push({
    idea,
    day: state.currentDay,
    timestamp: new Date().toISOString()
  });
  saveState(state);

  input.value = '';
  closeSparkModal();
  showToast('⚡ Spark idea saved!', 'success');

  // Update stat
  const sparkStat = document.querySelector('.stat-value.amber');
  if (sparkStat) sparkStat.textContent = state.sparkIdeas.length;
};

// ─── BOOT SEQUENCE ────────────────────────────────────────────

let bootRetries = 0;
async function boot() {
  try {
    // Wait for ROADMAP to load (max 2.5 seconds)
    if (!window.ROADMAP && bootRetries < 25) {
      bootRetries++;
      setTimeout(boot, 100);
      return;
    }

    const state = loadState();
    const creds = loadCreds();

    // Security Gate: Operator Authentication Check
    if (!isAuthenticated()) {
      renderLoginScreen();
      return;
    }

    // Init Supabase if creds exist
    if (creds.supabaseUrl && creds.supabaseKey) {
      initSupabase(creds.supabaseUrl, creds.supabaseKey);
    }

    // Check if setup is needed
    if (!state.startDate) {
      renderSetupScreen();
      return;
    }

    // Update current day based on date
    state.currentDay = getDayFromStartDate(state.startDate);
    window.currentDayLog = {};
    window.appState = state;

    // Render immediately so user sees their dashboard with ZERO delay
    renderMainApp(window.appState);

    // Sync from cloud in background (never blocks UI)
    if (sbClient) {
      supabaseLoadState().then(cloudState => {
        if (cloudState && cloudState.totalHours >= (state.totalHours || 0)) {
          window.appState = { ...defaultState(), ...cloudState };
          saveState(window.appState);
          renderMainApp(window.appState);
        }
        updateSyncIndicator('online');
      }).catch(e => {
        console.warn('Cloud sync skipped:', e);
      });
    }
  } catch (err) {
    console.error('Boot error:', err);
    if (window.dismissLoader) window.dismissLoader();
    renderSetupScreen();
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

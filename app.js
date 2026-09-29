// ============================================================
//  AI ENGINEER COMMAND CENTER — CORE APPLICATION (app.js)
//  GitHub Pages Hosted | Supabase Cloud | GitHub Auto-Commit
// ============================================================

'use strict';

// ─── CONSTANTS & SECURITY ─────────────────────────────────────
const APP_VERSION = '1.0.0';
const STATE_KEY   = 'aie_cmd_state_v1';
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
    version: APP_VERSION,
    startDate: null,
    currentDay: 1,
    completedDays: {},   // { dayNum: { completedAt, hours, type:'full'|'maintenance' } }
    streak: 0,
    longestStreak: 0,
    totalHours: 0,
    skillXP: { engineering: 0, ml: 0, llm: 0, agents: 0, production: 0 },
    knowledgeNodes: [],  // for graph
    weakTopics: [],
    recallHistory: [],
    sparkIdeas: [],
    weeklyReviews: {},
    monthlyMilestones: {}
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
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
  ctx.fillStyle = 'rgba(0,255,150,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#00ff96';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#00ff96';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Dots
  angles.forEach((a, i) => {
    const x = cx + r * values[i] * Math.cos(a);
    const y = cy + r * values[i] * Math.sin(a);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff96';
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
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add('active');

  const btn = document.querySelector(`[data-page="${pageId}"]`);
  if (btn) btn.classList.add('active');

  // Page-specific init
  if (pageId === 'graph')    buildKnowledgeGraph(window.appState || defaultState());
  if (pageId === 'recall')   renderRecallPage();
  if (pageId === 'roadmap')  renderRoadmapPage();
  if (pageId === 'settings') renderSettingsPage();
}

// ─── LOGIN & SECURITY SCREEN ───────────────────────────────────

function renderLoginScreen() {
  if (window.dismissLoader) window.dismissLoader();
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div id="page-login" class="page active" style="display:flex; align-items:center; justify-content:center; min-height:100vh; padding:40px 24px;">
      <div class="login-wrapper fade-in" id="loginCard">
        <div class="setup-header" style="margin-bottom:28px">
          <div style="font-size:44px;margin-bottom:12px">🔒</div>
          <h1 style="font-size:24px;letter-spacing:1px">COMMAND ACCESS GATE</h1>
          <p style="color:var(--neon-green);font-family:var(--font-mono);font-size:12px;margin-top:6px;letter-spacing:0.5px">
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
                <input type="checkbox" id="loginRemember" checked style="accent-color:var(--neon-green)">
                <span>Remember this terminal</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-full btn-lg" id="loginSubmitBtn">
              ⚡ Authenticate &amp; Access
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

    // Nav listeners
    document.querySelectorAll('.nav-btn').forEach(btn => {
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

  return `
    <div id="topbar">
      <div class="topbar-logo">
        <div class="logo-icon">⚡</div>
        <span>AI CMD CENTER</span>
      </div>

      <nav class="topbar-nav">
        <button class="nav-btn active" data-page="dashboard">🏠 Dashboard</button>
        <button class="nav-btn" data-page="roadmap">🗺️ Roadmap</button>
        <button class="nav-btn" data-page="recall">🧠 Recall</button>
        <button class="nav-btn" data-page="graph">🌌 Knowledge</button>
        <button class="nav-btn" data-page="settings">⚙️ Settings</button>
      </nav>

      <div class="topbar-right">
        <div class="sync-indicator">
          <div class="sync-dot" id="syncDot"></div>
          <span id="syncText">Ready</span>
        </div>
        <div class="streak-display">
          <span class="streak-flame">${sLevel.emoji}</span>
          <span id="streakCount">${state.streak || 0}</span>
          <span style="font-size:11px;opacity:0.7">streak</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="logoutUser()" title="Lock Terminal" style="padding:6px 12px;font-size:12px;margin-left:6px">🔒 Lock</button>
      </div>
    </div>

    <!-- Pages -->
    <div id="page-dashboard" class="page active">
      <div class="container" id="dashboardContent"></div>
    </div>
    <div id="page-roadmap" class="page">
      <div class="container" id="roadmapContent"></div>
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
      <div class="greeting-day-label">Day ${currentDay} of 90 — ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
      <div class="title-badge">${title.icon} ${title.title}</div>
      <h2 class="greeting-title">
        ${isDayDone ? '✅ Day Completed!' : `Today's Mission: <span>${roadmapDay?.title || 'Study Day'}</span>`}
      </h2>
      <p class="greeting-mission">${morningMsg}</p>
      <div class="greeting-meta">
        <div class="meta-chip green"><span class="chip-icon">📅</span> Day ${currentDay}/90</div>
        <div class="meta-chip amber"><span class="chip-icon">⏱️</span> Target: ${state.targetHours || 10}h</div>
        <div class="meta-chip cyan"><span class="chip-icon">📈</span> ${progress}% Journey Complete</div>
        <div class="meta-chip"><span class="chip-icon">📚</span> ${completedCount} Days Done</div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row fade-in">
      <div class="glass-card stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-value">${state.streak || 0}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-value cyan">${totalHours}</div>
        <div class="stat-label">Total Hours</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-value">${completedCount}</div>
        <div class="stat-label">Days Complete</div>
      </div>
      <div class="glass-card stat-card">
        <div class="stat-icon">⚡</div>
        <div class="stat-value amber">${state.sparkIdeas?.length || 0}</div>
        <div class="stat-label">Spark Ideas</div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="glass-card fade-in" style="padding:20px;margin-bottom:24px">
      <div class="flex justify-between items-center" style="margin-bottom:8px">
        <span class="font-mono" style="font-size:12px;color:var(--text-muted)">90-DAY PROGRESS</span>
        <span class="font-mono" style="font-size:13px;color:var(--neon-green)">${progress}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
    </div>

    ${isDayDone ? renderDayComplete(currentDay, state) : renderDayBlocks(currentDay, roadmapDay, state)}
  `;

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
    <div class="glass-card fade-in" style="padding:32px;text-align:center;border-color:rgba(0,255,150,0.4)">
      <div style="font-size:48px;margin-bottom:16px">🎉</div>
      <h3 style="color:var(--neon-green);font-family:var(--font-mono);font-size:20px;margin-bottom:8px">
        Day ${currentDay} Complete!
      </h3>
      <p style="color:var(--text-secondary);margin-bottom:24px">${log.hours}h logged • GitHub committed • ${log.voiceUrl ? 'Voice synced' : 'Voice local'}</p>

      ${nextRD ? `
        <div style="padding:16px;background:rgba(0,229,255,0.06);border-radius:14px;border:1px solid rgba(0,229,255,0.2);text-align:left">
          <div class="section-label">Tomorrow's Mission</div>
          <div style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:4px">Day ${nextDay}: ${nextRD.title}</div>
          <div style="font-size:13px;color:var(--text-muted)">${(nextRD.topics || []).slice(0,3).join(' • ')}</div>
        </div>
      ` : '<p style="color:var(--neon-green);font-size:18px;font-weight:700">🏆 Journey Complete! You are an AI Engineer!</p>'}
    </div>
  `;
}

function renderDayBlocks(dayNum, roadmapDay, state) {
  const topics = (roadmapDay?.topics || []).map(t => `<li class="sq-item"><span class="sq-bullet">▸</span>${t}</li>`).join('');
  const studyQs = (roadmapDay?.studyQuestions || roadmapDay?.reviewQuestions || [])
    .map((q,i) => `<li class="sq-item"><span class="sq-bullet">${i+1}.</span>${q}</li>`).join('');

  return `
  <div class="grid-2 fade-in" style="margin-bottom:24px">
    <!-- LEFT: Day Blocks -->
    <div>
      <div class="section-label">⚡ Today's Mission Blocks</div>
      <div class="blocks-grid">

        <!-- Block 1: Deep Study -->
        <div class="block-card expanded" id="block-1">
          <div class="block-header">
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
            <button class="btn btn-secondary btn-sm" onclick="markBlock1Done()">✅ Mark Study Block Complete</button>
          </div>
        </div>

        <!-- Block 2: Build -->
        <div class="block-card" id="block-2">
          <div class="block-header">
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
          </div>
        </div>

        <!-- Block 3: Practice -->
        <div class="block-card" id="block-3">
          <div class="block-header">
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
          </div>
        </div>

        <!-- Block 4: Voice Explanation -->
        <div class="block-card" id="block-4">
          <div class="block-header">
            <div class="block-number block-num-4">B4</div>
            <div class="block-info">
              <div class="block-name">Voice Explanation</div>
              <div class="block-duration">1h • Feynman Technique</div>
            </div>
            <span class="block-status-icon" id="b4-icon">🔒</span>
          </div>
          <div class="block-content">
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;line-height:1.6">
              Close all notes. Explain today's concepts <strong style="color:var(--text-primary)">out loud</strong> as if teaching a junior dev. Record, listen back, and catch your gaps.
            </p>
            <div class="voice-recorder">
              <div class="recorder-controls">
                <button class="record-btn" id="recordBtn">
                  <span class="record-dot"></span> Start Recording
                </button>
                <span class="voice-timer" id="voiceTimer">00:00</span>
              </div>
              <div class="voice-status" id="voiceStatus">Click to start recording your voice explanation</div>
              <audio class="voice-playback" id="voicePlayback" controls style="display:none"></audio>
              <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
                <button class="btn btn-secondary btn-sm" id="voiceDownload" style="display:none">⬇️ Download</button>
                <button class="btn btn-secondary btn-sm" id="voiceUpload" style="display:none">☁️ Upload to Cloud</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Block 5: Reflection -->
        <div class="block-card" id="block-5">
          <div class="block-header">
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

      <!-- Lock Checklist -->
      <div class="lock-checklist" style="margin-top:20px">
        <div class="sq-title">🔒 Day Completion Lock</div>
        ${LOCK_ITEMS.map(item => `
          <div class="lock-item" id="lock-${item.id}">
            <span class="lock-icon">⬜</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>

      <button class="btn" id="completeDay" disabled>🔒 Complete All Blocks to Unlock</button>

      <!-- Maintenance Mode -->
      <div style="margin-top:12px;text-align:center">
        <button class="btn btn-secondary btn-sm" onclick="toggleMaintenanceMode()">🟡 Switch to Maintenance Mode</button>
        <div class="form-hint" style="text-align:center;margin-top:6px">
          University/work day? Min 45m study + recall. Honest 🟡 marker.
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

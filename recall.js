// ============================================================
//  AI ENGINEER COMMAND CENTER — RECALL ENGINE (recall.js)
//  Spaced Repetition: D+1, D+3, D+7, D+14, D+30, D+60, D+90
// ============================================================

window.RECALL_INTERVALS = [1, 3, 7, 14, 30, 60, 90];

// Question types for variety
window.RECALL_TYPES = ['Recall', 'Explain', 'Apply', 'Scenario', 'Debug', 'Design'];

/**
 * Get all topics due for recall on a given day
 * Returns array of { dayNum, topic, question, type, dueInterval }
 */
window.getRecallItems = function(currentDay, completedDays, weakTopics) {
  const items = [];
  const seen = new Set();

  RECALL_INTERVALS.forEach(interval => {
    const sourceDayNum = currentDay - interval;
    if (sourceDayNum < 1) return;

    const dayData = completedDays[sourceDayNum];
    if (!dayData) return;

    const roadmapDay = getRoadmapDay(sourceDayNum);
    if (!roadmapDay) return;

    const questions = roadmapDay.isReviewDay
      ? roadmapDay.reviewQuestions
      : roadmapDay.studyQuestions;

    if (!questions || questions.length === 0) return;

    // Pick 1-2 questions per interval based on type rotation
    const numQ = interval <= 3 ? 2 : 1;
    for (let i = 0; i < numQ && i < questions.length; i++) {
      const qKey = `${sourceDayNum}-${i}`;
      if (seen.has(qKey)) continue;
      seen.add(qKey);

      const recallType = RECALL_TYPES[(sourceDayNum + i) % RECALL_TYPES.length];
      items.push({
        id: qKey,
        dayNum: sourceDayNum,
        topic: roadmapDay.title,
        week: roadmapDay.week,
        question: questions[i],
        type: recallType,
        dueInterval: interval,
        priority: getRecallPriority(sourceDayNum, interval, weakTopics)
      });
    }
  });

  // Add weak topics with higher priority
  if (weakTopics && weakTopics.length > 0) {
    weakTopics.forEach(wt => {
      if (wt.dayNum >= currentDay) return;
      const roadmapDay = getRoadmapDay(wt.dayNum);
      if (!roadmapDay) return;
      const questions = roadmapDay.isReviewDay
        ? roadmapDay.reviewQuestions
        : roadmapDay.studyQuestions;
      if (!questions || questions.length === 0) return;

      const qKey = `weak-${wt.dayNum}-${wt.qIndex || 0}`;
      if (seen.has(qKey)) return;
      seen.add(qKey);

      items.push({
        id: qKey,
        dayNum: wt.dayNum,
        topic: roadmapDay.title,
        week: roadmapDay.week,
        question: questions[wt.qIndex || 0] || questions[0],
        type: 'Weak Topic Boost',
        dueInterval: 0,
        priority: 100, // highest priority
        isWeak: true
      });
    });
  }

  // Sort: weak topics first, then by interval (shorter = more urgent), then by day
  items.sort((a, b) => b.priority - a.priority || a.dueInterval - b.dueInterval);

  return items;
};

function getRecallPriority(dayNum, interval, weakTopics) {
  if (!weakTopics) return 10;
  const isWeak = weakTopics.some(wt => wt.dayNum === dayNum);
  if (isWeak) return 80;
  if (interval === 1) return 50;
  if (interval === 3) return 40;
  if (interval === 7) return 30;
  return 10;
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

/**
 * Process recall result — update weak topic queue
 * confidence: 1(fail), 2(hard), 3(ok), 4(easy)
 */
window.processRecallResult = function(recallItem, confidence, state) {
  if (!state.weakTopics) state.weakTopics = [];

  const wtIndex = state.weakTopics.findIndex(
    wt => wt.dayNum === recallItem.dayNum
  );

  if (confidence <= 2) {
    // Add or update weak topic
    if (wtIndex === -1) {
      state.weakTopics.push({
        dayNum: recallItem.dayNum,
        qIndex: 0,
        failCount: 1,
        lastFailed: state.currentDay
      });
    } else {
      state.weakTopics[wtIndex].failCount++;
      state.weakTopics[wtIndex].lastFailed = state.currentDay;
    }
  } else if (confidence === 4 && wtIndex !== -1) {
    // Remove from weak topics if mastered
    state.weakTopics.splice(wtIndex, 1);
  }

  // Log recall result
  if (!state.recallHistory) state.recallHistory = [];
  state.recallHistory.push({
    day: state.currentDay,
    itemId: recallItem.id,
    dayNum: recallItem.dayNum,
    topic: recallItem.topic,
    confidence,
    timestamp: new Date().toISOString()
  });

  return state;
};

/**
 * Calculate recall score for today (0-100)
 */
window.getTodayRecallScore = function(state) {
  const today = state.currentDay;
  const history = (state.recallHistory || []).filter(r => r.day === today);
  if (history.length === 0) return null;
  const avg = history.reduce((sum, r) => sum + r.confidence, 0) / history.length;
  return Math.round((avg / 4) * 100);
};

/**
 * Build the recall prompt text for each type
 */
window.buildRecallPrompt = function(item) {
  const prefixes = {
    'Recall':  '🧠 From memory, explain:',
    'Explain': '💬 In your own words (as if explaining to a junior dev):',
    'Apply':   '⚡ Give a real-world code example of:',
    'Scenario':'🎯 Scenario: Your production system is failing. How does this concept help? →',
    'Debug':   '🐛 A bug was caused by misunderstanding this. Describe how:',
    'Design':  '🏗️ Design a system component that uses:',
    'Weak Topic Boost': '🔥 You struggled with this before. Nail it this time:'
  };
  return prefixes[item.type] || '💭 Answer:';
};

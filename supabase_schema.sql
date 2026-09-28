-- ================================================================
-- AI ENGINEER COMMAND CENTER — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ================================================================

-- Daily logs table
CREATE TABLE IF NOT EXISTS daily_logs (
  id          BIGSERIAL PRIMARY KEY,
  day_num     INTEGER NOT NULL UNIQUE,
  data        JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- App state table (single row)
CREATE TABLE IF NOT EXISTS app_state (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  state       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Recall history
CREATE TABLE IF NOT EXISTS recall_history (
  id          BIGSERIAL PRIMARY KEY,
  day         INTEGER,
  item_id     TEXT,
  day_num     INTEGER,
  topic       TEXT,
  confidence  INTEGER CHECK (confidence BETWEEN 1 AND 4),
  logged_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_daily_logs_day_num ON daily_logs(day_num);
CREATE INDEX IF NOT EXISTS idx_recall_history_day ON recall_history(day);

-- Row Level Security (Public read/write since using anon key)
ALTER TABLE daily_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_state     ENABLE ROW LEVEL SECURITY;
ALTER TABLE recall_history ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for anon — single-user app)
CREATE POLICY "allow_all_daily_logs"     ON daily_logs     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_app_state"      ON app_state      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_recall_history" ON recall_history  FOR ALL USING (true) WITH CHECK (true);

-- Insert default state row
INSERT INTO app_state (id, state) VALUES (1, '{}') ON CONFLICT (id) DO NOTHING;

-- Storage bucket for voice notes
-- Run in Supabase Dashboard → Storage → New Bucket:
-- Name: voice-notes | Public: YES

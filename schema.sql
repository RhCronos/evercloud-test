-- EverCloud database (Cloudflare D1 = SQLite). Safe to run more than once.
-- Run:  npm run db:local   (your computer)   |   npm run db:remote   (the real, online database)

CREATE TABLE IF NOT EXISTS orders (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  ref         TEXT    NOT NULL UNIQUE,                      -- e.g. EC-7K3QX9M2 (made by the server, not the browser)
  created_at  INTEGER NOT NULL,                             -- unix seconds (UTC)
  status      TEXT    NOT NULL DEFAULT 'new'
              CHECK (status IN ('new','invoiced','paid','in_progress','done','cancelled')),
  package_id  TEXT    NOT NULL,
  package     TEXT    NOT NULL,                             -- readable label at the time of ordering
  addons      TEXT    NOT NULL DEFAULT '[]',                -- JSON list of add-on ids
  due_today   INTEGER NOT NULL CHECK (due_today >= 0),      -- calculated by the server from settings.js
  monthly     INTEGER NOT NULL CHECK (monthly  >= 0),
  pay_method  TEXT    NOT NULL DEFAULT '',
  name        TEXT    NOT NULL CHECK (length(name)  BETWEEN 1 AND 100),
  email       TEXT    NOT NULL CHECK (length(email) BETWEEN 3 AND 254),
  phone       TEXT    NOT NULL DEFAULT '' CHECK (length(phone)   <= 30),
  company     TEXT    NOT NULL DEFAULT '' CHECK (length(company) <= 150),
  notes       TEXT    NOT NULL DEFAULT '' CHECK (length(notes)   <= 2000),
  ip_hash     TEXT    NOT NULL                              -- one-way hash, used only to slow down abuse (never the raw IP)
);

-- these two indexes keep the abuse check and the "latest orders" view cheap
CREATE INDEX IF NOT EXISTS idx_orders_ip_time ON orders (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at DESC);

-- Projects managed from the backoffice (/admin). Applied with `npm run db:migrate`.
-- Safe to run again: every statement is idempotent.

CREATE TABLE IF NOT EXISTS projects (
  id                    uuid PRIMARY KEY,
  -- Display order on the site: lowest first.
  position              integer NOT NULL,
  title                 text NOT NULL,
  category              text NOT NULL CHECK (category IN ('photo', 'film')),
  -- 'client' = work for someone (client_* columns apply), 'personal' = the studio's own project.
  kind                  text NOT NULL DEFAULT 'client' CHECK (kind IN ('client', 'personal')),
  client_name           text,
  client_verified       boolean NOT NULL DEFAULT true,
  client_avatar_url     text,
  client_avatar_file_id text,
  cover_url             text NOT NULL,
  cover_file_id         text,
  cover_alt             text NOT NULL,
  duration              text,
  href                  text,
  published             boolean NOT NULL DEFAULT true,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_position_idx ON projects (position);

-- 2026-11: project type + optional client name (for databases created before).
ALTER TABLE projects ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'client';
DO $$ BEGIN
  ALTER TABLE projects ADD CONSTRAINT projects_kind_check CHECK (kind IN ('client', 'personal'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
ALTER TABLE projects ALTER COLUMN client_name DROP NOT NULL;

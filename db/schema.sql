-- Projects managed from the backoffice (/admin). Applied with `npm run db:migrate`.
-- Safe to run again: every statement is idempotent.

CREATE TABLE IF NOT EXISTS projects (
  id                    uuid PRIMARY KEY,
  -- Display order on the site: lowest first.
  position              integer NOT NULL,
  title                 text NOT NULL,
  category              text NOT NULL CHECK (category IN ('photo', 'film')),
  client_name           text NOT NULL,
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

-- QuickLegal Database Schema
-- À exécuter sur votre base Neon via le dashboard Vercel Storage ou Neon Console

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('statuts-sas', 'statuts-sci', 'cgv-ecommerce', 'nda')),
  title TEXT NOT NULL,
  form_data JSONB NOT NULL,
  pdf_url TEXT,
  paid BOOLEAN DEFAULT FALSE,
  price_cents INTEGER,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_paid ON documents(paid, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Migration : si la colonne is_admin n'existe pas (ancienne base), l'ajouter
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS price_cents INTEGER;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS stripe_session_id TEXT;

-- ==============================================================
-- COMPTE ADMIN : à exécuter une seule fois après la création des tables
-- Identifiant : hugo.jentile@gmail.com
-- Mot de passe : AdminQL99!
-- Le hash ci-dessous est un bcrypt de 'AdminQL99!' avec 10 rounds.
-- ==============================================================
INSERT INTO users (email, password_hash, name, is_admin)
VALUES (
  'hugo.jentile@gmail.com',
  '$2b$10$yrkq56H8u3PKgS1ykYQYR./l4/oEcLSYeBzH6kdNd4IC8Y5ACyuni',
  'Hugo Jentile',
  TRUE
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  is_admin = TRUE;

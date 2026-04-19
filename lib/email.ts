/**
 * Canonical email normalization to prevent homoglyph / IDN bypass.
 *
 * Two emails that look identical (e.g. `a@gmail.com` and `a@ɡmail.com`, where
 * the "g" is U+0261) should hash to the same canonical form so an attacker
 * can't register a homoglyph of an existing user.
 *
 * Steps:
 *  - lowercase + trim
 *  - split on "@"
 *  - NFKC-normalize each part to collapse Unicode compatibility variants
 *  - Punycode-encode the domain (host part) via URL parser
 *  - reject any email whose parts contain control chars or whitespace
 */
export function normalizeEmail(raw: string): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 254) return null;

  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at === trimmed.length - 1) return null;

  const local = trimmed.slice(0, at).normalize("NFKC");
  const hostRaw = trimmed.slice(at + 1).normalize("NFKC");

  if (/[\s\u0000-\u001F\u007F<>\\,]/.test(local)) return null;
  if (/[\s\u0000-\u001F\u007F<>\\,]/.test(hostRaw)) return null;

  // Punycode-encode the host via the URL parser.
  let host: string;
  try {
    host = new URL(`http://${hostRaw}`).hostname;
  } catch {
    return null;
  }

  if (!host || host.indexOf(".") === -1) return null;

  return `${local}@${host}`;
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

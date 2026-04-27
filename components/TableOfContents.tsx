export interface TocItem {
  /** Visible label of the anchor entry. */
  label: string;
  /** Hash target without the leading `#`. Must match an `id="..."` in the page. */
  anchor: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  /** Title above the list. Defaults to "Sur cette page". */
  title?: string;
}

/**
 * Compact in-page summary rendered near the top of long-form pages.
 *
 * Pure server component — no JavaScript shipped. Each item links to a
 * fragment identifier (`#section`) on the same URL, which gives users a
 * quick navigation for long landings and gives Google additional anchors
 * inside the page.
 *
 * The component does not auto-discover anchors; pages declare the list
 * explicitly to keep ordering and labels under editorial control.
 */
export function TableOfContents({
  items,
  title = "Sur cette page",
}: TableOfContentsProps) {
  if (!items || items.length === 0) return null;
  return (
    <aside
      aria-label={title}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-premium"
    >
      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-3">
        {title}
      </p>
      <ol className="space-y-1.5 text-sm">
        {items.map((item, idx) => (
          <li key={item.anchor} className="flex gap-2">
            <span
              aria-hidden="true"
              className="text-slate-300 tabular-nums w-5 flex-shrink-0"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${item.anchor}`}
              className="text-slate-700 hover:text-emerald-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

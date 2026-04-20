import type { ReactNode } from "react";

export interface ComparisonRow {
  /** Label of the row (first column). */
  label: string;
  /** Values, in the same order as `columns`. */
  values: ReactNode[];
}

interface ComparisonTableProps {
  /** Column headers — includes the first "criterion" column. */
  columns: string[];
  /** Rows of data. Each row's `values.length` must equal `columns.length - 1`. */
  rows: ComparisonRow[];
  /**
   * 1-indexed position of the column that should be visually highlighted
   * (the QuickLegal column in comparison tables). 0 = no highlight.
   */
  highlightColumn?: number;
  /**
   * Visual width hint on the first column. Default: 1/3 of the table.
   */
  firstColumnWidth?: "1/3" | "1/4" | "2/5";
}

const FIRST_COLUMN_CLASS: Record<NonNullable<ComparisonTableProps["firstColumnWidth"]>, string> = {
  "1/3": "w-1/3",
  "1/4": "w-1/4",
  "2/5": "w-2/5",
};

/**
 * Plain comparison table.
 *
 * Replaces the local `Row` helper functions previously duplicated across
 * the eight guide pages and the home page. The highlighted column is
 * rendered with a light-blue tint to emphasise the QuickLegal row in
 * two-or-three-way comparisons.
 */
export function ComparisonTable({
  columns,
  rows,
  highlightColumn = 0,
  firstColumnWidth = "1/3",
}: ComparisonTableProps) {
  const firstColClass = FIRST_COLUMN_CLASS[firstColumnWidth];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {columns.map((col, idx) => {
              const isFirst = idx === 0;
              const isHighlighted = idx === highlightColumn - 1 && highlightColumn > 0;
              return (
                <th
                  key={col}
                  className={[
                    "text-left py-3 px-2 border-b border-slate-200 align-bottom",
                    isFirst ? firstColClass : "",
                    isHighlighted
                      ? "font-semibold text-blue-500 bg-blue-50/40"
                      : "font-semibold text-slate-900",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="py-2.5 px-2 font-medium text-slate-900 border-b border-slate-100 align-top">
                {row.label}
              </td>
              {row.values.map((value, idx) => {
                const columnPosition = idx + 2; // +1 for first column, +1 for 1-indexed
                const isHighlighted = columnPosition === highlightColumn;
                return (
                  <td
                    key={idx}
                    className={[
                      "py-2.5 px-2 border-b border-slate-100 align-top",
                      isHighlighted ? "bg-blue-50/20 text-slate-900" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MathVisual({ visual }) {
  if (!visual) return null;
  if (visual.type === "table") return <DataTable visual={visual} />;
  if (visual.type === "bars") return <BarChart visual={visual} />;
  return null;
}

function DataTable({ visual }) {
  const headers = Array.isArray(visual.headers) ? visual.headers : [];
  const rows = Array.isArray(visual.rows) ? visual.rows : [];

  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-cream">
      {visual.caption && (
        <figcaption className="border-b border-ink/10 bg-white px-4 py-3 text-sm font-bold text-muted sm:px-5">
          {visual.caption}
        </figcaption>
      )}
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse text-left ${headers.length > 3 ? "min-w-[32rem]" : ""}`}>
          <thead className="bg-night text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={`${header}-${index}`}
                  scope="col"
                  className={`px-4 py-3 text-sm font-extrabold sm:px-5 ${index > 0 ? "text-right" : "text-left"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="bg-cream even:bg-white/65">
                {headers.map((_, columnIndex) => {
                  const value = row[columnIndex] ?? "—";
                  if (columnIndex === 0) {
                    return (
                      <th key={`${rowIndex}-${columnIndex}`} scope="row" className="px-4 py-3.5 text-sm font-bold text-ink sm:px-5 sm:text-base">
                        {value}
                      </th>
                    );
                  }
                  return (
                    <td key={`${rowIndex}-${columnIndex}`} className="px-4 py-3.5 text-right font-display text-lg font-bold tabular-nums text-ink sm:px-5">
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function BarChart({ visual }) {
  const values = Array.isArray(visual.values) ? visual.values.map(Number) : [];
  const labels = Array.isArray(visual.labels) ? visual.labels : [];
  const max = Math.max(...values, 1);
  const description = labels.map((label, index) => `${label}: ${values[index]}`).join(", ");

  return (
    <figure className="mt-6 rounded-2xl bg-cream p-5" aria-label={`Gráfica de barras. ${description}`}>
      {visual.caption && <figcaption className="mb-4 text-sm font-bold text-muted">{visual.caption}</figcaption>}
      <div className="flex h-44 items-end justify-center gap-5 border-b-2 border-l-2 border-ink/15 px-4 sm:gap-8 sm:px-6">
        {values.map((value, index) => (
          <div key={`${labels[index]}-${index}`} className="flex h-full w-14 flex-col justify-end text-center">
            <span className="mb-1 text-sm font-bold text-ink">{value}</span>
            <span className="rounded-t-xl bg-grape" style={{ height: `${Math.max(12, (value / max) * 112)}px` }} />
            <span className="mt-2 text-xs font-bold text-muted">{labels[index]}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

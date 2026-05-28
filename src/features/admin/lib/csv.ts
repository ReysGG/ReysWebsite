export function escapeCsvCell(value: unknown) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function rowsToCsv(rows: unknown[][]) {
  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

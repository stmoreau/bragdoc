export interface BragEntry {
  date: string;
  text: string;
  category?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthName(month: number): string {
  return MONTHS[month];
}

export function parseEntries(content: string): BragEntry[] {
  const entries: BragEntry[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    // Match lines like: - **2024-01-15** Some text
    // Or: - **2024-01-15** [category] Some text
    const match = line.match(
      /^- \*\*(\d{4}-\d{2}-\d{2})\*\*\s*(?:\[([^\]]+)\]\s*)?(.+)$/
    );
    if (match) {
      entries.push({
        date: match[1],
        category: match[2] || undefined,
        text: match[3].trim(),
      });
    }
  }

  return entries;
}

export function formatEntry(entry: BragEntry): string {
  const categoryPart = entry.category ? `[${entry.category}] ` : "";
  return `- **${entry.date}** ${categoryPart}${entry.text}`;
}

export function createInitialDoc(): string {
  return "# Brag Doc\n";
}

export function addEntryToDoc(
  content: string,
  entry: BragEntry
): string {
  const date = new Date(entry.date);
  const year = date.getFullYear();
  const month = getMonthName(date.getMonth());

  let doc = content || createInitialDoc();

  // Check if year section exists
  const yearHeader = `## ${year}`;
  if (!doc.includes(yearHeader)) {
    doc = doc.trimEnd() + `\n\n${yearHeader}\n`;
  }

  // Check if month section exists under the year
  const monthHeader = `### ${month}`;
  const yearIndex = doc.indexOf(yearHeader);
  const afterYear = doc.slice(yearIndex);

  // Find the next year section to know where current year ends
  const nextYearMatch = afterYear.slice(yearHeader.length).match(/\n## \d{4}/);
  const yearEndIndex = nextYearMatch
    ? yearIndex + yearHeader.length + nextYearMatch.index!
    : doc.length;

  const yearSection = doc.slice(yearIndex, yearEndIndex);

  if (!yearSection.includes(monthHeader)) {
    // Find where to insert the month (should be in order)
    const monthIndex = MONTHS.indexOf(month);
    let insertPos = yearIndex + yearHeader.length;

    // Find existing months in this year section
    for (let i = monthIndex - 1; i >= 0; i--) {
      const prevMonth = `### ${MONTHS[i]}`;
      const prevMonthIndex = yearSection.indexOf(prevMonth);
      if (prevMonthIndex !== -1) {
        // Find end of previous month section
        const afterPrevMonth = yearSection.slice(prevMonthIndex);
        const nextMonthMatch = afterPrevMonth.slice(prevMonth.length).match(/\n### /);
        insertPos = nextMonthMatch
          ? yearIndex + prevMonthIndex + prevMonth.length + nextMonthMatch.index!
          : yearEndIndex;
        break;
      }
    }

    const before = doc.slice(0, insertPos);
    const after = doc.slice(insertPos);
    doc = before.trimEnd() + `\n\n${monthHeader}\n` + after.trimStart();
  }

  // Now add the entry under the month
  const formattedEntry = formatEntry(entry);
  const monthPos = doc.indexOf(monthHeader, doc.indexOf(yearHeader));
  const afterMonth = doc.slice(monthPos + monthHeader.length);

  // Find next section (month or year)
  const nextSectionMatch = afterMonth.match(/\n###? /);
  const insertPosition = nextSectionMatch
    ? monthPos + monthHeader.length + nextSectionMatch.index!
    : doc.length;

  const beforeEntry = doc.slice(0, insertPosition);
  const afterEntry = doc.slice(insertPosition);

  return beforeEntry.trimEnd() + "\n" + formattedEntry + "\n" + afterEntry.trimStart();
}

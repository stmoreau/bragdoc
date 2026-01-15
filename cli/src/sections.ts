import type { BragDoc } from "./storage.js";

export type SectionKey = "delivered" | "collaboration" | "growth" | "impact" | "feedback" | "goals";

export interface Section {
  key: SectionKey;
  icon: string;
  title: string;
  aliases: string[];
}

export const SECTIONS: Section[] = [
  {
    key: "delivered",
    icon: "🚀",
    title: "What I Delivered",
    aliases: ["deliver", "shipped", "ship", "done", "d"],
  },
  {
    key: "collaboration",
    icon: "🤝",
    title: "How I Helped Others",
    aliases: ["collab", "helped", "help", "c"],
  },
  {
    key: "growth",
    icon: "🌱",
    title: "How I Grew",
    aliases: ["grew", "learned", "learn", "g"],
  },
  {
    key: "impact",
    icon: "📈",
    title: "Impact I Made",
    aliases: ["i"],
  },
  {
    key: "feedback",
    icon: "💬",
    title: "Recognition I Received",
    aliases: ["recognition", "kudos", "f"],
  },
  {
    key: "goals",
    icon: "🎯",
    title: "What's Next",
    aliases: ["next", "goal"],
  },
];

export function findSection(input: string): Section | undefined {
  const lower = input.toLowerCase();
  return SECTIONS.find(
    (s) => s.key === lower || s.aliases.includes(lower)
  );
}

export function getSectionKeys(): SectionKey[] {
  return SECTIONS.map((s) => s.key);
}

export function isSectionKey(key: string): key is SectionKey {
  return getSectionKeys().includes(key as SectionKey);
}

export function formatSectionList(): string {
  return SECTIONS.map((s) => `  ${s.icon} ${s.key}`).join("\n");
}

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

interface BragDoc {
  name: string;
  role: string;
  period: string;
  shipped: string[];
  collaboration: string[];
  growth: string[];
  impact: string[];
  feedback: string[];
  goals: string[];
  updatedAt: string;
}

const STORAGE_KEY = "bragdoc_data";

const DEFAULT_DOC: BragDoc = {
  name: "",
  role: "",
  period: new Date().getFullYear().toString(),
  shipped: [""],
  collaboration: [""],
  growth: [""],
  impact: [""],
  feedback: [""],
  goals: [""],
  updatedAt: new Date().toISOString(),
};

const SECTIONS = [
  {
    key: "shipped" as const,
    icon: "🚀",
    title: "What I Shipped",
    placeholder:
      "Launched the new checkout flow, reducing cart abandonment by 15%...",
    prompts: [
      "What features or projects did you deliver?",
      "What deadlines did you meet or beat?",
      "What technical debt did you pay down?",
    ],
  },
  {
    key: "collaboration" as const,
    icon: "🤝",
    title: "How I Helped Others",
    placeholder: "Mentored Sarah through her first production deployment...",
    prompts: [
      "Who did you mentor or unblock?",
      "What cross-team initiatives did you lead?",
      "How did you improve team processes?",
    ],
  },
  {
    key: "growth" as const,
    icon: "🌱",
    title: "How I Grew",
    placeholder: "Learned Kubernetes and migrated our services to k8s...",
    prompts: [
      "What new skills did you develop?",
      "What stretched you outside your comfort zone?",
      "What feedback did you act on?",
    ],
  },
  {
    key: "impact" as const,
    icon: "📈",
    title: "Impact I Made",
    placeholder:
      "Reduced API latency by 40%, improving user satisfaction scores...",
    prompts: [
      "What metrics improved because of you?",
      "What money did you save or help generate?",
      "What problems did you prevent?",
    ],
  },
  {
    key: "feedback" as const,
    icon: "💬",
    title: "Recognition I Received",
    placeholder:
      '"Thanks for jumping in on the outage - you really saved us" - CTO...',
    prompts: [
      "What positive feedback did you receive?",
      "What shoutouts or awards did you get?",
      "What did teammates thank you for?",
    ],
  },
  {
    key: "goals" as const,
    icon: "🎯",
    title: "What's Next",
    placeholder: "Lead the platform team's Q2 reliability initiative...",
    prompts: [
      "What do you want to accomplish next?",
      "What skills do you want to develop?",
      "What's your next big challenge?",
    ],
  },
];

function compressData(data: BragDoc): string {
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

function decompressData(compressed: string): BragDoc | null {
  try {
    const json = decodeURIComponent(atob(compressed));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function WritePage() {
  const [doc, setDoc] = useState<BragDoc>(DEFAULT_DOC);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSharedView, setIsSharedView] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const sharedData = decompressData(hash);
        if (sharedData) {
          setDoc(sharedData);
          setIsSharedView(true);
          setMounted(true);
          return;
        }
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setDoc(JSON.parse(stored));
        } catch {
          setDoc(DEFAULT_DOC);
        }
      }
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!mounted || isSharedView) return;

    // Defer setState to avoid linter warning about synchronous setState in effects
    const rafId = requestAnimationFrame(() => setIsSaving(true));
    const timeoutId = setTimeout(() => {
      const updatedDoc = { ...doc, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDoc));
      setIsSaving(false);
    }, 800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [doc, mounted, isSharedView]);

  const showToastMessage = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  const updateField = useCallback(
    (field: keyof BragDoc, value: string | string[]) => {
      setDoc((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateListItem = useCallback(
    (field: keyof BragDoc, index: number, value: string) => {
      setDoc((prev) => {
        const list = [...(prev[field] as string[])];
        list[index] = value;
        return { ...prev, [field]: list };
      });
    },
    []
  );

  const addListItem = useCallback((field: keyof BragDoc) => {
    setDoc((prev) => {
      const list = [...(prev[field] as string[]), ""];
      return { ...prev, [field]: list };
    });
  }, []);

  const removeListItem = useCallback((field: keyof BragDoc, index: number) => {
    setDoc((prev) => {
      const list = (prev[field] as string[]).filter((_, i) => i !== index);
      if (list.length === 0) list.push("");
      return { ...prev, [field]: list };
    });
  }, []);

  const shareDoc = useCallback(() => {
    const compressed = compressData(doc);
    const url = `${window.location.origin}/write#${compressed}`;

    navigator.clipboard.writeText(url).then(() => {
      showToastMessage("✨ Share link copied to clipboard!");
    });
  }, [doc, showToastMessage]);

  const exportMarkdown = useCallback(() => {
    const lines: string[] = [];
    lines.push(`# ${doc.name || "My"}'s Brag Doc`);
    lines.push("");
    if (doc.role) lines.push(`**${doc.role}**`);
    if (doc.period) lines.push(`*${doc.period}*`);
    lines.push("");

    SECTIONS.forEach(({ key, icon, title }) => {
      const items = doc[key].filter((item) => item.trim());
      if (items.length > 0) {
        lines.push(`## ${icon} ${title}`);
        lines.push("");
        items.forEach((item) => lines.push(`- ${item}`));
        lines.push("");
      }
    });

    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brag-doc-${doc.period || "export"}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToastMessage("📄 Exported to Markdown!");
  }, [doc, showToastMessage]);

  const importSharedDoc = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    setIsSharedView(false);
    window.history.replaceState(null, "", "/write");
    showToastMessage("✅ Imported to your brag doc!");
  }, [doc, showToastMessage]);

  const clearDoc = useCallback(() => {
    if (!confirm("Start fresh? This will clear everything.")) return;
    setDoc(DEFAULT_DOC);
    localStorage.removeItem(STORAGE_KEY);
    showToastMessage("🗑️ Started fresh");
  }, [showToastMessage]);

  const totalEntries = useMemo(() => {
    return SECTIONS.reduce(
      (sum, { key }) => sum + doc[key].filter((s) => s.trim()).length,
      0
    );
  }, [doc]);

  if (!mounted) {
    return (
      <div className="write-page">
        <div className="write-loading">
          <div className="loading-icon">📝</div>
          <p>Loading your brag doc...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="write-page">
      {/* Floating header */}
      <header className="write-header">
        <Link href="/" className="back-link">
          <span className="back-arrow">←</span>
          <span className="back-text">brag doc</span>
        </Link>

        <div className="header-right">
          {!isSharedView && (
            <span className={`save-indicator ${isSaving ? "saving" : "saved"}`}>
              {isSaving ? "Saving..." : "Saved"}
            </span>
          )}
          <div className="header-actions">
            {isSharedView ? (
              <button className="action-btn primary" onClick={importSharedDoc}>
                Import to my doc
              </button>
            ) : (
              <>
                <button className="action-btn" onClick={shareDoc}>
                  Share
                </button>
                <button className="action-btn" onClick={exportMarkdown}>
                  Export
                </button>
                <button className="action-btn subtle" onClick={clearDoc}>
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isSharedView && (
        <div className="shared-notice">
          <span className="shared-icon">👀</span>
          Viewing a shared brag doc. Import it to make your own copy.
        </div>
      )}

      {/* Main document */}
      <main className="write-main">
        <div className="document">
          {/* Document header */}
          <div className="doc-header">
            <input
              type="text"
              className="doc-name"
              placeholder="Your Name"
              value={doc.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={isSharedView}
            />
            <div className="doc-meta">
              <input
                type="text"
                className="doc-role"
                placeholder="Your Role"
                value={doc.role}
                onChange={(e) => updateField("role", e.target.value)}
                disabled={isSharedView}
              />
              <span className="meta-dot">·</span>
              <input
                type="text"
                className="doc-period"
                placeholder="2024"
                value={doc.period}
                onChange={(e) => updateField("period", e.target.value)}
                disabled={isSharedView}
              />
            </div>
            {totalEntries > 0 && (
              <p className="doc-count">
                {totalEntries} {totalEntries === 1 ? "win" : "wins"} documented
              </p>
            )}
          </div>

          {/* Sections */}
          <div className="doc-sections">
            {SECTIONS.map((section) => (
              <Section
                key={section.key}
                section={section}
                items={doc[section.key]}
                onUpdate={(index, value) =>
                  updateListItem(section.key, index, value)
                }
                onAdd={() => addListItem(section.key)}
                onRemove={(index) => removeListItem(section.key, index)}
                disabled={isSharedView}
              />
            ))}
          </div>

          {/* Document footer */}
          <div className="doc-footer">
            <p>You did great work. Don&apos;t let yourself forget it.</p>
          </div>
        </div>
      </main>

      {/* Toast */}
      <div className={`toast ${showToast ? "visible" : ""}`}>
        {toastMessage}
      </div>
    </div>
  );
}

interface SectionProps {
  section: (typeof SECTIONS)[number];
  items: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

function Section({
  section,
  items,
  onUpdate,
  onAdd,
  onRemove,
  disabled,
}: SectionProps) {
  const [showPrompts, setShowPrompts] = useState(false);
  const hasContent = items.some((item) => item.trim());

  return (
    <section className={`doc-section ${hasContent ? "has-content" : ""}`}>
      <div className="section-header">
        <span className="section-icon">{section.icon}</span>
        <h2 className="section-title">{section.title}</h2>
      </div>

      {!disabled && (
        <button
          className="prompts-btn"
          onClick={() => setShowPrompts(!showPrompts)}
        >
          {showPrompts ? "Hide prompts" : "Need inspiration?"}
        </button>
      )}

      {showPrompts && (
        <div className="prompts-box">
          {section.prompts.map((prompt, i) => (
            <p key={i} className="prompt">
              {prompt}
            </p>
          ))}
        </div>
      )}

      <div className="entries">
        {items.map((item, index) => (
          <div key={index} className="entry-row">
            <span className="entry-bullet" />
            <textarea
              className="entry-input"
              placeholder={section.placeholder}
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              disabled={disabled}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
            />
            {!disabled && items.length > 1 && (
              <button
                className="entry-remove"
                onClick={() => onRemove(index)}
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {!disabled && (
        <button className="add-entry" onClick={onAdd}>
          <span className="add-icon">+</span>
          Add another
        </button>
      )}
    </section>
  );
}

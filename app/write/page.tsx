"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface BragDoc {
  name: string;
  role: string;
  period: string;
  delivered: string[];
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
  delivered: [""],
  collaboration: [""],
  growth: [""],
  impact: [""],
  feedback: [""],
  goals: [""],
  updatedAt: new Date().toISOString(),
};

const SECTIONS = [
  {
    key: "delivered" as const,
    icon: "🚀",
    title: "What I Delivered",
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
        const sharedData = decompressData(hash) as BragDoc & { shipped?: string[] };
        if (sharedData) {
          // Migrate old "shipped" key to "delivered"
          if (sharedData.shipped && !sharedData.delivered) {
            sharedData.delivered = sharedData.shipped;
            delete sharedData.shipped;
          }
          setDoc({ ...DEFAULT_DOC, ...sharedData });
          setIsSharedView(true);
          setMounted(true);
          return;
        }
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Migrate old "shipped" key to "delivered"
          if (parsed.shipped && !parsed.delivered) {
            parsed.delivered = parsed.shipped;
            delete parsed.shipped;
          }
          setDoc({ ...DEFAULT_DOC, ...parsed });
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

  const addListItem = useCallback((field: keyof BragDoc, afterIndex?: number) => {
    setDoc((prev) => {
      const list = [...(prev[field] as string[])];
      if (afterIndex !== undefined) {
        list.splice(afterIndex + 1, 0, "");
      } else {
        list.push("");
      }
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

  const reorderListItem = useCallback(
    (field: keyof BragDoc, fromIndex: number, toIndex: number) => {
      setDoc((prev) => {
        const list = [...(prev[field] as string[])];
        const [removed] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, removed);
        return { ...prev, [field]: list };
      });
    },
    []
  );

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
                onAdd={(afterIndex) => addListItem(section.key, afterIndex)}
                onRemove={(index) => removeListItem(section.key, index)}
                onReorder={(fromIndex, toIndex) =>
                  reorderListItem(section.key, fromIndex, toIndex)
                }
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
  onAdd: (afterIndex?: number) => void;
  onRemove: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  disabled?: boolean;
}

function Section({
  section,
  items,
  onUpdate,
  onAdd,
  onRemove,
  onReorder,
  disabled,
}: SectionProps) {
  const [showPrompts, setShowPrompts] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
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
          <div
            key={index}
            className={`entry-row ${draggedIndex === index ? "dragging" : ""} ${dragOverIndex === index && draggedIndex !== index ? "drag-over" : ""}`}
            draggable={!disabled}
            onDragStart={(e) => {
              setDraggedIndex(index);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
            }}
            onDragEnd={() => {
              setDraggedIndex(null);
              setDragOverIndex(null);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (draggedIndex !== null && draggedIndex !== index) {
                setDragOverIndex(index);
              }
            }}
            onDragLeave={() => setDragOverIndex(null)}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedIndex !== null && draggedIndex !== index) {
                onReorder(draggedIndex, index);
              }
              setDraggedIndex(null);
              setDragOverIndex(null);
            }}
          >
            {!disabled && <span className="drag-handle" />}
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
              onKeyDown={(e) => {
                const textarea = e.currentTarget;
                const { selectionStart, value } = textarea;
                const entriesContainer = textarea.closest(".entries");
                const textareas = entriesContainer?.querySelectorAll("textarea");

                if (e.key === "Enter" && !e.shiftKey && !disabled) {
                  e.preventDefault();
                  onAdd(index);
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      const updated = entriesContainer?.querySelectorAll("textarea");
                      const newTextarea = updated?.[index + 1] as HTMLTextAreaElement | undefined;
                      newTextarea?.focus();
                    });
                  });
                }

                if (e.key === "Backspace" && !disabled && item === "" && index > 0) {
                  e.preventDefault();
                  onRemove(index);
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      const updated = entriesContainer?.querySelectorAll("textarea");
                      const prevTextarea = updated?.[index - 1] as HTMLTextAreaElement | undefined;
                      if (prevTextarea) {
                        prevTextarea.focus();
                        prevTextarea.selectionStart = prevTextarea.value.length;
                        prevTextarea.selectionEnd = prevTextarea.value.length;
                      }
                    });
                  });
                }

                // Arrow Up: move to previous item if at start or on first line
                if (e.key === "ArrowUp") {
                  const textBeforeCursor = value.substring(0, selectionStart);
                  const isOnFirstLine = !textBeforeCursor.includes("\n");
                  if (selectionStart === 0 || isOnFirstLine) {
                    // Find all textareas across all sections
                    const allTextareas = document.querySelectorAll(".doc-sections textarea");
                    const currentIndex = Array.from(allTextareas).indexOf(textarea);
                    if (currentIndex > 0) {
                      e.preventDefault();
                      const prevTextarea = allTextareas[currentIndex - 1] as HTMLTextAreaElement;
                      prevTextarea.focus();
                      prevTextarea.selectionStart = prevTextarea.value.length;
                      prevTextarea.selectionEnd = prevTextarea.value.length;
                    }
                  }
                }

                // Arrow Down: move to next item if at end or on last line
                if (e.key === "ArrowDown") {
                  const textAfterCursor = value.substring(selectionStart);
                  const isOnLastLine = !textAfterCursor.includes("\n");
                  if (selectionStart === value.length || isOnLastLine) {
                    // Find all textareas across all sections
                    const allTextareas = document.querySelectorAll(".doc-sections textarea");
                    const currentIndex = Array.from(allTextareas).indexOf(textarea);
                    if (currentIndex < allTextareas.length - 1) {
                      e.preventDefault();
                      const nextTextarea = allTextareas[currentIndex + 1] as HTMLTextAreaElement;
                      nextTextarea.focus();
                      nextTextarea.selectionStart = 0;
                      nextTextarea.selectionEnd = 0;
                    }
                  }
                }
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

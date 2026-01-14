"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `Found this and thought you might find it useful - it's about keeping a "brag doc" (a running list of your wins at work).

Figured we could all use a reminder to actually write down the good stuff we do before we forget them.

www.bragdoc.io`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button className="share-btn" onClick={handleShare}>
      {copied ? "Copied!" : "Share with your team"}
    </button>
  );
}

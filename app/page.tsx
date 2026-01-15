import Link from "next/link";
import ShareButton from "./components/ShareButton";

export default function Home() {
  return (
    <div className="container">
      <div className="page-header">
        <div className="page-header-left">
          <h1>brag doc</h1>
          <p className="tagline">please keep one at work</p>
        </div>
      </div>

      <h2>
        It&apos;s performance review season... <span className="emoji">😰</span>
      </h2>

      <div className="scenario">
        <div className="scenario-header bad">❌ You, without a brag doc</div>

        <div className="message">
          <div className="avatar">👤</div>
          <div className="msg-content">
            <div className="msg-meta">You • Monday 9:47 AM</div>
            <div className="msg-text">What did I even do this year?</div>
          </div>
        </div>

        <div className="message">
          <div className="avatar">👤</div>
          <div className="msg-content">
            <div className="msg-meta">You • Monday 10:15 AM</div>
            <div className="msg-text">*scrolls through 11 months of Slack*</div>
          </div>
        </div>

        <div className="message">
          <div className="avatar">👤</div>
          <div className="msg-content">
            <div className="msg-meta">You • Monday 2:30 PM</div>
            <div className="msg-text">
              I guess I&apos;ll write &quot;supported various initiatives&quot;
            </div>
          </div>
        </div>

        <div className="message">
          <div className="avatar">🧠</div>
          <div className="msg-content">
            <div className="msg-meta">Your brain • Monday 2:31 PM</div>
            <div className="msg-text thought">
              You literally led a migration that saved £200k but sure,
              &quot;supported various initiatives&quot; sounds great
            </div>
          </div>
        </div>
      </div>

      <p>
        <strong>You did great work this year.</strong> You just forgot 90% of
        it. That project you rescued in March? Gone. The junior dev you
        mentored? Poof. The production incident you fixed at 11pm? Your brain
        deleted it to make room for Netflix plot lines.
      </p>

      <p>
        Your manager doesn&apos;t remember either.{" "}
        <span className="highlight">
          They have 8 other people to think about.
        </span>
      </p>

      <h2>A brag doc fixes this</h2>

      <p>
        It&apos;s just a running document where you write down your wins as they
        happen. Takes 2 minutes. Do it every Friday. That&apos;s it.
      </p>

      <div className="scenario">
        <div className="scenario-header good">✅ You, with a brag doc</div>

        <div className="message">
          <div className="avatar">👤</div>
          <div className="msg-content">
            <div className="msg-meta">You • Every Friday, 5 mins</div>
            <div className="msg-text">
              • Led API migration, reduced latency 40%
              <br />
              • Mentored Jamie through first on-call rotation
              <br />• Fixed payment bug affecting 2k users
            </div>
          </div>
        </div>

        <div className="message">
          <div className="avatar">👤</div>
          <div className="msg-content">
            <div className="msg-meta">You • Review season</div>
            <div className="msg-text">
              *opens doc* oh right, I&apos;m actually quite good at my job
            </div>
          </div>
        </div>
      </div>

      <div className="note">
        <strong>Tip:</strong> Your brag doc isn&apos;t just for reviews. Use it
        for 1:1s with your manager, salary negotiations, job interviews, or when
        imposter syndrome hits at 3am.
      </div>

      <h2>Things you might have forgotten</h2>

      <ul className="checklist">
        <li>
          <span className="check">□</span> That bug you fixed that was blocking
          the whole team
        </li>
        <li>
          <span className="check">□</span> The meeting where you asked the
          question everyone was thinking
        </li>
        <li>
          <span className="check">□</span> Documentation you wrote that saved
          someone hours
        </li>
        <li>
          <span className="check">□</span> The time you stayed late to help a
          colleague
        </li>
        <li>
          <span className="check">□</span> Process improvements you suggested
          (that actually got implemented)
        </li>
        <li>
          <span className="check">□</span> Cross-team collaboration you
          initiated
        </li>
        <li>
          <span className="check">□</span> That customer issue you went above
          and beyond to resolve
        </li>
        <li>
          <span className="check">□</span> Skills you learned and applied
        </li>
      </ul>

      <p>
        If you checked even one of these,{" "}
        <span className="highlight">you have unbrag-documented wins.</span>
      </p>

      <div className="start-section">
        <Link href="/write" className="btn">
          Start your brag doc →
        </Link>
        <p className="start-note">
          <a
            href="https://docs.google.com/document/create"
            target="_blank"
            rel="noopener noreferrer"
          >
            Or use Google Docs
          </a>
        </p>
        <p className="start-note" style={{ marginTop: "0.5rem", marginBottom: 0 }}>
          Prefer the terminal?{" "}
          <code style={{ background: "var(--card-bg)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>
            npx bragdoc add delivered &quot;your win&quot;
          </code>
        </p>
        <p className="start-note" style={{ marginTop: "0.25rem" }}>
          <a
            href="https://www.npmjs.com/package/bragdoc"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on npm
          </a>
        </p>
      </div>

      <div className="footer">
        <p>
          Inspired by{" "}
          <a
            href="https://jvns.ca/blog/brag-documents/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Julia Evans&apos; brag documents
          </a>{" "}
          and the legendary{" "}
          <a
            href="https://nohello.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            nohello.net
          </a>
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/stefmoreau"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stephane
          </a>
          , author of{" "}
          <a
            href="https://blog4ems.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog for EMs
          </a>
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <a
            href="https://github.com/stmoreau/bragdoc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            style={{ opacity: 0.6, display: "flex" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="var(--text)"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <ShareButton />
        </div>
      </div>
    </div>
  );
}

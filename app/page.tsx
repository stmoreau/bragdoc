import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>brag doc</h1>
      <p className="tagline">please keep one at work</p>

      <h2>
        Imagine this: it&apos;s performance review season...{" "}
        <span className="emoji">😰</span>
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
        <p>Share this with someone who undersells themselves</p>
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
      </div>
    </div>
  );
}

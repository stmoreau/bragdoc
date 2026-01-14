import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "brag doc - please keep one at work";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 400,
            color: "#f5f5f0",
            marginBottom: 20,
            fontFamily: "serif",
            letterSpacing: "-0.02em",
          }}
        >
          brag doc
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: "#ffd43b",
            marginBottom: 60,
            fontFamily: "monospace",
          }}
        >
          please keep one at work
        </div>

        {/* Quote card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 16,
            padding: "40px 60px",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#888",
              fontFamily: "monospace",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            You did great work this year.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#f5f5f0",
              fontFamily: "monospace",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            You just forgot 90% of it.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

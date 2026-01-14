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
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontSize: 160,
            fontWeight: 400,
            color: "#f5f5f0",
            marginBottom: 24,
            fontFamily: "serif",
            letterSpacing: "-0.02em",
          }}
        >
          brag doc
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            color: "#ffd43b",
            fontFamily: "monospace",
          }}
        >
          please keep one at work
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

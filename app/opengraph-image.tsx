import { ImageResponse } from "next/og";

import { getDictionary } from "@/content";

export const alt = "Studio Cabines, photographe et vidéaste à Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { site, hero } = getDictionary();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 0%, #b3180f 0%, #3a0805 35%, #0a0a0a 65%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#e8251c",
              fontSize: 22,
            }}
          >
            {site.initials}
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -3 }}>
          {hero.titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a3a3" }}>
          {site.jobTitle}, {site.location.city}
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #16110d 0%, #2a1610 60%, #7a2414 100%)",
          color: "#f6ede0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: 2 }}>
          {site.brand.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, marginTop: 24, maxWidth: 900, lineHeight: 1.1 }}>
          Ремонт на покриви в цяла България
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 30, color: "#d8c7b3" }}>
          Безплатен оглед · Без авансово плащане · Гаранция до 10 години
        </div>
      </div>
    ),
    { ...size },
  );
}

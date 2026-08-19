import { ImageResponse } from "next/og"

export const alt = "Andoni Vianez Ulloa — Senior Full Stack Engineer & Local AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 64,
        background: "#0E1B2C",
        color: "#E8EEF5",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: 22, color: "#FFB224", letterSpacing: 4, marginBottom: 16 }}>
        T-SHAPED DEVELOPER
      </div>
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
        Andoni Vianez Ulloa
      </div>
      <div style={{ fontSize: 28, color: "#8CA3BF", marginBottom: 32 }}>
        Senior Full Stack Engineer · React Native · Local AI
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 20,
          color: "#FFB224",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#FFB224",
          }}
        />
        IA 100% local en el navegador — pregúntame
      </div>
    </div>,
    { ...size },
  )
}

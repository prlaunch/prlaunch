import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#3B82F6",
        fontWeight: 700,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      pr
    </div>,
    {
      ...size,
    },
  )
}

"use client";

import Image from "next/image";

export default function Glass3DCard() {
  // Static styles (no scroll transforms, no RAF)
  const innerStyle: React.CSSProperties = {
    transform: "none",
    transformStyle: "preserve-3d",
    willChange: "auto",
    transition: "none",
    backfaceVisibility: "hidden",
  };

  const glareStyle: React.CSSProperties = {
    pointerEvents: "none",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 60%)",
    mixBlendMode: "screen",
    filter: "blur(4px)",
    opacity: 0.6,
  };

  return (
    <div
      className="rounded-[24px] w-full max-w-[520px] p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient-shift transition-transform duration-300 ease-out hover:scale-[1.03]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Inner glass */}
      <div
        className="relative rounded-[22px] w-full border border-white/20 backdrop-blur-2xl bg-white/70 shadow-[inset_0_0_24px_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.18)]"
        style={innerStyle}
      >
        {/* static sheen */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px]" style={glareStyle} />

        <div className="px-6 pt-6">
          <Image
            src="/google-icon-logo.svg"
            alt="google"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Top search pill */}
        <div className="px-6 pt-6">
          <div className="relative flex items-center rounded-full border border-white/30 bg-white/90 px-5 py-2 shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-slate-800 placeholder-slate-500 flex-1"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Left: Profile */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]">
            <Image src="/elon-musk.jpg" alt="portrait" fill className="object-cover opacity-95" />
            <div className="relative h-full z-10 p-4 md:p-5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] bg-gradient-to-t from-black/80 via-black/70 to-transparent">
              <div className="flex items-center gap-2 text-xl font-semibold">Elon Musk</div>
              <p className="mt-1 text-[12px] leading-snug opacity-95">
                Founder, CEO, and chief engineer of SpaceX
              </p>
              <ul className="mt-3 space-y-1 text-[12px]">
                <li>Time Person to the year 2021</li>
                <li>SpacEx launches StarShip</li>
                <li>Tesla unveils Cybertruck</li>
              </ul>
            </div>
          </div>

          {/* Right: Press coverage grid */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-black mb-2">Press Coverage</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon1.jpg" alt="img" fill className="object-cover h-15 w-15" />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon2.jpg" alt="img" fill className="object-cover h-15 w-15" />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon3.jpg" alt="img" fill className="object-cover h-15 w-15" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-black mb-2">Interviews</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon4.jpg" alt="thumb" fill className="object-cover h-15 w-15" />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon5.jpg" alt="thumb" fill className="object-cover h-15 w-15" />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                  <Image src="/elon6.jpg" alt="thumb" fill className="object-cover h-15 w-15" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Glass3DCard() {
    // Smooth, scroll-linked transform values
    const [offset, setOffset] = useState(0); // -1..1 smoothed (scroll)
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | undefined>(undefined);
    const smoothRef = useRef<number | undefined>(undefined);
    const targetRef = useRef(0);

    // Compute raw target based on card center distance from viewport center
    const updateTarget = useCallback(() => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const delta = cardCenter - viewportCenter; // px
        // Normalize to [-1, 1] range using half viewport as reference
        const norm = Math.max(-1, Math.min(1, delta / (viewportHeight / 2)));
        // Invert so scrolling down moves card slightly up (parallax)
        targetRef.current = -norm;
    }, []);

    const onScroll = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateTarget);
    }, [updateTarget]);

    // No pointer-based tilt (3D effect removed)

    // Inertial smoothing loop
    useEffect(() => {
        const tick = () => {
            setOffset(prev => {
                const alpha = 0.18;
                const next = prev + (targetRef.current - prev) * alpha;
                return Math.abs(next - targetRef.current) < 0.0005 ? targetRef.current : next;
            });
            smoothRef.current = requestAnimationFrame(tick);
        };
        smoothRef.current = requestAnimationFrame(tick);
        return () => {
            if (smoothRef.current) cancelAnimationFrame(smoothRef.current);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        // Initial compute
        updateTarget();
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [onScroll, updateTarget]);

    // Map offset to simple 2D transform (3D removed)
    const translateY = offset * 12; // subtle parallax only
    const innerStyle: React.CSSProperties = {
        transform: `translateY(${translateY}px)`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 140ms ease-out",
        backfaceVisibility: "hidden",
    };
    // Remove dynamic glare (keep subtle static sheen)
    const glareStyle: React.CSSProperties = {
        pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 60%)",
        mixBlendMode: "screen",
        filter: "blur(4px)",
        opacity: 0.6,
    };

    return (
        <div
            ref={wrapperRef}
            className="rounded-[24px] w-full max-w-[520px] p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient-shift transition-all duration-700 ease-out hover:scale-[1.03]"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Inner glass */}
            <div className="relative rounded-[22px] w-full border border-white/20 backdrop-blur-2xl bg-white/70 shadow-[inset_0_0_24px_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.18)]" style={innerStyle}>
                {/* moving glare layer */}
                <div className="pointer-events-none absolute inset-0 rounded-[22px]" style={glareStyle} />
                {/* Top search pill */}
                <div className="px-6 pt-6">
                    <div className="relative flex items-center rounded-full border border-white/30 bg-white/90 px-5 py-2 shadow-[inset_0_0_10px_rgba(255,255,255,0.6)]">
                        <input type="text" placeholder="Search" className="bg-transparent outline-none text-slate-800 placeholder-slate-500 flex-1" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Left: Profile with big portrait and info list */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]">
                        <Image src="/black-man-entrepreneur-confident.jpg" alt="portrait" fill className="object-cover opacity-95" />
                        <div className="relative h-full z-10 p-4 md:p-5 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] bg-gradient-to-t from-black/80 via-black/70 to-transparent">
                            <div className="flex items-center gap-2 text-xl font-semibold">
                                Name
                            </div>
                            <p className="mt-1 text-[12px] leading-snug opacity-95">
                                Founder
                            </p>
                            <ul className="mt-3 space-y-1 text-[12px]">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Press coverage grid */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="text-xs uppercase tracking-wide text-black mb-2">Press Coverage</div>
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                                        <Image src="/asian-man-entrepreneur-business.jpg" alt="thumb" fill className="object-cover h-15 w-15" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-wide text-black mb-2">Interviews</div>
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden h-15 w-15 border border-white/30 bg-white/60 shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
                                        <Image src="/indian-woman-entrepreneur-success.jpg" alt="thumb" fill className="object-cover h-15 w-15" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom social bar */}
                <div className="px-6 pb-6">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/30 px-4 py-3 shadow-[inset_0_0_12px_rgba(255,255,255,0.55)]">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-sky-500">
                            <path d="M23 3c-.8.5-1.7.8-2.6 1 1-1 1.7-1.5 2-3-1 .6-2 .9-3 1.1A4.6 4.6 0 0 0 16.1 1c-2.6 0-4.7 2.2-4.7 4.8 0 .4 0 .8.1 1.1C7.5 6.7 4 4.9 1.7 2 .3 4.3 1 7.3 3.4 8.8c-.7 0-1.4-.2-2-.5 0 2.3 1.6 4.3 3.7 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.5 3.5-1.7 1.4-3.9 2.2-6.3 2.2H0c2.2 1.4 4.8 2.1 7.5 2.1 9 0 13.9-7.7 13.9-14.3v-.6C22 4.7 22.6 3.9 23 3z" />
                        </svg>
                        <span className="text-sm text-slate-700">Twitter: @Twitter</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

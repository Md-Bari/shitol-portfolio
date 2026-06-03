import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Track latest hover state in ref to avoid re-binding event listeners
    const isHoveredRef = useRef(false);

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;

        const onMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            setIsVisible(true);

            const hovered = isHoveredRef.current;

            // The SVG is rendered at 72px width/height with a 120px viewbox.
            // Scale factor is 72 / 120 = 0.6.
            // Arrow tip in SVG is at (15, 10) -> scaled: (9, 6)
            // Hand tip in SVG is at (40, 15.5) -> scaled: (24, 9.3)
            const scaleFactor = 0.6;
            const cursorOffsetX = hovered ? (-40 * scaleFactor) : (-15 * scaleFactor);
            const cursorOffsetY = hovered ? (-15.5 * scaleFactor) : (-10 * scaleFactor);

            // Cursor follows mouse instantly and smoothly
            gsap.to(cursor, {
                x: mouseX + cursorOffsetX,
                y: mouseY + cursorOffsetY,
                duration: 0.05,
                ease: "power2.out",
            });
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        const onHoverIn = () => {
            setIsHovered(true);
            isHoveredRef.current = true;
        };
        const onHoverOut = () => {
            setIsHovered(false);
            isHoveredRef.current = false;
        };

        // Click scale animations
        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.85, duration: 0.1 });
        };
        const onMouseUp = () => {
            gsap.to(cursor, { scale: 1, duration: 0.25, ease: "back.out(1.5)" });
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Add hover listeners to interactive elements
        const interactiveSelector =
            "a, button, [role='button'], input, textarea, select, label, .group, .cursor-pointer";

        const addHoverListeners = () => {
            const els = document.querySelectorAll(interactiveSelector);
            els.forEach((el) => {
                el.addEventListener("mouseenter", onHoverIn);
                el.addEventListener("mouseleave", onHoverOut);
            });
        };

        addHoverListeners();

        // Watch for DOM changes to attach listeners to dynamic elements
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            observer.disconnect();

            const els = document.querySelectorAll(interactiveSelector);
            els.forEach((el) => {
                el.removeEventListener("mouseenter", onHoverIn);
                el.removeEventListener("mouseleave", onHoverOut);
            });
        };
    }, []);

    // Handle transition scale/rotation instantly when hover state changes
    useEffect(() => {
        const cursor = cursorRef.current;
        if (cursor) {
            gsap.fromTo(cursor, 
                { scale: 0.85, rotate: isHovered ? -8 : 8 },
                { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(1.5)" }
            );
        }
    }, [isHovered]);

    return (
        <div
            ref={cursorRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "72px",
                height: "72px",
                pointerEvents: "none",
                zIndex: 100000,
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.2s ease",
                willChange: "transform",
            }}
        >
            {isHovered ? (
                <svg width="72" height="72" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="cursorBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0b081e" />
                            <stop offset="100%" stopColor="#05030f" />
                        </linearGradient>

                        <linearGradient id="auroraPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="auroraCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
                        </linearGradient>

                        <linearGradient id="auroraGreen" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
                        </linearGradient>

                        <linearGradient id="auroraBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d9f99d" />
                            <stop offset="30%" stopColor="#22d3ee" />
                            <stop offset="70%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#4c1d95" />
                        </linearGradient>

                        <filter id="waveBlur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="8" />
                        </filter>

                        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="0.8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* 3D Back Shadow */}
                    <path
                        d="M 32,60 C 32,60 30,22 32,18 C 34,13 46,13 48,18 L 52,48 C 52,48 53,34 60,34 C 67,34 67,45 67,45 C 67,45 68,36 75,36 C 82,36 82,45 82,45 C 82,45 83,38 90,38 C 97,38 97,48 97,55 C 97,68 90,78 82,82 C 74,86 68,98 56,98 C 44,98 38,90 28,90 C 18,90 14,84 14,84 C 6,76 0,68 4,58 C 8,48 18,56 26,58 C 28,58.5 32,60 32,60 Z"
                        fill="#13092b"
                        stroke="#13092b"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        transform="translate(2, 4)"
                    />

                    {/* Main Face with Clip Path */}
                    <g>
                        <clipPath id="handClip">
                            <path d="M 32,60 C 32,60 30,22 32,18 C 34,13 46,13 48,18 L 52,48 C 52,48 53,34 60,34 C 67,34 67,45 67,45 C 67,45 68,36 75,36 C 82,36 82,45 82,45 C 82,45 83,38 90,38 C 97,38 97,48 97,55 C 97,68 90,78 82,82 C 74,86 68,98 56,98 C 44,98 38,90 28,90 C 18,90 14,84 14,84 C 6,76 0,68 4,58 C 8,48 18,56 26,58 C 28,58.5 32,60 32,60 Z" />
                        </clipPath>
                        
                        <g clipPath="url(#handClip)">
                            {/* Deep space bg */}
                            <rect width="120" height="120" fill="url(#cursorBgGrad)" />

                            {/* Aurora Waves */}
                            <path d="M -20,10 C 20,30 40,-10 80,40 C 100,60 120,50 140,80 L 140,140 L -20,140 Z" fill="url(#auroraPurple)" filter="url(#waveBlur)" />
                            <path d="M -20,40 C 10,70 50,30 90,80 C 110,100 120,90 140,110 L 140,140 L -20,140 Z" fill="url(#auroraCyan)" filter="url(#waveBlur)" />
                            <path d="M -20,70 C 30,100 60,60 100,110 C 115,120 120,115 140,130 L 140,140 L -20,140 Z" fill="url(#auroraGreen)" filter="url(#waveBlur)" />

                            {/* Stars/Nebula */}
                            <g filter="url(#starGlow)">
                                <circle cx="48" cy="25" r="1.2" fill="#ffffff" opacity="0.9" />
                                <circle cx="60" cy="40" r="0.8" fill="#ffffff" opacity="0.8" />
                                <circle cx="55" cy="65" r="1.5" fill="#a5f3fc" opacity="0.95" />
                                <circle cx="72" cy="48" r="0.6" fill="#ffffff" opacity="0.7" />
                                <circle cx="78" cy="70" r="1.3" fill="#ffffff" opacity="0.9" />
                                <circle cx="90" cy="55" r="1.0" fill="#e0f2fe" opacity="0.85" />
                                <circle cx="35" cy="60" r="1.6" fill="#ffffff" opacity="0.95" />
                                <circle cx="25" cy="70" r="0.8" fill="#ffffff" opacity="0.85" />
                                <circle cx="45" cy="80" r="1.1" fill="#fef08a" opacity="0.9" />
                                <circle cx="68" cy="80" r="1.4" fill="#ffffff" opacity="0.9" />
                                <circle cx="82" cy="82" r="1.0" fill="#ffffff" opacity="0.8" />
                            </g>
                        </g>
                    </g>

                    {/* Outline Border */}
                    <path
                        d="M 32,60 C 32,60 30,22 32,18 C 34,13 46,13 48,18 L 52,48 C 52,48 53,34 60,34 C 67,34 67,45 67,45 C 67,45 68,36 75,36 C 82,36 82,45 82,45 C 82,45 83,38 90,38 C 97,38 97,48 97,55 C 97,68 90,78 82,82 C 74,86 68,98 56,98 C 44,98 38,90 28,90 C 18,90 14,84 14,84 C 6,76 0,68 4,58 C 8,48 18,56 26,58 C 28,58.5 32,60 32,60 Z"
                        fill="none"
                        stroke="url(#auroraBorderGradient)"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="72" height="72" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="cursorBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0b081e" />
                            <stop offset="100%" stopColor="#05030f" />
                        </linearGradient>

                        <linearGradient id="auroraPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="auroraCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
                        </linearGradient>

                        <linearGradient id="auroraGreen" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
                        </linearGradient>

                        <linearGradient id="auroraBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d9f99d" />
                            <stop offset="30%" stopColor="#22d3ee" />
                            <stop offset="70%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#4c1d95" />
                        </linearGradient>

                        <filter id="waveBlur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="8" />
                        </filter>

                        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="0.8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* 3D Back Shadow */}
                    <path
                        d="M 15,10 C 15,10 13,50 20,95 C 22,100 28,100 32,95 C 38,85 50,78 68,76 C 86,74 95,78 98,75 C 101,72 101,66 96,62 L 17,11 Z"
                        fill="#13092b"
                        stroke="#13092b"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        transform="translate(2, 4)"
                    />

                    {/* Main Face with Clip Path */}
                    <g>
                        <clipPath id="arrowClip">
                            <path d="M 15,10 C 15,10 13,50 20,95 C 22,100 28,100 32,95 C 38,85 50,78 68,76 C 86,74 95,78 98,75 C 101,72 101,66 96,62 L 17,11 Z" />
                        </clipPath>
                        
                        <g clipPath="url(#arrowClip)">
                            {/* Deep space bg */}
                            <rect width="120" height="120" fill="url(#cursorBgGrad)" />

                            {/* Aurora Waves */}
                            <path d="M -20,10 C 20,30 40,-10 80,40 C 100,60 120,50 140,80 L 140,140 L -20,140 Z" fill="url(#auroraPurple)" filter="url(#waveBlur)" />
                            <path d="M -20,40 C 10,70 50,30 90,80 C 110,100 120,90 140,110 L 140,140 L -20,140 Z" fill="url(#auroraCyan)" filter="url(#waveBlur)" />
                            <path d="M -20,70 C 30,100 60,60 100,110 C 115,120 120,115 140,130 L 140,140 L -20,140 Z" fill="url(#auroraGreen)" filter="url(#waveBlur)" />

                            {/* Stars/Nebula */}
                            <g filter="url(#starGlow)">
                                <circle cx="25" cy="35" r="1.2" fill="#ffffff" opacity="0.9" />
                                <circle cx="35" cy="20" r="0.8" fill="#ffffff" opacity="0.8" />
                                <circle cx="30" cy="55" r="1.5" fill="#a5f3fc" opacity="0.95" />
                                <circle cx="45" cy="40" r="0.6" fill="#ffffff" opacity="0.7" />
                                <circle cx="50" cy="65" r="1.3" fill="#ffffff" opacity="0.9" />
                                <circle cx="65" cy="50" r="1.0" fill="#e0f2fe" opacity="0.85" />
                                <circle cx="70" cy="70" r="1.6" fill="#ffffff" opacity="0.95" />
                                <circle cx="80" cy="60" r="0.8" fill="#ffffff" opacity="0.85" />
                                <circle cx="20" cy="75" r="1.1" fill="#fef08a" opacity="0.9" />
                                <circle cx="55" cy="30" r="1.4" fill="#ffffff" opacity="0.9" />
                                <circle cx="85" cy="72" r="1.0" fill="#ffffff" opacity="0.8" />
                            </g>
                        </g>
                    </g>

                    {/* Outline Border */}
                    <path
                        d="M 15,10 C 15,10 13,50 20,95 C 22,100 28,100 32,95 C 38,85 50,78 68,76 C 86,74 95,78 98,75 C 101,72 101,66 96,62 L 17,11 Z"
                        fill="none"
                        stroke="url(#auroraBorderGradient)"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
    );
};

export default CustomCursor;

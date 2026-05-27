import React from "react";

interface LogoProps {
  className?: string;
  showFull?: boolean;
  alt?: string;
}

/**
 * SELF Wellness official logo.
 * 
 * TO USE YOUR REAL LOGO FILE:
 * 1. Replace the file at: public/images/self-logo.png
 * 2. That's it — the site uses that file everywhere.
 * 
 * This component also includes an accurate SVG fallback
 * that recreates the logo from scratch in case the image is missing.
 */
export const SelfLogo: React.FC<LogoProps> = ({
  className = "",
  showFull = true,
  alt = "SELF Wellness",
}) => {
  return (
    <img
      src="/images/self-logo.png"
      alt={alt}
      className={className}
      loading={showFull ? "eager" : "lazy"}
      draggable={false}
      onError={(e) => {
        // If real image is missing, show SVG fallback
        const img = e.currentTarget;
        img.style.display = "none";
        const parent = img.parentElement;
        if (parent && !parent.querySelector(".self-logo-fallback")) {
          const fallback = document.createElement("div");
          fallback.className = "self-logo-fallback " + className;
          fallback.innerHTML = SelfLogoSVG(showFull);
          parent.appendChild(fallback);
        }
      }}
    />
  );
};

/** Pure SVG recreation of the official SELF Wellness circular logo */
const SelfLogoSVG = (showFull: boolean): string => {
  if (!showFull) {
    return `
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="95" fill="none" stroke="#ff7a00" stroke-width="3"/>
        <text x="100" y="115" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="38" fill="#ff7a00">S</text>
        <text x="100" y="115" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="38" fill="#ff7a00" dx="45">LF</text>
        <path d="M95 75 Q95 60 110 60 Q120 60 120 75 L120 115 Q120 130 105 130 L90 130 Q80 130 80 120 L80 105 Q80 95 90 95 L100 95 L100 75 Z" fill="#ff7a00"/>
      </svg>`;
  }

  return `
    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <!-- Open orange ring (broken at top) -->
      <path d="M 400 80 A 320 320 0 1 1 400 720" fill="none" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"/>
      <path d="M 400 80 A 320 320 0 0 1 720 400" fill="none" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"/>
      <path d="M 400 80 A 320 320 0 0 0 80 400" fill="none" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Top arc text: T H A N K Y O U -->
      <defs>
        <path id="topArcPath" d="M 200 400 A 250 250 0 0 1 600 400" fill="none"/>
        <path id="bottomArcPath" d="M 200 400 A 250 250 0 0 0 600 400" fill="none"/>
      </defs>
      <text fill="#0d4b3e" font-size="28" font-weight="700" letter-spacing="18" font-family="Inter, sans-serif">
        <textPath href="#topArcPath" startOffset="50%" text-anchor="middle">
          T H A N K &nbsp; Y O U
        </textPath>
      </text>
      
      <!-- Orange dots flanking THANK YOU -->
      <circle cx="215" cy="180" r="6" fill="#ff7a00"/>
      <circle cx="585" cy="180" r="6" fill="#ff7a00"/>
      
      <!-- Center wordmark: S + thumbs-up + LF -->
      <g font-family="Inter, Arial Black, sans-serif" font-weight="900" fill="#ff7a00">
        <!-- Letter S (rounded style) -->
        <text x="200" y="420" font-size="200">S</text>
        <!-- Letter L -->
        <text x="450" y="420" font-size="200">L</text>
        <!-- Letter F -->
        <text x="570" y="420" font-size="200">F</text>
      </g>
      
      <!-- Thumbs-up hand replacing the E -->
      <g transform="translate(320, 255) scale(1.15)">
        <path d="M45 5 C45 5 65 35 65 65 C65 85 55 95 40 95 L15 95 L15 145 L45 145 C70 145 85 130 85 105 L85 80 L95 45 C100 30 90 10 75 10 C60 10 55 20 50 25 C45 15 35 15 30 25 C20 30 20 45 30 55 C15 60 10 75 10 90 L10 130 C10 140 20 150 30 150 L75 150 C85 150 95 140 95 130 L95 100 C95 95 90 95 90 100 L90 140 L15 140 L15 95 C15 85 25 75 35 75 C40 75 45 80 45 85 L45 130 L60 130 C70 130 75 120 75 110 C75 90 60 60 55 50 C55 45 40 40 45 5 Z" fill="#ff7a00"/>
      </g>
      
      <!-- Subtitle: Strength | Energy | Lifestyle | Fullfilment -->
      <text x="400" y="505" text-anchor="middle" fill="#0d4b3e" font-size="24" font-weight="500" font-family="Inter, sans-serif" letter-spacing="1">
        Strength  <tspan fill="#ff7a00">|</tspan>  Energy  <tspan fill="#ff7a00">|</tspan>  Lifestyle  <tspan fill="#ff7a00">|</tspan>  Fullfilment
      </text>
      
      <!-- Thoughtfully Made for You — script -->
      <text x="400" y="585" text-anchor="middle" fill="#0d4b3e" font-size="56" font-family="Great Vibes, cursive" font-style="italic">
        Thoughtfully Made for You
      </text>
      
      <!-- Orange leaves icon -->
      <g transform="translate(380, 615)" fill="#ff7a00">
        <path d="M20 5 C 5 15, 5 35, 20 45 C 20 25, 35 15, 20 5 Z"/>
        <path d="M20 5 C 35 15, 35 35, 20 45 C 20 25, 5 15, 20 5 Z"/>
      </g>
      
      <!-- Divider lines -->
      <line x1="220" y1="650" x2="350" y2="650" stroke="#ff7a00" stroke-width="1.5"/>
      <line x1="450" y1="650" x2="580" y2="650" stroke="#ff7a00" stroke-width="1.5"/>
      
      <!-- Stay balanced — script -->
      <text x="400" y="705" text-anchor="middle" fill="#0d4b3e" font-size="44" font-family="Great Vibes, cursive" font-style="italic">
        Stay balanced
      </text>
      <path d="M 320 715 Q 400 730 480 715" fill="none" stroke="#ff7a00" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Bottom arc text: FOR BEING PART OF SELF FAMILY -->
      <text fill="#0d4b3e" font-size="20" font-weight="700" letter-spacing="8" font-family="Inter, sans-serif">
        <textPath href="#bottomArcPath" startOffset="50%" text-anchor="middle">
          FOR BEING PART OF SELF FAMILY
        </textPath>
      </text>
      
      <!-- Hearts on sides -->
      <g transform="translate(185, 640) scale(0.8)" fill="#ff7a00">
        <path d="M20 30 C 10 20, 5 15, 5 8 C 5 3, 10 0, 15 0 C 18 0, 20 2, 20 4 C 20 2, 22 0, 25 0 C 30 0, 35 3, 35 8 C 35 15, 30 20, 20 30 Z"/>
      </g>
      <g transform="translate(595, 640) scale(0.8)" fill="#ff7a00">
        <path d="M20 30 C 10 20, 5 15, 5 8 C 5 3, 10 0, 15 0 C 18 0, 20 2, 20 4 C 20 2, 22 0, 25 0 C 30 0, 35 3, 35 8 C 35 15, 30 20, 20 30 Z"/>
      </g>
    </svg>`;
};

/** Compact wordmark for navbar */
export const SelfWordmark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <img
      src="/images/self-logo.png"
      alt="SELF Wellness"
      className="h-10 w-10 rounded-full object-cover"
      loading="eager"
    />
    <span className="font-display text-xl md:text-2xl font-bold text-[#1c1c1c] tracking-tight">
      SELF<span className="text-[#ff7a00]">.</span>
    </span>
  </div>
);

export default SelfLogo;

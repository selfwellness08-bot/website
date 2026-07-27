import React from "react";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const base = (strokeWidth = 1.5) =>
  ({ fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" });

export const CheckIcon: React.FC<IconProps> = ({ className = "w-4 h-4", strokeWidth = 2 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const LeafIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7 0 6-4.5 11-10 11Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const SparkIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const DiamondIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
    <path d="m8 12 3 3 5-6" />
  </svg>
);

export const LotusIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22c0-5.5-3-9-3-9s-3 3.5-3 7" />
    <path d="M12 22c0-5.5 3-9 3-9s3 3.5 3 7" />
    <path d="M6 13c-2-1.5-4-4.5-2-8 1.5 2 3.5 4.5 8 5" />
    <path d="M18 13c2-1.5 4-4.5 2-8-1.5 2-3.5 4.5-8 5" />
    <path d="M12 18c0-3-1.5-5.5-1.5-5.5S9 14.5 9 17" />
    <path d="M12 18c0-3 1.5-5.5 1.5-5.5S15 14.5 15 17" />
    <path d="M12 22v-4" />
  </svg>
);

export const SproutIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 1 1.1 7.6C13 13 11.5 12.6 10 11.5 11.4 9.1 12.6 7.1 14.1 6z" />
  </svg>
);

export const RecycleIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
    <path d="m14 16-3 3 3 3" />
    <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
    <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.89l3.943 6.843" />
    <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const DropletIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

export const HandshakeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

export const FlaskIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const GemIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

export const GiftIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

export const PawIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <circle cx="20" cy="16" r="2" />
    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 9c-1.6-2.7-3.5-4-6-4a6 6 0 0 0 0 12c2.5 0 4.4-1.3 6-4" />
    <path d="M12 9c1.6-2.7 3.5-4 6-4a6 6 0 0 1 0 12c-2.5 0-4.4-1.3-6-4" />
  </svg>
);

export const WavesIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
  </svg>
);

export const SoapIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.5 }) => (
  <svg className={className} {...base(strokeWidth)} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.2 3.8A2.5 2.5 0 0 0 15.4 2H8.6a2.5 2.5 0 0 0-3.8 1.8L3 18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
    <path d="M8 6h8" />
    <circle cx="9" cy="11" r="1" />
    <circle cx="15" cy="11" r="1" />
    <circle cx="12" cy="14" r="1" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className = "w-4 h-4", strokeWidth = 1.5, filled = true }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

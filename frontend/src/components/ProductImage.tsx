import React from "react";

interface Props {
  src?: string;
  alt: string;
  className?: string;
  variant?: "soap" | "serum" | "scrub" | "hair" | "gel" | "daily-essentials" | "skincare" | "lip-care" | "hampers" | "default";
  lazy?: boolean;
}

const PX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

const UX = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=85&auto=format&fit=crop`;

export const IMAGE_MAP: Record<string, string> = {
  // Artisan soaps — natural handmade soap bars
  soap:    PX(4041392),
  soap1:   PX(3997367),
  soap2:   PX(7267389),
  soap3:   PX(4041392),

  // Skincare serums & face care
  serum:   UX("photo-1620916566398-39f1143ab7be"),
  skin1:   UX("photo-1598440947619-2c35fc9aa908"),
  skin2:   UX("photo-1522335789203-aabd1fc54bc9"),
  skin3:   UX("photo-1611080541599-8c6dbde6ed28"),

  // Exfoliating body scrubs
  scrub:   PX(6663573),
  scrub1:  PX(5938532),
  scrub2:  PX(5938532),
  scrub3:  PX(6663573),

  // Hair care oils & treatments
  hair:    UX("photo-1522337360788-8b13dee7a37e"),
  hair1:   UX("photo-1585751119414-ef2636f8aede"),
  hair2:   UX("photo-1526045612212-70caf35c14df"),
  hair3:   UX("photo-1580618672591-eb180b1a973f"),

  // Body gels & moisturizers
  gel:     PX(3762879),
  gel1:    PX(5938545),
  gel2:    PX(5938565),
  gel3:    PX(5938523),

  // Bundles & Hampers
  bundle1: UX("photo-1620916566398-39f1143ab7be"),
  bundle2: PX(4041392),
  bundle3: UX("photo-1522337360788-8b13dee7a37e"),
};

const VARIANT_FALLBACK: Record<string, string> = {
  soap:              "soap",
  serum:             "serum",
  scrub:             "scrub",
  hair:              "hair",
  gel:               "gel",
  "daily-essentials":"serum",
  skincare:          "skin1",
  "lip-care":        "scrub1",
  hampers:           "bundle1",
  default:           "serum",
};

const GRADIENT_MAP: Record<string, string> = {
  soap:              "from-[#ffe7cc] via-[#ffd4a3] to-[#ffb878]",
  serum:             "from-[#fff3d6] via-[#ffe0a3] to-[#ffc864]",
  scrub:             "from-[#f0e2d2] via-[#d4b896] to-[#b08968]",
  hair:              "from-[#e4ede9] via-[#b8d4c8] to-[#0d4b3e]",
  gel:               "from-[#f0f7f0] via-[#d4ebd4] to-[#7ab37a]",
  "daily-essentials":"from-[#e8f4ef] via-[#d0e8df] to-[#a8d5c2]",
  skincare:          "from-[#fff3d6] via-[#ffe0a3] to-[#ffc864]",
  "lip-care":        "from-[#fdf0f0] via-[#f8d7da] to-[#f1b0b7]",
  hampers:           "from-[#fdf6ee] via-[#fae5cb] to-[#f4c898]",
  default:           "from-[#ffe7cc] via-[#fff3d6] to-[#f0e2d2]",
};

export const ProductImage: React.FC<Props> = ({
  src,
  alt,
  className = "",
  variant = "default",
  lazy = true,
}) => {
  const imageSrc = src
    ? (IMAGE_MAP[src] ?? IMAGE_MAP[VARIANT_FALLBACK[variant]] ?? IMAGE_MAP.serum)
    : (IMAGE_MAP[VARIANT_FALLBACK[variant]] ?? IMAGE_MAP.serum);

  const gradient = GRADIENT_MAP[variant] ?? GRADIENT_MAP.default;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
        onError={e => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/8 to-transparent pointer-events-none" />
    </div>
  );
};

export default ProductImage;

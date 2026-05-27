export type Category = "soap" | "gel" | "scrub" | "hair" | "skincare";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceUSD: number;
  description: string;
  shortDesc: string;
  ingredients: string[];
  benefits: string[];
  usage: string[];
  compatibility: string;
  images: string[];
  rating: number;
  reviews: Review[];
  inStock: boolean;
  stock: number;
  badge?: string;
  bundles?: { name: string; discount: number }[];
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: string[];
  priceUSD: number;
  image: string;
}

export const CATEGORIES: { id: Category; name: string; desc: string; emoji: string }[] = [
  { id: "soap", name: "Artisan Soaps", desc: "Handcrafted with botanical oils", emoji: "🫧" },
  { id: "gel", name: "Body Gels", desc: "Refreshing hydration rituals", emoji: "💧" },
  { id: "scrub", name: "Exfoliating Scrubs", desc: "Gentle renewal for glowing skin", emoji: "✨" },
  { id: "hair", name: "Hair Care", desc: "Nourishment from root to tip", emoji: "🌿" },
  { id: "skincare", name: "Skin Care", desc: "Daily rituals of radiant skin", emoji: "🌸" },
];

export const PRODUCTS: Product[] = [
  {
    id: "self-soap-01",
    name: "Saffron & Milk Silk Soap",
    category: "soap",
    priceUSD: 18,
    description:
      "A luxurious bar that marries the golden warmth of Kashmiri saffron with the soothing caress of raw milk. Each lather leaves skin luminous, soft, and delicately fragrant.",
    shortDesc: "Golden radiance in every lather.",
    ingredients: ["Kashmiri Saffron", "Raw Milk", "Shea Butter", "Coconut Oil", "Olive Oil", "Vitamin E"],
    benefits: ["Brightens skin tone", "Deeply moisturizes", "Reduces pigmentation", "Anti-aging properties"],
    usage: ["Lather between palms", "Massage onto damp skin", "Rinse with lukewarm water", "Use daily for best results"],
    compatibility: "All skin types, especially dull & mature skin",
    images: ["soap1", "soap2", "soap3"],
    rating: 4.9,
    inStock: true,
    stock: 48,
    badge: "Bestseller",
    reviews: [
      { name: "Aarohi M.", rating: 5, comment: "My skin has never felt this soft. The saffron fragrance is divine.", date: "2 weeks ago", verified: true },
      { name: "Priya R.", rating: 5, comment: "Worth every penny. Feels like a spa ritual.", date: "1 month ago", verified: true },
    ],
    bundles: [{ name: "Soap Trio", discount: 15 }],
  },
  {
    id: "self-soap-02",
    name: "Charcoal & Tea Tree Purify Bar",
    category: "soap",
    priceUSD: 16,
    description:
      "Activated charcoal draws out impurities while tea tree offers antimicrobial protection. A clarifying cleanse for the modern warrior.",
    shortDesc: "Deep purification, naturally.",
    ingredients: ["Activated Charcoal", "Tea Tree Oil", "Neem Extract", "Aloe Vera", "Glycerin"],
    benefits: ["Clears acne & blemishes", "Controls excess oil", "Detoxifies pores", "Soothes inflammation"],
    usage: ["Wet face & body", "Work into a rich lather", "Focus on oily zones", "Rinse thoroughly"],
    compatibility: "Oily, acne-prone & combination skin",
    images: ["soap2", "soap1"],
    rating: 4.8,
    inStock: true,
    stock: 62,
    reviews: [
      { name: "Rahul K.", rating: 5, comment: "Cleared my back acne within weeks.", date: "3 weeks ago", verified: true },
    ],
  },
  {
    id: "self-gel-01",
    name: "Aloe Vera Cooling Body Gel",
    category: "gel",
    priceUSD: 28,
    description:
      "A weightless, fast-absorbing gel infused with 98% pure aloe vera. Instantly cools, calms, and quenches thirsty skin after sun or stress.",
    shortDesc: "Cooling calm in a bottle.",
    ingredients: ["Pure Aloe Vera", "Cucumber Extract", "Menthol", "Hyaluronic Acid", "Panthenol"],
    benefits: ["Instant cooling relief", "Soothes sunburn", "Hydrates without grease", "Repairs skin barrier"],
    usage: ["Apply generously after sun exposure", "Use as daily moisturizer", "Refrigerate for enhanced cooling"],
    compatibility: "All skin types, sensitive skin safe",
    images: ["gel1", "gel2"],
    rating: 4.9,
    inStock: true,
    stock: 85,
    badge: "New",
    reviews: [
      { name: "Neha S.", rating: 5, comment: "Feels like liquid silk. Love the scent!", date: "1 week ago", verified: true },
    ],
    bundles: [{ name: "Summer Essentials", discount: 10 }],
  },
  {
    id: "self-gel-02",
    name: "Rose Petal Intimate Gel",
    category: "gel",
    priceUSD: 32,
    description:
      "A pH-balanced intimate care gel with the delicate fragrance of Bulgarian rose petals. Gentle enough for daily use, luxurious enough for everyday elegance.",
    shortDesc: "Delicate balance, every day.",
    ingredients: ["Bulgarian Rose Water", "Chamomile", "Lactic Acid", "Vitamin E"],
    benefits: ["Maintains pH balance", "Prevents irritation", "Gentle daily cleansing", "Soothing fragrance"],
    usage: ["Use 2-3 drops during cleansing", "Rinse with water", "Pat dry gently"],
    compatibility: "All intimate skin types",
    images: ["gel2", "gel1"],
    rating: 4.7,
    inStock: true,
    stock: 34,
    reviews: [],
  },
  {
    id: "self-scrub-01",
    name: "Coffee & Cocoa Glow Scrub",
    category: "scrub",
    priceUSD: 36,
    description:
      "An energizing body scrub blending finely ground Arabica coffee with rich cocoa butter. Exfoliates dead cells while leaving skin supple and radiant.",
    shortDesc: "Awaken your glow.",
    ingredients: ["Arabica Coffee", "Cocoa Butter", "Brown Sugar", "Sweet Almond Oil", "Vitamin C"],
    benefits: ["Reduces cellulite", "Smooths rough patches", "Boosts circulation", "Firms & tones skin"],
    usage: ["Scoop a generous amount", "Massage in circular motions", "Focus on elbows & knees", "Rinse warm"],
    compatibility: "All body types",
    images: ["scrub1", "scrub2"],
    rating: 4.9,
    inStock: true,
    stock: 52,
    badge: "Bestseller",
    reviews: [
      { name: "Ananya D.", rating: 5, comment: "My skin feels like silk after every use!", date: "2 weeks ago", verified: true },
    ],
  },
  {
    id: "self-scrub-02",
    name: "Himalayan Salt & Mint Scrub",
    category: "scrub",
    priceUSD: 34,
    description:
      "Coarse Himalayan pink salt infused with peppermint oil for a deep exfoliation that leaves skin tingling, refreshed, and renewed.",
    shortDesc: "Crisp renewal, pure salt.",
    ingredients: ["Himalayan Pink Salt", "Peppermint Oil", "Jojoba Oil", "Eucalyptus"],
    benefits: ["Mineral-rich detox", "Improves circulation", "Relieves muscle tension", "Deodorizes skin"],
    usage: ["Mix with warm water", "Massage onto damp skin", "Breathe deeply", "Rinse"],
    compatibility: "Normal to oily skin",
    images: ["scrub2", "scrub1"],
    rating: 4.8,
    inStock: true,
    stock: 28,
    reviews: [],
  },
  {
    id: "self-hair-01",
    name: "Bhringraj & Amla Hair Oil",
    category: "hair",
    priceUSD: 42,
    description:
      "A centuries-old Ayurvedic elixir combining the revered bhringraj herb with vitamin-rich amla. Strengthens roots, stimulates growth, and adds lustrous shine.",
    shortDesc: "Ancient wisdom, modern shine.",
    ingredients: ["Bhringraj", "Amla", "Brahmi", "Sesame Oil", "Neem Oil"],
    benefits: ["Reduces hair fall", "Promotes new growth", "Prevents premature greying", "Adds natural shine"],
    usage: ["Warm slightly", "Massage into scalp", "Leave overnight or 1 hour", "Wash with gentle shampoo"],
    compatibility: "All hair types",
    images: ["hair1", "hair2"],
    rating: 4.9,
    inStock: true,
    stock: 41,
    badge: "Bestseller",
    reviews: [
      { name: "Vikram J.", rating: 5, comment: "Noticeable hair growth in 6 weeks.", date: "1 month ago", verified: true },
    ],
    bundles: [{ name: "Hair Ritual Set", discount: 12 }],
  },
  {
    id: "self-hair-02",
    name: "Keratin Repair Shampoo",
    category: "hair",
    priceUSD: 26,
    description:
      "Sulfate-free shampoo infused with plant-based keratin to repair damaged, chemically treated, or heat-styled hair without stripping natural oils.",
    shortDesc: "Repair without compromise.",
    ingredients: ["Plant Keratin", "Argan Oil", "Coconut Derivatives", "Silk Amino Acids"],
    benefits: ["Repairs split ends", "Restores elasticity", "Color-safe formula", "Adds volume"],
    usage: ["Apply to wet hair", "Massage gently", "Rinse thoroughly", "Follow with conditioner"],
    compatibility: "Damaged, colored, heat-treated hair",
    images: ["hair2", "hair1"],
    rating: 4.7,
    inStock: true,
    stock: 58,
    reviews: [],
  },
  {
    id: "self-skin-01",
    name: "Vitamin C Brightening Serum",
    category: "skincare",
    priceUSD: 58,
    description:
      "A potent 20% Vitamin C serum stabilized with ferulic acid and vitamin E. Fades dark spots, evens skin tone, and shields against environmental damage.",
    shortDesc: "Radiance in every drop.",
    ingredients: ["20% L-Ascorbic Acid", "Ferulic Acid", "Vitamin E", "Hyaluronic Acid"],
    benefits: ["Brightens dark spots", "Evens skin tone", "Boosts collagen", "Antioxidant protection"],
    usage: ["Apply 3-4 drops on clean face", "Morning & evening", "Follow with moisturizer", "Always use SPF after"],
    compatibility: "All skin types except active acne",
    images: ["skin1", "skin2"],
    rating: 4.9,
    inStock: true,
    stock: 22,
    badge: "Hero Product",
    reviews: [
      { name: "Meera K.", rating: 5, comment: "My dark spots faded in a month!", date: "2 weeks ago", verified: true },
    ],
    bundles: [{ name: "Glow Routine", discount: 18 }],
  },
  {
    id: "self-skin-02",
    name: "Retinol Night Cream",
    category: "skincare",
    priceUSD: 64,
    description:
      "A gentle yet effective encapsulated retinol cream that works overnight to diminish fine lines, refine texture, and reveal youthful skin by morning.",
    shortDesc: "Overnight transformation.",
    ingredients: ["Encapsulated Retinol", "Peptides", "Squalane", "Niacinamide", "Shea Butter"],
    benefits: ["Reduces fine lines", "Improves texture", "Boosts cell turnover", "Firms skin"],
    usage: ["Apply pea-sized amount at night", "Start 2x per week", "Always use SPF next morning", "Avoid eye area"],
    compatibility: "Mature, dull, or textured skin",
    images: ["skin2", "skin1"],
    rating: 4.8,
    inStock: true,
    stock: 19,
    reviews: [],
  },
  {
    id: "self-skin-03",
    name: "Hyaluronic Hydration Mist",
    category: "skincare",
    priceUSD: 38,
    description:
      "A weightless facial mist powered by triple-weight hyaluronic acid. Instantly plumps, hydrates, and refreshes skin throughout the day.",
    shortDesc: "Instant hydration, anytime.",
    ingredients: ["Hyaluronic Acid (3 weights)", "Rose Water", "Glycerin", "Aloe Vera"],
    benefits: ["Instant plumping", "Locks in moisture", "Makeup setting", "Midday refresh"],
    usage: ["Spritz 8 inches from face", "Morning, noon & night", "Over or under makeup"],
    compatibility: "All skin types, especially dry",
    images: ["skin1", "skin2"],
    rating: 4.8,
    inStock: true,
    stock: 73,
    reviews: [
      { name: "Sana B.", rating: 5, comment: "My holy grail summer mist!", date: "3 days ago", verified: true },
    ],
  },
  {
    id: "self-soap-03",
    name: "Lavender & Oat Calming Bar",
    category: "soap",
    priceUSD: 17,
    description:
      "A soothing blend of French lavender and colloidal oatmeal for the most sensitive skin. Transforms bath time into a tranquil ritual.",
    shortDesc: "Calm, in lathered form.",
    ingredients: ["French Lavender", "Colloidal Oatmeal", "Chamomile", "Olive Oil", "Cocoa Butter"],
    benefits: ["Soothes eczema & irritation", "Calms the mind", "Softens rough skin", "Sleep-inducing aroma"],
    usage: ["Use as daily body soap", "Lather gently on sensitive areas", "Rinse with cool water"],
    compatibility: "Sensitive, eczema-prone skin",
    images: ["soap1", "soap2"],
    rating: 4.9,
    inStock: true,
    stock: 39,
    reviews: [],
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: "bundle-01",
    name: "The Glow Ritual",
    description: "Vitamin C Serum + Hydration Mist + Coffee Scrub",
    products: ["self-skin-01", "self-skin-03", "self-scrub-01"],
    priceUSD: 112,
    image: "bundle1",
  },
  {
    id: "bundle-02",
    name: "The Daily Balance",
    description: "Saffron Soap + Aloe Gel + Hydration Mist",
    products: ["self-soap-01", "self-gel-01", "self-skin-03"],
    priceUSD: 75,
    image: "bundle2",
  },
  {
    id: "bundle-03",
    name: "The Hair Ritual Set",
    description: "Bhringraj Oil + Keratin Shampoo",
    products: ["self-hair-01", "self-hair-02"],
    priceUSD: 60,
    image: "bundle3",
  },
];

export const TESTIMONIALS = [
  { name: "Isha M.", location: "Mumbai", text: "SELF has redefined my skincare routine. The Saffron soap is pure poetry on skin.", rating: 5, handle: "@ishaskin" },
  { name: "Zayn K.", location: "Dubai", text: "Finally, a brand that blends tradition with modern luxury. The hair oil is magic.", rating: 5, handle: "@zaynlife" },
  { name: "Emma T.", location: "London", text: "The Vitamin C serum replaced three products in my routine. Brilliant formulation.", rating: 5, handle: "@emmaskinuk" },
  { name: "Aarav P.", location: "Bangalore", text: "Packaging alone is art. The products are even better.", rating: 5, handle: "@aaravstyle" },
  { name: "Fatima R.", location: "Abu Dhabi", text: "I've never felt this kind of calm from a skincare brand. Truly wellness-driven.", rating: 5, handle: "@fatimacare" },
  { name: "Leo D.", location: "New York", text: "The coffee scrub is my pre-gym ritual. Skin feels alive.", rating: 5, handle: "@leofit" },
];

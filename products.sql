-- SELF Wellness Store — Product Seed SQL
-- Run this against your PostgreSQL database to seed all 14 products.
-- Usage: psql "$DATABASE_URL" -f products.sql

BEGIN;

-- Clear existing products (optional — remove this line to only insert missing ones)
-- DELETE FROM products;

INSERT INTO products (id, name, category, price_usd, short_desc, description, ingredients, benefits, usage_steps, compatibility, images, rating, in_stock, stock, badge, featured, created_at, updated_at)
VALUES
  ('self-soap-01', 'Saffron & Milk Silk Soap', 'soap', 18.00, 'Golden radiance in every lather.', 'A luxurious bar that marries the golden warmth of Kashmiri saffron with the soothing caress of raw milk. Each lather leaves skin luminous, soft, and delicately fragrant.', '["Kashmiri Saffron","Raw Milk","Shea Butter","Coconut Oil","Olive Oil","Vitamin E"]', '["Brightens skin tone","Deeply moisturizes","Reduces pigmentation","Anti-aging properties"]', '["Lather between palms","Massage onto damp skin","Rinse with lukewarm water","Use daily for best results"]', 'All skin types, especially dull & mature skin', '["soap1","soap2","soap3"]', 4.90, true, 48, 'Bestseller', true, NOW(), NOW()),

  ('self-soap-02', 'Charcoal & Tea Tree Purify Bar', 'soap', 16.00, 'Deep purification, naturally.', 'Activated charcoal draws out impurities while tea tree offers antimicrobial protection. A clarifying cleanse for the modern warrior.', '["Activated Charcoal","Tea Tree Oil","Neem Extract","Aloe Vera","Glycerin"]', '["Clears acne & blemishes","Controls excess oil","Detoxifies pores","Soothes inflammation"]', '["Wet face & body","Work into a rich lather","Focus on oily zones","Rinse thoroughly"]', 'Oily, acne-prone & combination skin', '["soap2","soap1"]', 4.80, true, 62, NULL, false, NOW(), NOW()),

  ('self-soap-03', 'Lavender & Oat Calm Bar', 'soap', 17.00, 'Peace in every lather.', 'A gentle, sleep-inducing bar blending French lavender with colloidal oatmeal for the most sensitive skin.', '["French Lavender","Colloidal Oatmeal","Calendula","Shea Butter","Vitamin E"]', '["Soothes sensitive skin","Reduces redness","Promotes relaxation","Gentle daily cleanse"]', '["Lather gently","Apply to damp skin","Leave on 30 seconds","Rinse thoroughly"]', 'Sensitive, dry & eczema-prone skin', '["soap3","soap1"]', 4.70, true, 35, 'New', false, NOW(), NOW()),

  ('self-soap-png-01', 'Rose & Honey Glow Soap', 'soap', 19.00, 'Bloom in every wash.', 'A sumptuous blend of real rose petals and raw honey that moisturizes while it cleanses. Each bar leaves skin soft, brightened, and delicately floral.', '["Rose Petals","Raw Honey","Rose Hip Oil","Shea Butter","Glycerin"]', '["Intense moisture","Brightening","Antibacterial","Anti-inflammatory"]', '["Lather with warm water","Massage gently onto skin","Rinse clean"]', 'Normal to dry skin', '["soap1","soap3"]', 4.80, true, 30, NULL, false, NOW(), NOW()),

  ('self-soap-png-02', 'Turmeric & Sandalwood Glow Bar', 'soap', 20.00, 'Ancient glow ritual.', 'An Ayurvedic-inspired soap bar combining turmeric''s brightening power with the calming depth of sandalwood. Ancient wisdom for a modern glow ritual.', '["Turmeric","Sandalwood Oil","Neem","Coconut Milk","Glycerin"]', '["Brightens complexion","Anti-inflammatory","Deep nourishment","Even skin tone"]', '["Wet skin thoroughly","Lather generously","Leave 1 minute","Rinse thoroughly"]', 'All skin types', '["soap2","soap1"]', 4.70, true, 25, NULL, false, NOW(), NOW()),

  ('self-gel-01', 'Aloe Vera Cooling Body Gel', 'daily-essentials', 28.00, 'Cooling calm in a bottle.', 'A weightless, fast-absorbing gel infused with 98% pure aloe vera. Instantly cools, calms, and quenches thirsty skin after sun or stress.', '["Pure Aloe Vera","Cucumber Extract","Menthol","Hyaluronic Acid","Panthenol"]', '["Instant cooling relief","Soothes sunburn","Hydrates without grease","Repairs skin barrier"]', '["Apply generously after sun exposure","Use as daily moisturizer","Refrigerate for enhanced cooling"]', 'All skin types, sensitive skin safe', '["gel1","gel2"]', 4.90, true, 85, 'New', true, NOW(), NOW()),

  ('self-gel-02', 'Rose Petal Intimate Gel', 'daily-essentials', 32.00, 'Delicate balance, every day.', 'A pH-balanced intimate care gel with the delicate fragrance of Bulgarian rose petals. Gentle enough for daily use, luxurious enough for everyday elegance.', '["Bulgarian Rose Water","Chamomile","Lactic Acid","Vitamin E"]', '["Maintains pH balance","Prevents irritation","Gentle daily cleansing","Soothing fragrance"]', '["Use 2-3 drops during cleansing","Rinse with water","Pat dry gently"]', 'All intimate skin types', '["gel2","gel1"]', 4.70, true, 34, NULL, false, NOW(), NOW()),

  ('self-scrub-01', 'Coffee & Cocoa Glow Scrub', 'skincare', 36.00, 'Awaken your glow.', 'An energizing body scrub blending finely ground Arabica coffee with rich cocoa butter. Exfoliates dead cells while leaving skin supple and radiant.', '["Arabica Coffee","Cocoa Butter","Brown Sugar","Sweet Almond Oil","Vitamin C"]', '["Reduces cellulite","Smooths rough patches","Boosts circulation","Firms & tones skin"]', '["Scoop a generous amount","Massage in circular motions","Focus on elbows & knees","Rinse warm"]', 'All body types', '["scrub1","scrub2"]', 4.90, true, 52, 'Bestseller', true, NOW(), NOW()),

  ('self-scrub-02', 'Himalayan Salt & Mint Scrub', 'skincare', 34.00, 'Crisp renewal, pure salt.', 'Coarse Himalayan pink salt infused with peppermint oil for a deep exfoliation that leaves skin tingling, refreshed, and renewed.', '["Himalayan Pink Salt","Peppermint Oil","Jojoba Oil","Eucalyptus"]', '["Mineral-rich detox","Improves circulation","Relieves muscle tension","Deodorizes skin"]', '["Mix with warm water","Massage onto damp skin","Breathe deeply","Rinse"]', 'Normal to oily skin', '["scrub2","scrub1"]', 4.80, true, 28, NULL, false, NOW(), NOW()),

  ('self-hair-01', 'Bhringraj & Amla Hair Oil', 'daily-essentials', 42.00, 'Ancient wisdom, modern shine.', 'A centuries-old Ayurvedic elixir combining the revered bhringraj herb with vitamin-rich amla. Strengthens roots, stimulates growth, and adds lustrous shine.', '["Bhringraj","Amla","Brahmi","Sesame Oil","Neem Oil"]', '["Reduces hair fall","Promotes new growth","Prevents premature greying","Adds natural shine"]', '["Warm slightly","Massage into scalp","Leave overnight or 1 hour","Wash with gentle shampoo"]', 'All hair types', '["hair1","hair2"]', 4.90, true, 41, 'Bestseller', true, NOW(), NOW()),

  ('self-hair-02', 'Keratin Repair Shampoo', 'daily-essentials', 26.00, 'Repair without compromise.', 'Sulfate-free shampoo infused with plant-based keratin to repair damaged, chemically treated, or heat-styled hair without stripping natural oils.', '["Plant Keratin","Argan Oil","Biotin","Aloe Vera","Panthenol"]', '["Repairs damage","Strengthens hair shaft","Reduces frizz","Adds lasting shine"]', '["Wet hair","Apply and lather well","Leave 2 minutes","Rinse thoroughly"]', 'Damaged, chemically treated & heat-styled hair', '["hair2","hair1"]', 4.60, true, 55, NULL, false, NOW(), NOW()),

  ('self-skin-01', 'Vitamin C Brightening Serum', 'skincare', 54.00, 'Radiance redefined.', 'A potent 15% stabilized Vitamin C serum that visibly brightens dark spots, evens skin tone, and boosts collagen production.', '["15% L-Ascorbic Acid","Niacinamide","Ferulic Acid","Hyaluronic Acid","Vitamin E"]', '["Brightens dark spots","Evens skin tone","Boosts collagen","Antioxidant protection"]', '["Apply 3-4 drops to clean face","Pat gently","Follow with moisturizer","Use SPF in daytime"]', 'All skin types, especially dull & hyperpigmented', '["skin1","serum","skin2"]', 4.90, true, 38, 'Bestseller', true, NOW(), NOW()),

  ('self-skin-02', 'Retinol Night Repair Cream', 'skincare', 48.00, 'Wake up to younger-looking skin.', 'A gentle 0.3% retinol cream that works overnight to reduce fine lines, improve texture, and reveal firmer skin by morning.', '["0.3% Retinol","Ceramides","Peptides","Squalane","Allantoin"]', '["Reduces fine lines","Improves skin texture","Boosts cell turnover","Firms & tightens"]', '["Apply pea-sized amount at night","Avoid eye area","Use SPF next morning","Introduce slowly 2x/week"]', 'Normal, combination & mature skin', '["skin2","skin1"]', 4.80, true, 22, NULL, false, NOW(), NOW()),

  ('self-skin-03', 'Hyaluronic Acid Plump Moisturizer', 'skincare', 38.00, 'Plump, dewy, glass skin.', 'A multi-weight hyaluronic acid moisturizer delivering 72-hour hydration and a glass-skin finish for all skin types.', '["Multi-weight Hyaluronic Acid","Ceramides","Centella Asiatica","Niacinamide","Aloe"]', '["72-hour hydration","Plumps fine lines","Strengthens skin barrier","Dewy finish"]', '["Apply to damp skin","Use morning and night","Layer under SPF in AM"]', 'All skin types, especially dry & dehydrated', '["skin3","skin1"]', 4.80, true, 67, 'New', false, NOW(), NOW())

ON CONFLICT (id) DO UPDATE SET
  name         = EXCLUDED.name,
  category     = EXCLUDED.category,
  price_usd    = EXCLUDED.price_usd,
  short_desc   = EXCLUDED.short_desc,
  description  = EXCLUDED.description,
  ingredients  = EXCLUDED.ingredients,
  benefits     = EXCLUDED.benefits,
  usage_steps  = EXCLUDED.usage_steps,
  compatibility= EXCLUDED.compatibility,
  images       = EXCLUDED.images,
  rating       = EXCLUDED.rating,
  in_stock     = EXCLUDED.in_stock,
  stock        = EXCLUDED.stock,
  badge        = EXCLUDED.badge,
  featured     = EXCLUDED.featured,
  updated_at   = NOW();

COMMIT;

import { Router } from "express";
import { requireAdmin } from "./auth.js";

const router = Router();

router.post("/extract-pdf", requireAdmin, async (req, res) => {
  try {
    const { text } = req.body as { text?: string };
    if (!text) return res.status(400).json({ error: "text required" });

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "AI service not configured" });
    }

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert at extracting product information for a wellness/beauty brand. 
Extract product details from the provided text and return a JSON object with these exact fields:
- name: product name (string)
- category: one of "soap", "gel", "scrub", "hair", "skincare"
- priceUsd: price in USD (number)
- description: detailed description (string)
- shortDesc: one-line summary (string)
- ingredients: array of ingredient strings
- benefits: array of benefit strings
- usage: array of usage step strings
- compatibility: skin type compatibility (string)
- badge: optional badge like "bestseller", "new", "organic" or null
Return only valid JSON, no explanation.`,
        },
        { role: "user", content: text },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    return res.json(result);
  } catch (err) {
    req.log.error({ err }, "PDF extraction failed");
    return res.status(500).json({ error: "AI extraction failed" });
  }
});

router.post("/generate-mockup", requireAdmin, async (req, res) => {
  try {
    const { productName, category, style } = req.body as {
      productName?: string;
      category?: string;
      style?: string;
    };
    if (!productName) return res.status(400).json({ error: "productName required" });
    if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "AI service not configured" });

    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Professional product photography mockup for "${productName}" ${category || "wellness"} product. ${style || "Minimalist luxury packaging on white background, botanical elements, natural lighting, high-end beauty brand aesthetic, 4K quality"}. Brand colors: deep forest green and warm orange accents.`;

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return res.json({ url: response.data[0].url });
  } catch (err) {
    req.log.error({ err }, "Mockup generation failed");
    return res.status(500).json({ error: "Mockup generation failed" });
  }
});

export default router;

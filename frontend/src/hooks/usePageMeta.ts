import { useEffect } from "react";

interface PageMeta {
  title?: string;
  description?: string;
}

const BASE_TITLE = "SELF Wellness";
const BASE_DESC =
  "SELF Wellness — Thoughtfully Made For You. Premium organic wellness essentials crafted for Strength, Energy, Lifestyle & Fulfillment.";

export function usePageMeta({ title, description }: PageMeta = {}) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Thoughtfully Made For You`;

    let descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.content ?? "";
    if (descEl) descEl.content = description ?? BASE_DESC;

    return () => {
      document.title = prev;
      if (descEl) descEl.content = prevDesc;
    };
  }, [title, description]);
}

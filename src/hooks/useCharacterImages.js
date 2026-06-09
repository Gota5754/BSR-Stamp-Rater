import { useState, useEffect } from "react";
import { CHARACTERS } from "../data/characters.js";

const CACHE_KEY = "bsr-img-cache-v1";

// Récupère les portraits via l'API Jikan (MyAnimeList) pour les persos
// disposant d'un mal_id, avec cache localStorage pour éviter le rate limit.
export function useCharacterImages() {
  const [images, setImages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch { return {}; }
  });

  useEffect(() => {
    let cancelled = false;
    const toFetch = CHARACTERS.filter(c => c.mal_id && !images[c.id]);
    if (!toFetch.length) return;
    (async () => {
      const next = { ...images };
      for (let i = 0; i < toFetch.length; i++) {
        if (cancelled) return;
        try {
          const res = await fetch(`https://api.jikan.moe/v4/characters/${toFetch[i].mal_id}`);
          if (res.ok) {
            const data = await res.json();
            const url = data?.data?.images?.webp?.image_url || data?.data?.images?.jpg?.image_url;
            if (url && !cancelled) {
              next[toFetch[i].id] = url;
              setImages(prev => ({ ...prev, [toFetch[i].id]: url }));
            }
          }
        } catch { /* offline ou rate limit : fallback initiales */ }
        if (i < toFetch.length - 1) await new Promise(r => setTimeout(r, 350));
      }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return images;
}

"use client";

import { useEffect } from "react";
import { REALSCOUT_OFFICE_LISTINGS_HTML } from "@/lib/realscout-config";

const HOST_ID = "realscout-after-hero-slot";

/**
 * Inserts the office listings web component immediately after the page hero (first h1 in main).
 * Skips pages that already render realscout-office-listings. Script loads once in root layout.
 */
export default function RealScoutAfterHero() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || main.dataset.realscoutSkip === "true") return;
    if (main.querySelector("realscout-office-listings")) return;
    if (document.getElementById(HOST_ID)) return;

    const h1 = main.querySelector("h1");
    if (!h1) return;

    let heroEl: Element | null = h1.closest("section");
    if (!heroEl) {
      let el: Element | null = h1;
      while (el && el !== main) {
        if (el instanceof HTMLElement && /\bmb-(12|16)\b/.test(el.className)) {
          heroEl = el;
          break;
        }
        el = el.parentElement;
      }
    }
    if (!heroEl) {
      heroEl = h1.parentElement?.parentElement ?? h1.parentElement;
    }
    if (!heroEl) return;

    const host = document.createElement("div");
    host.id = HOST_ID;
    host.innerHTML = REALSCOUT_OFFICE_LISTINGS_HTML;
    heroEl.insertAdjacentElement("afterend", host);
  }, []);

  return null;
}

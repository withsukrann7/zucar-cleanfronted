// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Yol ya da hash değiştiğinde önce üste çık
    window.scrollTo(0, 0);
    // hash varsa, hafif gecikmeyle smooth scroll
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 0); // bir frame sonra
    }
  }, [pathname, hash]);

  return null;
}

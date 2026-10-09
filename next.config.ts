import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Bu panel oturum bazlı ve tamamen dinamik sayfalardan oluşur
  // (dashboard, gelen kutusu, siparişler vb.). Next.js 16'nın deneysel
  // "Cache Components" / statik prerender optimizasyonu, zaman damgası
  // gibi doğası gereken dinamik değerlerle (örn. `new Date()`) çakıştığı
  // için kapatılmıştır.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

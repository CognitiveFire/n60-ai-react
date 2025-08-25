// src/seoconfig.tsx

import React from "react";
import { Helmet } from "react-helmet";

type Lang = "en" | "no";

export const seoConfig: Record<Lang, any> = {
  en: {
    title: "N60.ai – Powerful AI for SMBs",
    description: "N60.ai provides tailored AI solutions for small and medium businesses.",
    canonical: "https://n60.ai",
    ogTitle: "N60.ai – Powerful AI for SMBs",
    ogDescription: "Tailored AI for Nordic businesses. GDPR-compliant, scalable, effective.",
    ogImage: "https://n60.ai/images/og-image-en.png",
    ogUrl: "https://n60.ai",
    twitterTitle: "N60.ai",
    twitterDescription: "Powerful AI for SMEs.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "N60.ai",
      url: "https://n60.ai",
      logo: "https://n60.ai/logo.png"
    }
  },
  no: {
    title: "N60.ai – Kraftig AI for norske SMB-er",
    description: "N60.ai leverer skreddersydde AI-løsninger for små og mellomstore bedrifter.",
    canonical: "https://n60.ai",
    ogTitle: "N60.ai – Kraftig AI for norske SMB-er",
    ogDescription: "Skreddersydd AI for norske bedrifter. GDPR-kompatibel og effektiv.",
    ogImage: "https://n60.ai/images/og-image-no.png",
    ogUrl: "https://n60.ai",
    twitterTitle: "N60.ai",
    twitterDescription: "Kraftig AI for SMB-er.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "N60.ai",
      url: "https://n60.ai",
      logo: "https://n60.ai/logo.png"
    }
  }
};

export const SeoHelmet: React.FC<{ lang: Lang }> = ({ lang }) => {
  const seo = seoConfig[lang];

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
    </Helmet>
  );
};

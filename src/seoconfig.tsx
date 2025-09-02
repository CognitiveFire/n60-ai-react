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
    title: "N60.ai - AI-drevet B2B-markedsføring for norske bedrifter",
    description: "N60.ai leverer AI-drevne markedsføringsløsninger for små og mellomstore bedrifter i Norge. Automatiser leadgenerering, produktmarkedsføring og markedsutvidelse med kraftig AI-teknologi.",
    canonical: "https://n60.ai",
    ogTitle: "N60.ai - AI-drevet B2B-markedsføring for norske bedrifter",
    ogDescription: "Automatiser markedsføringen din med AI. N60.ai leverer skreddersydde løsninger for leadgenerering, produktmarkedsføring og markedsutvidelse til norske SMB-er.",
    ogImage: "https://i.ibb.co/ycfYCgMP/Hero-background.png",
    ogUrl: "https://n60.ai",
    twitterTitle: "N60.ai - AI-drevet B2B-markedsføring",
    twitterDescription: "Automatiser markedsføringen din med AI. Skreddersydde løsninger for norske bedrifter.",
    keywords: "AI markedsføring Norge, B2B markedsføring, leadgenerering, produktmarkedsføring, AI chatbot, markedsføringsautomatisering, norske bedrifter, AI løsninger, Bergen AI, Norge markedsføring",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "N60.ai",
      alternateName: "N60",
      url: "https://n60.ai",
      logo: "https://i.ibb.co/vCcJ11RK/logo.png",
      description: "AI-drevet B2B-markedsføring for små og mellomstore bedrifter i Norge",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bergen",
        addressCountry: "NO"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+47-XXX-XX-XXX",
        contactType: "customer service",
        email: "matthew@n60.ai",
        availableLanguage: "Norwegian"
      },
      sameAs: [
        "https://www.linkedin.com/company/n60-ai",
        "https://twitter.com/n60_ai"
      ],
      service: [
        {
          "@type": "Service",
          name: "AI-drevet produktmarkedsføring",
          description: "Nå de riktige kundene med budskap som skaper etterspørsel"
        },
        {
          "@type": "Service", 
          name: "AI-drevet leadgenerering",
          description: "Fyll pipelinen med kvalifiserte leads, ikke bare flere kontakter"
        },
        {
          "@type": "Service",
          name: "AI-drevet leaddiscovery", 
          description: "Bygg presise lead-lister ved å kombinere AI med dataleverandører"
        },
        {
          "@type": "Service",
          name: "AI-drevet markedsutvidelse",
          description: "Voks trygt inn i nye markeder med AI-drevet innsikt"
        }
      ],
      areaServed: {
        "@type": "Country",
        name: "Norway"
      },
      foundingDate: "2024",
      numberOfEmployees: "1-10"
    }
  }
};

export const SeoHelmet: React.FC<{ lang: Lang }> = ({ lang }) => {
  const seo = seoConfig[lang];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      <link rel="canonical" href={seo.canonical} />

      {/* Language and Geographic Meta Tags */}
      <meta name="language" content={lang === 'no' ? 'Norwegian' : 'English'} />
      <meta name="geo.region" content={lang === 'no' ? 'NO' : 'EU'} />
      <meta name="geo.country" content={lang === 'no' ? 'Norway' : 'Europe'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'no' ? 'no_NO' : 'en_US'} />
      <meta property="og:site_name" content="N60.ai" />

      {/* Twitter */}
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="N60.ai" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="N60.ai" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(seo.jsonLd)}</script>
      
      {/* Additional Structured Data for Norwegian Market */}
      {lang === 'no' && (
        <>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "N60.ai",
              url: "https://n60.ai",
              description: "AI-drevet B2B-markedsføring for norske bedrifter",
              inLanguage: "no",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://n60.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })}
          </script>
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "N60.ai",
              description: "AI-drevet B2B-markedsføring for små og mellomstore bedrifter i Norge",
              url: "https://n60.ai",
              telephone: "+47-XXX-XX-XXX",
              email: "matthew@n60.ai",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bergen",
                addressCountry: "NO"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "60.3913",
                longitude: "5.3221"
              },
              openingHours: "Mo-Fr 09:00-17:00",
              priceRange: "$$",
              paymentAccepted: "Credit Card, Bank Transfer",
              currenciesAccepted: "NOK, EUR, USD"
            })}
          </script>
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "N60.ai AI Marketing Platform",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              description: "AI-drevet markedsføringsplattform for norske bedrifter",
              url: "https://n60.ai",
              author: {
                "@type": "Organization",
                name: "N60.ai"
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "NOK",
                description: "Gratis demo og konsultasjon"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1"
              }
            })}
          </script>
        </>
      )}
    </Helmet>
  );
};

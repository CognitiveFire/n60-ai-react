# SEO Setup Guide for N60.ai

## Overview
This guide explains how to complete the SEO setup for your Norwegian AI marketing website.

## 1. Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Enter your domain: `https://n60.ai`
4. Choose "Domain" verification method

### Step 2: Get Verification Code
1. In Search Console, go to "Settings" → "Ownership verification"
2. Choose "HTML tag" method
3. Copy the verification code (looks like: `google-site-verification=abc123...`)
4. Replace `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` in `index.html` with your actual code

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Add sitemap URL: `https://n60.ai/sitemap.xml`
3. Click "Submit"

## 2. Google Analytics 4 Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for `n60.ai`
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Update Code
Replace `GA_MEASUREMENT_ID` in `index.html` with your actual Measurement ID.

## 3. Google Tag Manager Setup

### Step 1: Create GTM Container
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container for `n60.ai`
3. Get your Container ID (format: `GTM-XXXXXXX`)

### Step 2: Update Code
Replace `GTM-XXXXXXX` in `index.html` with your actual Container ID.

## 4. Microsoft Clarity Setup

### Step 1: Create Clarity Project
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Create a new project for `n60.ai`
3. Get your Clarity ID

### Step 2: Update Code
Replace `YOUR_CLARITY_ID` in `index.html` with your actual Clarity ID.

## 5. Hotjar Setup

### Step 1: Create Hotjar Account
1. Go to [Hotjar](https://www.hotjar.com/)
2. Create a new site for `n60.ai`
3. Get your Hotjar Site ID

### Step 2: Update Code
Replace `YOUR_HOTJAR_ID` in `index.html` with your actual Hotjar Site ID.

## 6. Other Search Engines

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Add your site and get verification code
3. Replace `YOUR_BING_VERIFICATION_CODE` in `index.html`

### Yandex Webmaster
1. Go to [Yandex Webmaster](https://webmaster.yandex.com/)
2. Add your site and get verification code
3. Replace `YOUR_YANDEX_VERIFICATION_CODE` in `index.html`

## 7. SEO Features Already Implemented

### ✅ Norwegian Language Optimization
- Language meta tags (`lang="no"`)
- Norwegian keywords and descriptions
- Geographic targeting (Norway)
- Norwegian structured data

### ✅ Technical SEO
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- Mobile optimization
- Performance optimization (preconnect, dns-prefetch)

### ✅ Structured Data
- Organization schema
- Service schema
- WebSite schema with search functionality
- Contact information
- Business location (Bergen, Norway)

### ✅ Search Engine Files
- `robots.txt` - Guides search engine crawlers
- `sitemap.xml` - Lists all important pages
- Proper meta robots tags

## 8. Next Steps

1. **Replace all placeholder codes** with actual verification codes
2. **Test your setup** using:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

3. **Monitor performance** in:
   - Google Search Console
   - Google Analytics
   - Microsoft Clarity
   - Hotjar

4. **Optimize content** for Norwegian keywords:
   - "AI markedsføring Norge"
   - "B2B markedsføring"
   - "leadgenerering"
   - "produktmarkedsføring"
   - "markedsføringsautomatisering"

## 9. Important Notes

- Update the sitemap.xml dates when you make content changes
- Monitor search console for crawl errors
- Keep verification codes secure
- Test all tracking codes after implementation
- Consider adding more Norwegian-specific keywords based on search trends

## 10. Contact Information

Make sure to update the contact information in the structured data:
- Phone number (currently shows `+47-XXX-XX-XXX`)
- Social media links (LinkedIn, Twitter)
- Physical address details if needed

---

**Remember**: SEO is a long-term strategy. It may take 3-6 months to see significant results in search rankings.

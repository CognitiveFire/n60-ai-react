
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [language, setLanguage] = useState('no');
  const [formStatus, setFormStatus] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  // Content in both languages following Naeva's structure
  const content = {
    no: {
      hero: {
        title: "AI-drevet B2B-markedsføring for SMB-er",
        subtitle: "Optimaliser operasjoner, reduser kostnader og få full innsikt i din markedsføring med smart AI-teknologi.",
        cta: "Se våre løsninger"
      },
      solutions: {
        title: "Våre tre kjerneområder",
        subtitle: "Konkrete AI-løsninger for din vekst",
        cases: [
          {
            title: "AI for produktmarkedsføring",
            description: "Identifiser og målrett idealkundeprofil (ICP) for hvert produkt med AI-drevet analyse.",
            solution: "ICP-definisjon, kampanjeorkestrering, personlige funnels",
            target: "B2B-produktselskaper innen teknologi, industri og SaaS",
            value: "Raskere validering av produkt-marked fit, mer presist bruk av markedsbudsjett",
            dashboard: "/images/hero_dashboard.png"
          },
          {
            title: "AI for leadgenerering",
            description: "Bygg prediktive pipelines som identifiserer hvilke leads som mest sannsynlig konverterer.",
            solution: "Prediktive pipelines, smarte outreach-kampanjer, automatisk lead scoring",
            target: "B2B-tjenesteleverandører, konsulenter, programvareselskaper",
            value: "Bedre leads, ikke bare flere leads, forutsigbar pipeline",
            dashboard: "/images/dashboard-hero.png"
          },
          {
            title: "AI for markedsutvidelse",
            description: "Utvid til nye markeder med AI-drevet markedsinnsikt og lokalisert strategi.",
            solution: "Markedsinnsikt, ABM-kampanjer, lokaliserte funnels",
            target: "Ambitiøse SMB-er i Norge som vil ut internasjonalt",
            value: "Klar vekstplan uten overforbruk, lavere risiko ved nye markeder",
            dashboard: "/images/dashboard-no.png"
          }
        ]
      },
      howItWorks: {
        title: "Vår teknologi",
        description: "Ved å kombinere AI og markedsføringserfaring har vi skapt smarte løsninger for B2B-selskaper. Våre AI-verktøy installeres i eksisterende systemer og gir datainnsamling, automatisering og prosessoptimalisering - alt gjennom én plattform.",
        cta: "Lær mer"
      },
      value: {
        title: "Innsikt og besparelser for dine prosjekter",
        description: "Med N60 får du mer enn bare kontroll - innsikt og sanntidsdata gir grunnlaget for bedre beslutningstaking, samtidig som du sparer tid, penger og ressurser. Vi er klare til å finne løsningen som passer best for deg og din virksomhet.",
        benefits: [
          {
            title: "Spar tid og penger",
            description: "Strømlinjeform og automatiser operasjoner med smart teknologi - alt fra ett sted."
          },
          {
            title: "Få verdifulle innsikter",
            description: "Bruk sanntidsdata og analyse for å optimalisere operasjoner i markedsføringen."
          },
          {
            title: "Sikker og effektiv arbeidsplass",
            description: "Full oversikt og kontroll reduserer risiko og skaper en sikrere arbeidsplass."
          }
        ],
        cta: "Ta kontakt for demo"
      },
      innovation: {
        title: "Innovasjonslag",
        subtitle: "Kutting-edge AI-løsninger for fremtiden",
        features: [
          {
            title: "AI Chat & Voice Assistants",
            description: "Integrert chat + valgfri taleagent-integrasjon for bedre kundeservice",
            price: 15000,
            hours: 25,
            dashboard: "/images/N60BOT-DARK.png"
          },
          {
            title: "Smart Forms & Landing Pages",
            description: "Adaptive skjemaer og konverteringsoptimalisering",
            price: 12000,
            hours: 20,
            dashboard: "/images/Formulate.png"
          },
          {
            title: "WhatsApp / Social Campaigns",
            description: "Multi-channel outreach-oppsett på tvers av sosiale medier",
            price: 15000,
            hours: 25,
            dashboard: "/images/dashboard-social-campaigns.jpg"
          },
          {
            title: "Personlige produktguider",
            description: "AI-genererte ROI-guider, PDFs/mikrosider",
            price: 18000,
            hours: 30,
            dashboard: "/images/dashboard-product-guides.jpg"
          },
          {
            title: "Augmented Content & Translation",
            description: "Kampanjevinkel-forslag + naturlig lokalisering",
            price: 18000,
            hours: 30,
            dashboard: "/images/dashboard-content-translation.jpg"
          },
          {
            title: "Prediktive innsikter / Churn Risk",
            description: "Forecasting-dashboards, kontohelse-anbefalinger",
            price: 21000,
            hours: 35,
            dashboard: "/images/dashboard-predictive-insights.jpg"
          },
          {
            title: "Event-to-Pipeline Automation",
            description: "AI som knytter events til CRM-oppfølging",
            price: 24000,
            hours: 40,
            dashboard: "/images/dashboard-event-automation.jpg"
          }
        ]
      },
      whatIs: {
        title: "Hva er N60?",
        subtitle: "AI-drevet B2B-markedsføring for små og mellomstore bedrifter",
        description: "N60 er et Bergen-basert konsulentselskap som spesialiserer seg på AI-drevet B2B-markedsføring for små og mellomstore bedrifter. Vi kombinerer dyp markedsføringserfaring med kutting-edge AI-verktøy for å levere skalerbar vekst, forutsigbare pipelines og målbar ROI.",
        features: [
          "25+ års markedsføringserfaring kombinert med moderne AI-automatisering",
          "Skalerbar vekst - bygg, mål og optimaliser pipeline raskere",
          "Handlingsklare innsikter - AI-analyse som omgjør data til beslutninger",
          "Bygget for SMB-er - rimelig, fleksibelt og tilpasset din vekstfase"
        ]
      },
      whoFor: {
        title: "Hvem er N60 for?",
        subtitle: "Norske SMB-er som er klare til å vokse på tvers av Skandinavia og Europa",
        targets: [
          {
            title: "SMB-er i Norge",
            description: "Som ønsker vekst i Skandinavia og Europa med AI-drevet markedsføring."
          },
          {
            title: "B2B-selskaper",
            description: "Som vil ha smartere demand generation og outreach uten å bygge store interne team."
          },
          {
            title: "Ledelsesteam",
            description: "Som ønsker forutsigbar, skalerbar markedsføring med målbar ROI."
          }
        ]
      },
      howWeWork: {
        title: "Hvordan vi jobber",
        subtitle: "Konkret, forretningsorientert tilnærming til planlegging og implementering",
        steps: [
          {
            title: "Kartlegging",
            description: "Forstå dine mål, marked og pipeline-utfordringer gjennom grundig analyse."
          },
          {
            title: "AI-drevet strategi",
            description: "Utvikle demand generation, outreach, account management og prediksjon."
          },
          {
            title: "Implementering",
            description: "Automatisere kampanjer, outreach og rapportering med AI-verktøy."
          },
          {
            title: "Kontinuerlig optimalisering",
            description: "Datadrevne forbedringer som gir effekt og øker ROI over tid."
          }
        ]
      },
      whyAI: {
        title: "Hvorfor AI-drevet markedsføring?",
        subtitle: "Konkrete fordeler sammenlignet med tradisjonelle metoder",
        benefits: [
          {
            title: "Høyere kvalitet leads, raskere",
            description: "AI identifiserer og prioriterer leads basert på konverteringssannsynlighet, ikke bare volum."
          },
          {
            title: "Forutsigbar pipeline og forbedret konvertering",
            description: "Prediktive modeller gir deg innsikt i hvilke prospekter som er klare til å kjøpe."
          },
          {
            title: "Skalerbar outreach uten ekstra ansatte",
            description: "Automatiserte kampanjer som personaliserer på skala uten å miste menneskelig touch."
          },
          {
            title: "Datainnsikt som driver smartere beslutninger",
            description: "AI-analyse avslører mønstre og muligheter som er umulige å oppdage manuelt."
          }
        ]
      },
      whyN60: {
        title: "Hvorfor N60?",
        subtitle: "Fordeler sammenlignet med HubSpot / Salesforce full suites",
        advantages: [
          {
            title: "Fokusert på SMB-behov",
            description: "Vi bygger ikke for enterprise, men for din størrelse og vekstfase med konkrete løsninger."
          },
          {
            title: "Transparent prising",
            description: "Ingen skjulte kostnader eller årlige kontrakter. Betal kun for det du trenger."
          },
          {
            title: "Personlig tilpasning",
            description: "Skreddersydde løsninger som passer din bransje og målgruppe, ikke generiske templates."
          },
          {
            title: "Lokal ekspertise",
            description: "Forstår norske markeder og kan hjelpe deg med å ekspandere i Skandinavia og Europa."
          }
        ]
      },
      labs: {
        title: "N60 Labs",
        subtitle: "AI-innovasjon og forskning for fremtidens markedsføring",
        projects: [
          {
            title: "AI-drevet leadgenerering",
            description: "Utvikler AI-verktøy for å forbedre leadgenereringen og kvalifiseringen med prediktive modeller.",
            image: "/images/ai-lead-gen.jpg"
          },
          {
            title: "Automatiserte kampanjer",
            description: "AI-verktøy som hjelper markedsføringsbyråer med å optimalisere kampanjer og øke ROI.",
            image: "/images/ai-campaigns.jpg"
          },
          {
            title: "Prediktiv markedsføring",
            description: "Forutser kunder i risiko for å forlate og gir preskriptive anbefalinger for å beholde dem.",
            image: "/images/ai-predictive.jpg"
          }
        ]
      },
      contact: {
        title: "Få et skreddersydd tilbud",
        subtitle: "Vår smarte skjema gir deg en personlig AI-markedsføringsløsning med detaljert prising",
        form: {
          name: "Navn",
          email: "E-post",
          company: "Bedrift",
          challenge: "Hvilken utfordring har du?",
          innovation: "Hvilke innovasjonsløsninger trenger du?",
          size: "Bedriftsstørrelse",
          market: "Målmarked",
          timeline: "Tidsplan",
          budget: "Budsjett",
          submit: "Få personlig tilbud"
        },
        modules: {
          core: [
            {
              id: "product-marketing",
              name: "AI for produktmarkedsføring",
              description: "ICP-definisjon, kampanjeorkestrering, personlige funnels",
              hours: 40,
              price: 24000
            },
            {
              id: "lead-generation", 
              name: "AI for leadgenerering",
              description: "Prediktiv scoring, outreach-automatisering, pipeline-dashboards",
              hours: 45,
              price: 27000
            },
            {
              id: "market-expansion",
              name: "AI for markedsutvidelse", 
              description: "Markedsinnsikt, ABM light/full, lokaliseringsoppsett",
              hours: 50,
              price: 30000
            }
          ],
          innovation: [
            {
              id: "chat-bots",
              name: "Chat/Voice/Help Bots",
              description: "Integrert chat + valgfri taleagent-integrasjon",
              hours: 25,
              price: 15000
            },
            {
              id: "smart-forms",
              name: "Smarte skjemaer og landingssider",
              description: "Adaptive skjemaer, konverteringsoptimalisering",
              hours: 20,
              price: 12000
            },
            {
              id: "whatsapp-social",
              name: "WhatsApp / Sosiale kampanjer",
              description: "Multi-kanal outreach-oppsett",
              hours: 25,
              price: 15000
            },
            {
              id: "product-guides",
              name: "Personlige produktguider",
              description: "AI-genererte ROI-guider, PDF-er/mikrosider",
              hours: 30,
              price: 18000
            },
            {
              id: "content-translation",
              name: "Forsterket innhold + oversettelse",
              description: "Kampanjevinkelforslag + naturlig lokalisering",
              hours: 30,
              price: 18000
            },
            {
              id: "predictive-insights",
              name: "Prediktive innsikter / Churn-risiko",
              description: "Forecastings-dashboards, kontohverdsanbefalinger",
              hours: 35,
              price: 21000
            },
            {
              id: "event-pipeline",
              name: "Event-til-Pipeline-automatisering",
              description: "AI som kobler events til CRM-oppfølging",
              hours: 40,
              price: 24000
            }
          ]
        }
      }
    },
    en: {
      hero: {
        title: "AI-driven B2B marketing for SMEs",
        subtitle: "Optimize operations, reduce costs, and gain full insight into your marketing with smart AI technology.",
        cta: "See our solutions"
      },
      solutions: {
        title: "Our three core areas",
        subtitle: "Concrete AI solutions for your growth",
        cases: [
          {
            title: "AI for product marketing",
            description: "Identify and target ideal customer profiles (ICP) for each product with AI-driven analysis.",
            solution: "ICP definition, campaign orchestration, personalized funnels",
            target: "B2B technology, industry, and SaaS companies",
            value: "Faster product-market fit validation, more precise use of marketing budget",
            dashboard: "/images/dashboard-product-marketing.jpg"
          },
          {
            title: "AI for lead generation",
            description: "Build predictive pipelines that identify which leads are most likely to convert.",
            solution: "Predictive pipelines, smart outreach campaigns, automated lead scoring",
            target: "B2B service providers, consultants, software companies",
            value: "Better leads, not just more leads, predictable pipeline",
            dashboard: "/images/dashboard-lead-generation.jpg"
          },
          {
            title: "AI for market expansion",
            description: "Expand to new markets with AI-driven market insights and localized strategy.",
            solution: "Market insights, ABM campaigns, localized funnels",
            target: "Ambitious SMBs in Norway looking to go international",
            value: "Clear growth plan without over-investment, lower risk when entering new markets",
            dashboard: "/images/dashboard-market-expansion.jpg"
          }
        ]
      },
      innovation: {
        title: "Innovation Layer",
        subtitle: "Cutting-edge AI solutions for the future",
        features: [
          {
            title: "AI Chat & Voice Assistants",
            description: "Integrated chat + optional voice agent integration for better customer service",
            price: 15000,
            hours: 25,
            dashboard: "/images/dashboard-chat-bots.jpg"
          },
          {
            title: "Smart Forms & Landing Pages",
            description: "Adaptive forms and conversion optimization",
            price: 12000,
            hours: 20,
            dashboard: "/images/dashboard-smart-forms.jpg"
          },
          {
            title: "WhatsApp / Social Campaigns",
            description: "Multi-channel outreach setup across social media",
            price: 15000,
            hours: 25,
            dashboard: "/images/dashboard-social-campaigns.jpg"
          },
          {
            title: "Personalized product guides",
            description: "AI-generated ROI guides, PDFs/microsites",
            price: 18000,
            hours: 30,
            dashboard: "/images/dashboard-product-guides.jpg"
          },
          {
            title: "Augmented Content & Translation",
            description: "Campaign angle suggestions + natural localization",
            price: 18000,
            hours: 30,
            dashboard: "/images/dashboard-content-translation.jpg"
          },
          {
            title: "Predictive insights / Churn Risk",
            description: "Forecasting dashboards, account health recommendations",
            price: 21000,
            hours: 35,
            dashboard: "/images/dashboard-predictive-insights.jpg"
          },
          {
            title: "Event-to-Pipeline Automation",
            description: "AI bridging events to CRM follow-up",
            price: 24000,
            hours: 40,
            dashboard: "/images/dashboard-event-automation.jpg"
          }
        ]
      },
      whatIs: {
        title: "What is N60?",
        subtitle: "AI-driven B2B marketing for small and medium-sized enterprises",
        description: "N60 is a Bergen-based consultancy specializing in AI-driven B2B marketing for small and medium-sized businesses. We combine deep marketing expertise with cutting-edge AI tools to deliver scalable growth, predictable pipelines, and measurable ROI.",
        features: [
          "25+ years of marketing experience combined with modern AI automation",
          "Scalable growth - build, measure, and optimize your pipeline faster",
          "Actionable insights - AI-powered analytics that turn data into decisions",
          "Built for SMEs - affordable, flexible, and tailored to your growth stage"
        ]
      },
      whoFor: {
        title: "Who is N60 for?",
        subtitle: "Norwegian SMEs ready to grow across Scandinavia and Europe",
        targets: [
          {
            title: "SMEs in Norway",
            description: "Ready to grow across Scandinavia and Europe with AI-driven marketing."
          },
          {
            title: "B2B companies",
            description: "That want smarter demand generation and outreach without building large in-house teams."
          },
          {
            title: "Leadership teams",
            description: "Looking for predictable, scalable marketing with measurable ROI."
          }
        ]
      },
      howWeWork: {
        title: "How We Work",
        subtitle: "Concrete, business-oriented approach to planning and implementation",
        steps: [
          {
            title: "Discovery session",
            description: "Understand your goals, market, and pipeline challenges through thorough analysis."
          },
          {
            title: "AI-driven strategy",
            description: "Develop demand generation, outreach, account management, and prediction."
          },
          {
            title: "Implementation",
            description: "Automate campaigns, outreach, and reporting with AI tools."
          },
          {
            title: "Ongoing optimization",
            description: "Data-driven improvements that deliver results and increase ROI over time."
          }
        ]
      },
      whyAI: {
        title: "Why AI-driven marketing?",
        subtitle: "Concrete benefits compared to traditional methods",
        benefits: [
          {
            title: "Higher quality leads, faster",
            description: "AI identifies and prioritizes leads based on conversion probability, not just volume."
          },
          {
            title: "Predictable pipeline and improved conversion",
            description: "Predictive models give you insight into which prospects are ready to buy."
          },
          {
            title: "Scalable outreach without extra staff",
            description: "Automated campaigns that personalize at scale without losing human touch."
          },
          {
            title: "Data insights that drive smarter decisions",
            description: "AI analysis reveals patterns and opportunities impossible to detect manually."
          }
        ]
      },
      whyN60: {
        title: "Why N60?",
        subtitle: "Advantages compared to HubSpot / Salesforce full suites",
        advantages: [
          {
            title: "Focused on SME needs",
            description: "We don't build for enterprise, but for your size and growth stage with concrete solutions."
          },
          {
            title: "Transparent pricing",
            description: "No hidden costs or annual contracts. Pay only for what you need."
          },
          {
            title: "Personal customization",
            description: "Tailored solutions that fit your industry and target audience, not generic templates."
          },
          {
            title: "Local expertise",
            description: "Understands Norwegian markets and can help you expand in Scandinavia and Europe."
          }
        ]
      },
      labs: {
        title: "N60 Labs",
        subtitle: "AI innovation and research for the future of marketing",
        projects: [
          {
            title: "AI-driven lead generation",
            description: "Develop AI tools to improve lead generation and qualification with predictive models.",
            image: "/images/ai-lead-gen.jpg"
          },
          {
            title: "Automated campaigns",
            description: "AI tools that help marketing agencies optimize campaigns and increase ROI.",
            image: "/images/ai-campaigns.jpg"
          },
          {
            title: "Predictive marketing",
            description: "Predicts customers at risk of leaving and provides prescriptive recommendations to retain them.",
            image: "/images/ai-predictive.jpg"
          }
        ]
      },
      contact: {
        title: "Få et skreddersydd tilbud",
        subtitle: "Vår smarte skjema gir deg en personlig AI-markedsføringsløsning med detaljert prising",
        form: {
          name: "Navn",
          email: "E-post",
          company: "Bedrift",
          challenge: "Hvilken utfordring har du?",
          innovation: "Hvilke innovasjonsløsninger trenger du?",
          size: "Bedriftsstørrelse",
          market: "Målmarked",
          timeline: "Tidsplan",
          budget: "Budsjett",
          submit: "Få personlig tilbud"
        },
        modules: {
          core: [
            {
              id: "product-marketing",
              name: "AI for produktmarkedsføring",
              description: "ICP-definisjon, kampanjeorkestrering, personlige funnels",
              hours: 40,
              price: 24000
            },
            {
              id: "lead-generation", 
              name: "AI for leadgenerering",
              description: "Prediktiv scoring, outreach-automatisering, pipeline-dashboards",
              hours: 45,
              price: 27000
            },
            {
              id: "market-expansion",
              name: "AI for markedsutvidelse", 
              description: "Markedsinnsikt, ABM light/full, lokaliseringsoppsett",
              hours: 50,
              price: 30000
            }
          ],
          innovation: [
            {
              id: "chat-bots",
              name: "Chat/Voice/Help Bots",
              description: "Integrert chat + valgfri taleagent-integrasjon",
              hours: 25,
              price: 15000
            },
            {
              id: "smart-forms",
              name: "Smarte skjemaer og landingssider",
              description: "Adaptive skjemaer, konverteringsoptimalisering",
              hours: 20,
              price: 12000
            },
            {
              id: "whatsapp-social",
              name: "WhatsApp / Sosiale kampanjer",
              description: "Multi-kanal outreach-oppsett",
              hours: 25,
              price: 15000
            },
            {
              id: "product-guides",
              name: "Personlige produktguider",
              description: "AI-genererte ROI-guider, PDF-er/mikrosider",
              hours: 30,
              price: 18000
            },
            {
              id: "content-translation",
              name: "Forsterket innhold + oversettelse",
              description: "Kampanjevinkelforslag + naturlig lokalisering",
              hours: 30,
              price: 18000
            },
            {
              id: "predictive-insights",
              name: "Prediktive innsikter / Churn-risiko",
              description: "Forecastings-dashboards, kontohverdsanbefalinger",
              hours: 35,
              price: 21000
            },
            {
              id: "event-pipeline",
              name: "Event-til-Pipeline-automatisering",
              description: "AI som kobler events til CRM-oppfølging",
              hours: 40,
              price: 24000
            }
          ]
        }
      },
      pricing: {
        title: "Pris",
        subtitle: "Velg pakken som passer best for deg",
        featureLabel: "Funksjon / Verdi",
        starter: {
          name: "Start",
          description: "For små bedrifter som trenger en grunnleggende markedsføringsverktøy."
        },
        growth: {
          name: "Vekst",
          description: "For bedrifter som ønsker å utvikle seg og nå større markeder."
        },
        scale: {
          name: "Skala",
          description: "For store bedrifter som trenger avanserte markedsføringsverktøy og personalisering."
        },
        features: [
          { 
            name: "AI-støttet demand generation", 
            starter: "✅", 
            growth: "✅", 
            scale: "✅" 
          },
          { 
            name: "AI-automatisert outreach", 
            starter: "Enkle sekvenser", 
            growth: "Tilpasset nurturing", 
            scale: "Hyper-personalisert" 
          },
          { 
            name: "Lead capture-optimalisering", 
            starter: "✅", 
            growth: "✅", 
            scale: "✅" 
          },
          { 
            name: "Account-Based Marketing (ABM)", 
            starter: "—", 
            growth: "Light (utvalgte konti)", 
            scale: "Full ABM med egne reiser" 
          },
          { 
            name: "Prediktiv lead scoring", 
            starter: "—", 
            growth: "✅", 
            scale: "Avansert prediksjon + forecasting" 
          },
          { 
            name: "Datadrevne innsikter", 
            starter: "Enkel dashboard", 
            growth: "Handlingsklare rapporter", 
            scale: "Beslutningsdashboards" 
          },
          { 
            name: "Støtte for markedsutvidelse", 
            starter: "—", 
            growth: "Regionalt fokus", 
            scale: "Skandinavisk & europeisk skalering" 
          },
          { 
            name: "Kontinuerlig optimalisering", 
            starter: "—", 
            growth: "✅", 
            scale: "Avansert AI-modelltrening" 
          },
          { 
            name: "Verdi / ROI", 
            starter: "Rask effekt, spar tid", 
            growth: "Forutsigbar pipeline", 
            scale: "Skalerbar vekst, konkurransefortrinn" 
          }
        ],
        cta: "Ta kontakt for demo"
      }
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    // AOS.init({
    //   duration: 700,
    //   once: true,
    //   offset: 100,
    //   startEvent: 'DOMContentLoaded',
    // });
    // AOS.refresh();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const submissionData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      size: formData.get('size'),
      market: formData.get('market'),
      timeline: formData.get('timeline'),
      budget: formData.get('budget'),
      selectedModules: selectedModules,
      totalPrice: totalPrice,
      totalHours: totalHours,
      estimatedTimeline: document.getElementById('estimated-timeline')?.textContent || '6-8 uker'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: `Takk for din henvendelse, ${submissionData.name}! Vi sender deg et detaljert forslag basert på dine valg innen 24 timer.`
        });
        e.target.reset();
        setSelectedModules([]);
        setTotalPrice(0);
        setTotalHours(0);
      } else {
        setFormStatus({
          type: 'error',
          message: 'Det oppstod en feil. Vennligst prøv igjen senere.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Det oppstod en feil. Vennligst prøv igjen senere.'
      });
    }
  };

  const updateQuote = (event) => {
    const moduleId = event.target.value;
    const isChecked = event.target.checked;
    
    if (isChecked) {
      // Add module to selected modules
      const module = currentContent.contact.modules.core.find(m => m.id === moduleId) || 
                     currentContent.contact.modules.innovation.find(m => m.id === moduleId);
      
      if (module && !selectedModules.includes(moduleId)) {
        setSelectedModules(prev => [...prev, moduleId]);
      }
    } else {
      // Remove module from selected modules
      setSelectedModules(prev => prev.filter(id => id !== moduleId));
    }
  };

  // Calculate totals when selected modules change
  useEffect(() => {
    let newTotalPrice = 0;
    let newTotalHours = 0;
    
    selectedModules.forEach(moduleId => {
      const module = currentContent.contact.modules.core.find(m => m.id === moduleId) || 
                     currentContent.contact.modules.innovation.find(m => m.id === moduleId);
      
      if (module) {
        newTotalPrice += module.price;
        newTotalHours += module.hours;
      }
    });
    
    setTotalPrice(newTotalPrice);
    setTotalHours(newTotalHours);
  }, [selectedModules, currentContent.contact.modules]);

  const updateQuoteDisplay = () => {
    const quoteItemsDiv = document.getElementById('quote-items');
    if (!quoteItemsDiv) return;

    // Clear existing items
    quoteItemsDiv.innerHTML = '';

    // Add selected modules
    selectedModules.forEach(moduleId => {
      const module = currentContent.contact.modules.core.find(m => m.id === moduleId) || 
                     currentContent.contact.modules.innovation.find(m => m.id === moduleId);
      
      if (module) {
        const item = document.createElement('div');
        item.className = 'quote-item';
        item.innerHTML = `
          <strong>${module.name}</strong>
          <small>${module.description}</small>
          <span class="price-tag">${module.price.toLocaleString()} NOK</span>
        `;
        quoteItemsDiv.appendChild(item);
      }
    });

    // Update total price
    const totalPriceSpan = document.getElementById('total-price');
    if (totalPriceSpan) {
      totalPriceSpan.textContent = totalPrice.toLocaleString();
    }

    // Update total hours
    const totalHoursSpan = document.getElementById('total-hours');
    if (totalHoursSpan) {
      totalHoursSpan.textContent = totalHours;
    }

    // Update timeline
    const timelineSpan = document.getElementById('estimated-timeline');
    if (timelineSpan) {
      if (totalHours <= 50) {
        timelineSpan.textContent = '4-6 uker';
      } else if (totalHours <= 100) {
        timelineSpan.textContent = '6-8 uker';
      } else {
        timelineSpan.textContent = '8-12 uker';
      }
    }
  };

  const nextStep = () => {
    const currentStep = document.querySelector('.form-step.active');
    const nextStep = currentStep.nextElementSibling;
    
    if (nextStep && nextStep.classList.contains('form-step')) {
      currentStep.classList.remove('active');
      nextStep.classList.add('active');
    }
  };

  const prevStep = () => {
    const currentStep = document.querySelector('.form-step.active');
    const prevStep = currentStep.previousElementSibling;
    
    if (prevStep && prevStep.classList.contains('form-step')) {
      currentStep.classList.remove('active');
      prevStep.classList.add('active');
    }
  };

  // Update quote display when selected modules change
  useEffect(() => {
    updateQuoteDisplay();
  }, [selectedModules, totalPrice, totalHours]);

  // Add event listeners for form navigation
  useEffect(() => {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    nextButtons.forEach(button => {
      button.addEventListener('click', nextStep);
    });

    prevButtons.forEach(button => {
      button.addEventListener('click', prevStep);
    });

    return () => {
      nextButtons.forEach(button => {
        button.removeEventListener('click', nextStep);
      });
      prevButtons.forEach(button => {
        button.removeEventListener('click', prevStep);
      });
    };
  }, []);

  return (
    <>
      <div className="App">
        <Navbar language={language} setLanguage={setLanguage} />

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            <img src="/images/hero1.png" alt="AI Marketing Solutions" />
            <div className="hero-overlay"></div>
          </div>
          <div className="container">
            <div className="hero-content" data-aos="fade-up">
              <h1>{currentContent.hero.title}</h1>
              <p>{currentContent.hero.subtitle}</p>
              <a href="#solutions" className="cta-button">{currentContent.hero.cta}</a>
            </div>
          </div>
        </section>

        {/* What is N60 Section */}
        <section className="what-is-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.whatIs.title}</h2>
              <p>{currentContent.whatIs.subtitle}</p>
            </div>
            <div className="what-is-content">
              <div className="what-is-text" data-aos="fade-right">
                <p>{currentContent.whatIs.description}</p>
                <ul>
                  {currentContent.whatIs.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="what-is-visual" data-aos="fade-left">
                <img src="/images/logo.png" alt="N60 Logo" className="n60-logo" />
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section className="who-for-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.whoFor.title}</h2>
              <p>{currentContent.whoFor.subtitle}</p>
            </div>
            <div className="who-for-grid">
              {currentContent.whoFor.targets.map((target, index) => (
                <div key={index} className="target-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3>{target.title}</h3>
                  <p>{target.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section - Three Core Business Cases */}
        <section id="solutions" className="solutions-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.solutions.title}</h2>
              <p>{currentContent.solutions.subtitle}</p>
            </div>
            <div className="solutions-grid">
              {currentContent.solutions.cases.map((solution, index) => (
                <div key={index} className="solution-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="solution-image">
                    <img src={solution.dashboard} alt={solution.title} />
                  </div>
                  <div className="solution-content">
                    <h3>{solution.title}</h3>
                    <p className="solution-description">{solution.description}</p>
                    <div className="solution-details">
                      <div className="detail-item">
                        <strong>Løsning:</strong>
                        <p>{solution.solution}</p>
                      </div>
                      <div className="detail-item">
                        <strong>Passer best for:</strong>
                        <p>{solution.target}</p>
                      </div>
                      <div className="detail-item">
                        <strong>Verdi:</strong>
                        <p>{solution.value}</p>
                      </div>
                    </div>
                    <a href="#contact" className="solution-cta">Få tilbud</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Layer Section */}
        <section id="innovation" className="innovation-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.innovation.title}</h2>
              <p>{currentContent.innovation.subtitle}</p>
            </div>
            <div className="innovation-grid">
              {currentContent.innovation.features.map((feature, index) => (
                <div key={index} className="innovation-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="innovation-image">
                    <img src={feature.dashboard} alt={feature.title} />
                  </div>
                  <div className="innovation-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <div className="innovation-price">
                      <span className="price">{feature.price} NOK</span>
                      <span className="hours">{feature.hours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section id="how-we-work" className="how-we-work-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.howWeWork.title}</h2>
              <p>{currentContent.howWeWork.subtitle}</p>
            </div>
            <div className="work-steps">
              {currentContent.howWeWork.steps.map((step, index) => (
                <div key={index} className="work-step" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AI Section */}
        <section id="why-ai" className="why-ai-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.whyAI.title}</h2>
              <p>{currentContent.whyAI.subtitle}</p>
            </div>
            <div className="why-ai-grid">
              {currentContent.whyAI.benefits.map((benefit, index) => (
                <div key={index} className="why-ai-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why N60 Section */}
        <section id="why-n60" className="why-n60-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.whyN60.title}</h2>
              <p>{currentContent.whyN60.subtitle}</p>
            </div>
            <div className="why-n60-grid">
              {currentContent.whyN60.advantages.map((advantage, index) => (
                <div key={index} className="why-n60-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* N60 Labs Section (formerly Projects) */}
        <section id="labs" className="labs-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.labs.title}</h2>
              <p>{currentContent.labs.subtitle}</p>
            </div>
            <div className="labs-grid">
              {currentContent.labs.projects.map((project, index) => (
                <div key={index} className="lab-project" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      <span>AI</span>
                      <span>Marketing</span>
                      <span>Innovation</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with Smart Form */}
        <section id="contact" className="contact-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.contact.title}</h2>
              <p>{currentContent.contact.subtitle}</p>
            </div>
            <div className="contact-content">
              <div className="contact-form-container" data-aos="fade-right">
                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-step active" id="step-1">
                    <h3>Hva er din hovedutfordring innen markedsføring i dag?</h3>
                    <div className="checkbox-group">
                      {currentContent.contact.modules.core.map((module) => (
                        <label key={module.id} className="checkbox-label">
                          <input 
                            type="checkbox" 
                            name="challenge" 
                            value={module.id}
                            onChange={updateQuote}
                          />
                          <div className="checkbox-content">
                            <strong>{module.name}</strong>
                            <small>{module.description}</small>
                            <span className="price-tag">{module.price.toLocaleString()} NOK</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button type="button" className="next-step">Neste</button>
                  </div>
                  
                  <div className="form-step" id="step-2">
                    <h3>Hvilke innovasjonsløsninger er mest relevante for din vekst?</h3>
                    <div className="checkbox-group">
                      {currentContent.contact.modules.innovation.map((module) => (
                        <label key={module.id} className="checkbox-label">
                          <input 
                            type="checkbox" 
                            name="innovation" 
                            value={module.id}
                            onChange={updateQuote}
                          />
                          <div className="checkbox-content">
                            <strong>{module.name}</strong>
                            <small>{module.description}</small>
                            <span className="price-tag">{module.price.toLocaleString()} NOK</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="form-navigation">
                      <button type="button" className="prev-step">Tilbake</button>
                      <button type="button" className="next-step">Neste</button>
                    </div>
                  </div>
                  
                  <div className="form-step" id="step-3">
                    <h3>Bedriftsprofil</h3>
                    <select name="size" required>
                      <option value="">Hvor mange ansatte har du?</option>
                      <option value="1-10">1–10</option>
                      <option value="11-30">11–30</option>
                      <option value="31-100">31–100</option>
                      <option value="100+">100+</option>
                    </select>
                    <select name="market" required>
                      <option value="">Hvilke markeder målretter du?</option>
                      <option value="norway">Bare Norge</option>
                      <option value="scandinavia">Skandinavia</option>
                      <option value="europe">Europa</option>
                      <option value="global">Globalt</option>
                    </select>
                    <div className="form-navigation">
                      <button type="button" className="prev-step">Tilbake</button>
                      <button type="button" className="next-step">Neste</button>
                    </div>
                  </div>
                  
                  <div className="form-step" id="step-4">
                    <h3>Tidsplan og budsjett</h3>
                    <select name="timeline" required>
                      <option value="">Når planlegger du å starte?</option>
                      <option value="asap">ASAP (dette kvartalet)</option>
                      <option value="6-months">Innen 6 måneder</option>
                      <option value="12-months">Innen 12 måneder</option>
                    </select>
                    <select name="budget" required>
                      <option value="">Hvilken budsjettramme vurderer du?</option>
                      <option value="under-50k">Under 50,000 NOK</option>
                      <option value="50k-100k">50,000–100,000 NOK</option>
                      <option value="100k-200k">100,000–200,000 NOK</option>
                      <option value="200k+">200,000+ NOK</option>
                    </select>
                    <div className="form-navigation">
                      <button type="button" className="prev-step">Tilbake</button>
                      <button type="button" className="next-step">Neste</button>
                    </div>
                  </div>
                  
                  <div className="form-step" id="step-5">
                    <h3>Kontaktinformasjon</h3>
                    <input type="text" name="name" placeholder={currentContent.contact.form.name} required />
                    <input type="email" name="email" placeholder={currentContent.contact.form.email} required />
                    <input type="text" name="company" placeholder={currentContent.contact.form.company} required />
                    
                    <div className="quote-summary">
                      <h4>Ditt skreddersydde tilbud</h4>
                      <div id="quote-items"></div>
                      <div className="quote-total">
                        <strong>Total: <span id="total-price">0</span> NOK</strong>
                        <small>Estimert tidsplan: <span id="estimated-timeline">6-8 uker</span></small>
                        <small>Total timer: <span id="total-hours">0</span> timer</small>
                      </div>
                    </div>
                    
                    <div className="form-navigation">
                      <button type="button" className="prev-step">Tilbake</button>
                      <button type="submit">{currentContent.contact.form.submit}</button>
                    </div>
                  </div>
                  
                  {formStatus && (
                    <p className={`form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </p>
                  )}
                </form>
              </div>
              <div className="contact-info" data-aos="fade-left">
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.19282804073!2d5.3301803!3d60.3854691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfc04e96f5a39%3A0xda17ce282c8e9338!2sMedia%20City%20Bergen%20AS!5e0!3m2!1sen!2sno!4v1697654321!5m2!1sen!2sno"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '12px' }}
                    loading="lazy"
                    title="Media City Bergen"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} N60</p>
          <p className="made-with-love">Made in Bergen, Norway, with love ❤️</p>
        </div>
      </footer>

      <a
        href="https://calendly.com/n60/new-meeting"
        target="_blank"
        rel="noopener noreferrer"
        className="chat-tab"
      >
        <img
          src="/images/N60BOT-DARK.png"
          alt="Chat med N60"
          className="chat-tab-image"
        />
      </a>
    </>
  );
}

export default App;
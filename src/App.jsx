
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';
import './components/Contact.css';

function App() {
  const [language, setLanguage] = useState('no');
  const [formStatus, setFormStatus] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formSelections, setFormSelections] = useState({
    challenge: '',
    mainChallenge: [],
    innovation: [],
    companySize: '',
    name: '',
    email: '',
    company: ''
  });

  // Debug logging
  console.log('Current step:', currentStep);
  console.log('Form selections:', formSelections);
  
  // Version: 1.0.1 - Force cache refresh

  // Content in both languages following Naeva's structure
  const content = {
    no: {
      hero: {
        title: "Alt du trenger for B2B-vekst",
        subtitle: "AI-løsninger som dekker hele reisen – fra produkt til kunde og videre til nye markeder.",
        cta: "Få et tilpasset tilbud"
      },
      solutions: {
        title: "Alt du trenger for B2B-vekst",
        subtitle: "AI-løsninger som dekker hele reisen – fra produkt til kunde og videre til nye markeder.",
        cases: [
          {
            title: "Produktmarkedsføring",
            emoji: "🎯",
            description: "Nå de riktige kundene, med budskap som skaper etterspørsel.",
            features: [
              "Finn din idealkundeprofil (ICP)",
              "Skap kampanjer som bygger interesse",
              "Personlige kundereiser som leder til kjøp"
            ]
          },
          {
            title: "Leadgenerering",
            emoji: "📈",
            description: "Fyll pipelinen med kvalifiserte leads, ikke bare flere kontakter.",
            features: [
              "Prediktive pipelines viser hvem som vil kjøpe",
              "Outreach i skala, men med personlig preg",
              "Høyere konverteringsrate for salget ditt"
            ]
          },
          {
            title: "Markedsutvidelse",
            emoji: "🌍",
            description: "Voks trygt inn i nye markeder.",
            features: [
              "AI-drevet innsikt i etterspørsel og konkurrenter",
              "ABM-kampanjer mot nøkkelkunder",
              "Lokalisert kommunikasjon i Skandinavia og Europa"
            ]
          }
        ],
        footer: "👉 Én helhetlig pakke. Verdi og vekst – uten kompleksitet."
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
            submit: "Få personlig tilbud",
            companySizeTitle: "Selskap",
            companySizeSubtitle: "Hvor mange ansatte har dere?",
            companySizeExplanation: "Vi trenger denne informasjonen for å tilpasse løsningen til deres behov og forberede et personlig møte.",
            step1Title: "Velg hovedutfordring",
            step1Subtitle: "Hva er din hovedutfordring innen markedsføring i dag?",
            step2Title: "Dine hovedutfordringer",
            step2Subtitle: "Hva er de største utfordringene for bedriften?",
            step3Title: "Innovasjoner",
            step3Subtitle: "Hvilke løsninger er mest aktuelle for din bedrift?",
            step4Title: "Selskap",
            step4Subtitle: "Hvor mange ansatte har dere?",
            step5Title: "Kontakt og strategimøte",
            step5Subtitle: "Basert på dine valg, la oss planlegge et personlig møte:",
            readyForChat: "Klar for en strategisamtale?",
            readyForChatSubtitle: "Vi trenger dine detaljer for å forberede et personlig møte med fullstendig prisoverslag og strategiplan.",
            stepIndicator: "Steg",
            of: "av",
            back: "Tilbake",
            next: "Neste",
            submitButton: "Se ditt tilbud",
            step1Button: "Fortsett",
            step2Button: "Neste",
            step3Button: "Neste",
            step4Button: "Neste",
            step5Button: "Se ditt tilbud",
            step5Back: "Tilbake",
            namePlaceholder: "Navn",
            emailPlaceholder: "E-post",
            companyPlaceholder: "Bedrift",
            quoteTitle: "Ditt tilpassede tilbud",
            quoteSubtitle: "Basert på dine valg",
            quoteTotal: "Totalt",
            quoteTimeline: "Estimert tidsplan",
            quoteFooter1: "Dette tilbudet er sendt til din e-post og til vårt team.",
            quoteFooter2: "Vi tar kontakt innen 24 timer for å planlegge neste steg."
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
            mainChallenges: [
              {
                id: "demand-generation",
                name: "Generere etterspørsel for produktet",
                description: "Skape interesse og etterspørsel for produktet ditt",
                hours: 20,
                price: 12000
              },
              {
                id: "lead-engagement",
                name: "Finne og engasjere potensielle leads",
                description: "Identifisere og engasjere kvalifiserte leads",
                hours: 25,
                price: 15000
              },
              {
                id: "market-expansion",
                name: "Utvide til nye markeder",
                description: "Ekspandere til nye geografiske områder",
                hours: 30,
                price: 18000
              },
              {
                id: "other",
                name: "Annet",
                description: "Andre markedsføringsutfordringer",
                hours: 15,
                price: 9000
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
    },
    en: {
      hero: {
        title: "Everything you need for B2B growth",
        subtitle: "AI solutions that cover the entire journey – from product to customer and into new markets.",
        cta: "Get a custom quote"
      },
      solutions: {
        title: "Everything you need for B2B growth",
        subtitle: "AI solutions that cover the entire journey – from product to customer and into new markets.",
        cases: [
          {
            title: "Product Marketing",
            emoji: "🎯",
            description: "Reach the right customers with campaigns that create demand.",
            features: [
              "Define your ICP",
              "Build campaigns that spark interest",
              "Personalised funnels that lead to purchase"
            ]
          },
          {
            title: "Lead Generation",
            emoji: "📈",
            description: "Fill your pipeline with qualified leads, not just more contacts.",
            features: [
              "Predictive pipelines show who will buy",
              "Outreach at scale, still personal",
              "Higher sales conversion rates"
            ]
          },
          {
            title: "Market Expansion",
            emoji: "🌍",
            description: "Grow confidently into new markets.",
            features: [
              "AI-driven demand and competitor insights",
              "ABM campaigns for key accounts",
              "Localised communication for Scandinavia & Europe"
            ]
          }
        ],
        footer: "👉 One complete package. Value and growth – without the complexity."
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
      contact: {
        title: "Get a customized quote",
        subtitle: "Our smart form gives you a personalized AI marketing solution with detailed pricing",
        form: {
          name: "Name",
          email: "Email",
          company: "Company",
          challenge: "What challenge do you have?",
          innovation: "What innovation solutions do you need?",
          size: "Company size",
          market: "Target market",
          timeline: "Timeline",
          budget: "Budget",
          submit: "Get personalized quote",
          companySizeTitle: "Company",
          companySizeSubtitle: "How many employees do you have?",
          companySizeExplanation: "We need this information to customize the solution to your needs and prepare for a personal meeting.",
          step1Title: "Choose main challenge",
          step1Subtitle: "What is your main challenge in marketing today?",
          step2Title: "Your main challenges",
          step2Subtitle: "What are the biggest challenges for the company?",
          step3Title: "Innovations",
          step3Subtitle: "Which solutions are most relevant for your company?",
          step4Title: "Company",
          step4Subtitle: "How many employees do you have?",
          step5Title: "Contact and strategy meeting",
          step5Subtitle: "Based on your choices, let's plan a personal meeting:",
          readyForChat: "Ready for a strategy meeting?",
          readyForChatSubtitle: "We need your details to prepare for a personal meeting with complete pricing and strategy plan.",
          stepIndicator: "Step",
          of: "of",
          back: "Back",
          next: "Next",
                      submitButton: "See your quote",
          step1Button: "Continue",
          step2Button: "Next",
          step3Button: "Next",
          step4Button: "Next",
          step5Button: "See your quote",
          step5Back: "Back",
          namePlaceholder: "Name",
          emailPlaceholder: "Email",
          companyPlaceholder: "Company",
          quoteTitle: "Your customized quote",
          quoteSubtitle: "Based on your choices",
          quoteTotal: "Total",
          quoteTimeline: "Estimated timeline",
          quoteFooter1: "This quote has been sent to your email and to our team.",
          quoteFooter2: "We will contact you within 24 hours to plan the next steps."
        },
        modules: {
          core: [
            {
              id: "product-marketing",
              name: "AI for product marketing",
              description: "ICP definition, campaign orchestration, personal funnels",
              hours: 40,
              price: 24000
            },
            {
              id: "lead-generation", 
              name: "AI for lead generation",
              description: "Predictive scoring, outreach automation, pipeline dashboards",
              hours: 45,
              price: 27000
            },
            {
              id: "market-expansion",
              name: "AI for market expansion", 
              description: "Market insights, ABM light/full, localization setup",
              hours: 50,
              price: 30000
            }
          ],
          mainChallenges: [
            {
              id: "demand-generation",
              name: "Generate demand for the product",
              description: "Create interest and demand for your product",
              hours: 20,
              price: 12000
            },
            {
              id: "lead-engagement",
              name: "Find and engage potential leads",
              description: "Identify and engage qualified leads",
              hours: 25,
              price: 15000
            },
            {
              id: "market-expansion",
              name: "Expand to new markets",
              description: "Expand to new geographic areas",
              hours: 30,
              price: 18000
            },
            {
              id: "other",
              name: "Other",
              description: "Other marketing challenges",
              hours: 15,
              price: 9000
            }
          ],
          innovation: [
            {
              id: "chat-bots",
              name: "Chat/Voice/Help Bots",
              description: "Integrated chat + optional voice agent integration",
              hours: 25,
              price: 15000
            },
            {
              id: "smart-forms",
              name: "Smart forms and landing pages",
              description: "Adaptive forms, conversion optimization",
              hours: 20,
              price: 12000
            },
            {
              id: "whatsapp-social",
              name: "WhatsApp / Social campaigns",
              description: "Multi-channel outreach setup",
              hours: 25,
              price: 15000
            },
            {
              id: "product-guides",
              name: "Personalized product guides",
              description: "AI-generated ROI guides, PDFs/microsites",
              hours: 30,
              price: 18000
            },
            {
              id: "content-translation",
              name: "Augmented content + translation",
              description: "Campaign angle suggestions + natural localization",
              hours: 30,
              price: 18000
            },
            {
              id: "predictive-insights",
              name: "Predictive insights / Churn risk",
              description: "Forecasting dashboards, account health recommendations",
              hours: 35,
              price: 21000
            },
            {
              id: "event-pipeline",
              name: "Event-to-Pipeline automation",
              description: "AI bridging events to CRM follow-up",
              hours: 40,
              price: 24000
            }
          ]
        }
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
    
    // Calculate the quote
    const quoteData = {
      ...formSelections,
      totalPrice: totalPrice,
      totalHours: totalHours,
      estimatedTimeline: currentContent.contact.form.submitButton === 'See your quote' ? '6-8 weeks' : '6-8 uker',
      selectedModules: []
    };

    // Add selected modules to quote
    if (formSelections.challenge) {
      const coreModule = currentContent?.contact?.modules?.core?.find(m => m.id === formSelections.challenge);
      if (coreModule) {
        quoteData.selectedModules.push({
          name: coreModule.name,
          description: coreModule.description,
          price: coreModule.price,
          hours: coreModule.hours
        });
      }
    }

    if (formSelections.mainChallenge && formSelections.mainChallenge.length > 0) {
      formSelections.mainChallenge.forEach(challengeId => {
        const module = currentContent?.contact?.modules?.mainChallenges?.find(m => m.id === challengeId);
        if (module) {
          quoteData.selectedModules.push({
            name: module.name,
            description: module.description,
            price: module.price,
            hours: module.hours
          });
        }
      });
    }

    if (formSelections.innovation && formSelections.innovation.length > 0) {
      formSelections.innovation.forEach(innovationId => {
        const module = currentContent?.contact?.modules?.innovation?.find(m => m.id === innovationId);
        if (module) {
          quoteData.selectedModules.push({
            name: module.name,
            description: module.description,
            price: module.price,
            hours: module.hours
          });
        }
      });
    }

    // Show the quote immediately
    setFormStatus({
      type: 'success',
      message: currentContent.contact.form.submitButton === 'See your quote' 
        ? `Thank you for your inquiry, ${formSelections.name}! Here is your customized quote:`
        : `Takk for din henvendelse, ${formSelections.name}! Her er ditt tilpassede tilbud:`
    });
    
    // Show quote details
    setShowQuote(true);
    setQuoteData(quoteData);
    
    // Reset form
    setFormSelections({
      challenge: '',
      mainChallenge: [],
      innovation: [],
      companySize: '',
      name: '',
      email: '',
      company: ''
    });
    setTotalPrice(0);
    setTotalHours(0);
    setCurrentStep(1);
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
    
    // Get selected modules from formSelections
    const selectedChallenge = formSelections.challenge;
    const selectedMainChallenges = formSelections.mainChallenge || [];
    const selectedInnovations = formSelections.innovation || [];
    
    // Add core module if selected
    if (selectedChallenge) {
      const coreModule = currentContent?.contact?.modules?.core?.find(m => m.id === selectedChallenge);
      if (coreModule) {
        newTotalPrice += coreModule.price;
        newTotalHours += coreModule.hours;
      }
    }
    
    // Add main challenge modules if selected (multiple)
    selectedMainChallenges.forEach(challengeId => {
      const challengeModule = currentContent?.contact?.modules?.mainChallenges?.find(m => m.id === challengeId);
      if (challengeModule) {
        newTotalPrice += challengeModule.price;
        newTotalHours += challengeModule.hours;
      }
    });
    
    // Add innovation modules if selected (multiple)
    selectedInnovations.forEach(innovationId => {
      const innovationModule = currentContent?.contact?.modules?.innovation?.find(m => m.id === innovationId);
      if (innovationModule) {
        newTotalPrice += innovationModule.price;
        newTotalHours += innovationModule.hours;
      }
    });
    
    setTotalPrice(newTotalPrice);
    setTotalHours(newTotalHours);
  }, [formSelections, currentContent?.contact?.modules]);

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
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectionChange = (field, value) => {
    setFormSelections(prev => {
      if (field === 'mainChallenge' || field === 'innovation') {
        // Handle multiple selections for these fields
        const currentSelections = prev[field] || [];
        if (currentSelections.includes(value)) {
          // Remove if already selected
          return {
            ...prev,
            [field]: currentSelections.filter(item => item !== value)
          };
        } else {
          // Add if not selected
          return {
            ...prev,
            [field]: [...currentSelections, value]
          };
        }
      } else {
        // Handle single selections for other fields
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formSelections.challenge !== '';
      case 2:
        return formSelections.mainChallenge.length > 0;
      case 3:
        return formSelections.innovation.length > 0;
      case 4:
        return formSelections.companySize !== '';
      case 5:
        return formSelections.name && formSelections.email && formSelections.company;
      default:
        return false;
    }
  };

  // Update quote display when selected modules change
  useEffect(() => {
    updateQuoteDisplay();
  }, [selectedModules, totalPrice, totalHours]);



  return (
    <>
      <div className="App">
        <Navbar language={language} setLanguage={setLanguage} />

        {/* Hero Section */}
        <Hero onOpenDemo={() => {}} />

        {/* Solutions Section - Three Core Areas */}
        <section id="solutions" className="solutions-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>{currentContent.solutions.title}</h2>
              <p>{currentContent.solutions.subtitle}</p>
            </div>
            <div className="solutions-grid">
              {currentContent.solutions.cases.map((solution, index) => (
                <div key={index} className="solution-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="solution-header">
                    <span className="solution-emoji">{solution.emoji}</span>
                    <h3>{solution.title}</h3>
                  </div>
                  <p className="solution-description">{solution.description}</p>
                  <ul className="solution-features">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {currentContent.solutions.footer && (
              <div className="solutions-footer" data-aos="fade-up">
                <p>{currentContent.solutions.footer}</p>
              </div>
            )}
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
                  
                  {/* Step 1: Main Challenge Selection */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <div className="step-header">
                        <span className="step-indicator">{currentContent.contact.form.stepIndicator} 1 {currentContent.contact.form.of} 5</span>
                        <h3>{currentContent.contact.form.step1Title}</h3>
                        <p>{currentContent.contact.form.step1Subtitle}</p>
                      </div>
                      
                      <div className="challenge-cards">
                        {currentContent?.contact?.modules?.core?.map((module) => (
                          <label key={module.id} className="challenge-card">
                            <input 
                              type="radio" 
                              name="challenge" 
                              value={module.id}
                              checked={formSelections.challenge === module.id}
                              onChange={(e) => handleSelectionChange('challenge', e.target.value)}
                            />
                            <div className="card-content">
                              <div className="card-icon">
                                {module.id === 'product-marketing' && '📦'}
                                {module.id === 'lead-generation' && '📈'}
                                {module.id === 'market-expansion' && '🌍'}
                              </div>
                              <h4>{module.name}</h4>
                              <p>{module.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      
                      <button 
                        type="button" 
                        className="next-step" 
                        onClick={nextStep}
                        disabled={!isStepValid(1)}
                      >
                        {currentContent.contact.form.step1Button}
                      </button>
                    </div>
                  )}
                  
                  {/* Step 2: Main Challenges */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <div className="step-header">
                        <span className="step-indicator">{currentContent.contact.form.stepIndicator} 2 {currentContent.contact.form.of} 5</span>
                        <h3>{currentContent.contact.form.step2Title}</h3>
                        <p>{currentContent.contact.form.step2Subtitle}</p>
                      </div>
                      <div className="checkbox-options">
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="demand-generation"
                            checked={formSelections.mainChallenge.includes('demand-generation')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>{language === 'no' ? 'Generere etterspørsel for produktet' : 'Generate demand for the product'}</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="lead-engagement"
                            checked={formSelections.mainChallenge.includes('lead-engagement')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>{language === 'no' ? 'Finne og engasjere potensielle leads' : 'Find and engage potential leads'}</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="market-expansion"
                            checked={formSelections.mainChallenge.includes('market-expansion')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>{language === 'no' ? 'Utvide til nye markeder' : 'Expand to new markets'}</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="other"
                            checked={formSelections.mainChallenge.includes('other')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>{language === 'no' ? 'Annet' : 'Other'}</span>
                        </label>
                      </div>
                      <div className="form-navigation">
                        <button type="button" className="prev-step" onClick={prevStep}>{currentContent.contact.form.back}</button>
                        <button 
                          type="button" 
                          className="next-step" 
                          onClick={nextStep}
                          disabled={!isStepValid(2)}
                        >
                          {currentContent.contact.form.step2Button}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Innovation Solutions */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <div className="step-header">
                        <span className="step-indicator">{currentContent.contact.form.stepIndicator} 3 {currentContent.contact.form.of} 5</span>
                        <h3>{currentContent.contact.form.step3Title}</h3>
                        <p>{currentContent.contact.form.step3Subtitle}</p>
                      </div>
                      <div className="checkbox-options">
                        {currentContent.contact.modules.innovation.map((module) => (
                          <label key={module.id} className="checkbox-option">
                            <input 
                              type="checkbox" 
                              name="innovation" 
                              value={module.id}
                              checked={formSelections.innovation.includes(module.id)}
                              onChange={(e) => handleSelectionChange('innovation', e.target.value)}
                            />
                            <span>{module.name}</span>
                          </label>
                        ))}
                      </div>
                      <div className="form-navigation">
                        <button type="button" className="prev-step" onClick={prevStep}>{currentContent.contact.form.back}</button>
                        <button 
                          type="button" 
                          className="next-step" 
                          onClick={nextStep}
                          disabled={!isStepValid(3)}
                        >
                          {currentContent.contact.form.step3Button}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Company Size */}
                  {currentStep === 4 && (
                    <div className="form-step">
                      <div className="step-header">
                        <span className="step-indicator">{currentContent.contact.form.stepIndicator} 4 {currentContent.contact.form.of} 5</span>
                        <h3>{currentContent.contact.form.companySizeTitle}</h3>
                        <p>{currentContent.contact.form.companySizeSubtitle}</p>
                      </div>
                      
                      <div className="company-size-explanation">
                        <p>{currentContent.contact.form.companySizeExplanation}</p>
                      </div>
                      
                      <div className="radio-options">
                        <label className="radio-option">
                          <input 
                            type="radio" 
                            name="company-size" 
                            value="1-9"
                            checked={formSelections.companySize === '1-9'}
                            onChange={(e) => handleSelectionChange('companySize', e.target.value)}
                          />
                          <span>1-9</span>
                        </label>
                        <label className="radio-option">
                          <input 
                            type="radio" 
                            name="company-size" 
                            value="10-49"
                            checked={formSelections.companySize === '10-49'}
                            onChange={(e) => handleSelectionChange('companySize', e.target.value)}
                        />
                          <span>10-49</span>
                        </label>
                        <label className="radio-option">
                          <input 
                            type="radio" 
                            name="company-size" 
                            value="50+"
                            checked={formSelections.companySize === '50+'}
                            onChange={(e) => handleSelectionChange('companySize', e.target.value)}
                          />
                          <span>{language === 'no' ? '50 eller mer' : '50 or more'}</span>
                        </label>
                      </div>
                      
                      <div className="form-navigation">
                        <button type="button" className="prev-step" onClick={prevStep}>{currentContent.contact.form.back}</button>
                        <button 
                          type="button" 
                          className="next-step" 
                          onClick={nextStep}
                          disabled={!isStepValid(4)}
                        >
                          {currentContent.contact.form.step4Button}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Contact & Strategy Meeting */}
                  {currentStep === 5 && (
                    <div className="form-step">
                      <div className="step-header">
                        <span className="step-indicator">{currentContent.contact.form.stepIndicator} 5 {currentContent.contact.form.of} 5</span>
                        <h3>{currentContent.contact.form.step5Title}</h3>
                        <p>{currentContent.contact.form.step5Subtitle}</p>
                      </div>
                      
                      <div className="selection-summary">
                        <h4>{language === 'no' ? 'Dine valgte løsninger:' : 'Your selected solutions:'}</h4>
                        <div className="summary-items">
                          {/* Show selected core module */}
                          {formSelections.challenge && (() => {
                            const module = currentContent?.contact?.modules?.core?.find(m => m.id === formSelections.challenge);
                            return module ? (
                              <div key="core" className="summary-item">
                                <span className="item-name">{module.name}</span>
                                <span className="item-description">{module.description}</span>
                              </div>
                            ) : null;
                          })()}
                          
                          {/* Show selected main challenge modules */}
                          {formSelections.mainChallenge && formSelections.mainChallenge.length > 0 && 
                            formSelections.mainChallenge.map((challengeId, index) => {
                              const module = currentContent?.contact?.modules?.mainChallenges?.find(m => m.id === challengeId);
                              return module ? (
                                <div key={`mainChallenge-${index}`} className="summary-item">
                                  <span className="item-name">{module.name}</span>
                                  <span className="item-description">{module.description}</span>
                                </div>
                              ) : null;
                            })
                          }
                          
                          {/* Show selected innovation modules */}
                          {formSelections.innovation && formSelections.innovation.length > 0 && 
                            formSelections.innovation.map((innovationId, index) => {
                              const module = currentContent?.contact?.modules?.innovation?.find(m => m.id === innovationId);
                              return module ? (
                                <div key={`innovation-${index}`} className="summary-item">
                                  <span className="item-name">{module.name}</span>
                                  <span className="item-description">{module.description}</span>
                                </div>
                              ) : null;
                            })
                          }
                          
                          {/* Show company size if applicable */}
                          {formSelections.companySize && (
                            <div className="summary-item">
                              <span className="item-name">{language === 'no' ? 'Bedriftsstørrelse' : 'Company size'}</span>
                              <span className="item-description">{formSelections.companySize} {language === 'no' ? 'ansatte' : 'employees'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="contact-fields">
                        <input 
                          type="text" 
                          name="name" 
                          placeholder={currentContent.contact.form.namePlaceholder} 
                          value={formSelections.name}
                          onChange={(e) => handleSelectionChange('name', e.target.value)}
                          required 
                        />
                        <input 
                          type="email" 
                          name="email" 
                          placeholder={currentContent.contact.form.emailPlaceholder} 
                          value={formSelections.email}
                          onChange={(e) => handleSelectionChange('email', e.target.value)}
                          required 
                        />
                        <input 
                          type="text" 
                          name="company" 
                          placeholder={currentContent.contact.form.companyPlaceholder} 
                          value={formSelections.company}
                          onChange={(e) => handleSelectionChange('company', e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="form-navigation">
                        <button type="button" className="prev-step" onClick={prevStep}>
                          {currentContent.contact.form.step5Back}
                        </button>
                        <button type="button" className="submit-button" onClick={handleFormSubmit}>
                          {currentContent.contact.form.step5Button}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {formStatus && formStatus.type === 'success' && (
                    <p className={`form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </p>
                  )}
                </form>
                
                {/* Quote Display */}
                {showQuote && quoteData && (
                  <div className="quote-display">
                    <div className="quote-header">
                      <h3>{currentContent.contact.form.quoteTitle}</h3>
                      <p>{currentContent.contact.form.quoteSubtitle}</p>
                    </div>
                    
                    <div className="quote-items">
                      {quoteData.selectedModules.map((module, index) => (
                        <div key={index} className="quote-item">
                          <div className="quote-item-header">
                            <h4>{module.name}</h4>
                            <span className="quote-price">{module.price.toLocaleString()} {language === 'no' ? 'kr' : 'NOK'}</span>
                          </div>
                          <p className="quote-description">{module.description}</p>
                          <div className="quote-details">
                            <span>{language === 'no' ? 'Estimert tid:' : 'Estimated time:'} {module.hours} {language === 'no' ? 'timer' : 'hours'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="quote-summary">
                      <div className="quote-total">
                        <strong>{currentContent.contact.form.quoteTotal}: {quoteData.totalPrice.toLocaleString()} {language === 'no' ? 'kr' : 'NOK'}</strong>
                      </div>
                      <div className="quote-timeline">
                        <span>{currentContent.contact.form.quoteTimeline}: {quoteData.estimatedTimeline}</span>
                      </div>
                    </div>
                    
                    <div className="quote-footer">
                      <p>{currentContent.contact.form.quoteFooter1}</p>
                      <p>{currentContent.contact.form.quoteFooter2}</p>
                    </div>
                  </div>
                )}
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
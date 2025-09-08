import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Salesbot from './components/Salesbot';
import QuotePage from './components/QuotePage';
import AdminLogin from './components/AdminLogin';
import CookieConsent from './components/CookieConsent';
import './App.css';
import './components/Contact.css';

// Mobile detection utility
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768;
};

// Mobile-friendly video URL (without autoplay and with mobile-optimized parameters)
const getMobileVideoUrl = (originalUrl) => {
  if (!originalUrl) return null;
  
  // Remove problematic parameters for mobile
  const mobileUrl = originalUrl
    .replace('autoplay=1', 'autoplay=0')
    .replace('loop=1', 'loop=0')
    .replace('muted=1', 'muted=0')
    .replace('controls=1', 'controls=0');
  
  return mobileUrl;
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [formStatus, setFormStatus] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLane, setSelectedLane] = useState('product-marketing');
  const [formSelections, setFormSelections] = useState({
    challenge: '',
    mainChallenge: [],
    innovation: [],
    companySize: '',
    name: '',
    email: '',
    company: ''
  });
  const [showLoginLightbox, setShowLoginLightbox] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedInnovations, setSelectedInnovations] = useState([]);
  const [companySize, setCompanySize] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  // Mobile detection moved to MainPage component

  return (
    <Routes>
      <Route path="/quote/*" element={<QuotePage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

function MainPage() {
  const [formStatus, setFormStatus] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLane, setSelectedLane] = useState('product-marketing');
  const [formSelections, setFormSelections] = useState({
    challenge: '',
    mainChallenge: [],
    innovation: [],
    companySize: '',
    name: '',
    email: '',
    company: ''
  });
  const [showLoginLightbox, setShowLoginLightbox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile on component mount
    setIsMobile(isMobileDevice());
    
    // Add resize listener for responsive behavior
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
        
        // Version: 1.0.4 - Force fresh deployment - CSS conflicts fixed

  // Content in Norwegian following Naeva's structure
  const content = {
    no: {
      hero: {
        title: "AI-innovasjon for norske bedrifter",
        subtitle: "Automatiser B2B-produktmarkedsføring med kraftig AI-teknologi. Skap mer etterspørsel, generer flere leads og voks raskere – tilpasset norske små og mellomstore bedrifter.",
        cta: "Se hvordan det fungerer",
        background: "https://i.ibb.co/ycfYCgMP/Hero-background.png",
        video: null
      },
      solutions: {
        title: "AI-løsninger for norske bedrifter",
        subtitle: "Automatiser produktmarkedsføring, generer kvalifiserte leads og voks inn i nye markeder med AI-teknologi skreddersydd for norske små og mellomstore bedrifter.",
        cases: [
          {
            title: "AI-drevet produktmarkedsføring",
            emoji: "🎯",
            description: "Automatiser markedsføring av produkter og tjenester med AI som skaper etterspørsel og engasjement hos riktige kunder.",
            image: "https://i.ibb.co/chg1b8CL/A-digital-graphic-displays-AI-powered-product-mark.png",
            features: [
              "AI finner og analyserer din idealkundeprofil",
              "Automatiserte kampanjer som bygger interesse",
              "Personlige kundereiser som konverterer til salg"
            ]
          },
          {
            title: "Automatisert leadgenerering",
            emoji: "📈",
            description: "AI genererer og kvalifiserer leads automatisk, slik at salgsteamet ditt fokuserer på de som faktisk vil kjøpe.",
            image: "https://i.ibb.co/fzQ6S1Rf/A-2-D-digital-dashboard-UI-design-showcases-AI-powe.png",
            features: [
              "AI predikerer hvilke leads som konverterer",
              "Automatisert outreach med personlig tilpasning",
              "Høyere konverteringsrate og mer effektivt salg"
            ]
          },
          {
            title: "Smart leaddiscovery",
            emoji: "🔍",
            description: "AI finner og analyserer potensielle kunder automatisk fra LinkedIn, bransjesider, events og databaser.",
            image: "https://i.ibb.co/fzQ6S1Rf/A-2-D-digital-dashboard-UI-design-showcases-AI-powe.png",
            features: [
              "AI søker og scorer leads basert på din kundeprofil",
              "Automatisk datainnsamling fra flere kilder",
              "Kvalifiserte leads direkte til salgsteamet ditt"
            ]
          },
          {
            title: "AI-drevet markedsutvidelse",
            emoji: "🌍",
            description: "Voks inn i nye markeder med AI som analyserer muligheter og tilpasser kommunikasjon automatisk.",
            image: "https://i.ibb.co/sn2LDYD/A-2-D-digital-dashboard-interface-screenshot-displa.png",
            features: [
              "AI analyserer markedsmuligheter og konkurrenter",
              "Automatiserte kampanjer mot nøkkelkunder",
              "Lokalisert kommunikasjon for norske bedrifter i Europa"
            ]
          }
        ],
        footer: "👉 Alt du trenger for AI-drevet vekst i én løsning – tilpasset norske bedrifter."
      },
      howItWorks: {
        title: "Slik fungerer AI-innovasjonen vår",
        description: "Vi kombinerer kraftig AI-teknologi med norsk markedsføringskunnskap for å automatisere produktmarkedsføring. Våre løsninger integreres enkelt i eksisterende systemer og gir umiddelbar verdi for norske bedrifter.",
        cta: "Se hvordan det fungerer"
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
        title: "AI-innovasjon for norske bedrifter",
        subtitle: "Vi bygger AI-løsninger som automatiserer produktmarkedsføring for norske små og mellomstore bedrifter. Våre moduler kan kombineres fleksibelt for å støtte tre hovedområder: automatiserte produktkampanjer, smart leadgenerering og markedsutvidelse.",
        lanes: [
          {
            id: "product-marketing",
            title: "Automatisert produktmarkedsføring",
            description: "AI som skaper etterspørsel og engasjement for produkter og tjenester"
          },
          {
            id: "lead-generation", 
            title: "Smart leadgenerering",
            description: "AI finner og kvalifiserer leads automatisk for norske bedrifter"
          },
          {
            id: "scaling-markets",
            title: "Markedsutvidelse med AI",
            description: "Voks inn i nye markeder med automatiserte kampanjer"
          }
        ],
        modules: [
          {
            id: "chatbots-voice",
            title: "Chatbots og stemmeassistenter",
            price: 15000,
            hours: 25,
            dashboard: "https://i.ibb.co/B2h0pvty/A-2-D-digital-mockup-of-a-web-based-analytics-dashb.png",
            descriptions: {
              "product-marketing": "AI-drevne assistenter som automatisk forklarer produkter, sammenligner alternativer og svarer på kundespørsmål – 24/7 for norske bedrifter.",
              "lead-generation": "Automatiserte chatbots som kvalifiserer leads, samler inn kontaktinfo og kobler direkte til salgsteamet ditt når kunden er klar.",
              "scaling-markets": "Flerspråklige AI-assistenter som hjelper norske bedrifter å vokse inn i nye markeder uten å bygge opp lokale team."
            }
          },
          {
            id: "smart-forms-landing",
            title: "SmartForms og intelligente landingssider",
            price: 12000,
            hours: 20,
            dashboard: "https://i.ibb.co/Rf9LMwM/A-2-D-digital-dashboard-interface-screenshot-displa.png",
            descriptions: {
              "product-marketing": "Skap interaktive skjemaer og landingssider som tilpasser seg brukerens respons, og fremhever de mest relevante produktene.",
              "lead-generation": "Øk konverteringsraten med dynamiske skjemaer som reduserer friksjon og gjør det enkelt for kunden å ta neste steg.",
              "scaling-markets": "Rull ut skreddersydde kampanjesider raskt i nye markeder, med AI som optimaliserer innhold og design basert på lokale preferanser."
            }
          },
          {
            id: "whatsapp-social",
            title: "WhatsApp og multikanals outreach",
            price: 15000,
            hours: 25,
            dashboard: "https://i.ibb.co/Rk7rSvnf/A-2-D-digital-dashboard-UI-design-showcases-AI-powe.png",
            descriptions: {
              "product-marketing": "Engasjer kunder direkte i de kanalene de bruker mest, med oppdateringer om produktnyheter, lanseringer og bruksområder.",
              "lead-generation": "Automatiser personlig oppfølging via WhatsApp, e-post og sosiale medier – slik at ingen leads går tapt.",
              "scaling-markets": "Bygg en multikanals strategi som gjør at merkevaren din føles nær og tilgjengelig, uansett tidssone eller region."
            }
          },
          {
            id: "personalized-content",
            title: "Personlig innhold",
            price: 18000,
            hours: 30,
            dashboard: "https://i.ibb.co/23ny8MsN/A-digital-graphic-displays-AI-powered-product-mark.png",
            descriptions: {
              "product-marketing": "Del produktguider, demoer og case-studier som treffer akkurat den situasjonen kunden befinner seg i.",
              "lead-generation": "Send tilpassede pristilbud og innhold som bygger tillit, basert på kundens digitale atferd.",
              "scaling-markets": "Skaler innholdsproduksjon uten å miste relevans – AI gjør det mulig å levere personlig kommunikasjon til tusenvis av kunder samtidig."
            }
          },
          {
            id: "augmented-content",
            title: "Augmentert innhold og lokalisering",
            price: 18000,
            hours: 30,
            dashboard: "https://i.ibb.co/Kj1SC0Xm/A-2-D-digital-illustration-showcases-a-customer-eng.png",
            descriptions: {
              "product-marketing": "Sørg for at budskapet alltid treffer kulturelt riktig, enten du lanserer i Oslo eller Singapore.",
              "lead-generation": "Bruk AI til å raskt oversette og tilpasse kampanjer til nye språk og markeder uten å miste tone of voice.",
              "scaling-markets": "Ta en global posisjon med lokalt tilpasset innhold som føles autentisk for hver enkelt målgruppe."
            }
          },
          {
            id: "predictive-insights",
            title: "Prediktivt salg og data-innsikt",
            price: 21000,
            hours: 35,
            dashboard: "https://i.ibb.co/hxSZC3cQ/A-2-D-digital-image-displays-an-analytics-dashboard.png",
            descriptions: {
              "product-marketing": "Forstå hvilke funksjoner eller budskap som faktisk driver kjøp, og optimaliser markedsføringen deretter.",
              "lead-generation": "Bruk prediktive modeller til å rangere leads og fokusere ressursene på de med høyest sannsynlighet for å konvertere.",
              "scaling-markets": "Oppdag nye markedsmuligheter og trender før konkurrentene, med AI-drevet innsikt på tvers av datakilder."
            }
          },
          {
            id: "event-pipeline",
            title: "Fysiske eventer til digital pipeline",
            price: 24000,
            hours: 40,
            dashboard: "https://i.ibb.co/PZnRQJ8b/A-2-D-digital-image-of-a-marketing-campaign-analyti.png",
            descriptions: {
              "product-marketing": "Gjør messer og konferanser til en digital forlengelse av produktreisen, med live innhold og oppfølging i sanntid.",
              "lead-generation": "Digitaliser innsamlingen av leads på events og send automatiske, personlige oppfølginger.",
              "scaling-markets": "Bygg bro mellom fysiske og digitale aktiviteter slik at hvert event kan skaleres til å nå en global målgruppe."
            }
          },
          {
            id: "ai-seo",
            title: "AI for SEO",
            price: 20000,
            hours: 30,
            dashboard: "https://i.ibb.co/23ny8MsN/A-digital-graphic-displays-AI-powered-product-mark.png",
            descriptions: {
              "product-marketing": "Optimaliser produktbeskrivelser og innhold slik at de alltid er synlige der kundene søker.",
              "lead-generation": "Bruk AI til å identifisere søketrender og lage innhold som tiltrekker kvalifisert trafikk.",
              "scaling-markets": "Ta posisjon i nye markeder raskt ved å la AI analysere lokale søkemønstre og produsere relevant innhold."
            }
          },
          {
            id: "lead-discovery",
            title: "AI-drevet leaddiscovery",
            price: 20000,
            hours: 35,
            dashboard: "https://i.ibb.co/fzQ6S1Rf/A-2-D-digital-dashboard-UI-design-showcases-AI-powe.png",
            descriptions: {
              "product-marketing": "Bygg presise lead-lister ved å kombinere AI med dataleverandører og bransjesider.",
              "lead-generation": "Tilpasset din ICP og prioritert med lead scoring for raskere pipeline-vekst.",
              "scaling-markets": "Identifiser nye markedsmuligheter med AI-drevet leaddiscovery på tvers av geografier."
            }
          }
        ]
      },
      whatIs: {
        title: "Din Partner for AI-Drevet Vekst",
        subtitle: "AI-drevet B2B-markedsføring for små og mellomstore bedrifter",
        description: "N60 er et Bergen-basert konsulentselskap som spesialiserer seg på AI-drevet B2B-markedsføring for små og mellomstore bedrifter. Vi kombinerer dyp markedsføringserfaring med kutting-edge AI-verktøy for å levere skalerbar vekst, forutsigbare pipelines og målbar ROI.",
        video: "https://player.vimeo.com/video/1113961370?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0&dnt=1",
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
          submit: "Få personlig tilbud",
          companySizeTitle: "Selskap",
          companySizeSubtitle: "Hvor mange ansatte har dere?",
          companySizeExplanation: "Vi trenger denne informasjonen for å tilpasse løsningen til deres behov og forberede et personlig møte.",
          step1Title: "Få ditt personlige pristilbud",
          step1Subtitle: "Velg dine viktigste behov – vi setter sammen en løsning og pris som passer din vekststrategi",
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
              id: "lead-discovery",
              name: "AI-drevet leaddiscovery",
              description: "Bygg presise lead-lister ved å kombinere AI med dataleverandører, LinkedIn, bransjesider og events. Tilpasset din ICP og prioritert med lead scoring for raskere pipeline-vekst.",
              hours: 35,
              price: 20000
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
              description: "Andre utfordringer",
              hours: 15,
              price: 9000
            }
          ]
        },
        pricing: {
        title: "Priser for norske bedrifter",
        subtitle: "Velg AI-løsningen som passer din bedrift",
        featureLabel: "AI-funksjon / Verdi",
        starter: {
          name: "Start",
          description: "For norske småbedrifter som vil automatisere produktmarkedsføring."
        },
        growth: {
          name: "Vekst",
          description: "For bedrifter som vil vokse raskere med AI-drevet markedsføring."
        },
        scale: {
          name: "Skala",
          description: "For større bedrifter som vil dominere markedet med avansert AI."
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
  }
  };

  const currentContent = content.no;



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
      totalPrice: totalPrice || 0,
      totalHours: totalHours || 0,
      estimatedTimeline: '6-8 uker',
      monthlyRunningCosts: Math.round((totalPrice || 0) * 0.10), // 10% of total price per month
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
      message: currentContent.contact.form.submitButton === 'Se ditt tilbud' 
        ? `Takk for din henvendelse, ${formSelections.name}! Her er ditt tilpassede tilbud:`
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
      // Scroll to top of the form
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of the form
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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



  // Safety check to ensure content is loaded
  if (!currentContent || !currentContent.contact || !currentContent.contact.form) {
    console.log('Content not loaded yet:', { currentContent });
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="App">
        <Navbar onLoginClick={() => setShowLoginLightbox(true)} />

        {/* Hero Section */}
        <Hero onOpenDemo={() => {}} backgroundImage={currentContent.hero.background} videoUrl={currentContent.hero.video} />

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
                  {solution.image && (
                    <div className="solution-image">
                      <img src={solution.image} alt={solution.title} />
                    </div>
                  )}
                  <div className="solution-header">
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
            
            {/* Lane Selection */}
            <div className="innovation-lanes" data-aos="fade-up">
              {currentContent.innovation.lanes.map((lane) => (
                <button
                  key={lane.id}
                  className={`lane-button ${selectedLane === lane.id ? 'active' : ''}`}
                  onClick={() => setSelectedLane(lane.id)}
                >
                  <h3>{lane.title}</h3>
                  <p>{lane.description}</p>
                </button>
              ))}
            </div>
            
            {/* Innovation Modules Grid */}
            <div className="innovation-grid" data-aos="fade-up">
              {currentContent.innovation.modules.map((module, index) => (
                <div 
                  key={index} 
                  className="innovation-card" 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                  data-lane={selectedLane}
                >
                  <div className="innovation-image">
                    <img src={module.dashboard} alt={module.title} />
                  </div>
                  <div className="innovation-content">
                    <h3>{module.title}</h3>
                    <p className="module-description">
                      {module.descriptions[selectedLane]}
                    </p>
                    <div className="innovation-price">
                      <span className="price">{module.price.toLocaleString()} NOK</span>
                      <span className="hours">{module.hours}h</span>
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
                  {currentContent.whatIs.video ? (
                    <div className="what-is-video">
                      {isMobile ? (
                        // Show static image on mobile to avoid video errors
                        <img 
                          src="https://i.ibb.co/fd5v2xtv/om-n60.png" 
                          alt="Om N60" 
                          className="what-is-image"
                        />
                      ) : (
                        // Show video on desktop with mobile-friendly URL
                        <iframe
                          src={getMobileVideoUrl(currentContent.whatIs.video)}
                          title="N60 AI Marketing Demo"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to image if video fails to load
                            console.log('Video failed to load, showing fallback image');
                            e.target.style.display = 'none';
                            const fallbackImg = document.createElement('img');
                            fallbackImg.src = "https://i.ibb.co/fd5v2xtv/om-n60.png";
                            fallbackImg.alt = "Om N60";
                            fallbackImg.className = "what-is-image";
                            e.target.parentNode.appendChild(fallbackImg);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <img src="https://i.ibb.co/fd5v2xtv/om-n60.png" alt="Om N60" className="what-is-image" />
                  )}
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
                  <div className="step-icon">
                    {index === 0 && '🔍'}
                    {index === 1 && '📈'}
                    {index === 2 && '⚙️'}
                    {index === 3 && '📊'}
                  </div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < currentContent.howWeWork.steps.length - 1 && (
                    <div className="step-connector"></div>
                  )}
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
                        <div className="stepper-container">
                          <div className="stepper">
                            {[1, 2, 3, 4, 5].map((step) => (
                              <div key={step} className={`stepper-dot ${step === 1 ? 'active' : ''}`}>
                                {step === 1 && <span className="step-number">1</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                        <h3>{currentContent.contact.form.step1Title}</h3>
                        <p>{currentContent.contact.form.step1Subtitle}</p>
                      </div>
                      
                      <div className="challenge-cards four-cards">
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
                                {module.id === 'product-marketing' && '📢'}
                                {module.id === 'lead-generation' && '🔄'}
                                {module.id === 'lead-discovery' && '🔍'}
                                {module.id === 'market-expansion' && '🌍'}
                              </div>
                              <h4>
                                {module.name.split(' ').map((word, index) => 
                                  word === 'AI' ? <span key={index} className="accent-text">{word}</span> : word
                                ).reduce((prev, curr) => [prev, ' ', curr])}
                              </h4>
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
                        <div className="stepper-container">
                          <div className="stepper">
                            {[1, 2, 3, 4, 5].map((step) => (
                              <div key={step} className={`stepper-dot ${step === 2 ? 'active' : ''}`}>
                                {step === 2 && <span className="step-number">2</span>}
                              </div>
                            ))}
                          </div>
                        </div>
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
                          <span>Generere etterspørsel for produktet</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="lead-engagement"
                            checked={formSelections.mainChallenge.includes('lead-engagement')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>Finne og engasjere potensielle leads</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="market-expansion"
                            checked={formSelections.mainChallenge.includes('market-expansion')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>Utvide til nye markeder</span>
                        </label>
                        <label className="checkbox-option">
                          <input 
                            type="checkbox" 
                            name="main-challenge" 
                            value="other"
                            checked={formSelections.mainChallenge.includes('other')}
                            onChange={(e) => handleSelectionChange('mainChallenge', e.target.value)}
                          />
                          <span>Annet</span>
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
                        <div className="stepper-container">
                          <div className="stepper">
                            {[1, 2, 3, 4, 5].map((step) => (
                              <div key={step} className={`stepper-dot ${step === 3 ? 'active' : ''}`}>
                                {step === 3 && <span className="step-number">3</span>}
                              </div>
                            ))}
                          </div>
                        </div>
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
                        <div className="stepper-container">
                          <div className="stepper">
                            {[1, 2, 3, 4, 5].map((step) => (
                              <div key={step} className={`stepper-dot ${step === 4 ? 'active' : ''}`}>
                                {step === 4 && <span className="step-number">4</span>}
                              </div>
                            ))}
                          </div>
                        </div>
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
                          <span>50 eller mer</span>
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
                        <div className="stepper-container">
                          <div className="stepper">
                            {[1, 2, 3, 4, 5].map((step) => (
                              <div key={step} className={`stepper-dot ${step === 5 ? 'active' : ''}`}>
                                {step === 5 && <span className="step-number">5</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                        <h3>{currentContent.contact.form.step5Title}</h3>
                        <p>{currentContent.contact.form.step5Subtitle}</p>
                      </div>
                      
                      <div className="selection-summary">
                        <h4>Dine valgte løsninger:</h4>
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
                                                          <span className="item-name">Bedriftsstørrelse</span>
                            <span className="item-description">{formSelections.companySize} ansatte</span>
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
                      {quoteData.selectedModules && quoteData.selectedModules.length > 0 ? (
                        quoteData.selectedModules.map((module, index) => (
                        <div key={index} className="quote-item">
                          <div className="quote-item-content">
                            <div>
                              <h4>{module.name}</h4>
                              <p className="quote-description">{module.description}</p>
                            </div>
                              <span className="quote-price">{module.price?.toLocaleString() || 0} kr</span>
                            <div className="quote-details">
                                <span>Estimert tid: {module.hours || 0} timer</span>
                            </div>
                          </div>
                        </div>
                        ))
                      ) : (
                        <p>Ingen moduler valgt</p>
                      )}
                    </div>
                    
                    <div className="quote-summary">
                      <div className="quote-total">
                        <strong>{currentContent.contact.form.quoteTotal}: {(quoteData.totalPrice || 0).toLocaleString()} kr</strong>
                      </div>
                      <div className="quote-mva">
                        <span>MVA (25%): {Math.round((quoteData.totalPrice || 0) * 0.25).toLocaleString()} kr</span>
                      </div>
                      <div className="quote-total-with-mva">
                        <strong>Totalt inkl. MVA: {Math.round((quoteData.totalPrice || 0) * 1.25).toLocaleString()} kr</strong>
                      </div>
                      <div className="quote-timeline">
                        <span>{currentContent.contact.form.quoteTimeline}: {quoteData.estimatedTimeline || '6-8 uker'}</span>
                      </div>
                      <div className="quote-monthly-costs">
                        <span>Månedlige driftskostnader (10%): {(quoteData.monthlyRunningCosts || 0).toLocaleString()} kr</span>
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

      {/* Tech Partners Section */}
      <section id="tech-partners" className="tech-partners-section">
        <div className="container">
          <h2 className="tech-partners-title">Våre Teknologipartnere</h2>
          <div className="tech-partners-grid">
            <div className="tech-partner">
              <img src="https://i.ibb.co/QFM3Hy6r/1.png" alt="Tech Partner 1" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/XkxgG9ts/2.png" alt="Tech Partner 2" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/ZRYQ1mFS/3.png" alt="Tech Partner 3" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/rRhngx6R/4.png" alt="Tech Partner 4" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/j9PBM5W8/5.png" alt="Tech Partner 5" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/TMfHy3Rw/6.png" alt="Tech Partner 6" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/RkpSHHr8/7.png" alt="Tech Partner 7" className="tech-partner-logo" />
            </div>
            <div className="tech-partner">
              <img src="https://i.ibb.co/7JWkhQP6/8.png" alt="Tech Partner 8" className="tech-partner-logo" />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} N60</p>
          <p className="made-with-love">Made in Bergen, Norway, with love ❤️</p>
        </div>
      </footer>

      {/* Login Lightbox */}
      {showLoginLightbox && (
        <div className="login-lightbox-overlay" onClick={() => setShowLoginLightbox(false)}>
          <div className="login-lightbox" onClick={(e) => e.stopPropagation()}>
            <AdminLogin onClose={() => setShowLoginLightbox(false)} />
          </div>
        </div>
      )}

      <Salesbot />
      <CookieConsent />
    </>
  );
}

export default App;
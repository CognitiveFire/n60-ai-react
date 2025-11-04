import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SimpleContactForm from './components/SimpleContactForm';
import QuotePage from './components/QuotePage';
import TrainingPage from './components/TrainingPage';
import AdminLogin from './components/AdminLogin';
import CookieConsent from './components/CookieConsent';
import './App.css';
import './components/Contact.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/contact" element={<SimpleContactForm />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

function MainPage() {
  const location = useLocation();
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

  // Handle smooth scrolling to sections based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      // Only handle scrolling for actual section IDs, not React routes
      const validSections = ['solutions', 'innovation', 'how-we-work', 'why-ai', 'contact'];
      
      if (hash && validSections.includes(hash)) {
        const element = document.getElementById(hash);
        if (element) {
          // Add a small delay to ensure the page is rendered
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };

    // Only handle hash changes when we're on the home page (not on other routes)
    if (location.hash === '' || location.hash === '#') {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location]);
        
          // Version: 1.3.6 - Training page separated from home page - Force new build

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
        title: "Bærekraftig vekst med smart teknologi",
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
        title: "Våre AI-løsninger",
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
        <Hero onOpenDemo={() => {}} backgroundImage={currentContent?.hero?.background} videoUrl={currentContent?.hero?.video} />

        {/* 🌌 N60 Compass Introduction */}
        <section id="journey-intro" className="journey-intro-section">
          <div className="container">
            <div className="journey-intro-content" data-aos="fade-up">
              <h2>🧭 N60 Compass</h2>
              <p className="journey-subtitle">Guiding organisations toward responsible, profitable, and human-centred AI.</p>
              <p className="journey-description">
                The N60 Compass is your signature AI transformation framework — a structured journey through four essential stages: Strategy & Governance, Solution Design, Investment & ROI, and Training & Recruitment.
              </p>
              <p className="journey-description">
                It represents clarity, progression, and confidence in the age of intelligent automation. This model is simple enough for executives to grasp, yet robust enough for implementation teams to apply.
              </p>
              <div className="journey-cta-row">
                <button className="cta-button primary" onClick={() => {
                  const hero = document.getElementById('hero');
                  if (hero) {
                    const calendlyButton = hero.querySelector('.hero-cta');
                    if (calendlyButton) calendlyButton.click();
                  }
                }}>Explore the Compass →</button>
                <button className="cta-button secondary" onClick={() => {
                  const hero = document.getElementById('hero');
                  if (hero) {
                    const calendlyButton = hero.querySelector('.hero-cta');
                    if (calendlyButton) calendlyButton.click();
                  }
                }}>Book a Consultation →</button>
              </div>
            </div>
          </div>
        </section>

        {/* 🧭 Journey Line Container */}
        <div className="journey-line-container">
          {/* Journey Line SVG - will be animated */}
          <svg className="journey-line-svg" viewBox="0 0 100 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a38d" />
                <stop offset="100%" stopColor="#2c3659" />
              </linearGradient>
            </defs>
            <path
              className="journey-path"
              d="M 50 0 Q 50 100 50 200 T 50 400"
              stroke="url(#journeyGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 🧭 I. Compass – Strategy & Governance */}
        <section id="compass" className="pillar-section compass-section">
          <div className="container">
            <div className="pillar-content">
              <div className="pillar-icon" data-aos="fade-up">
                <span className="pillar-emoji">🧭</span>
              </div>
              <div className="pillar-text" data-aos="fade-up">
                <h2 className="pillar-title">Step 1 — Compass: Strategy & Governance</h2>
                <p className="pillar-tagline">Define direction, principles, and control mechanisms for responsible AI.</p>
                <div className="pillar-description">
                  <p><strong>Purpose:</strong> Define direction, principles, and control mechanisms for responsible AI.</p>
                  <p><strong>Value:</strong> Provides strategic clarity and regulatory assurance. Leaders understand where AI creates value — and where guardrails are needed.</p>
                  <p><strong>Client Input Needed:</strong> Leadership participation, access to policies, IT architecture, and data practices.</p>
                </div>
              </div>
            </div>

            {/* Connected Packages */}
            <div className="packages-grid" data-aos="fade-up">
              <div className="package-card">
                <h3>Strategy & Governance Deliverables</h3>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>Executive AI workshop and maturity assessment</li>
                    <li>AI strategy and governance charter</li>
                    <li>Policy and ethical framework aligned with the EU AI Act</li>
                    <li>Risk and compliance mapping</li>
                    <li>Leadership briefing pack</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📐 Step 2 – Compass: Solution Design */}
        <section id="blueprint" className="pillar-section blueprint-section">
          <div className="container">
            <div className="pillar-content">
              <div className="pillar-icon" data-aos="fade-up">
                <span className="pillar-emoji">📐</span>
              </div>
              <div className="pillar-text" data-aos="fade-up">
                <h2 className="pillar-title">Step 2 — Compass: Solution Design</h2>
                <p className="pillar-tagline">Translate strategy into concrete, compliant, and scalable AI applications.</p>
                <div className="pillar-description">
                  <p><strong>Purpose:</strong> Translate strategy into concrete, compliant, and scalable AI applications.</p>
                  <p><strong>Value:</strong> Moves AI from theory to execution — safely and pragmatically. Ensures the organisation builds once, scales many times.</p>
                  <p><strong>Client Input Needed:</strong> Technical environment overview, process documentation, access to IT and data owners.</p>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="packages-grid" data-aos="fade-up">
              <div className="package-card">
                <h3>Solution Design Deliverables</h3>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>System and process architecture mapping</li>
                    <li>AI use-case selection and feasibility analysis</li>
                    <li>Vendor-neutral solution design and technical blueprint</li>
                    <li>Data workflow and integration plan</li>
                    <li>6–12 month implementation roadmap</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📈 III. Growth – Investment & ROI */}
        <section id="growth" className="pillar-section growth-section">
          <div className="container">
            <div className="pillar-content">
              <div className="pillar-icon" data-aos="fade-up">
                <span className="pillar-emoji">📈</span>
              </div>
              <div className="pillar-text" data-aos="fade-up">
                <h2 className="pillar-title">Step 3 — Compass: Investment & ROI</h2>
                <p className="pillar-tagline">Align financial decisions, resourcing, and value creation for sustainable AI growth.</p>
                <div className="pillar-description">
                  <p><strong>Purpose:</strong> Align financial decisions, resourcing, and value creation for sustainable AI growth.</p>
                  <p><strong>Value:</strong> Turns AI into a measurable business asset. Gives boards confidence to invest responsibly.</p>
                  <p><strong>Client Input Needed:</strong> Budget ranges and cost centres, access to financial planning or CFO function.</p>
                </div>
              </div>
            </div>

            {/* Connected Packages */}
            <div className="packages-grid" data-aos="fade-up">
              <div className="package-card">
                <h3>Investment & ROI Deliverables</h3>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>Cost-benefit and ROI modelling</li>
                    <li>AI budget framework and investment roadmap</li>
                    <li>KPI dashboard and impact tracking model</li>
                    <li>Pilot program and performance report</li>
                    <li>Risk-adjusted financial forecast</li>
                  </ul>
                </div>
              </div>

              <div className="package-card">
                <h3>Full N60 AI Transformation Program</h3>
                <p className="package-duration">12–16 weeks | from 120,000 NOK</p>
                <p className="package-description">Combine all five pillars into a single, guided transformation initiative.</p>
                <button className="package-cta" onClick={() => {
                  const element = document.getElementById('growth');
                  if (element) {
                    const packageDetails = element.querySelectorAll('.package-card')[1];
                    if (packageDetails) {
                      packageDetails.classList.toggle('expanded');
                    }
                  }
                }}>View Details →</button>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>Complete readiness and architecture audit</li>
                    <li>Governance and compliance framework</li>
                    <li>Vendor and technology roadmap</li>
                    <li>Implementation plan with financial modelling</li>
                    <li>Workforce training and hiring support</li>
                    <li>Quarterly performance and ROI review</li>
                  </ul>
                  <p><strong>Outcome:</strong> Your organisation becomes AI-ready — strategically, technically, and operationally — with ongoing oversight from N60.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 👥 IV. Capability – Workforce & Culture */}
        <section id="capability" className="pillar-section capability-section">
          <div className="container">
            <div className="pillar-content">
              <div className="pillar-icon" data-aos="fade-up">
                <span className="pillar-emoji">👥</span>
              </div>
              <div className="pillar-text" data-aos="fade-up">
                <h2 className="pillar-title">Step 4 — Compass: Training & Recruitment</h2>
                <p className="pillar-tagline">Build the human capability to sustain and scale AI adoption.</p>
                <div className="pillar-description">
                  <p><strong>Purpose:</strong> Build the human capability to sustain and scale AI adoption.</p>
                  <p><strong>Value:</strong> Transforms employees from passive users to active AI contributors. Reduces resistance and strengthens your employer brand.</p>
                  <p><strong>Client Input Needed:</strong> HR and Learning contact, access to existing training materials and job descriptions.</p>
                </div>
              </div>
            </div>

            {/* Connected Packages */}
            <div className="packages-grid" data-aos="fade-up">
              <div className="package-card">
                <h3>Training & Recruitment Deliverables</h3>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>Competence gap analysis</li>
                    <li>Custom AI training and certification program</li>
                    <li>AI-ready job design and recruitment strategy</li>
                    <li>Safe Use of AI workshop</li>
                    <li>Learning measurement and progression report</li>
                  </ul>
                </div>
              </div>

              <div className="package-card">
                <h3>Full N60 AI Transformation Program</h3>
                <p className="package-duration">12–16 weeks | from 120,000 NOK</p>
                <p className="package-description">Combine all five pillars into a single, guided transformation initiative.</p>
                <button className="package-cta" onClick={() => {
                  const element = document.getElementById('capability');
                  if (element) {
                    const packageDetails = element.querySelectorAll('.package-card')[1];
                    if (packageDetails) {
                      packageDetails.classList.toggle('expanded');
                    }
                  }
                }}>View Details →</button>
                <div className="package-details">
                  <h4>Deliverables:</h4>
                  <ul>
                    <li>Complete readiness and architecture audit</li>
                    <li>Governance and compliance framework</li>
                    <li>Vendor and technology roadmap</li>
                    <li>Implementation plan with financial modelling</li>
                    <li>Workforce training and hiring support</li>
                    <li>Quarterly performance and ROI review</li>
                  </ul>
                  <p><strong>Outcome:</strong> Your organisation becomes AI-ready — strategically, technically, and operationally — with ongoing oversight from N60.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🚀 Final CTA Section */}
        <section id="journey-cta" className="journey-cta-section">
          <div className="container">
            <div className="journey-cta-content" data-aos="fade-up">
              <h2>Your Journey Starts Here</h2>
              <p>Every organisation's AI journey begins somewhere. Let's find your compass point — and chart the path toward capability.</p>
              <div className="journey-cta-buttons">
                <button className="cta-button primary" onClick={() => {
                  const hero = document.getElementById('hero');
                  if (hero) {
                    const calendlyButton = hero.querySelector('.hero-cta');
                    if (calendlyButton) calendlyButton.click();
                  }
                }}>Start Your Readiness Review</button>
                <button className="cta-button secondary" onClick={() => {
                  const hero = document.getElementById('hero');
                  if (hero) {
                    const calendlyButton = hero.querySelector('.hero-cta');
                    if (calendlyButton) calendlyButton.click();
                  }
                }}>Book a Strategy Call</button>
              </div>
            </div>
          </div>
        </section>

        {/* 🧭 About N60 - Who We Are */}
        <section id="about-who" className="about-n60-section">
          <div className="container">
            <div className="about-n60-content">
              <div className="about-header" data-aos="fade-up">
                <h2>About N60</h2>
                <p className="about-tagline">From Compass to Capability — guiding organisations toward responsible, profitable AI.</p>
              </div>

              {/* Who We Are */}
              <div className="about-subsection" data-aos="fade-up">
                <h3>Who We Are</h3>
                <p className="about-intro">
                  N60 is a Nordic consultancy specialising in AI strategy, governance, and workforce transformation.
                </p>
                <p>
                  We help organisations use artificial intelligence responsibly — not as a technology project, but as a structured part of business growth.
                </p>
                <div className="about-founding">
                  <p><strong>Founded in Norway, N60 was built on a simple idea:</strong></p>
                  <p className="founding-idea">AI should create value for people, not replace them.</p>
                </div>
                <p>
                  We focus on helping small and medium-sized enterprises, public organisations, and leadership teams adapt, invest, and upskill through a clear and measurable approach to AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section id="about-what" className="about-n60-section about-n60-alt">
          <div className="container">
            <div className="about-n60-content">
              <div className="about-subsection" data-aos="fade-up">
                <h3>What We Do</h3>
                <p className="about-intro">
                  We turn AI from uncertainty into clarity.
                </p>
                <p>
                  Our work spans four pillars — the foundation of our Responsible AI Framework:
                </p>
                <div className="pillars-grid">
                  <div className="pillar-item">
                    <span className="pillar-number">1️⃣</span>
                    <div className="pillar-item-content">
                      <h4>Strategy & Governance – The Compass</h4>
                      <p>Set a direction for AI that aligns with your purpose, risk appetite, and compliance goals.</p>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <span className="pillar-number">2️⃣</span>
                    <div className="pillar-item-content">
                      <h4>Architecture & Technology – The Blueprint</h4>
                      <p>Design scalable, secure systems that support measurable AI adoption.</p>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <span className="pillar-number">3️⃣</span>
                    <div className="pillar-item-content">
                      <h4>Investment & ROI – The Growth Path</h4>
                      <p>Connect business value to AI outcomes with clear budgeting and performance metrics.</p>
                    </div>
                  </div>
                  <div className="pillar-item">
                    <span className="pillar-number">4️⃣</span>
                    <div className="pillar-item-content">
                      <h4>Workforce & Capability – The Human Core</h4>
                      <p>Upskill your people and redesign roles so human intelligence and machine intelligence work together.</p>
                    </div>
                  </div>
                </div>
                <p className="about-outcome">
                  Each client engagement starts with these pillars and leads toward a practical outcome: an organisation that's ready, compliant, and future-proofed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section id="about-approach" className="about-n60-section">
          <div className="container">
            <div className="about-n60-content">
              <div className="about-subsection" data-aos="fade-up">
                <h3>Our Approach</h3>
                <p>
                  Unlike traditional technology consultancies, we don't sell software or licences.
                </p>
                <p>
                  Instead, we provide independent, evidence-based guidance that lets clients make the right technology and investment choices — on their own terms.
                </p>
                <p><strong>Our methodology blends:</strong></p>
                <ul className="about-methodology">
                  <li>European governance standards (GDPR + upcoming EU AI Act compliance)</li>
                  <li>Business design and financial modelling</li>
                  <li>Organisational change and learning frameworks</li>
                </ul>
                <p className="about-philosophy">
                  We combine analytical depth with Nordic simplicity:<br />
                  <strong>No jargon, no black boxes — just practical strategy and measurable results.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section id="about-why" className="about-n60-section about-n60-alt">
          <div className="container">
            <div className="about-n60-content">
              <div className="about-subsection" data-aos="fade-up">
                <h3>Why It Matters</h3>
                <p>
                  AI is advancing faster than most organisations can adapt.
                </p>
                <p>
                  The real challenge isn't the technology — it's aligning people, governance, and strategy to keep pace.
                </p>
                <p className="about-value">
                  That's where we come in.
                </p>
                <p>
                  By turning strategy into structure, and structure into capability, N60 helps organisations future-proof their workforce and investments in a fast-changing window of opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section id="about-promise" className="about-n60-section">
          <div className="container">
            <div className="about-n60-content">
              <div className="about-subsection" data-aos="fade-up">
                <h3>Our Promise</h3>
                <div className="promise-grid">
                  <div className="promise-item">
                    <h4>Independent</h4>
                    <p>Vendor-neutral, focused solely on client outcomes.</p>
                  </div>
                  <div className="promise-item">
                    <h4>Responsible</h4>
                    <p>Built on trust, compliance, and ethics.</p>
                  </div>
                  <div className="promise-item">
                    <h4>Scalable</h4>
                    <p>Designed to grow with your organisation's maturity.</p>
                  </div>
                </div>
                <p className="about-close">
                  We guide you from compass to capability — making AI responsible, measurable, and human.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section id="about-cta" className="about-cta-section">
          <div className="container">
            <div className="about-cta-block" data-aos="fade-up">
              <p className="about-cta-intro">Explore how your organisation can build Responsible AI capability.</p>
              <div className="about-cta-buttons">
                <button className="cta-button primary" onClick={() => {
                  const hero = document.getElementById('hero');
                  if (hero) {
                    const calendlyButton = hero.querySelector('.hero-cta');
                    if (calendlyButton) calendlyButton.click();
                  }
                }}>Book a Consultation →</button>
                <button className="cta-button secondary" onClick={() => {
                  // TODO: Add download link for framework guide
                  window.open('#framework', '_self');
                }}>Download the N60 Framework Guide →</button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Contact CTA */}
      <div className="floating-contact-cta">
        <a href="#/contact" className="floating-contact-button">
          <span className="cta-text">Contact n60</span>
          <span className="cta-icon">💬</span>
        </a>
      </div>

      {/* 🔟 Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-tagline">
            <h3>N60 — Responsible AI for the Future of Work.</h3>
          </div>
          <div className="footer-contact">
            <p>📧 hello@n60.no</p>
            <p>🌐 n60.ai</p>
            <p>📍 Bergen, Norway</p>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} N60</p>
          </div>
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

      <CookieConsent />
    </>
  );
}

export default App;// Force new build - Sat Oct 18 05:52:41 CEST 2025
// UNIQUE BUILD MARKER 1760760658

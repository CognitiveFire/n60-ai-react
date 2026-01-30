import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SimpleContactForm from './components/SimpleContactForm';
import QuotePage from './components/QuotePage';
import TrainingPage from './components/TrainingPage';
import AdminLogin from './components/AdminLogin';
import CookieConsent from './components/CookieConsent';
import FloatingContactButton from './components/FloatingContactButton';
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
    <LanguageProvider>
    <Router>
      <AppContent />
    </Router>
    </LanguageProvider>
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
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
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
  const [activeFrameworkStep, setActiveFrameworkStep] = useState(null);
  const [activeFaqItem, setActiveFaqItem] = useState(null);

  const toggleFrameworkStep = (stepId) => {
    setActiveFrameworkStep((prev) => (prev === stepId ? null : stepId));
  };

  const toggleFaqItem = (itemId) => {
    setActiveFaqItem((prev) => (prev === itemId ? null : itemId));
  };

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

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  // Handle smooth scrolling to sections based on hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      
      // Valid sections for the new design
      const validSections = ['about', 'framework', 'services', 'insights', 'cta', 'contact'];
      
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
    if (location.pathname === '/' || location.pathname === '') {
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

  const frameworkSteps = [
    { id: 'step-1', data: t.framework.step1 },
    { id: 'step-2', data: t.framework.step2 },
    { id: 'step-3', data: t.framework.step3 },
    { id: 'step-4', data: t.framework.step4 }
  ];

  const sidebarCopy = language === 'no'
    ? {
        bookTitle: 'Start med en samtale',
        bookBody: 'Planlegg et 30 minutters møte for å kartlegge AI-prioriteringer, risiko og ønsket avkastning.',
        bookCTA: 'Book et møte',
        downloadTitle: 'Last ned Compass-oversikten',
        downloadBody: 'Fire steg, leveransemodeller og veiledende priser i et kort sammendrag.',
        downloadCTA: 'Last ned PDF',
        contactTitle: 'Trenger du noe spesifikt?',
        contactBody: 'Vi svarer innen én virkedag.',
        contactFormLink: 'Ta kontakt',
        trustTitle: 'Hvorfor team velger N60',
        trustItems: [
          'Uavhengige rådgivere med lang leveranseerfaring',
          'GDPR- og EU AI Act-kompatible rammeverk',
          'Praktisk opplæring som gir målbar ROI'
        ]
      }
    : {
        bookTitle: 'Start with a conversation',
        bookBody: 'Schedule a 30-minute briefing to map your AI priorities, risks, and ROI targets.',
        bookCTA: 'Book a Call',
        downloadTitle: 'Download Compass overview',
        downloadBody: 'Four-step methodology, engagement formats, and indicative pricing in one PDF.',
        downloadCTA: 'Download PDF',
        contactTitle: 'Need something specific?',
        contactBody: 'We respond within one business day.',
        contactFormLink: 'Get in touch',
        trustTitle: 'Why teams choose N60',
        trustItems: [
          'Independent advisors with deep delivery experience',
          'GDPR & EU AI Act aligned frameworks',
          'Hands-on enablement that proves ROI'
        ]
      };


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



  // Route to contact form (book a call / contact)
  const handleBookConsultation = () => {
    navigate('/contact');
  };

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
                  if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <html lang={language === 'no' ? 'no' : 'en'} />
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content={t.seo.keywords} />
        <link rel="canonical" href={t.seo.canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={t.seo.canonicalUrl} />
        <meta property="og:title" content={t.seo.ogTitle} />
        <meta property="og:description" content={t.seo.ogDescription} />
        <meta property="og:image" content={t.seo.ogImage} />
        <meta property="og:locale" content={language === 'no' ? 'no_NO' : 'en_US'} />
        <meta property="og:locale:alternate" content={language === 'no' ? 'en_US' : 'no_NO'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={t.seo.twitterCard} />
        <meta name="twitter:url" content={t.seo.canonicalUrl} />
        <meta name="twitter:title" content={t.seo.twitterTitle} />
        <meta name="twitter:description" content={t.seo.twitterDescription} />
        <meta name="twitter:image" content={t.seo.ogImage} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="N60 AS" />
        <meta name="geo.region" content="NO" />
        <meta name="geo.placename" content="Bergen" />
        <meta name="language" content={language === 'no' ? 'Norwegian' : 'English'} />
        <meta name="revisit-after" content="7 days" />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "N60 AS",
          "url": "https://n60.ai",
          "logo": "https://n60.ai/n60%20Logo/n60compass%20-%20Edited.png",
          "description": t.seo.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bergen",
            "addressCountry": "NO"
          },
          "sameAs": [
            "https://www.linkedin.com/company/n60"
          ]
        })}</script>
      </Helmet>
      <div className="App">
        <Navbar onLoginClick={() => setShowLoginLightbox(true)} />

        {/* Hero Section */}
        <Hero onOpenDemo={() => {}} />

        <div className="home-container">
          <div className="home-grid">
            <div className="home-main">
              {/* About Section - Compass Overview */}
            <section id="about" className="about-section">
              <div className="about-container">
                <div className="about-content">
                  <span className="about-tagline">{t.about.tagline}</span>
                  <h2 className="about-title">{t.about.title}</h2>
                  <span className="about-divider"></span>

                  <div className="about-body">
                    {t.about.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
        </div>

                  <button
                    type="button"
                    className="about-cta"
                    onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    {t.about.cta}
                  </button>
            </div>
          </div>
        </section>

              {/* The Compass Framework Section */}
            <section id="framework" className="framework-section">
          <div className="container">
                <div className="framework-header">
                  <h2 className="section-title">{t.framework.title}</h2>
                  <p className="framework-subtitle">
                    {t.framework.subtitle}
                  </p>
            </div>

                <div className="framework-accordion">
                  {frameworkSteps.map((step) => {
                    const isActive = activeFrameworkStep === step.id;
                    return (
                      <div
                        key={step.id}
                        className={`framework-accordion-step ${isActive ? 'active' : ''}`}
                      >
                        <button
                          type="button"
                          className="framework-accordion-header"
                          onClick={() => toggleFrameworkStep(step.id)}
                          aria-expanded={isActive}
                          aria-controls={`${step.id}-content`}
                          id={`${step.id}-header`}
                        >
                          <div className="framework-accordion-text">
                            <h3 className="step-title">{step.data.title}</h3>
                            <p className="framework-accordion-summary">{step.data.purpose.text}</p>
                </div>
                          <span className="framework-accordion-toggle" aria-hidden="true">
                            {isActive ? '−' : '+'}
                          </span>
                        </button>

                        <div
                          id={`${step.id}-content`}
                          className="framework-accordion-content"
                          role="region"
                          aria-labelledby={`${step.id}-header`}
                          hidden={!isActive}
                        >
                          <div className="step-purpose">
                            <h4>{step.data.purpose.title}</h4>
                            <p>{step.data.purpose.text}</p>
            </div>

                          <div className="step-process">
                            <h4>{step.data.process.title}</h4>
                            <ul>
                              {step.data.process.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                  </ul>
              </div>

                          <div className="step-deliverables">
                            <h4>{step.data.deliverables.title}</h4>
                            <ul>
                              {step.data.deliverables.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                  </ul>
                </div>

                          <div className="step-value">
                            <h4>{step.data.value.title}</h4>
                            <ul>
                              {step.data.value.items.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                  </ul>
              </div>

                          <div className="step-cost">
                            <strong>{step.data.cost}</strong>
                </div>
              </div>
            </div>
                    );
                  })}
          </div>

          </div>
        </section>

            {/* FAQ Section */}
            <section id="faq" className="faq-section">
              <div className="faq-container">
                <div className="faq-header">
                  <span className="faq-pretitle">{t.faq.pretitle}</span>
                  <h2 className="faq-title">{t.faq.title}</h2>
                  <p className="faq-description">{t.faq.description}</p>
              </div>

                <div className="faq-accordion">
                  {t.faq.items.map((item, index) => {
                    const isOpen = activeFaqItem === index;
                    return (
                      <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() => toggleFaqItem(index)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-item-${index}`}
                          id={`faq-item-${index}-trigger`}
                        >
                          <span className="faq-question-text">
                            <span className="faq-question-desktop">{item.question}</span>
                            <span className="faq-question-mobile">{item.mobileQuestion}</span>
                          </span>
                          <span className={`faq-toggle ${isOpen ? 'open' : ''}`} aria-hidden="true">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        <div
                          className="faq-answer"
                          id={`faq-item-${index}`}
                          role="region"
                          aria-labelledby={`faq-item-${index}-trigger`}
                          hidden={!isOpen}
                        >
                          <p className="faq-answer-desktop">{item.answer}</p>
                          <p className="faq-answer-mobile">{item.mobileAnswer}</p>
                </div>
              </div>
                    );
                  })}
            </div>

                <div className="faq-cta">
                  <p>{t.faq.ctaText}</p>
                  <button
                    type="button"
                    className="faq-cta-button"
                    onClick={handleBookConsultation}
                  >
                    {t.faq.ctaButton}
                  </button>
            </div>
          </div>
        </section>

              {/* Call to Action Section */}
              <section id="cta" className="cta-section">
          <div className="container">
                  <div className="cta-content">
                    <h2 className="cta-headline">{t.cta.headline}</h2>
                    <p className="cta-body">
                      {t.cta.body}
                    </p>
                    <div className="cta-buttons">
                      <button className="cta-button-primary" onClick={handleBookConsultation}>
                        {t.cta.bookConsultation}
                      </button>
                      <button className="cta-button-secondary" onClick={() => {
                        window.open('/n60 Logo/Smarter work. Safer data. Stronger teams.pdf', '_blank');
                      }}>
                        {t.cta.downloadPDF}
                      </button>
              </div>
                    <p className="cta-support">{t.cta.support}</p>
            </div>
          </div>
        </section>
            </div>

            <aside className="home-sidebar">
              <div className="home-sidebar-card">
                <h3>{sidebarCopy.bookTitle}</h3>
                <p>{sidebarCopy.bookBody}</p>
                <Link to="/contact" className="home-sidebar-button">
                  {sidebarCopy.bookCTA}
                </Link>
              </div>

              <div className="home-sidebar-card">
                <h3>{sidebarCopy.downloadTitle}</h3>
                <p>{sidebarCopy.downloadBody}</p>
                <button
                  type="button"
                  className="home-sidebar-button secondary"
                  onClick={() => window.open('/n60 Logo/Smarter work. Safer data. Stronger teams.pdf', '_blank')}
                >
                  {sidebarCopy.downloadCTA}
                </button>
            </div>

              <div className="home-sidebar-card home-sidebar-contact">
                <h3>{sidebarCopy.contactTitle}</h3>
                <p>{sidebarCopy.contactBody}</p>
                <Link to="/contact" className="home-sidebar-contact-form-link">{sidebarCopy.contactFormLink}</Link>
              </div>

              <div className="home-sidebar-card">
                <h3>{sidebarCopy.trustTitle}</h3>
                <ul className="home-sidebar-list">
                  {sidebarCopy.trustItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </aside>
            </div>
          </div>

      {/* Floating Contact Button */}
      <FloatingContactButton />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img
              src="/n60 Logo/n60compass - Edited.png"
              alt="N60 Compass"
              className="footer-logo"
            />
            <span className="footer-name">N60</span>
          </div>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <nav className="footer-links">
            <a href="/privacy-policy.html">{t.footer.privacyPolicy}</a>
            <Link to="/contact">{t.footer.contact}</Link>
            <a href="https://www.linkedin.com/company/n60" target="_blank" rel="noopener noreferrer">{t.footer.linkedin}</a>
          </nav>
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
      </div>
    </>
  );
}

export default App;// Force new build - Sat Oct 18 05:52:41 CEST 2025
// UNIQUE BUILD MARKER 1760760658

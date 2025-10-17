import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Salesbot from './components/Salesbot';
import QuotePage from './components/QuotePage';
import Training from './components/Training';
import AdminLogin from './components/AdminLogin';
import CookieConsent from './components/CookieConsent';
import './App.css';
import './components/Contact.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [showLoginLightbox, setShowLoginLightbox] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Routes>
      <Route path="/quote/*" element={<QuotePage />} />
      <Route path="/training" element={<Training />} />
      <Route path="/" element={<MainPage onLoginClick={() => setShowLoginLightbox(true)} />} />
    </Routes>
  );
}

function MainPage({ onLoginClick }) {
  // Content in Norwegian
  const content = {
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
            "Personlig tilpasset innhold for hver kunde",
            "Målbar ROI og optimalisering"
          ]
        },
        {
          title: "Effektiv leadgenerering",
          emoji: "📈",
          description: "Få flere kvalifiserte leads med AI som identifiserer potensielle kunder og automatiserer første kontakt.",
          image: "https://i.ibb.co/Q8111111/A-digital-graphic-displays-AI-powered-lead-generat.png",
          features: [
            "Identifiserer og kvalifiserer leads automatisk",
            "Personlig tilpasset utgående kommunikasjon",
            "Integrasjon med CRM-systemer",
            "Reduserer kostnad per lead"
          ]
        },
        {
          title: "Markedsutvidelse med AI",
          emoji: "🌍",
          description: "Bruk AI til å analysere nye markeder, identifisere muligheter og tilpasse din strategi for internasjonal vekst.",
          image: "https://i.ibb.co/Q8111111/A-digital-graphic-displays-AI-powered-lead-generat.png",
          features: [
            "Markedsanalyse og trendidentifikasjon",
            "Lokalisering av innhold og kampanjer",
            "Risikoanalyse og strategisk rådgivning",
            "Skalerbar vekst i nye regioner"
          ]
        }
      ]
    },
    innovation: {
      title: "Innovasjon i praksis",
      subtitle: "Vi hjelper deg å implementere AI-løsninger som gir reell verdi og konkurransefortrinn.",
      cards: [
        {
          title: "AI-strategi og rådgivning",
          description: "Utvikle en klar AI-strategi som passer din forretningsmodell og mål. Vi gir deg innsikten du trenger for å ta informerte beslutninger.",
          icon: "💡"
        },
        {
          title: "Skreddersydde AI-løsninger",
          description: "Fra konsept til implementering, vi bygger AI-løsninger som er perfekt tilpasset dine unike behov og utfordringer.",
          icon: "🛠️"
        },
        {
          title: "Opplæring og kompetansebygging",
          description: "Sikre at teamet ditt har ferdighetene til å utnytte AI fullt ut. Vi tilbyr kurs og workshops tilpasset din bedrift.",
          icon: "📚"
        }
      ]
    },
    howWeWork: {
      title: "Hvordan vi jobber",
      subtitle: "Vår prosess er designet for å være transparent, effektiv og resultatorientert.",
      steps: [
        {
          title: "Analyse og strategi",
          description: "Vi starter med en grundig analyse av dine nåværende prosesser og mål for å utvikle en skreddersydd AI-strategi."
        },
        {
          title: "Utvikling og implementering",
          description: "Våre eksperter utvikler og implementerer AI-løsninger, med fokus på sømløs integrasjon i din eksisterende infrastruktur."
        },
        {
          title: "Optimalisering og skalering",
          description: "Vi overvåker, optimaliserer og skalerer løsningene for å sikre maksimal effekt og kontinuerlig vekst."
        }
      ]
    },
    whyAi: {
      title: "Hvorfor AI med N60?",
      subtitle: "Vi er din partner for fremtidens vekst.",
      points: [
        {
          title: "Spesialister på SMB",
          description: "Vi forstår de unike utfordringene og mulighetene for små og mellomstore bedrifter i Norge."
        },
        {
          title: "Resultatorientert",
          description: "Vårt fokus er alltid på å levere målbare resultater som driver din virksomhet fremover."
        },
        {
          title: "Lokal ekspertise",
          description: "Med dyp forståelse for det norske markedet, tilbyr vi løsninger som treffer."
        },
        {
          title: "Fremtidsrettet",
          description: "Vi holder oss i forkant av AI-utviklingen for å sikre at du alltid har de mest innovative løsningene."
        }
      ]
    },
    contact: {
      title: "Få et skreddersydd tilbud",
      subtitle: "Vår smarte skjema gir deg en personlig AI-markedsføringsløsning med detaljert prising."
    }
  };

  return (
    <>
      <Helmet>
        <title>N60.ai - AI Solutions for Business</title>
        <meta name="description" content="N60.ai offers AI-powered solutions for B2B product marketing, lead generation, and market expansion tailored for Norwegian SMEs." />
      </Helmet>

      <Navbar onLoginClick={onLoginClick} />
      <Hero content={content.hero} />

      {/* Solutions Section */}
      <section id="solutions" className="solutions-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{content.solutions.title}</h2>
            <p>{content.solutions.subtitle}</p>
          </div>
          <div className="solutions-grid">
            {content.solutions.cases.map((caseItem, index) => (
              <div className="solution-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <img src={caseItem.image} alt={caseItem.title} className="solution-image" />
                <h3>{caseItem.emoji} {caseItem.title}</h3>
                <p>{caseItem.description}</p>
                <ul>
                  {caseItem.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="innovation-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{content.innovation.title}</h2>
            <p>{content.innovation.subtitle}</p>
          </div>
          <div className="innovation-grid">
            {content.innovation.cards.map((card, index) => (
              <div className="innovation-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="how-we-work-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{content.howWeWork.title}</h2>
            <p>{content.howWeWork.subtitle}</p>
          </div>
          <div className="timeline">
            {content.howWeWork.steps.map((step, index) => (
              <div className="timeline-item" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
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
            <h2>{content.whyAi.title}</h2>
            <p>{content.whyAi.subtitle}</p>
          </div>
          <div className="why-ai-grid">
            {content.whyAi.points.map((point, index) => (
              <div className="why-ai-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{content.contact.title}</h2>
            <p>{content.contact.subtitle}</p>
          </div>
          <div className="contact-content" data-aos="fade-up" data-aos-delay="200">
            <div className="contact-form-container">
              <form className="contact-form">
                <input type="text" name="name" placeholder="Navn" required />
                <input type="email" name="email" placeholder="E-post" required />
                <input type="text" name="company" placeholder="Bedrift" required />
                <textarea name="message" placeholder="Beskriv ditt prosjekt" rows="5" required></textarea>
                <button type="submit">Send melding</button>
              </form>
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

      <Salesbot />
      <CookieConsent />
    </>
  );
}

export default App;

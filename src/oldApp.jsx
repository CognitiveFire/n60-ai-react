
import React, { useEffect, useState } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

const projectsData = [
  {
    id: 1,
    category: 'Salg',
    title: 'Trondheim – Fisketeknologi AS',
    story: 'Fisketeknologi AS, a Trondheim-based fishery, struggled with manually tracking catch data across their fleet. Using n60.ai’s AI automation, they implemented a system that automatically logged and analyzed catch data in real-time, reducing data entry time by 70%. The AI also predicted optimal fishing zones, increasing their yield by 25% within six months.'
  },
  {
    id: 2,
    category: 'Markedsføring',
    title: 'Oslo – Kreativ Media',
    story: 'Kreativ Media, an Oslo marketing agency, faced challenges in producing personalized ad content at scale. n60.ai’s AI automation enabled them to generate tailored ad copy and visuals for 50+ clients simultaneously, cutting production time from weeks to days. This led to a 40% increase in client satisfaction and a 30% boost in campaign ROI.'
  },
  {
    id: 3,
    category: 'HR',
    title: 'Bergen – HR Innovate',
    story: 'HR Innovate in Bergen needed to streamline their employee onboarding process for a growing workforce. With n60.ai’s AI, they automated document collection, training scheduling, and feedback gathering, reducing onboarding time from 2 weeks to 3 days. Employee engagement scores improved by 35%, and HR staff could focus on strategic initiatives.'
  },
  {
    id: 4,
    category: 'Support',
    title: 'Global – SupportPro',
    story: 'SupportPro, a global customer support provider, struggled with language barriers in their multilingual call centers. n60.ai’s AI automation introduced real-time translation and sentiment analysis, enabling agents to handle queries in 10+ languages seamlessly. Response times dropped by 50%, and customer satisfaction ratings rose to 92%.'
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') !== 'false');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(projectsData[0].category);
  const [showVideo, setShowVideo] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  function ChatPopup() {
    const [showCalendly, setShowCalendly] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // or get this from props/context
  
    return null; // Add a proper return statement or JSX if needed
  }

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const filteredProjects = projectsData.filter(p => p.category === activeFilter);

  const handleFormSubmit = async (event) => {
    console.log('ContactForm: Form submitted, starting handleFormSubmit...');
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };
    console.log('ContactForm: Submitting form data:', data);

    try {
      console.log('ContactForm: Sending axios request to production server...');
      const response = await axios.post('https://n60.ai/api/sendgrid', data, {

        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('ContactForm: Axios response received:', response);
      const result = response.data;
      console.log('ContactForm: Axios result:', result);

      if (response.status === 200) {
        console.log('ContactForm: Setting form status to success...');
        setFormStatus({ type: 'success', message: 'Takk for din e-post, vi vil kontakte deg snart'});
        event.target.reset();
      } else {
        console.log('ContactForm: Setting form status to error:', result.error);
        setFormStatus({ type: 'error', message: result.error || 'Kunne ikke sende e-post.' });
      }
    } catch (error) {
      console.log('ContactForm: Axios error:', error.message);
      console.log('ContactForm: Full error object:', error);
      if (error.response) {
        console.log('ContactForm: Error response:', error.response.data);
        setFormStatus({ type: 'error', message: error.response.data.error || 'Kunne ikke sende e-post.' });
      } else {
        setFormStatus({ type: 'error', message: 'En feil oppstod under sending av e-post: ' + error.message });
      }
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      const heyBtn = document.getElementById('heyButton');
      if (heyBtn) {
        heyBtn.classList.add('animate');
      }
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);
  
  
  return (
    <>
 <header className="navbar">
  <img
    src={darkMode ? '/images/logo-white.png' : '/images/logo.png'}
    alt="n60 logo"
    className="logo"
  />

  <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
    {['solutions', 'how-we-work', 'pricing', 'projects', 'contact'].map((id) => (
      <a
        href={`#${id}`}
        key={id}
        onClick={() => setMenuOpen(false)}
      >
        {id.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
      </a>
    ))}
  </nav>

  <div className="navbar-controls">
    <button
      className="burger"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      ☰
    </button>
    <button
      className="dark-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  </div>
</header>


      <main>
        <section className="hero-section" id="hero" data-aos="fade-up">
          <div className="hero-text">
            <h1>Kraftig<br />AI<br />for Norske SMB</h1>
            <p>Skreddersydde AI-løsninger bygget i Norge for maksimal effekt og eierskap.</p>
            <button className="cta" onClick={() => setShowVideo(true)}>▶ Se demoen</button>
          </div>
        </section>


        {showVideo && (
          <div className="video-modal" onClick={() => setShowVideo(false)}>
            <div className="video-wrapper" onClick={(e) => e.stopPropagation()}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Demo video"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className="close-video" onClick={() => setShowVideo(false)}>×</button>
            </div>
          </div>
        )}

<section id="solutions" className="solutions-section">
  <h2 data-aos="fade-up">Våre Løsninger</h2>
  <div className="solutions-grid">
    <div className="solution-card" data-aos="fade-up" data-aos-delay="0">
      <h3>Salg</h3>
      <p>
        Automatiser leadgenerering, kvalifisering og oppfølging med AI-agenter som jobber døgnet rundt. 
        Øk konverteringsraten uten å øke teamets belastning. Rapportering og innsikt hjelper deg å prioritere de beste mulighetene.
      </p>
    </div>
    <div className="solution-card" data-aos="fade-up" data-aos-delay="100">
      <h3>Markedsføring</h3>
      <p>
        Bruk generativ AI til å lage innhold som speiler merkevaren din – raskt og målrettet. 
        Fra nyhetsbrev og blogginnlegg til sosiale medier: publiser oftere, med bedre kvalitet, og nå riktig målgruppe automatisk.
      </p>
    </div>
    <div className="solution-card" data-aos="fade-up" data-aos-delay="200">
      <h3>Kundeservice</h3>
      <p>
        Gi kundene svar umiddelbart, døgnet rundt, med AI-assistenter som håndterer de vanligste spørsmålene. 
        Reduser ventetid og kostnader samtidig som menneskelige ansatte får mer tid til komplekse henvendelser.
      </p>
    </div>
    <div className="solution-card" data-aos="fade-up" data-aos-delay="300">
      <h3>HR og personal</h3>
      <p>
        Automatiser rutineoppgaver som ferieforespørsler, onboarding og oppfølging. 
        Gi ansatte rask tilgang til informasjon og frigjør HR-teamets tid til det som betyr mest – menneskene.
      </p>
    </div>
  </div>
</section>


<section id="how-we-work" className="two-col-section">
  <div className="text-block" data-aos="fade-right">
    <h2>Slik jobber vi</h2>
    <p>Vi har gjort det enkelt å komme i gang med AI. Fra første samtale til ferdig løsning følger vi en strukturert, effektiv prosess.</p>
  </div>
  <div className="grid-4" data-aos="fade-left">
    <div className="card">
      <h3>1. Oppdagelse og behovskartlegging</h3>
      <p>Vi starter med en enkel samtale for å forstå dine utfordringer og mål. Her identifiserer vi hvilke prosesser som har størst gevinstpotensial ved automatisering.</p>
    </div>
    <div className="card">
      <h3>2. Valg av løsning</h3>
      <p>Basert på dine behov velger vi en ferdig AI-løsning fra vårt bibliotek som tilpasses din bransje. Vi sikrer at løsningen er kompatibel med dine systemer og data.</p>
    </div>
    <div className="card">
      <h3>3. Tilpasning og implementering</h3>
      <p>Vi konfigurerer løsningen slik at den fungerer med dine rutiner og arbeidsflyt. Alt hostes sikkert i Norge og er klart til bruk.</p>
    </div>
    <div className="card">
      <h3>4. Opplæring og lansering</h3>
      <p>Du får full opplæring, støtte og en tydelig roadmap. Vi hjelper deg med å få teamet ombord og følger opp for å sikre effekt og resultater.</p>
    </div>
  </div>
</section>

<section id="pricing" className="two-col-section" data-aos="fade-up">
  <div className="text-block">
    <h2>Pris</h2>
    <p>To tydelige pakker – eierskap, støtte og fleksibilitet inkludert.</p>
  </div>
  <div className="grid-2">
    <div className="card">
      <h3>Scale Up</h3>
      <p><strong>Etableringskostnad:</strong> 49 500 NOK</p>
      <p><strong>Pris:</strong> 6 950 NOK/måned</p>
      <ul>
        <li>2 AI-automatiseringer</li>
        <li>Onboarding og opplæring</li>
        <li>Fullt eierskap</li>
        <li>Hosting, support og oppdateringer <em>(valgfritt tillegg)</em></li>
        <li>Strategi-roadmap og videreutvikling <em>(valgfritt tillegg)</em></li>
      </ul>
    </div>
    <div className="card">
      <h3>AI Transformation</h3>
      <p><strong>Etableringskostnad:</strong> 95 000 NOK</p>
      <p><strong>Pris:</strong> 9 950 NOK/måned</p>
      <ul>
        <li>5+ AI-automatiseringer</li>
        <li>Redesign av arbeidsflyt</li>
        <li>Premium onboarding og dokumentasjon</li>
        <li>Hosting, support og oppdateringer <em>(valgfritt tillegg)</em></li>
        <li>Strategi-roadmap og videreutvikling <em>(valgfritt tillegg)</em></li>
      </ul>
    </div>
  </div>
</section>


        <section id="projects" className="two-col-section" data-aos="fade-up">
          <div className="text-block">
            <h2>Prosjekter</h2>
            <p>Reelle eksempler på verdi skapt med AI i norske selskaper.</p>
            <div className="project-filters">
              {[...new Set(projectsData.map(p => p.category))].map(cat => (
                <button key={cat} className={activeFilter === cat ? 'active' : ''} onClick={() => setActiveFilter(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {filteredProjects.map(project => (
              <div className="project-story" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.story}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="two-col-section" data-aos="fade-up">
          <div className="text-block">
            <h2>Kontakt Oss</h2>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Navn" required />
              <input type="email" name="email" placeholder="E-post" required />
              <input type="text" name="company" placeholder="Bedrift" required />
              <textarea name="message" placeholder="Melding" required></textarea>
              <button type="submit">Send</button>
              {formStatus && (
                <p className={formStatus.type === 'success' ? 'success-message' : 'error-message'}>
                  {formStatus.message}
                </p>
              )}
            </form>
          </div>
          <div className="graphic-block">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.19282804073!2d5.3301803!3d60.3854691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfc04e96f5a39%3A0xda17ce282c8e9338!2sMedia%20City%20Bergen%20AS!5e0!3m2!1sen!2sno!4v1697654321!5m2!1sen!2sno"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              title="Media City Bergen"
            ></iframe>
          </div>
        </section>
        </main>

<footer className="footer">
  <p>© {new Date().getFullYear()} N60.ai</p>
  <p className="made-with-love">Made in Bergen, Norway, with love ❤️</p>
</footer>

{/* Chatbot Image CTA */}
<img
        src={darkMode ? "/images/N60BOT-DARK.png" : "/images/N60BOT-LIGHT.png"}
        alt="Chat med N60"
        className="chat-tab-image"
        id="heyButton"
        onClick={() => setShowCalendly(true)}
      />

      {/* Calendly Popup */}
      {showCalendly && (
        <div className="calendly-popup">
          <h3 className="popup-title">Snakk med en løsningsspesialist</h3>
          <iframe
            src="https://calendly.com/n60/new-meeting?hide_landing_page_details=1&hide_event_type_details=1&primary_color=00c1a6"
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '12px' }}
          ></iframe>
          <button className="close-popup" onClick={() => setShowCalendly(false)}>
            ×
          </button>
        </div>
      )}
    </>
  );
}


export default App;
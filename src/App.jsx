
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import './App.css';
import './night.css';
import DemoShowcase from './components/DemoShowcase';

const projectsData = [
  {
    id: 1,
    category: 'Salg',
    title: 'Bergen – Fiskerinæring',
    story: 'Et ledende sjømatfirma med base i Bergen slet med manuell sporing av fangstdata på tvers av flåten. Med hjelp fra n60.ai ble det implementert en AI-løsning som automatisk logget og analyserte fangstdata i sanntid, noe som reduserte databehandlingstiden med 70 %. Løsningen forutså også optimale fangstområder, noe som økte utbyttet med 25 % på seks måneder.'
  },
  {
    id: 2,
    category: 'Markedsføring',
    title: 'Oslo – Mediebyrå',
    story: 'Et fremtredende mediebyrå i Oslo ønsket å skalere personlig markedsføring uten å øke bemanningen. n60.ai sin AI-løsning gjorde det mulig å produsere tilpasset annonseinnhold og visuelle elementer for over 50 kunder samtidig, og reduserte produksjonstiden fra uker til dager. Resultatet ble 40 % høyere kundetilfredshet og 30 % bedre kampanje-ROI.'
  },
  {
    id: 3,
    category: 'HR',
    title: 'Bergen – Tjenesteleverandør innen HR',
    story: 'Et raskt voksende HR-selskap i Bergen trengte å effektivisere onboarding-prosessen. Med n60.ai’s AI-løsning automatiserte de dokumentinnsamling, opplæringsplanlegging og tilbakemeldinger. Dette reduserte onboarding-tiden fra to uker til tre dager. Ansattengasjementet økte med 35 %, og HR-teamet kunne fokusere på strategisk arbeid.'
  },
  {
    id: 4,
    category: 'Support',
    title: 'Internasjonalt – Kundeserviceleverandør',
    story: 'En internasjonal aktør innen kundeservice opplevde utfordringer med språkbarrierer i flerspråklige kundesentre. Med n60.ai’s AI-løsning fikk de tilgang til sanntidsoversetting og automatisk sentimentanalyse. Dette gjorde det mulig for agenter å håndtere henvendelser på over 10 språk. Svartiden ble halvert, og kundetilfredsheten steg til 92 %.'
  }
];




function App() {
  const [theme] = useState(() => localStorage.getItem('theme') || 'night');
  const [menuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(projectsData[0]?.category || 'Salg');
  const [showVideo, setShowVideo] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const heroImageRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
      startEvent: 'DOMContentLoaded',
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const heyBtn = document.getElementById('heyButton');
      if (heyBtn) {
        heyBtn.classList.add('chat-tab-animate');
      }
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    try {
      const response = await axios.post('https://n60.ai/api/sendgrid', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFormStatus({ type: 'success', message: 'Takk for din e-post, vi vil kontakte deg snart' });
        event.target.reset();
      } else {
        setFormStatus({ type: 'error', message: response.data.error || 'Kunne ikke sende e-post.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: error.response?.data?.error || 'En feil oppstod under sending av e-post: ' + error.message });
    }
  };

  const filteredProjects = projectsData.filter(project => project.category === activeFilter);

  return (
    <>
      <div className="App">
        <Navbar />

        <section className="hero-section" id="hero">
  <div className="hero-text">
    <h1 className="hero-title">
      <span>Kraftig</span><br />
      <span>AI</span><br />
      <span>for Norske SMB</span>
    </h1>
    <p>Skreddersydde AI-løsninger bygget i Norge for maksimal effekt og eierskap.</p>
    <a href="https://calendly.com/n60/new-meeting" target="_blank" rel="noopener noreferrer" className="cta">
      ▶ Se demoen
    </a>
  </div>
  <div className="hero-image" ref={heroImageRef}>
    <img 
      src="/images/pointing-hand.png" 
      alt="Pointing hand" 
      style={{
        transform: `translateX(${Math.min(scrollY * 0.5, 200)}px)`,
        transition: 'transform 0.1s ease-out',
        width: '300px',
        height: 'auto',
        display: 'block',
        backgroundColor: 'rgba(255,255,255,0.1)'
      }}
      onLoad={() => console.log('Pointing hand image loaded successfully')}
      onError={(e) => {
        console.error('Failed to load pointing hand image:', e);
        console.log('Trying alternative approach...');
      }}
    />
  </div>
</section>
<DemoShowcase />   {/* <-- nå vises demo-rammen */}




        <section id="solutions" className="solutions-section">
          <div className="solutions-title" data-aos="fade-right">
            <h2>Våre Løsninger</h2>
          </div>
          <div className="solutions-grid">
            <div className="solution-card" data-aos="fade-up" data-aos-anchor="#solutions" data-aos-anchor-placement="top-center" data-aos-offset="100">
              <h3>Salg</h3>
              <p>Automatiser leadgenerering, kvalifisering og oppfølging med AI-agenter som jobber døgnet rundt. Øk konverteringsraten uten å øke teamets belastning. Rapportering og innsikt hjelper deg å prioritere de beste mulighetene.</p>
            </div>
            <div className="solution-card" data-aos="fade-up" data-aos-anchor="#solutions" data-aos-anchor-placement="top-center" data-aos-offset="100">
              <h3>Markedsføring</h3>
              <p>Bruk generativ AI til å lage innhold som speiler merkevaren din – raskt og målrettet. Fra nyhetsbrev og blogginnlegg til sosiale medier: publiser oftere, med bedre kvalitet, og nå riktig målgruppe automatisk.</p>
            </div>
            <div className="solution-card" data-aos="fade-up" data-aos-anchor="#solutions" data-aos-anchor-placement="top-center" data-aos-offset="100">
              <h3>Kundeservice</h3>
              <p>Gi kundene svar umiddelbart, døgnet rundt, med AI-assistenter som håndterer de vanligste spørsmålene. Reduser ventetid og kostnader samtidig som menneskelige ansatte får mer tid til komplekse henvendelser.</p>
            </div>
            <div className="solution-card" data-aos="fade-up" data-aos-anchor="#solutions" data-aos-anchor-placement="top-center" data-aos-offset="100">
              <h3>HR og personal</h3>
              <p>Automatiser rutineoppgaver som ferieforespørsler, onboarding og oppfølging. Gi ansatte rask tilgang til informasjon og frigjør HR-teamets tid til det som betyr mest – menneskene.</p>
            </div>
          </div>
        </section>

        <section id="how-we-work" className="two-col-section">
          <div className="grid-4" data-aos="fade-left">
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
              <p><strong>Etableringskostnad:</strong> 39 500 NOK</p>
              <p><strong>Pris:</strong> 3 950 NOK/måned</p>
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
              <p><strong>Etableringskostnad:</strong> 75 000 NOK</p>
              <p><strong>Pris:</strong> 6 950 NOK/måned</p>
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
  {/* TEXT  ─────────────────────────────────────────── */}
  <div className="text-block">
    <h2>Prosjekter</h2>
    <p>Reelle eksempler på verdi skapt med AI i norske selskaper.</p>

    <div className="project-filters">
      {projectsData.length ? (
        [...new Set(projectsData.map(p => p.category))].map(cat => (
          <button
            key={cat}
            className={activeFilter === cat ? 'active' : ''}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))
      ) : (
        <p>Ingen prosjekter tilgjengelig.</p>
      )}
    </div>
  </div>

  {/* GRAPHIC  ───────────────────────────────────────── */}
  <div className="graphic-block">
    {/* Outer shell of the laptop */}
    <div className="device" aria-hidden="true">
      {/* Scrollable “screen” area */}
      <div className="device__screen">
        <div className="project-grid">
          {filteredProjects.length ? (
            filteredProjects.map(project => (
              <article className="card" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.story}</p>
              </article>
            ))
          ) : (
            <p>Ingen prosjekter matcher filteret.</p>
          )}
        </div>
      </div>
    </div>
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
                <p className={`form-status ${formStatus.type} ${theme}`}>
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
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} N60.ai</p>
        <p className="made-with-love">Made in Bergen, Norway, with love ❤️</p>
      </footer>
      <a
        href="https://calendly.com/n60/new-meeting"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={theme === 'night' ? '/images/N60BOT-DARK.png' : '/images/DISCODANCE-LIGHT.png'}
          alt="Chat med N60"
          className="chat-tab-image"
        />
      </a>
    </>
  );
}

export default App;
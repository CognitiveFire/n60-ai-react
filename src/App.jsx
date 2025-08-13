
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
      const response = await axios.post('/api/sendgrid', data, {
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
      <span>AI for</span><br />
      <span>Norske SMB</span>
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
        width: '2100px',
        height: 'auto',
        display: 'block'
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

        <section id="projects" className="projects-section" data-aos="fade-up">
          <div className="projects-header">
            <h2>Prosjekter</h2>
            <p>Reelle eksempler på verdi skapt med AI i norske selskaper.</p>
          </div>
          
          <div className="projects-grid">
            <div className="project-card" data-aos="fade-up">
              <div className="project-image">
                <img src="/images/mentor.png" alt="N60 Mentor Interface" />
              </div>
              <div className="project-content">
                <h3>N60 Mentor</h3>
                <p className="project-description">
                  N60 Mentor is an AI-powered assistant built for students inside Google Classroom. 
                  It provides real-time guidance as pupils work on essays, reports, and projects — not by giving them the answers, 
                  but by helping them think more clearly, structure better, and meet the actual goals of their curriculum.
                </p>
                <p className="project-description">
                  Integrated with the syllabus for each age group, Mentor gives tailored feedback that supports learning, not shortcuts it. 
                  Whether it's a Year 6 report or a high school essay, Mentor ensures students stay on track, improve faster, and build confidence — 
                  while teachers save time and maintain full control.
                </p>
                <p className="project-description">
                  It's like having a trusted, curriculum-aware study coach built right into the tools schools already use.
                </p>
              </div>
            </div>

            <div className="project-card" data-aos="fade-up" data-aos-delay="200">
              <div className="project-image">
                <img src="/images/dealTrygt.png" alt="DelTrygt Interface" />
              </div>
              <div className="project-content">
                <h3>DelTrygt</h3>
                <p className="project-description">
                  DelTrygt is a secure, AI-powered platform for sharing school photos and videos — with full parental control built in.
                </p>
                <p className="project-description">
                  Designed for schools and families, DelTrygt ensures that parents decide who can view images of their child. 
                  Group photos are handled with care: our proprietary ClassVault™ security layer uses AI to mask identities of children without consent, 
                  then intelligently restores the background to preserve the image.
                </p>
                <p className="project-description">
                  GDPR-compliant and hosted securely in Norway, DelTrygt works seamlessly across desktop and mobile. 
                  With real-time notifications, detailed access logs, and time-limited sharing links, it replaces chaotic email threads and unsecure cloud folders 
                  with a digital experience built on trust.
                </p>
                <p className="project-description">
                  DelTrygt gives schools a safe, modern way to share memories — and gives families complete control, powered by ClassVault™.
                </p>
              </div>
            </div>

            <div className="project-card" data-aos="fade-up" data-aos-delay="400">
              <div className="project-image">
                <img src="/images/Formulate.png" alt="Formulate Interface" />
              </div>
              <div className="project-content">
                <h3>Formulate</h3>
                <p className="project-description">
                  Formulate is an AI-powered platform that turns your ideas into lead-generating content journeys.
                </p>
                <p className="project-description">
                  Just describe the type of content you want — a readiness report, a product comparison, an investment profile — and Formulate does the rest. 
                  It asks smart follow-up questions, then builds a custom form designed to collect the right information from your leads.
                </p>
                <p className="project-description">
                  Once submitted, the platform uses AI to generate a fully personalised piece of content that's ready to download or share — 
                  perfectly aligned with your campaign goals.
                </p>
                <p className="project-description">
                  It's ideal for content marketing, B2B outreach, or sales enablement — helping you move beyond generic PDFs to intelligent, 
                  conversion-focused content experiences.
                </p>
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
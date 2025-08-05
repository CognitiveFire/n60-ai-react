
import React, { useEffect, useState } from 'react';
import './App.css';
import './night.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Salg');
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const heyBtn = document.getElementById('heyButton');
      if (heyBtn) heyBtn.classList.add('chat-tab-animate');
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);

  const filteredProjects = projectsData.filter(project => project.category === activeFilter);

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
      const response = await axios.post('https://n60.ai/api/sendgrid', data);
      if (response.status === 200) {
        setFormStatus({ type: 'success', message: 'Takk for din e-post, vi vil kontakte deg snart' });
        event.target.reset();
      } else {
        setFormStatus({ type: 'error', message: 'Kunne ikke sende e-post.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'En feil oppstod: ' + error.message });
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src='/images/logo-dark.png' alt="N60.ai Logo" className="logo" />
          </div>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {['solutions', 'how-we-work', 'pricing', 'projects', 'contact'].map((id) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {id.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="hero" className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-headline">Kraftige AI-løsninger for norske SMBer</h1>
          <p className="hero-subheadline">Vi gjør AI tilgjengelig, skalerbart og lønnsomt – tilpasset din bransje og arbeidsflyt.</p>
          <a href="#contact" className="hero-cta">Book en demo</a>
        </div>
      </section>
      <section id="solutions" className="solutions-section">
  <h2>Våre Løsninger</h2>
  <div className="solutions-grid">
    <div className="solution-card">
      <h3>Salg</h3>
      <p>
        Automatiser leadgenerering, kvalifisering og oppfølging med AI-agenter som jobber døgnet rundt.
        Øk konverteringsraten uten å øke teamets belastning. Rapportering og innsikt hjelper deg å
        prioritere de beste mulighetene.
      </p>
    </div>
    <div className="solution-card">
      <h3>Markedsføring</h3>
      <p>
        Bruk generativ AI til å lage innhold som speiler merkevaren din – raskt og målrettet.
        Fra nyhetsbrev og blogginnlegg til sosiale medier: publiser oftere, med bedre kvalitet,
        og nå riktig målgruppe automatisk.
      </p>
    </div>
    <div className="solution-card">
      <h3>Kundeservice</h3>
      <p>
        Gi kundene svar umiddelbart, døgnet rundt, med AI-assistenter som håndterer de vanligste spørsmålene.
        Reduser ventetid og kostnader samtidig som menneskelige ansatte får mer tid til komplekse henvendelser.
      </p>
    </div>
    <div className="solution-card">
      <h3>HR og Personal</h3>
      <p>
        Automatiser rutineoppgaver som ferieforespørsler, onboarding og oppfølging.
        Gi ansatte rask tilgang til informasjon og frigjør HR-teamets tid til det som betyr mest – menneskene.
      </p>
    </div>
  </div>
</section>
<section id="how-we-work" className="how-we-work-section">
  <h2>Slik jobber vi</h2>
  <div className="how-grid">
    <div className="how-card">
      <h3>1. Behovskartlegging</h3>
      <p>Vi starter med en kort workshop for å forstå bedriftens behov, mål og eksisterende prosesser.</p>
    </div>
    <div className="how-card">
      <h3>2. Løsningsforslag</h3>
      <p>Basert på innsikten setter vi sammen et konkret forslag med anbefalte AI-agenter og automatiseringer.</p>
    </div>
    <div className="how-card">
      <h3>3. Implementering</h3>
      <p>Vi bygger, konfigurerer og integrerer løsningen i dine systemer. Alt skjer i tett samarbeid.</p>
    </div>
    <div className="how-card">
      <h3>4. Opplæring og støtte</h3>
      <p>Du får opplæring i bruk og eierskap. Vi tilbyr vedlikehold, justeringer og videre optimalisering.</p>
    </div>
  </div>
</section>

<section id="projects" className="projects-section">
        <h2>Prosjekter</h2>
        <div className="project-filters">
          {['Salg', 'Markedsføring', 'HR', 'Support'].map((cat) => (
            <button
              key={cat}
              className={cat === activeFilter ? 'active' : ''}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div className="project-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.story}</p>
            </div>
          ))}
        </div>
      </section>



<section id="pricing" className="pricing-section">
        <h2>Velg din pakke</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3 className="text-right">Skaler Opp</h3>
            <p className="text-right">Etablering: 49 500 NOK</p>
            <p className="text-right">Valgfritt: 6 950 NOK/mnd</p>
            <ul className="text-right">
              <li>2 AI-automatiseringer</li>
              <li>Opplæring og støtte</li>
              <li>Hosting og oppdateringer</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3 className="text-right">AI Transformasjon</h3>
            <p className="text-right">Etablering: 95 000 NOK</p>
            <p className="text-right">Valgfritt: 9 950 NOK/mnd</p>
            <ul className="text-right">
              <li>Full prosessanalyse</li>
              <li>4+ AI-automatiseringer</li>
              <li>Langsiktig samarbeid</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <h2>Kontakt oss</h2>
        <form onSubmit={handleFormSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Navn" required />
          <input type="email" name="email" placeholder="E-post" required />
          <input type="text" name="company" placeholder="Bedrift" required />
          <textarea name="message" placeholder="Melding" required></textarea>
          <button type="submit">Send</button>
          {formStatus && <p className={formStatus.type}>{formStatus.message}</p>}
        </form>
        <div className="map-container">
          <iframe
            title="N60.ai Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1995.174503400572!2d5.313232215918378!3d60.30168208196433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfaaecf8b1a07%3A0x4c75e6fd07ddc2aa!2sBergen!5e0!3m2!1sen!2sno!4v1680012345678"
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
      <footer className="footer">
        <p>© {new Date().getFullYear()} N60.ai</p>
        <p className="made-with-love">Laget i Bergen, Norge, med kjærlighet ❤️</p>
      </footer>
    </>
  );
}

export default App;
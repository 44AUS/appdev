import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Home,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Users,
  X,
} from 'lucide-react';
import mintslipLogo from './assets/logos/mintslip.png';
import cinecastLogo from './assets/logos/cinecast.png';
import urloadLogo from './assets/logos/urload.png';
import whodatLogo from './assets/logos/whodat.jpg';
import './App.css';

// Flatt Apps logo: three stacked isometric layers, one for each app or tech
// stack we ship. Drawn to match the app icon; `spread` animates the layers apart.
const SLAB_OFFSETS = [254, 127, 0]; // bottom to top, so upper layers paint over lower ones

const CubeSlab = ({ offset, gradientId, isTop }) => (
  <>
    <polygon points={`258,${367 + offset} 512,${513 + offset} 512,${549 + offset} 258,${403 + offset}`} fill={`url(#${gradientId}-left)`} />
    <polygon points={`766,${367 + offset} 512,${513 + offset} 512,${549 + offset} 766,${403 + offset}`} fill={`url(#${gradientId}-right)`} />
    <polygon
      points={`512,${220 + offset} 766,${367 + offset} 512,${513 + offset} 258,${367 + offset}`}
      fill={`url(#${gradientId}-${isTop ? 'top' : 'face'})`}
      stroke={isTop ? '#E0B3FF' : '#C77DFF'}
      strokeOpacity={isTop ? 1 : 0.75}
      strokeWidth={isTop ? 6 : 5}
      strokeLinejoin="round"
    />
  </>
);

const FlattLogo = ({ className, spread = false }) => {
  const gradientId = `flatt-${useId().replace(/:/g, '')}`;

  return (
    <svg viewBox="209 205 606 606" className={className} overflow="visible" role="img" aria-label="Flatt Apps logo">
      <defs>
        <linearGradient id={`${gradientId}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C77DFF" />
          <stop offset="1" stopColor="#A51DF0" />
        </linearGradient>
        <linearGradient id={`${gradientId}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A51DF0" />
          <stop offset="1" stopColor="#5B0A91" />
        </linearGradient>
        <linearGradient id={`${gradientId}-left`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5B0A91" />
          <stop offset="1" stopColor="#3A0563" />
        </linearGradient>
        <linearGradient id={`${gradientId}-right`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7A10BF" />
          <stop offset="1" stopColor="#A51DF0" />
        </linearGradient>
      </defs>
      {SLAB_OFFSETS.map((offset, index) => (
        <motion.g
          key={offset}
          animate={spread ? { y: [0, (index - 1) * -34, 0] } : undefined}
          transition={spread ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <CubeSlab offset={offset} gradientId={gradientId} isTop={offset === 0} />
        </motion.g>
      ))}
    </svg>
  );
};

// Image that falls back to a monogram when its URL has expired
const Thumb = ({ src, name, className = '' }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`thumb ${className}`}>
      {src && !failed ? (
        <img src={src} alt={name} onError={() => setFailed(true)} />
      ) : (
        <span>{name[0]}</span>
      )}
    </div>
  );
};

const clients = {
  mintslip: { name: 'MintSlip', logo: mintslipLogo },
  cinecast: { name: 'Cinecast', logo: cinecastLogo },
  urload: { name: 'Urload', logo: urloadLogo },
  whodat: { name: 'WhoDat', logo: whodatLogo },
};

const workInProgress = [
  { client: clients.mintslip, description: 'Working with MintSlip to build the fastest, and more robust paystub generator.' },
  { client: clients.cinecast, description: 'Building Cinecast, the app that sends video from any site to your TV, from Roku and Fire TV to Chromecast and Apple TV.' },
  { client: clients.urload, description: 'Building Urload, the all-in-one platform for the trucking industry, connecting carriers and brokers in one seamless system.' },
  { client: clients.whodat, description: 'Building WhoDat, which finds where a face appears across social platforms and public records from a single photo, built for dating safety and identity verification.' },
];

const portfolioWork = [
  { client: clients.mintslip, achievement: 'The best Paystub Generator' },
  { client: clients.cinecast, achievement: 'Casts to Roku, Fire TV, Chromecast and more' },
  { client: clients.urload, achievement: 'The smarter load board for carriers and brokers' },
  { client: clients.whodat, achievement: 'Find anyone from a single photo' },
];

const services = [
  { label: 'From 0 to 1', title: 'Build the best app, from scratch', price: '10,000', priceDesc: 'USD/month, 3 min.' },
  { label: 'Already have an app?', title: 'Improve your existing app', price: '300', priceDesc: 'USD/hour + audit' },
];

const expertiseAreas = [
  'React Native', 'Expo', 'TypeScript', 'Node.js', 'GraphQL',
  'AWS', 'Firebase', 'Redux', 'REST APIs', 'CI/CD', 'App Store', 'Play Store',
];

const clientNames = ['Coca-Cola', 'Delta', 'Home Depot', 'NCR', 'UPS', 'Mailchimp'];

const teamMembers = [
  { name: 'Austin', avatar: 'https://media.licdn.com/dms/image/v2/D5603AQEE4HfTuiUTDw/profile-displayphoto-crop_800_800/B56Zor9sa4J4AI-/0/1761674184991?e=1770249600&v=beta&t=62lcyJxrd8bx11gpcWtj-pH-IUCyayJMtiDDF1zGwLs' },
  { name: 'Jerome', avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQGHsPjpVrGY4A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731553045462?e=1770249600&v=beta&t=5LHHkhK3goHAo1D3zdAqMeytfCUSzs8rDiKESVXewk4' },
  { name: 'Mike', avatar: null },
];

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'expertise', label: 'Expertise', icon: Cpu },
  { id: 'about', label: 'About', icon: Users },
];

const reveal = {
  initial: { opacity: 0, y: 28, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: 'spring', stiffness: 120, damping: 20 },
};

// Colour field behind the glass: fixed aurora plus crisp spheres that scroll
// with the page, so the blur has something visible to refract as you move.
const Ambient = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <motion.div className="ambient-drift" style={{ y }}>
          <span className="orb orb-violet" />
          <span className="orb orb-blue" />
          <span className="orb orb-indigo" />
          <span className="orb orb-lilac" />
        </motion.div>
      </div>
      <div className="spheres" aria-hidden="true">
        <span className="sphere sphere-1" />
        <span className="sphere sphere-2" />
        <span className="sphere sphere-3" />
        <span className="sphere sphere-4" />
        <span className="sphere sphere-5" />
        <span className="sphere sphere-6" />
        <span className="halo halo-1" />
        <span className="halo halo-2" />
      </div>
    </>
  );
};

const ServiceCard = ({ service, index, onBook }) => {
  // Written straight to CSS variables so the specular highlight never re-renders React
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      className="glass service-card"
      onMouseMove={handleMouseMove}
      {...reveal}
      transition={{ ...reveal.transition, delay: index * 0.1 }}
      data-testid={`service-card-${index}`}
    >
      <span className="service-label">{service.label}</span>
      <h3>{service.title}</h3>
      <div className="service-footer">
        <div>
          <p className="service-price">${service.price}</p>
          <p className="service-price-desc">{service.priceDesc}</p>
        </div>
        <button
          className="glass-icon-btn"
          onClick={onBook}
          aria-label={`Book a call about: ${service.title}`}
          data-testid={`service-add-btn-${index}`}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ title, note, children }) => (
  <div className="section-title">
    <div>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </div>
    {children}
  </div>
);

// iOS-style sheet. The scrim is a sibling, not a parent, because a parent with
// backdrop-filter would stop the sheet from blurring the page behind it.
const DiscoverySheet = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          key="scrim"
          className="sheet-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <div key="wrap" className="sheet-wrap">
          <motion.div
            className="glass sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Book a Discovery Call"
            initial={{ y: 60, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <span className="sheet-grabber" />
            <div className="sheet-head">
              <h2>Book a Discovery Call</h2>
              <button className="glass-icon-btn" onClick={onClose} aria-label="Close" data-testid="close-modal-btn">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="sheet-copy">
              Let's discuss your project! Choose how you'd like to get in touch with our team:
            </p>
            <div className="sheet-actions">
              <button
                onClick={() => { window.location.href = 'mailto:hello@flattapps.com?subject=Discovery%20Call%20Request&body=Hi%20Flatt%20Apps%20Team,%0A%0AI%27d%20like%20to%20schedule%20a%20discovery%20call%20to%20discuss%20my%20project.%0A%0AProject%20Type:%0ACompany:%0ABrief%20Description:%0A%0AThanks!'; }}
                className="cta-button"
                data-testid="email-cta-btn"
              >
                <Mail className="w-5 h-5" />
                Send us an Email
              </button>
              <button
                onClick={() => window.open('https://calendly.com/flattapps', '_blank')}
                className="glass-button"
                data-testid="calendly-cta-btn"
              >
                <ExternalLink className="w-5 h-5" />
                Schedule on Calendly
              </button>
            </div>
            <p className="sheet-foot">
              Or reach us directly at <a href="mailto:hello@flattapps.com">hello@flattapps.com</a>
            </p>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
);

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [tabsCompact, setTabsCompact] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const sectionsRef = {
    home: useRef(null),
    services: useRef(null),
    work: useRef(null),
    expertise: useRef(null),
    about: useRef(null),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % workInProgress.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const scrollPosition = y + 200;

      Object.entries(sectionsRef).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });

      // Like the iOS tab bar: tuck the labels away while reading, bring them back on scroll up
      if (Math.abs(y - lastY) > 6) {
        setTabsCompact(y > lastY && y > 120);
        lastY = y;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // sectionsRef holds stable refs
  }, []);

  const scrollToSection = (sectionId) => {
    sectionsRef[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBooking = () => setShowModal(true);
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeSection);
  const currentProject = workInProgress[currentProjectIndex];

  return (
    <MotionConfig reducedMotion="user">
    <div className="app-container">
      <Ambient />
      <div className="noise-overlay"></div>

      <header className="top-bar-wrap">
        <div className="glass top-bar">
          <button className="brand" onClick={() => scrollToSection('home')} data-testid="brand-home-btn">
            <FlattLogo className="w-8 h-8 flex-shrink-0" />
            <span>Flatt Apps</span>
          </button>
          <button className="cta-button cta-compact" onClick={openBooking} data-testid="header-cta-btn">
            <span className="hidden md:inline">Book a discovery call</span>
            <span className="md:hidden">Book a call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="page">
        <section ref={sectionsRef.home} className="hero" data-testid="hero-section">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-eyebrow">
              <span className="live-dot" />
              iOS · Android · Cross-platform
            </span>

            <h1>
              Your Global <span className="gradient-text">React Native</span> Studio
            </h1>

            <p className="hero-sub">Powered by <strong>Expo</strong></p>

            <p className="hero-body">
              Flatt Apps is a mobile app development studio working with clients around the world.
              We build high-performance iOS and Android apps that users love and businesses depend on.
            </p>

            <div className="hero-actions">
              <button className="cta-button" onClick={openBooking} data-testid="hero-cta-btn">
                Book a discovery call
                <ArrowRight className="w-5 h-5" />
              </button>
              <a className="glass-button" href="mailto:hello@flattapps.com" data-testid="hero-email-link">
                <Mail className="w-4 h-4" />
                hello@flattapps.com
              </a>
            </div>
          </motion.div>
        </section>

        <section className="section" data-testid="work-in-progress-section">
          <SectionTitle title="Work In Progress" note="(that we can talk about)" />

          <motion.div className="glass wip-card" {...reveal} data-testid="work-progress-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex}
                className="wip-inner"
                initial={{ opacity: 0, x: 24, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -24, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              >
                <Thumb src={currentProject.client.logo} name={currentProject.client.name} className="thumb-xl" />
                <div>
                  <span className="wip-status">
                    <span className="live-dot" />
                    Currently
                  </span>
                  <p className="wip-description">{currentProject.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="page-control">
              {workInProgress.map((project, index) => (
                <button
                  key={project.client.name}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={index === currentProjectIndex ? 'active' : ''}
                  aria-label={`Show ${project.client.name}`}
                  data-testid={`progress-dot-${index}`}
                />
              ))}
            </div>
          </motion.div>
        </section>

        <section ref={sectionsRef.services} className="section" data-testid="services-section">
          <SectionTitle title="Services" />
          <div className="service-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} onBook={openBooking} />
            ))}
          </div>
        </section>

        <section ref={sectionsRef.work} className="section" data-testid="portfolio-section">
          <SectionTitle title="Work" note="(that we can talk about)">
            <span className="section-stat">10 years, 35+ apps</span>
          </SectionTitle>

          <motion.div className="glass inset-list" {...reveal}>
            {portfolioWork.map((work, index) => (
              <div key={work.client.name} className="inset-row" data-testid={`portfolio-card-${index}`}>
                <Thumb src={work.client.logo} name={work.client.name} />
                <div className="inset-row-text">
                  <h4>{work.client.name}</h4>
                  <p>{work.achievement}</p>
                </div>
                <ChevronRight className="w-5 h-5 inset-row-chevron" />
              </div>
            ))}
          </motion.div>
        </section>

        <section ref={sectionsRef.expertise} className="section" data-testid="expertise-section">
          <SectionTitle title="Expertise" />

          <motion.div className="glass panel" {...reveal}>
            <p className="panel-copy">
              We've partnered with leading brands around the world. Our expertise spans the entire
              React Native and mobile app development ecosystem, delivering scalable solutions for
              businesses everywhere.
            </p>

            <div className="chip-row">
              {expertiseAreas.map((area, index) => (
                <span key={area} className="chip" data-testid={`expertise-tag-${index}`}>{area}</span>
              ))}
            </div>

            <div className="client-row">
              {clientNames.map((brand) => <span key={brand}>{brand}</span>)}
            </div>
          </motion.div>
        </section>

        <section ref={sectionsRef.about} className="section" data-testid="about-section">
          <SectionTitle title="About" />

          <div className="about-grid">
            <motion.div className="glass panel" {...reveal}>
              <p className="panel-copy">
                Founded in Atlanta, Flatt Apps started as a small team of passionate developers.
                Today, we're the go-to React Native development studio for startups and
                Fortune 500 companies around the world.
              </p>
              <p className="panel-copy">
                Our mission is simple: build mobile apps that businesses and users love.
                We obsess over performance, user experience, and code quality because we know
                these details make the difference between a good app and a great one.
              </p>
              <p className="panel-lead">Your trusted partner for mobile app development, wherever you are.</p>
            </motion.div>

            <motion.div className="glass panel" {...reveal}>
              <h3 className="panel-title">Meet the Team</h3>
              <div className="team-list">
                {teamMembers.map((member, index) => (
                  <div key={member.name} className="team-row" data-testid={`team-member-${index}`}>
                    <Thumb src={member.avatar} name={member.name} className="thumb-round" />
                    <span>{member.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section" data-testid="open-source-section">
          <motion.div className="glass banner" {...reveal}>
            <div>
              <h2>Open Source</h2>
              <p>
                We believe in giving back to the tech community and beyond.
                Check out our open source contributions and projects on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/flattapps"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button"
              data-testid="github-link"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        <footer className="section footer" data-testid="footer">
          <div className="glass footer-card">
            <div className="footer-grid">
              <div>
                <div className="brand footer-brand">
                  <FlattLogo className="w-10 h-10 flex-shrink-0" />
                  <span>Flatt Apps</span>
                </div>
                <p>A global React Native and mobile app development studio.</p>
                <p className="footer-fine">
                  Serving startups and enterprises around the world.
                </p>
              </div>

              <div>
                <h4>Contact</h4>
                <p>hello@flattapps.com</p>
                <p>projects@flattapps.com</p>
                <p className="footer-fine footer-place"><MapPin className="w-4 h-4" /> Based in Atlanta, GA</p>
              </div>

              <div>
                <h4>Follow Us</h4>
                <div className="footer-social">
                  <a href="https://github.com/flattapps" className="glass-icon-btn" aria-label="GitHub" data-testid="footer-github">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/company/flattapps" className="glass-icon-btn" aria-label="LinkedIn" data-testid="footer-linkedin">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/flattapps" className="glass-icon-btn" aria-label="X" data-testid="footer-x">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h4>Services</h4>
                <p>React Native Development</p>
                <p>iOS App Development</p>
                <p>Android App Development</p>
                <p>Mobile App Consulting</p>
              </div>
            </div>

            <div className="footer-base">
              <p>© 2026 Flatt Apps. All rights reserved.</p>
              <p>Serving clients worldwide</p>
            </div>
          </div>
        </footer>
      </main>

      <nav className={`glass tab-bar ${tabsCompact ? 'compact' : ''}`} data-testid="sticky-nav">
        <motion.span
          className="tab-lens"
          animate={{ x: `${Math.max(activeTabIndex, 0) * 100}%` }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        />
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={activeSection === id ? 'active' : ''}
            aria-label={label}
            aria-current={activeSection === id ? 'true' : undefined}
            data-testid={`sticky-nav-${id}`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <DiscoverySheet isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
    </MotionConfig>
  );
}

export default App;

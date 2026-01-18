import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Settings, 
  Github, 
  Linkedin, 
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Rocket,
  Users,
  Zap,
  Globe
} from 'lucide-react';
import './App.css';

// React Native Icon (actual logo)
const ReactNativeIcon = ({ className }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
    <circle cx="0" cy="0" r="2.05" fill="#FFF"/>
    <g stroke="#FFF" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

// Expo Icon (actual logo)
const ExpoIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="white"><path fill="#FFF" d="M121.309 84.673c2.094-3.086 4.385-3.478 6.244-3.478c1.86 0 4.957.392 7.051 3.478c16.502 22.667 43.742 67.819 63.835 101.126c13.104 21.72 23.168 38.403 25.233 40.526c7.751 7.97 18.382 3.003 24.559-6.037c6.081-8.9 7.77-15.15 7.77-21.817c0-4.54-88.106-168.4-96.979-182.039C150.49 3.314 147.71 0 133.106 0h-10.93c-14.56 0-16.665 3.314-25.198 16.432C88.106 30.072 0 193.93 0 198.472c0 6.666 1.688 12.916 7.77 21.816c6.177 9.04 16.808 14.007 24.559 6.037c2.065-2.123 12.13-18.806 25.233-40.526c20.093-33.307 47.245-78.46 63.747-101.126"/></svg>
);

// Animated concentric circles component with actual logos
const ConcentricCircles = () => (
  <div className="hero-graphic mx-auto">
    <div className="concentric-circle"></div>
    <div className="concentric-circle"></div>
    <div className="concentric-circle"></div>
    <div className="concentric-circle"></div>
    <div className="logo-container">
      <motion.div 
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-black flex items-center justify-center border border-white/20"

        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ReactNativeIcon className="w-10 h-10 md:w-12 md:h-12" />
      </motion.div>
      <div className="text-white/60 text-2xl md:text-3xl font-light mx-2">+</div>
      <motion.div 
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-black flex items-center justify-center border border-white/20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <ExpoIcon className="w-8 h-8 md:w-10 md:h-10" />
      </motion.div>
    </div>
  </div>
);

// App Logo Component - Rounded corners like real app icons
const AppLogo = ({ colors, icon: Icon }) => (
  <div 
    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
    style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
  >
    <Icon className="w-7 h-7 text-white" />
  </div>
);

// Work in progress data with app-style icons - New design
const workInProgress = [
  {
    id: 1,
    name: "MintSlip",
    description: "Working with MintSlip to build the fastest, and more robust paystub generator.",
    status: "CURRENTLY",
    iconType: "rainbow",
    iconBg: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
  },
  {
    id: 2,
    name: "Expo",
    description: "Partnering with Expo to enhance developer experience and build performance improvements.",
    status: "CURRENTLY", 
    iconType: "expo",
    iconBg: "#000000",
  },
  {
    id: 3,
    name: "Supreme Detail Studio",
    description: "Helping Supreme Detail Studio scale their detailing platform to handle in app bookings.",
    status: "CURRENTLY", 
    iconType: "swoogo",
    iconBg: "#F97316",
  },
];

// Services data - New design
const services = [
  {
    label: "FROM 0 TO 1",
    title: "Build the best app, from scratch",
    price: "10,000",
    priceDesc: "USD/month, 3 min."
  },
  {
    label: "ALREADY HAVE AN APP?",
    title: "Improve your existing app",
    price: "300",
    priceDesc: "USD/hour + audit"
  },
];

// Service Card Component with mouse-following gradient
const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-card-new"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`service-card-${index}`}
    >
      {/* Gradient overlay that follows cursor */}
      <div 
        className="service-card-gradient"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />
      
      {/* Border gradient effect */}
      <div 
        className="service-card-border-gradient"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`
        }}
      />
      
      <div className="service-card-content">
        <span className="service-label">{service.label}</span>
        <h3 className="service-title-new">{service.title}</h3>
        
        <div className="service-footer">
          <div className="service-price-container">
            <span className="service-price-symbol">$</span>
            <span className="service-price-value">{service.price}</span>
            <span className="service-price-desc">{service.priceDesc}</span>
          </div>
          <button className="service-add-btn" data-testid={`service-add-btn-${index}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="6" x2="10" y2="14" />
              <line x1="6" y1="10" x2="14" y2="10" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Portfolio work data with styled icons
const portfolioWork = [
  { 
    name: "Expo", 
    achievement: "Recommending us since 2022", 
    iconType: "expo",
    iconBg: "#000000",
    iconContent: "∧"
  },
  { 
    name: "MintSlip", 
    achievement: "The best Paystub Generator", 
    iconType: "rainbow",
    iconBg: "#3B82F6",
    iconContent: "🌈"
  },
  { 
    name: "Supreme Detail Studio", 
    achievement: "Over 2k clients acquired", 
    iconType: "swoogo",
    iconBg: "#F97316",
    iconContent: "go"
  },
];

// Expertise areas
const expertiseAreas = [
  "React Native", "Expo", "TypeScript", "Node.js", "GraphQL", 
  "AWS", "Firebase", "Redux", "REST APIs", "CI/CD", "App Store", "Play Store"
];

// Team members
const teamMembers = [
  { name: "Austin", avatar: "https://media.licdn.com/dms/image/v2/D5603AQEE4HfTuiUTDw/profile-displayphoto-crop_800_800/B56Zor9sa4J4AI-/0/1761674184991?e=1770249600&v=beta&t=62lcyJxrd8bx11gpcWtj-pH-IUCyayJMtiDDF1zGwLs" },
  { name: "Jerome", avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGHsPjpVrGY4A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731553045462?e=1770249600&v=beta&t=5LHHkhK3goHAo1D3zdAqMeytfCUSzs8rDiKESVXewk4" },
  { name: "Mike", avatar: "👨‍🎨" },
];

// Discovery Call Modal - Opens email client
const DiscoveryModal = ({ isOpen, onClose }) => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@appmakersatl.com?subject=Discovery%20Call%20Request&body=Hi%20AppMakersATL%20Team,%0A%0AI%27d%20like%20to%20schedule%20a%20discovery%20call%20to%20discuss%20my%20project.%0A%0AProject%20Type:%0ACompany:%0ABrief%20Description:%0A%0AThanks!';
  };

  const handleCalendlyClick = () => {
    // Opens calendly or any scheduling link - replace with actual link
    window.open('https://calendly.com/appmakersatl', '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Book a Discovery Call</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" data-testid="close-modal-btn">
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-400 mb-6">
            Let's discuss your project! Choose how you'd like to get in touch with our Atlanta team:
          </p>

          <div className="space-y-4">
            <button 
              onClick={handleEmailClick}
              className="cta-button w-full justify-center"
              data-testid="email-cta-btn"
            >
              <Mail className="w-5 h-5" />
              Send us an Email
            </button>
            
            <button 
              onClick={handleCalendlyClick}
              className="secondary-button w-full justify-center"
              data-testid="calendly-cta-btn"
            >
              <ExternalLink className="w-5 h-5" />
              Schedule on Calendly
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm mb-2">Or reach us directly at:</p>
            <a href="mailto:hello@appmakersatl.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              hello@appmakersatl.com
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAllWork, setShowAllWork] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  const sectionsRef = {
    home: useRef(null),
    services: useRef(null),
    work: useRef(null),
    expertise: useRef(null),
    about: useRef(null)
  };

  // Auto-rotate work in progress projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % workInProgress.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      Object.entries(sectionsRef).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    sectionsRef[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const displayedWork = showAllWork ? portfolioWork : portfolioWork.slice(0, 6);

  return (
    <div className="app-container">
      {/* Noise overlay for texture */}
      <div className="noise-overlay"></div>

      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold text-base md:text-xl">AppMakersATL</span>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['Services', 'Work', 'Expertise', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile CTA button - smaller */}
            <button 
              className="md:hidden cta-button-mobile"
              onClick={() => setShowModal(true)}
              data-testid="mobile-header-cta-btn"
            >
              <ArrowRight className="w-3 h-3" />
              <span className="text-xs whitespace-nowrap">Book a call</span>
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* CTA button desktop only */}
            <motion.button 
              className="cta-button desktop-only-cta"
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="header-cta-btn"
            >
              <ArrowRight className="w-5 h-5" />
              Book a discovery call
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden glass border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="px-4 py-4 space-y-2">
                {['Services', 'Work', 'Expertise', 'About'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 text-gray-300 hover:text-white transition-colors"
                    data-testid={`mobile-nav-${item.toLowerCase()}`}
                  >
                    {item}
                  </button>
                ))}
                <button 
                  className="secondary-button w-full justify-center mt-4 text-sm"
                  onClick={() => { setShowModal(true); setMobileMenuOpen(false); }}
                  data-testid="mobile-cta-btn"
                >
                  <ArrowRight className="w-4 h-4" />
                  Book a discovery call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={sectionsRef.home} className="min-h-screen flex flex-col justify-center px-4 pt-20" data-testid="hero-section">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Animated graphic */}
            <ConcentricCircles />

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-12 mb-6 leading-tight">
              Atlanta's Premier{' '}
              <span className="gradient-text">React Native</span>{' '}
              Studio
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              Powered by <span className="text-white font-semibold">Expo</span>
            </p>

            <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
              AppMakersATL is Atlanta, Georgia's leading mobile app development studio. 
              We build high-performance iOS and Android apps that users love and businesses depend on.
            </p>

            {/* CTA */}
            <motion.button 
              className="cta-button mx-auto"
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="hero-cta-btn"
            >
              <ArrowRight className="w-5 h-5" />
              Book a discovery call
            </motion.button>

            <p className="mt-4 text-gray-500">
              <Mail className="w-4 h-4 inline mr-2" />
              hello@appmakersatl.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work in Progress Section */}
      <section className="py-20 px-4" data-testid="work-in-progress-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Work In Progress</h2>
            <p className="text-gray-500 text-sm mt-1">(that we can talk about)</p>
          </div>

          {/* Large transitioning card */}
          <div className="wip-card" data-testid="work-progress-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex}
                className="wip-card-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Large App Icon */}
                <div className="wip-icon-container">
                  {workInProgress[currentProjectIndex].iconType === 'rainbow' && (
                    <div className="wip-icon wip-icon-swoogo">
                    <img src='https://play-lh.googleusercontent.com/9n4kPRKNBLDlh00B_91Okqe11DjBS6Nz_v02MmtJM9pPqlVAYqxx8QL7iFh7xLP-yglrtj7wLKR3M_nGpJwC-Ew=w480-h960-rw' />
                    </div>
                  )}
                  {workInProgress[currentProjectIndex].iconType === 'expo' && (
                    <div className="wip-icon wip-icon-swoogo">
                    <img src='https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s=w480-h960-rw' />
                    </div>
                  )}
                  {workInProgress[currentProjectIndex].iconType === 'swoogo' && (
                    <div className="wip-icon wip-icon-swoogo">
                    <img src='https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/448136429_361606140361411_3051297350919406801_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NpjPSRCW3lAQ7kNvwHxk4I3&_nc_oc=Adkfun6pwjqr2zJRUxs83MCD_wN7tYWzUA9KlSCWGq9MDxg10rHA-yaC7LxWOLbj4ud_sT80lfUI5Z3TCdTXvV3G&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&_nc_gid=OWiuRa-9sEeIUKT2GqRxNg&oh=00_Afp0shIB-qHjDdI67Sw_5ukeHq6JTcIP4KSX3H8PkHLGvA&oe=6971FFE9' />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="wip-content">
                  <div className="wip-status">
                    <span className="breathing-dot"></span>
                    <span className="wip-status-text">{workInProgress[currentProjectIndex].status}</span>
                  </div>
                  <p className="wip-description">
                    {workInProgress[currentProjectIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="wip-dots">
              {workInProgress.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`wip-dot ${index === currentProjectIndex ? 'active' : ''}`}
                  data-testid={`progress-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionsRef.services} className="py-20 px-4 bg-dark-800/50" data-testid="services-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Work Section */}
      <section ref={sectionsRef.work} className="py-20 px-4" data-testid="portfolio-section">
        <div className="max-w-4xl mx-auto">
          {/* Section header with stats */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Work</h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">(that we can talk about)</p>
            </div>
            <div className="text-right">
              <span className="text-gray-400 text-sm tracking-wider">10 YEARS, 35+ APPS</span>
            </div>
          </div>

          {/* Work list items */}
          <div className="work-list">
            {displayedWork.map((work, index) => (
              <motion.div
                key={index}
                className="work-list-item"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                data-testid={`portfolio-card-${index}`}
              >
                <div className="flex items-center gap-4">
                  {/* Custom icon based on type */}
                  {work.iconType === 'expo' && (
                    <div className="work-icon work-icon-expo">
                      <img src='https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s=w480-h960-rw' />
                    </div>
                  )}
                  {work.iconType === 'rainbow' && (
                    <div className="work-icon work-icon-rainbow">
                      <img src='https://play-lh.googleusercontent.com/9n4kPRKNBLDlh00B_91Okqe11DjBS6Nz_v02MmtJM9pPqlVAYqxx8QL7iFh7xLP-yglrtj7wLKR3M_nGpJwC-Ew=w480-h960-rw' />
                    </div>
                  )}
                  {work.iconType === 'swoogo' && (
                    <div className="work-icon work-icon-swoogo">
                      <img src='https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/448136429_361606140361411_3051297350919406801_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NpjPSRCW3lAQ7kNvwHxk4I3&_nc_oc=Adkfun6pwjqr2zJRUxs83MCD_wN7tYWzUA9KlSCWGq9MDxg10rHA-yaC7LxWOLbj4ud_sT80lfUI5Z3TCdTXvV3G&_nc_zt=23&_nc_ht=scontent-atl3-1.xx&_nc_gid=OWiuRa-9sEeIUKT2GqRxNg&oh=00_Afp0shIB-qHjDdI67Sw_5ukeHq6JTcIP4KSX3H8PkHLGvA&oe=6971FFE9' />
                    </div>
                  )}
                  
                  {/* Company name */}
                  <h4 className="text-white font-semibold text-lg">{work.name}</h4>
                  
                  {/* Achievement badge */}
                  <span className="work-achievement-badge">{work.achievement}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAllWork(!showAllWork)}
              className="show-more-btn"
              data-testid="show-more-work-btn"
            >
              {showAllWork ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={sectionsRef.expertise} className="py-20 px-4 bg-dark-800/50" data-testid="expertise-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Expertise</h2>
          </div>

          <p className="text-gray-400 max-w-3xl mb-10 text-lg">
            Based in Atlanta, Georgia, we've partnered with leading brands across the Southeast 
            and nationwide. Our expertise spans the entire React Native and mobile app development 
            ecosystem, delivering scalable solutions for Georgia businesses and beyond.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {expertiseAreas.map((area, index) => (
              <motion.span
                key={index}
                className="expertise-tag"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                data-testid={`expertise-tag-${index}`}
              >
                {area}
              </motion.span>
            ))}
          </div>

          {/* Client logos placeholder */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-50">
            {['Coca-Cola', 'Delta', 'Home Depot', 'NCR', 'UPS', 'Mailchimp'].map((brand, i) => (
              <div key={i} className="text-center text-gray-500 font-medium">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionsRef.about} className="py-20 px-4" data-testid="about-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">About</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-400 text-lg mb-6">
                Founded in Atlanta, Georgia, AppMakersATL started as a small team of passionate 
                developers in the heart of the city's thriving tech scene. Today, we're the 
                go-to React Native development studio for startups and Fortune 500 companies 
                throughout the Atlanta metro area and across the Southeast.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                Our mission is simple: build mobile apps that Atlanta businesses and users love. 
                We obsess over performance, user experience, and code quality because we know 
                these details make the difference between a good app and a great one.
              </p>
              <p className="text-white text-xl font-medium">
                Atlanta's trusted partner for mobile app development.
              </p>
            </div>

            {/* Team avatars */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Meet the Team</h3>
              <div className="flex flex-wrap gap-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="team-avatar flex items-center justify-center text-3xl bg-dark-700"
                    whileHover={{ scale: 1.1 }}
                    data-testid={`team-member-${index}`}
                  >
                    <img src={member.avatar} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 px-4 bg-dark-800/50" data-testid="open-source-section">
        <div className="max-w-7xl mx-auto text-center">
          <div className="section-header justify-center">
                <span className="text-gray-500 text-2xl font-light">#</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Open Source</h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We believe in giving back to the tech community and beyond. 
            Check out our open source contributions and projects on GitHub.
          </p>
          <a 
            href="https://github.com/appmakersatl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="secondary-button inline-flex"
            data-testid="github-link"
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/5" data-testid="footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-semibold text-xl">AppMakersATL</span>
              </div>
              <p className="text-gray-500">
                Atlanta, Georgia's premier React Native and mobile app development studio.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Serving Atlanta, Midtown, Buckhead, Decatur, Sandy Springs, and the greater Georgia metro area.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-gray-500 mb-2">hello@appmakersatl.com</p>
              <p className="text-gray-500 mb-2">projects@appmakersatl.com</p>
              <p className="text-gray-600 text-sm mt-3">
                📍 Atlanta, GA 30303
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://github.com/appmakersatl" className="footer-link" data-testid="footer-github">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/appmakersatl" className="footer-link" data-testid="footer-linkedin">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/appmakersatl" className="footer-link" data-testid="footer-x">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li>React Native Development</li>
                <li>iOS App Development</li>
                <li>Android App Development</li>
                <li>Mobile App Consulting</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 AppMakersATL. All rights reserved. Atlanta, Georgia.
            </p>
            <p className="text-gray-600 text-sm">
              Made with ❤️ in Atlanta, GA
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Navigation */}
      <nav className="sticky-nav" data-testid="sticky-nav">
        {['Services', 'Work', 'Expertise', 'About'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`nav-link text-sm ${activeSection === item.toLowerCase() ? 'active' : ''}`}
            data-testid={`sticky-nav-${item.toLowerCase()}`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Discovery Call Modal */}
      <DiscoveryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;

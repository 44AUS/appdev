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
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

// Expo Icon (actual logo)
const ExpoIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.455 4.5l6.818 13.636H5.091L11.545 4.5zm.91 0l6.818 13.636h-.001L12.455 4.5z"/>
  </svg>
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
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#61dafb]/20 to-[#61dafb]/10 flex items-center justify-center backdrop-blur-sm border border-[#61dafb]/30"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ReactNativeIcon className="w-10 h-10 md:w-12 md:h-12" />
      </motion.div>
      <div className="text-white/60 text-2xl md:text-3xl font-light mx-2">+</div>
      <motion.div 
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/20"
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
    name: "Rainbow",
    description: "Working with Rainbow to make their crypto wallet faster, safer, and more robust.",
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
    name: "Swoogo",
    description: "Helping Swoogo scale their event platform to handle millions of attendees seamlessly.",
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
    price: "22,000",
    priceDesc: "USD/month, 3 min."
  },
  {
    label: "ALREADY HAVE AN APP?",
    title: "Improve your existing app",
    price: "15,000",
    priceDesc: "USD/month, 2 min."
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
    achievement: "Recommending us since 2016", 
    iconType: "expo",
    iconBg: "#000000",
    iconContent: "∧"
  },
  { 
    name: "Rainbow", 
    achievement: "The most fun crypto wallet", 
    iconType: "rainbow",
    iconBg: "#3B82F6",
    iconContent: "🌈"
  },
  { 
    name: "Swoogo", 
    achievement: "30m attendees brought together", 
    iconType: "swoogo",
    iconBg: "#F97316",
    iconContent: "go"
  },
  { 
    name: "Dialogue", 
    achievement: "Acquired by Sun Life Financial", 
    iconType: "dialogue",
    iconBg: "transparent",
    iconContent: "♡"
  },
  { 
    name: "Landing", 
    achievement: "900k+ users", 
    iconType: "landing",
    iconBg: "#BFFF00",
    iconContent: "📱"
  },
  { 
    name: "Point Card", 
    achievement: "$46.5m Series B", 
    iconType: "pointcard",
    iconBg: "#1A1A1A",
    iconContent: "P"
  },
];

// Expertise areas
const expertiseAreas = [
  "React Native", "Expo", "TypeScript", "Node.js", "GraphQL", 
  "AWS", "Firebase", "Redux", "REST APIs", "CI/CD", "App Store", "Play Store"
];

// Team members
const teamMembers = [
  { name: "Austin", avatar: "👨‍💻" },
  { name: "Jerome", avatar: "👩‍💼" },
  { name: "Mike", avatar: "👨‍🎨" },
  { name: "Emma", avatar: "👩‍🔬" },
  { name: "Chris", avatar: "👨‍🚀" },
  { name: "Lisa", avatar: "👩‍💻" }
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
        <div className="max-w-5xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Work in Progress</h2>
            <span className="text-gray-600 text-sm">(that we can talk about)</span>
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
                    <div className="wip-icon wip-icon-rainbow">
                      <div className="rainbow-arc"></div>
                    </div>
                  )}
                  {workInProgress[currentProjectIndex].iconType === 'expo' && (
                    <div className="wip-icon wip-icon-expo">
                      <svg viewBox="0 0 24 24" className="w-16 h-16" fill="white">
                        <path d="M12 2L2 19h20L12 2z"/>
                      </svg>
                    </div>
                  )}
                  {workInProgress[currentProjectIndex].iconType === 'swoogo' && (
                    <div className="wip-icon wip-icon-swoogo">
                      <span className="text-white font-bold text-2xl">go</span>
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
        <div className="max-w-5xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Services</h2>
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
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                        <path d="M12 2L2 19h20L12 2z"/>
                      </svg>
                    </div>
                  )}
                  {work.iconType === 'rainbow' && (
                    <div className="work-icon work-icon-rainbow">
                      <span className="text-lg">🌈</span>
                    </div>
                  )}
                  {work.iconType === 'swoogo' && (
                    <div className="work-icon work-icon-swoogo">
                      <span className="text-white font-bold text-xs">go</span>
                    </div>
                  )}
                  {work.iconType === 'dialogue' && (
                    <div className="work-icon work-icon-dialogue">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"/>
                        <path d="M12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14C12.7956 14 13.5587 14.3161 14.1213 14.8787C14.6839 15.4413 15 16.2044 15 17"/>
                      </svg>
                    </div>
                  )}
                  {work.iconType === 'landing' && (
                    <div className="work-icon work-icon-landing">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#000">
                        <rect x="6" y="4" width="12" height="16" rx="2"/>
                        <circle cx="12" cy="17" r="1"/>
                      </svg>
                    </div>
                  )}
                  {work.iconType === 'pointcard' && (
                    <div className="work-icon work-icon-pointcard">
                      <span className="text-white font-bold text-sm">P</span>
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
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Expertise</h2>
          </div>

          <p className="text-gray-400 max-w-3xl mb-10 text-lg">
            Over the years, we've worked with top brands across various industries, 
            delivering solutions that scale and perform. Our expertise spans the entire 
            React Native ecosystem and beyond.
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
            {['NFL', 'Pizza Hut', 'Microsoft', 'Shopify', 'Discord', 'Spotify'].map((brand, i) => (
              <div key={i} className="text-center text-gray-500 font-medium">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sectionsRef.about} className="py-20 px-4" data-testid="about-section">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">About</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-400 text-lg mb-6">
                Founded in 2016, App&Flow started as a small team of passionate 
                developers in Atlanta. Today, we're a full-service React Native 
                engineering studio trusted by startups and Fortune 500 companies alike.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                Our mission is simple: build apps that users love and businesses 
                depend on. We obsess over performance, user experience, and code quality 
                because we know these details make the difference.
              </p>
              <p className="text-white text-xl font-medium">
                We deliver apps that just work — every time.
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
                    {member.avatar}
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
            <span className="section-hash">#</span>
            <h2 className="section-title">Open Source</h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We believe in giving back to the community. Check out our contributions 
            and projects on GitHub.
          </p>
          <a 
            href="https://github.com/appandflow" 
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
                <span className="text-white font-semibold text-xl">App&Flow</span>
              </div>
              <p className="text-gray-500">
                React Native engineering studio based in Atlanta.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <p className="text-gray-500 mb-2">hello@appandflow.com</p>
              <p className="text-gray-500">new@appandflow.com</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://github.com/appandflow" className="footer-link" data-testid="footer-github">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/appandflow" className="footer-link" data-testid="footer-linkedin">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://x.com/appaborflow" className="footer-link" data-testid="footer-x">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Language</h4>
              <div className="flex gap-2">
                <button className="text-white">EN</button>
                <span className="text-gray-600">|</span>
                <button className="text-gray-500 hover:text-white transition-colors">FR</button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 App&Flow. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm">
              Made with ❤️ in Atlanta
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
        <button className="ml-2 text-gray-500 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </nav>

      {/* Discovery Call Modal */}
      <DiscoveryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;

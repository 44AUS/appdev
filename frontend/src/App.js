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

// Work in progress data with app-style icons
const workInProgress = [
  {
    id: 1,
    name: "TechFlow AI",
    description: "Building next-gen AI-powered productivity platform",
    status: "Currently",
    colors: ["#8B5CF6", "#6366F1"],
    icon: Zap
  },
  {
    id: 2,
    name: "HealthSync",
    description: "Healthcare management app with real-time sync",
    status: "Currently", 
    colors: ["#10B981", "#059669"],
    icon: Users
  },
  {
    id: 3,
    name: "EcoTrack",
    description: "Sustainability tracking for enterprise clients",
    status: "Currently",
    colors: ["#3B82F6", "#2563EB"],
    icon: Globe
  }
];

// Services data
const services = [
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "App Development",
    description: "Full-cycle mobile and web application development using React Native, Expo, and modern frameworks.",
    price: "Starting at $15,000"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Audit",
    description: "Deep-dive analysis of your existing app to identify bottlenecks and optimize for speed and efficiency.",
    price: "Starting at $3,000"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Augmentation",
    description: "Expert React Native developers to seamlessly integrate with your existing team.",
    price: "Custom pricing"
  }
];

// Portfolio work data
const portfolioWork = [
  { name: "TechCorp", achievement: "Recommending us since 2018", logo: "💼" },
  { name: "FinanceHub", achievement: "2M+ users onboarded", logo: "💰" },
  { name: "MediaStream", achievement: "30M streams powered", logo: "🎬" },
  { name: "RetailPro", achievement: "500+ stores connected", logo: "🛒" },
  { name: "FitLife", achievement: "Series B funded", logo: "💪" },
  { name: "TravelEase", achievement: "Acquired in 2023", logo: "✈️" },
  { name: "EduLearn", achievement: "1M+ students reached", logo: "📚" },
  { name: "GameZone", achievement: "Top 10 App Store", logo: "🎮" },
  { name: "SocialBuzz", achievement: "10M+ downloads", logo: "💬" },
  { name: "CloudSync", achievement: "Enterprise solution", logo: "☁️" },
  { name: "PayEasy", achievement: "$1B+ processed", logo: "💳" },
  { name: "SmartHome", achievement: "IoT integration", logo: "🏠" }
];

// Expertise areas
const expertiseAreas = [
  "React Native", "Expo", "TypeScript", "Node.js", "GraphQL", 
  "AWS", "Firebase", "Redux", "REST APIs", "CI/CD", "App Store", "Play Store"
];

// Team members
const teamMembers = [
  { name: "Alex", avatar: "👨‍💻" },
  { name: "Sarah", avatar: "👩‍💼" },
  { name: "Mike", avatar: "👨‍🎨" },
  { name: "Emma", avatar: "👩‍🔬" },
  { name: "Chris", avatar: "👨‍🚀" },
  { name: "Lisa", avatar: "👩‍💻" }
];

// Discovery Call Modal - Opens email client
const DiscoveryModal = ({ isOpen, onClose }) => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@appandflow.com?subject=Discovery%20Call%20Request&body=Hi%20App%26Flow%20Team,%0A%0AI%27d%20like%20to%20schedule%20a%20discovery%20call%20to%20discuss%20my%20project.%0A%0AProject%20Type:%0ACompany:%0ABrief%20Description:%0A%0AThanks!';
  };

  const handleCalendlyClick = () => {
    // Opens calendly or any scheduling link - replace with actual link
    window.open('https://calendly.com/appandflow', '_blank');
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
            Let's discuss your project! Choose how you'd like to get in touch:
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
            <a href="mailto:hello@appandflow.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              hello@appandflow.com
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
            <span className="text-white font-semibold text-base md:text-xl">App&Flow</span>
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
              Turbocharged{' '}
              <span className="gradient-text">React Native</span>{' '}
              Engineering
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-4">
              Powered by <span className="text-white font-semibold">Expo</span>
            </p>

            <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
              A Montreal-based React Native engineering studio building 
              apps that users love and businesses depend on.
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
              hello@appandflow.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work in Progress Section */}
      <section className="py-20 px-4" data-testid="work-in-progress-section">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Work in Progress</h2>
            <span className="text-gray-600 text-sm">(that we can talk about)</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {workInProgress.map((project, index) => (
              <motion.div
                key={project.id}
                className="work-card in-progress"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`work-progress-card-${project.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{project.logo}</span>
                  <span className="flex items-center gap-2 text-green-400 text-sm">
                    <span className="status-indicator"></span>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
                <p className="text-gray-400">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionsRef.services} className="py-20 px-4 bg-dark-800/50" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                data-testid={`service-card-${index}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-blue-400 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-blue-400 font-medium">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Work Section */}
      <section ref={sectionsRef.work} className="py-20 px-4" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto">
          <div className="section-header">
            <span className="section-hash">#</span>
            <h2 className="section-title">Work</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedWork.map((work, index) => (
              <motion.div
                key={index}
                className="work-card group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                data-testid={`portfolio-card-${index}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{work.logo}</span>
                  <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {work.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-500">{work.achievement}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllWork(!showAllWork)}
              className="secondary-button"
              data-testid="show-more-work-btn"
            >
              {showAllWork ? (
                <>Show less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show more <ChevronDown className="w-4 h-4" /></>
              )}
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
                developers in Montreal. Today, we're a full-service React Native 
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
                React Native engineering studio based in Montreal.
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
              © 2024 App&Flow. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm">
              Made with ❤️ in Montreal
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

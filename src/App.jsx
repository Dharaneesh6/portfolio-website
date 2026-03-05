import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Moon, 
  Sun, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  User, 
  Terminal, 
  Database, 
  Globe,
  ChevronRight,
  Cpu,
  Layers,
  Zap,
  Layout,
  Server,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Direct link format for Google Drive images
  const profileImageUrl = "https://lh3.googleusercontent.com/u/0/d/1qi2F8o7r1JNuEl75VoHz4qrFVBBwTnti=w1000-h1000-iv1";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const projects = [
    {
      title: "MERN E-Commerce",
      tech: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      description: "A production-ready store with JWT-based authentication. Features structured data storage, complex order processing, and dynamic product filtering.",
      icon: <Globe className="w-6 h-6" />,
      link: "#"
    },
    {
      title: "Movie Discovery Engine",
      tech: ["React", "REST API", "Tailwind", "Axios"],
      description: "High-performance movie browsing platform. Integrated third-party APIs with graceful error handling and real-time search validation.",
      icon: <Terminal className="w-6 h-6" />,
      link: "#"
    },
    {
      title: "Tic Tac Toe Pro",
      tech: ["React", "State Logic", "Algorithms"],
      description: "Advanced game implementation focusing on React state management and optimized winner detection algorithms for 3x3 to 10x10 grids.",
      icon: <Cpu className="w-6 h-6" />,
      link: "#"
    }
  ];

  const services = [
    {
      title: "Full-Stack Development",
      description: "Building end-to-end web applications with seamless frontend-backend integration and high scalability.",
      icon: <Layers className="text-indigo-500" />
    },
    {
      title: "API Engineering",
      description: "Developing robust RESTful APIs with clean MVC patterns, documentation, and automated testing.",
      icon: <Server className="text-indigo-500" />
    },
    {
      title: "Modern UI/UX",
      description: "Creating accessible, responsive, and aesthetically pleasing interfaces using Tailwind CSS.",
      icon: <Layout className="text-indigo-500" />
    }
  ];

  const experience = [
    {
      role: "Ruby on Rails Developer",
      company: "Zolvit (formerly Vakilsearch)",
      period: "Dec 2025 - Present",
      type: "Full-Time",
      highlights: [
        "Architected 10+ RESTful APIs managing 5,000+ monthly requests using Ruby on Rails.",
        "Engineered cross-sale ticket workflows, cutting manual processing by 30%.",
        "Automated TAT reporting using Rake tasks, tracking 1,000+ active tickets daily.",
        "Optimized email costs by 15% through domain-specific CC/BCC validation logic."
      ]
    },
    {
      role: "Web Development Intern",
      company: "Tech Solutions",
      period: "Jun 2024 - Aug 2024",
      type: "Internship",
      highlights: [
        "Reduced page load times by 20% by optimizing frontend-backend communication layers.",
        "Improved form data accuracy by 35% through robust client-side validation mechanisms.",
        "Ensured 100% responsiveness across all modern screen resolutions and browsers."
      ]
    }
  ];

  const skillGroups = [
    { title: "Frontend", skills: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Redux", "HTML5/CSS3"] },
    { title: "Backend", skills: ["Ruby on Rails", "Node.js", "Express.js", "REST APIs", "MVC Design"] },
    { title: "Data & Tools", skills: ["MongoDB", "PostgreSQL", "Git", "Docker", "Postman", "CI/CD"] }
  ];

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            width: 100% !important;
            overflow-x: hidden !important;
            place-items: normal !important;
          }
        `}
      </style>
      <div className={`min-h-screen transition-all duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute inset-0 opacity-[0.03] ${darkMode ? 'invert-0' : 'invert'}`} 
               style={{ backgroundImage: `radial-gradient(#6366f1 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent blur-[120px]" />
        </div>

        {/* Navigation */}
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? (darkMode ? 'bg-slate-950/80 border-b border-slate-800 backdrop-blur-md py-3' : 'bg-white/80 border-b border-slate-200 backdrop-blur-md py-3') : 'bg-transparent py-5'}`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('home')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">D</div>
              <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                DHARANEESH.LS
              </span>
            </div>
            
            <div className="hidden lg:flex gap-2 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-5 py-2 text-sm font-bold tracking-tight rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-500/30' 
                      : (darkMode 
                          ? 'text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:text-white' 
                          : 'text-slate-600 bg-slate-200/50 hover:bg-slate-200 hover:text-slate-900')
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-6 mx-2 bg-slate-800/20" />
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-all shadow-sm ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white border border-slate-200 text-indigo-600 hover:bg-slate-100'}`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white border border-slate-200 text-indigo-600'}`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl ${darkMode ? 'text-white' : 'text-slate-900'}`}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[90] lg:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-xl`} />
          <div className="relative h-full flex flex-col items-center justify-center gap-6 p-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-2xl font-black px-8 py-3 rounded-2xl w-full max-w-xs transition-all ${
                  activeSection === item.id 
                    ? 'text-white bg-indigo-600' 
                    : (darkMode ? 'text-slate-400 bg-slate-900' : 'text-slate-500 bg-slate-100')
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-6 mt-12">
               <a href="#" className="p-4 rounded-full bg-indigo-500 text-white shadow-xl"><Github size={24} /></a>
               <a href="#" className="p-4 rounded-full bg-indigo-500 text-white shadow-xl"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-xs font-black border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 uppercase tracking-widest animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for full-stack opportunities
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-balance">
                Building <span className="text-indigo-600">better</span> systems, <br />
                <span className="relative inline-block">
                  bit by bit.
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-500/20 -rotate-1 -z-10" />
                </span>
              </h1>
              
              <p className={`max-w-xl text-lg md:text-xl mb-12 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Computer Science student and Full-Stack Developer specialized in <span className="font-semibold text-indigo-500">Ruby on Rails</span> & <span className="font-semibold text-indigo-500">React</span>. Currently architecting scalable APIs at Zolvit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 items-stretch sm:items-center">
                <button 
                  onClick={() => scrollTo('projects')}
                  className="group px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 active:scale-95"
                >
                  View Projects <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <div className="flex gap-4">
                  <a href="#" className={`flex-1 sm:flex-none p-5 rounded-2xl border transition-all flex items-center justify-center ${darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}>
                    <Github size={22} />
                  </a>
                  <a href="#" className={`flex-1 sm:flex-none p-5 rounded-2xl border transition-all flex items-center justify-center ${darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-white' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}>
                    <Linkedin size={22} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-square">
                 <div className={`absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[3rem] blur-3xl opacity-30 animate-pulse`} />
                 <div className={`relative h-full w-full rounded-[3.5rem] border overflow-hidden flex items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xl'}`}>
                    <div className="flex flex-col items-center w-full h-full justify-center">
                      <div className="w-64 h-64 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden group border-4 border-indigo-500/20">
                         <img 
                            src={profileImageUrl} 
                            alt="Dharaneesh LS" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                         />
                         <User size={100} className="text-indigo-500 hidden" />
                         <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-center px-6">
                         <h2 className="text-3xl font-black mb-1">Dharaneesh</h2>
                         <p className="text-indigo-500 font-bold uppercase tracking-[0.2em] text-xs">Full-Stack Engineer</p>
                      </div>
                    </div>
                 </div>
                 {/* Floating badges */}
                 <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border dark:border-slate-700 animate-bounce transition-all duration-1000">
                    <Code2 className="text-indigo-500" />
                 </div>
                 <div className="absolute -bottom-4 -left-4 p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border dark:border-slate-700">
                    <div className="text-2xl font-black text-indigo-500">2+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Years Coding</div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={`py-32 px-6 ${darkMode ? 'bg-slate-900/30' : 'bg-white border-y border-slate-200'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <div key={i} className={`group p-10 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02] ${darkMode ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50' : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-2xl'}`}>
                  <div className="mb-8 p-5 rounded-2xl bg-indigo-500/10 inline-block group-hover:bg-indigo-600 transition-colors">
                    {React.cloneElement(service.icon, { size: 36, className: "group-hover:text-white transition-colors" })}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{service.title}</h3>
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black mb-8 flex items-center gap-6">
                <span className="w-16 h-1.5 bg-indigo-500 rounded-full" />
                Who I Am
              </h2>
              <div className="space-y-6">
                <p className={`text-xl leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  I am a passionate developer currently pursuing <span className="text-indigo-500 font-bold">B.E. Computer Science</span> at Sree Sowdambika College of Engineering.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  My technical philosophy centers on <span className="italic">scalability</span> and <span className="italic">maintainability</span>. Whether I'm crafting a React frontend or a Rails backend, I strive for clean architecture and performant code.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Outside of coding, I'm an advocate for open-source and constant learning, always looking for the next challenge in distributed systems or complex UI interactions.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                <div className={`flex items-center gap-4 p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Mail size={20}/></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Email</p>
                     <p className="font-bold text-sm">dharaneesh2406@gmail.com</p>
                  </div>
                </div>
                <div className={`flex items-center gap-4 p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Globe size={20}/></div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Location</p>
                     <p className="font-bold text-sm">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-8 md:p-12 rounded-[3.5rem] border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-indigo-50/50 border-indigo-100 shadow-inner'}`}>
              <h3 className="text-2xl font-black mb-10 tracking-tight flex items-center gap-3">
                <Zap className="text-indigo-500" /> Quick Stats
              </h3>
              <div className="grid gap-6">
                {[
                  { label: "Current GPA", value: "8.03", detail: "Distinction Track" },
                  { label: "Production APIs", value: "10+", detail: "At Zolvit" },
                  { label: "Orders Managed", value: "5k+", detail: "Monthly Throughput" },
                  { label: "Cost Savings", value: "15%", detail: "Optimized Email Logic" }
                ].map((stat, i) => (
                  <div key={i} className={`p-6 rounded-2xl flex justify-between items-center transition-all hover:translate-x-2 ${darkMode ? 'bg-slate-950/50' : 'bg-white shadow-sm'}`}>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50 mb-1">{stat.label}</p>
                      <p className="text-sm font-bold opacity-70">{stat.detail}</p>
                    </div>
                    <div className="text-3xl font-black text-indigo-500 tracking-tighter">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-32 px-6 ${darkMode ? 'bg-slate-900/20' : 'bg-slate-100/50 border-y border-slate-200'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-5xl font-black mb-4 tracking-tight">Experience</h2>
               <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>My professional journey in software engineering.</p>
            </div>
            
            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="group relative">
                  <div className={`p-8 md:p-12 rounded-[3rem] border transition-all duration-500 ${darkMode ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/30' : 'bg-white border-slate-200 hover:shadow-xl'}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-10">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
                          <Briefcase size={32} />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black tracking-tight group-hover:text-indigo-500 transition-colors">{exp.role}</h3>
                          <p className="text-lg font-bold text-indigo-500/80 mb-2 uppercase tracking-widest">{exp.company}</p>
                          <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <div className={`px-6 py-2 rounded-2xl text-sm font-black tracking-widest ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                        {exp.period}
                      </div>
                    </div>
                    
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
                      {exp.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="mt-2 w-2 h-2 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.2)]" />
                          <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h2 className="text-5xl font-black tracking-tight mb-4">Tech Stack</h2>
                <p className={`text-lg max-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Tools and technologies I use to turn ideas into digital reality.</p>
              </div>
              <div className={`px-8 py-4 rounded-3xl border text-sm font-bold flex items-center gap-3 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <Code2 className="text-indigo-500" /> Always learning new frameworks
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {skillGroups.map((group, idx) => (
                <div key={idx} className={`p-10 rounded-[2.5rem] border group transition-all duration-500 ${darkMode ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50' : 'bg-white border-slate-100 hover:shadow-2xl shadow-sm'}`}>
                  <div className="flex items-center gap-4 mb-10">
                     <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                        {idx === 0 ? <Layout size={24} /> : idx === 1 ? <Server size={24} /> : <Database size={24} />}
                     </div>
                     <h3 className="text-xl font-black tracking-tight">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((skill, i) => (
                      <span key={i} className={`px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-white group-hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-32 px-6 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-100/50 border-y border-slate-200'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
              <h2 className="text-5xl font-black tracking-tight">Recent Projects</h2>
              <a href="#" className="flex items-center gap-2 text-indigo-500 font-black tracking-widest uppercase text-xs hover:gap-4 transition-all">
                View All Github <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {projects.map((project, idx) => (
                <div key={idx} className={`group flex flex-col p-10 rounded-[3.5rem] border transition-all duration-500 hover:-translate-y-4 ${darkMode ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/40 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)]' : 'bg-white border-slate-200 hover:shadow-2xl'}`}>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-10 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                  <p className={`text-base leading-relaxed mb-8 grow ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((t, i) => (
                      <span key={i} className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>{t}</span>
                    ))}
                  </div>
                  
                  <a href={project.link} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-indigo-500 group-hover:gap-5 transition-all">
                    Case Study <ArrowUpRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`relative p-12 md:p-24 rounded-[4rem] overflow-hidden text-center border ${darkMode ? 'bg-slate-900 border-slate-800 shadow-2xl' : 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 border-indigo-700'}`}>
              <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${darkMode ? 'bg-indigo-500/10' : 'bg-white/10'} blur-[100px] rounded-full`} />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
                  Let's build <br /> <span className={`${darkMode ? 'text-indigo-500' : 'text-indigo-200'}`}>something Great.</span>
                </h2>
                <p className={`text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-400' : 'text-indigo-100'}`}>
                  Currently open to software engineering internships and junior roles. If you have an exciting project, let's connect.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a 
                    href="mailto:dharaneesh2406@gmail.com"
                    className={`w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-white/10'}`}
                  >
                    <Mail size={24} /> Get In Touch
                  </a>
                  <a 
                    href="#"
                    className={`w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] border transition-all active:scale-95 ${darkMode ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' : 'border-white/30 bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <Linkedin size={24} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-20 border-t ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">D</div>
                 <p className="text-2xl font-black tracking-tighter">DHARANEESH.LS</p>
              </div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Built with React & Tailwind • 2025
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { label: 'GitHub', icon: <Github size={18} /> },
                { label: 'LinkedIn', icon: <Linkedin size={18} /> },
                { label: 'Resume', icon: <FileText size={18} /> },
                { label: 'Twitter', icon: <MessageSquare size={18} /> }
              ].map((link) => (
                <a key={link.label} href="#" className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors hover:text-indigo-500 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {link.icon} <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800/5 text-center">
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-slate-700' : 'text-slate-300'}`}>
                &copy; 2025 Designed and Developed by Dharaneesh LS. All rights reserved.
              </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
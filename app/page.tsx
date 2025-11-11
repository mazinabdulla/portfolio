"use client";
import React, { useState, useEffect, useRef } from 'react';
// We are not importing images, as they are in the 'public' folder.

// --- Icons (Inlined to avoid dependencies) ---
// FIXED: Adjusted declaration for all function components to avoid implicit 'any' type errors during Vercel's TypeScript build.
const Icon = ({ size = 24, className = "", children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Terminal = ({ size, className }) => <Icon size={size} className={className}><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></Icon>;
const Briefcase = ({ size, className }) => <Icon size={size} className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></Icon>;
const User = ({ size, className }) => <Icon size={size} className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const Cpu = ({ size, className }) => <Icon size={size} className={className}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></Icon>;
const FolderGit2 = ({ size, className }) => <Icon size={size} className={className}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="12" cy="13" r="2"/><path d="M14 11l3 3-3 3"/></Icon>;
const Globe = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></Icon>;
const Code2 = ({ size, className }) => <Icon size={size} className={className}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></Icon>;
const ExternalLink = ({ size, className }) => <Icon size={size} className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></Icon>;
const Mail = ({ size, className }) => <Icon size={size} className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Icon>;
const Github = ({ size, className }) => <Icon size={size} className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></Icon>;
const Linkedin = ({ size, className }) => <Icon size={size} className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></Icon>;
const Instagram = ({ size, className }) => <Icon size={size} className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></Icon>;
const Menu = ({ size, className }) => <Icon size={size} className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></Icon>;
const X = ({ size, className }) => <Icon size={size} className={className}><line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" /></Icon>;
const Sun = ({ size, className }) => <Icon size={size} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></Icon>;
const Moon = ({ size, className }) => <Icon size={size} className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>;
const FileText = ({ size, className }) => <Icon size={size} className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></Icon>;
const Download = ({ size, className }) => <Icon size={size} className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></Icon>;
const BookOpen = ({ size, className }) => <Icon size={size} className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Icon>;
const ArrowLeft = ({ size, className }) => <Icon size={size} className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></Icon>;


// --- Trendy Components ---

// Spotlight + 3D Tilt Card Component
const SpotlightCard = ({ children, className = "", onClick = null, theme }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const { width, height } = rect;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateY = 20 * ((mouseX - width / 2) / (width / 2));
    const rotateX = -20 * ((mouseY - height / 2) / (height / 2));
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => {
    setOpacity(0);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const baseClasses = "relative overflow-hidden rounded-2xl backdrop-blur-md p-8 md:p-10 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-emerald-500/10";
  const lightModeClasses = "border border-black/10 bg-white hover:border-black/20 hover:bg-white/70";
  const darkModeClasses = "border border-white/10 bg-zinc-900/80 hover:border-white/20 hover:bg-zinc-800/80";

  const commonProps = {
    ref: divRef,
    onMouseMove: handleMouseMove,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: { transform: transform },
    className: `${baseClasses} ${theme === 'light' ? lightModeClasses : darkModeClasses} ${className}`
  };

  return onClick ? (
    // FIX: Removed React.createElement, simplified button return to standard JSX which is generally safer outside of strict TS files
    <button {...commonProps} onClick={onClick}>
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 231, 149, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 text-left">{children}</div>
    </button>
  ) : (
    <div {...commonProps}>
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 231, 149, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Section Heading
const SectionHeading = ({ icon: IconCmp, title, subtitle, theme }) => (
  <div className="mb-12 flex flex-col items-start">
    <div className={`flex items-center gap-2 ${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'} mb-3`}>
      <IconCmp size={20} />
      <span className="uppercase tracking-wider text-sm font-bold">{title}</span>
    </div>
    <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-100'}`}>{subtitle}</h2>
  </div>
);

// Nav Item
const NavItem = ({ href, children, active, onClick = () => {}, theme }) => {
  const handleClick = (e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      onClick();
      const targetElement = document.getElementById(href.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onClick();
    }
  };
  
  const activeClasses = theme === 'light' ? 'text-emerald-500' : 'text-emerald-400';
  const inactiveClasses = theme === 'light' ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-zinc-100';

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-sm font-medium transition-colors duration-200 ${
        active ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </a>
  );
};

// Button Nav Item (for non-scrolling links like 'Blog')
const ButtonNavItem = ({ children, active, onClick = () => {}, theme }) => {
  const activeClasses = theme === 'light' ? 'text-emerald-500' : 'text-emerald-400';
  const inactiveClasses = theme === 'light' ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-zinc-100';
  
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition-colors duration-200 ${
        active ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </button>
  );
};

// AnimatedSection Component
const AnimatedSection = ({ children, className = "", id = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </section>
  );
};

// Theme Toggle Button
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-full transition-all ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);


export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio', 'blogList', 'blogPost'
  const [selectedPost, setSelectedPost] = useState(null); // Store the clicked blog post

  // Effect for loading theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  // Effect for saving theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsHeroLoaded(true), 100);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only run scroll spy if we are on the main portfolio page
      if (currentView === 'portfolio') {
        const sections = ['home', 'about', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= 300;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [currentView]); // Rerun this effect if the view changes

  const projects = [
    {
      title: "E-Commerce Platform Redesign",
      description: "A complete overhaul of a legacy e-commerce site using Next.js and Stripe, resulting in a 40% increase in conversions.",
      tags: ["Next.js", "React", "Stripe", "Tailwind"],
      link: "#",
      size: "large"
    },
    {
      title: "AI Chat Interface",
      description: "A sleek, responsive chat interface for an LLM, featuring real-time streaming responses and markdown support.",
      tags: ["React", "WebSockets", "OpenAI API"],
      link: "#",
      size: "normal"
    },
    {
      title: "Developer Portfolio V1",
      description: "My previous portfolio site built with vanilla JavaScript and GSAP animations.",
      tags: ["HTML/CSS", "GSAP", "JavaScript"],
      link: "#",
      size: "normal"
    },
     {
      title: "Task Management Dashboard",
      description: "A productivity tool with drag-and-drop Kanban boards and team collaboration features.",
      tags: ["React", "Redux", "Firebase"],
      link: "#",
      size: "large"
    },
  ];

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase"] },
    { category: "Tools", items: ["Git", "Docker", "Figma", "Jest", "Vercel"] },
  ];
  
  // Blog post content - REMOVED all inline classes to let Tailwind Prose handle styling
  const blogPosts = [
    {
      id: 1,
      title: "Why I Chose React for My Portfolio",
      date: "Nov 10, 2025",
      readTime: "5 min read",
      summary: "A deep dive into the benefits of using React, Next.js, and Tailwind CSS for a modern developer portfolio. We'll cover state management, server-side rendering, and styling strategies...",
      content: `
        <p>This is a full blog post about why React is a great choice. We'll explore several key areas:</p>
        <h3>1. Component-Based Architecture</h3>
        <p>React's component model allowed me to build reusable pieces of UI like the <strong>SpotlightCard</strong>. This makes the code cleaner and easier to maintain. Instead of copying and pasting the same HTML structure for every project card, I just re-use the component.</p>
        
        <h3>2. The Power of Hooks</h3>
        <p>Hooks like <code>useState</code> and <code>useEffect</code> are game-changers. For this portfolio:</p>
        <ul>
          <li><code>useState</code> manages all the interactive state: which theme is active (light/dark), whether the mobile menu is open, and which section is active in the scroll spy.</li>
          <li><code>useEffect</code> is the workhorse for side effects. It's used to:
            <ul>
              <li>Add and remove the scroll event listener.</li>
              <li>Save the theme to localStorage.</li>
              <li>Trigger the load-in animations for the hero section.</li>
            </ul>
          </li>
        </ul>
        
        <h3>3. Next.js and Vercel</h3>
        <p>While this project is a single file, using Next.js principles means it's ready to be deployed on Vercel for a blazing-fast, globally distributed site. The <code>"use client"</code> directive is a key part of this, telling Next.js that this component is interactive and needs to run in the browser.</p>
      `,
      tags: ["React", "Next.js", "JavaScript"]
    },
    {
      id: 2,
      title: "Building a Glassmorphism UI with Tailwind",
      date: "Nov 05, 2025",
      readTime: "3 min read",
      summary: "Glassmorphism is a popular design trend. I'll show you how I achieved the frosted glass effect on the navigation bar and cards using only Tailwind CSS utility classes.",
      content: `
        <p>The "frosted glass" or glassmorphism effect is very popular and surprisingly easy to achieve with Tailwind CSS.</p>
        <h3>The Key Ingredients</h3>
        <p>You only need two Tailwind classes to make it work:</p>
        <ul>
          <li><code>backdrop-blur-lg</code>: This is the magic property. It applies a blur filter to whatever is *behind* the element.</li>
          <li><code>bg-white/70</code> or <code>bg-zinc-950/80</code>: This sets a semi-transparent background color. The transparency is crucial; if the background is fully opaque, the backdrop blur won't be visible.</li>
        </ul>
        <p>By combining these, you get a beautiful frosted glass effect that looks premium and modern, especially on the navigation bar as it scrolls over the content.</p>
      `,
      tags: ["Tailwind", "CSS", "Design"]
    },
    {
      id: 3,
      title: "My Job Hunt Strategy in Dubai",
      date: "Nov 01, 2025",
      readTime: "7 min read",
      summary: "Moving to a new city on a visit visa to find a tech job is a challenge. Here is my day-by-day plan for networking, learning, and applying for jobs in the UAE.",
      content: `
        <p>Finding a job in Dubai in two months is a marathon, not a sprint. It requires a daily, focused effort. Here is the exact strategy I'm following.</p>
        <h3>1. The Daily Grind: 8AM - 12PM</h3>
        <p>This time is sacred. It's dedicated to <strong>learning and building</strong>. Right now, I'm deep-diving into advanced React concepts and building small projects (like a weather app) to add to my portfolio. This proves I'm not just a one-project wonder.</p>

        <h3>2. Networking: 1PM - 4PM</h3>
        <p>This is the most important part. I spend this time on LinkedIn, connecting with at least 20 tech recruiters, engineering managers, and team leads based in Dubai. My connection message is simple and direct:</p>
        <blockquote>
          "Hi [Name], I'm a Frontend Developer currently in Dubai on a visit. I have immediate availability and just launched my new portfolio. Would be open to a quick chat?"
        </blockquote>
        <p>This direct approach, combined with being physically present in the city, is key.</p>
        
        <h3>3. Applying & Attending: 7PM - 9PM</h3>
        <p>In the evenings, I search for and attend any local tech meetups on Meetup.com. Face-to-face interaction is powerful. If there are no meetups, I apply to 5-10 targeted jobs on LinkedIn and Oliv.</p>
      `,
      tags: ["Career", "Networking", "Dubai"]
    }
  ];

  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (view, sectionId = null) => {
    setCurrentView(view);
    setSelectedPost(null);
    closeMobileMenu();

    if (view === 'portfolio' && sectionId) {
      // Need a slight delay to ensure the portfolio view is rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    } else if (view === 'blogList') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const openPost = (post) => {
    setSelectedPost(post);
    setCurrentView('blogPost');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const backToBlogList = () => {
    setCurrentView('blogList');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic classes for theme switching
  const navScrollClasses = isScrolled 
    ? (theme === 'light' 
      ? 'bg-white/70 backdrop-blur-lg border-b border-zinc-200 py-4 shadow-lg shadow-black/5' 
      : 'bg-zinc-950/80 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg shadow-black/5')
    : 'py-6 bg-transparent';
    
  const mobileMenuBg = theme === 'light' ? 'bg-zinc-100/90' : 'bg-zinc-900/90';
  const mobileMenuBorder = theme === 'light' ? 'border-black/10' : 'border-white/10';
  const mobileMenuTitle = theme === 'light' ? 'text-zinc-900' : 'text-white';
  const mobileMenuLink = theme === 'light' ? 'text-zinc-700 hover:text-emerald-500' : 'text-zinc-300 hover:text-emerald-400';
  const mobileMenuClose = theme === 'light' ? 'text-zinc-500 hover:text-black' : 'text-zinc-500 hover:text-white';

  // --- Theme transition fix ---
  // Removed 'transition-colors duration-300' from this line
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50 text-zinc-800' : 'bg-zinc-950 text-zinc-200'} selection:bg-emerald-500/20 selection:text-emerald-400 font-sans`}>
      
      {/* Glass Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navScrollClasses}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" onClick={() => handleNavClick('portfolio', 'home')} className={`text-xl font-bold tracking-tighter ${theme === 'light' ? 'text-zinc-900' : 'text-white'} flex items-center gap-2`}>
            <Terminal size={24} className="text-emerald-500" />
            <span>Mazin Abdullah</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#about" active={activeSection === 'about' && currentView === 'portfolio'} onClick={() => handleNavClick('portfolio', 'about')} theme={theme}>About</NavItem>
            <NavItem href="#projects" active={activeSection === 'projects' && currentView === 'portfolio'} onClick={() => handleNavClick('portfolio', 'projects')} theme={theme}>Projects</NavItem>
            <NavItem href="#contact" active={activeSection === 'contact' && currentView === 'portfolio'} onClick={() => handleNavClick('portfolio', 'contact')} theme={theme}>Contact</NavItem>
            <ButtonNavItem active={currentView !== 'portfolio'} onClick={() => handleNavClick('blogList')} theme={theme}>Blog</ButtonNavItem>
            <div className={`w-px h-5 ${theme === 'light' ? 'bg-zinc-200' : 'bg-zinc-700'}`}></div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
           {/* Mobile Menu Button */}
           <button 
             className={`md:hidden transition ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'}`}
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
             <Menu size={24} />
           </button>
        </div>
      </nav>

      {/* Mobile Menu (Floating) */}
      <div 
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-md"
          onClick={closeMobileMenu}
        ></div>
        <div className={`absolute top-4 right-4 w-[calc(100%-2rem)] max-w-sm backdrop-blur-xl rounded-2xl shadow-2xl p-8 transition-transform duration-500 ease-in-out ${mobileMenuBg} ${mobileMenuBorder} ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[110%]'
        }`}>
          <div className="flex justify-between items-center mb-10">
            <span className={`text-xl font-bold tracking-tighter ${mobileMenuTitle}`}>Navigation</span>
            <button onClick={closeMobileMenu} className={`transition ${mobileMenuClose}`}>
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-8 mb-10">
            <a href="#about" onClick={() => handleNavClick('portfolio', 'about')} className={`text-2xl font-semibold transition-colors ${mobileMenuLink}`}>About</a>
            <a href="#projects" onClick={() => handleNavClick('portfolio', 'projects')} className={`text-2xl font-semibold transition-colors ${mobileMenuLink}`}>Projects</a>
            <a href="#contact" onClick={() => handleNavClick('portfolio', 'contact')} className={`text-2xl font-semibold transition-colors ${mobileMenuLink}`}>Contact</a>
            <button onClick={() => handleNavClick('blogList')} className={`text-left text-2xl font-semibold transition-colors ${mobileMenuLink}`}>Blog</button>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Page Content: Switches based on currentView */}
      <main>
        {currentView === 'portfolio' && (
          <div className="transition-opacity duration-500 ease-in-out">
            {/* Hero Section */}
            <section id="home" className="pt-40 pb-20 md:pt-60 md:pb-40 px-6 relative overflow-hidden">
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] ${theme === 'light' ? 'bg-emerald-500/10' : 'bg-emerald-500/10'} blur-[120px] rounded-full pointer-events-none -z-10`}></div>
              
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-start max-w-3xl">
                   <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${theme === 'light' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} text-sm font-medium mb-6 backdrop-blur-md transition-all duration-700 ease-out ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    Available for work
                  </div>
                  <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-6 leading-tight transition-all duration-700 ease-out delay-100 ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    Creative <br />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'light' ? 'from-emerald-500 to-cyan-500' : 'from-emerald-400 to-cyan-400'}`}>
                      Web Developer.
                    </span>
                  </h1>
                  <p className={`text-xl md:text-2xl ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'} max-w-xl mb-10 leading-relaxed transition-all duration-700 ease-out delay-200 ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    Hi, I'm <strong>Mazin Abdullah</strong>. I build accessible, pixel-perfect digital experiences that blend unique design with robust engineering.
                  </p>
                  <div className={`flex flex-wrap gap-4 transition-all duration-700 ease-out delay-300 ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <a href="#projects" onClick={() => handleNavClick('portfolio', 'projects')} className={`px-6 py-3 rounded-full font-bold transition-transform duration-200 hover:scale-105 flex items-center gap-2 ${theme === 'light' ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-zinc-950 hover:bg-zinc-200'}`}>
                      View My Work <Briefcase size={18}/>
                    </a>
                    <a href="#contact" onClick={() => handleNavClick('portfolio', 'contact')} className={`px-6 py-3 rounded-full font-bold transition-transform duration-200 hover:scale-105 border backdrop-blur-md flex items-center gap-2 ${theme === 'light' ? 'bg-white/50 text-zinc-900 hover:bg-white/70 border-black/10' : 'bg-zinc-900/50 text-white hover:bg-zinc-900 border-white/10'}`}>
                      Contact Me
                    </a>
                    {/* FIXED CV PATH: /MAZIN_ABDULLAH.pdf */}
                    <a href="/MAZIN_ABDULLAH.pdf" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-full font-bold transition-transform duration-200 hover:scale-105 border backdrop-blur-md flex items-center gap-2 ${theme === 'light' ? 'bg-white/50 text-zinc-900 hover:bg-white/70 border-black/10' : 'bg-zinc-900/50 text-white hover:bg-zinc-900 border-white/10'}`}>
                      <FileText size={18} /> View CV
                    </a>
                    {/* FIXED CV PATH: /MAZIN_ABDULLAH.pdf */}
                    <a href="/MAZIN_ABDULLAH.pdf" download className={`px-6 py-3 rounded-full font-bold transition-transform duration-200 hover:scale-105 border backdrop-blur-md flex items-center gap-2 ${theme === 'light' ? 'bg-white/50 text-zinc-900 hover:bg-white/70 border-black/10' : 'bg-zinc-900/50 text-white hover:bg-zinc-900 border-white/10'}`}>
                      <Download size={18} /> Download CV
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <AnimatedSection id="about" className={`border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'} py-20 md:py-32 px-6`}>
              <div className="max-w-6xl mx-auto">
                <SectionHeading icon={User} title="About Me" subtitle="Architecting the web of tomorrow." theme={theme} />
                
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
                  
                  {/* Photo Column */}
                  <div className="lg:col-span-3 w-full h-full">
                    {/* FIXED IMAGE PATH: /IMG_6902.jpg */}
                    <div className={`relative rounded-2xl border p-1 group ${theme === 'light' ? 'border-black/10 bg-white/70' : 'border-white/10 bg-zinc-900/80'} backdrop-blur-md shadow-lg overflow-hidden`}>
                      <img 
                        src="/IMG_6902.jpg" // <-- Final correct path
                        alt="Mazin Abdullah" 
                        className="rounded-lg w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>

                  {/* Text & Skills Columns */}
                  <div className="lg:col-span-7 w-full h-full flex flex-col gap-12">
                    <div className={`space-y-6 text-lg ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'} leading-relaxed`}>
                      <p>
                        I'm a passionate developer who bridges the gap between functional complexity and visual simplicity. My journey began with a curiosity for how things worked on the screen, which quickly evolved into a career crafting professional web applications.
                      </p>
                      <p>
                        Currently, I specialize in the <strong className={`${theme === 'light' ? 'text-zinc-800' : 'text-zinc-200'}`}>React ecosystem</strong>, focusing on building scalable front-end architectures. I believe a good website isn't just code; it's an experience that should be intuitive and memorable.
                      </p>
                      <p>
                        When I'm not coding, you can find me exploring new design trends, contributing to open-source, or optimizing my terminal setup.
                      </p>
                    </div>

                     <SpotlightCard className="h-full" theme={theme}>
                        <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-6 flex items-center gap-2`}>
                          <Cpu className={`${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'}`}/> Toolkit
                        </h3>
                        <div className="space-y-6">
                          {skills.map((skillGroup) => (
                            <div key={skillGroup.category}>
                              <h4 className="text-sm uppercase tracking-wider text-zinc-500 font-semibold mb-3">{skillGroup.category}</h4>
                              <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                  <span key={skill} className={`px-3 py-1.5 text-sm rounded-md border transition cursor-default ${theme === 'light' ? 'bg-black/5 text-zinc-700 border-black/5 hover:border-emerald-500/30 hover:bg-black/1Go hover:text-zinc-900' : 'bg-white/5 text-zinc-300 border-white/5 hover:border-emerald-500/30 hover:bg-white/10 hover:text-white'}`}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                     </SpotlightCard>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Projects Section (Bento Grid) */}
            <AnimatedSection id="projects" className={`border-t ${theme === 'light' ? 'border-black/5 bg-white' : 'border-white/5 bg-zinc-950/50'} py-20 md:py-32 px-6`}>
              <div className="max-w-6xl mx-auto">
                <SectionHeading icon={FolderGit2} title="Featured Work" subtitle="A selection of my favorite projects." theme={theme} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                  {projects.map((project, index) => (
                     <SpotlightCard 
                        key={index} 
                        className={`flex flex-col justify-between group ${project.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        theme={theme}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl border mb-4 group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'bg-black/5 text-emerald-500 border-black/10' : 'bg-white/5 text-emerald-400 border-white/10'}`}>
                              {project.size === 'large' ? <Globe size={24} /> : <Code2 size={24} />}
                            </div>
                             <a href={project.link} className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900 hover:bg-black/10' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}>
                              <ExternalLink size={20} />
                            </a>
                          </div>
                          
                          <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-4 group-hover:${theme === 'light' ? 'text-emerald-500' : 'text-emerald-4R00'} transition-colors`}>{project.title}</h3>
                          <p className={`${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'} leading-relaxed mb-8`}>
                            {project.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.tags.map(tag => (
                            <span key={tag} className={`text-xs font-mono rounded-md border ${theme === 'light' ? 'text-zinc-500 bg-black/5 border-black/5' : 'text-zinc-400 bg-white/5 border-white/5'} px-2 py-1`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                     </SpotlightCard>
                  ))}
                </div>
              </div>
            </AnimatedSection>

             {/* Contact Section */}
            <AnimatedSection id="contact" className={`border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'} relative overflow-hidden py-20 md:py-32 px-6`}>
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

              <div className="max-w-4xl mx-auto text-center">
                 <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border backdrop-blur-md ${theme === 'light' ? 'bg-black/5 text-emerald-500 border-black/10' : 'bg-white/5 text-emerald-400 border-white/10'}`}>
                    <Mail size={16} /> Get in touch
                  </div>
                <h2 className={`text-4xl md:text-6xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-8 leading-tight`}>
                  Let's build something <br className="hidden md:block" /> amazing together.
                </h2>
                <p className={`text-xl ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'} mb-12 max-w-2xl mx-auto`}>
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                
                <a href="mailto:mazinabdulla2323@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-zinc-950 rounded-full font-bold text-lg hover:bg-emerald-400 transition hover:scale-105 duration-200">
                  Say Hello <Mail />
                </a>

                <div className="mt-20 flex justify-center gap-6">
                  <a href="https://github.com/mazinabdulla" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900 bg-black/5 border-black/5 hover:border-black/10 hover:bg-black/10' : 'text-zinc-400 hover:text-white bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}>
                    <Github size={24} />
                    <span className="sr-only">Github</span>
                  </a>
                   <a href="http://linkedin.com/in/mazin-abdullah/" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900 bg-black/5 border-black/5 hover:border-black/10 hover:bg-black/10' : 'text-zinc-400 hover:text-white bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}>
                    <Linkedin size={24} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                   <a href="https://www.instagram.com/mazin__abdulla?igsh=MWY5b3Jza2U3cnE4eQ%3D%3D&utm_source=qr " target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${theme === 'light' ? 'text-zinc-500 hover:text-zinc-900 bg-black/5 border-black/5 hover:border-black/10 hover:bg-black/10' : 'text-zinc-400 hover:text-white bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}>
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}

        {currentView === 'blogList' && (
          <AnimatedSection id="blog-list" className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
            <div className="max-w-6xl mx-auto">
              <SectionHeading icon={BookOpen} title="My Blog" subtitle="Thoughts on tech, design, and career." theme={theme} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {blogPosts.map((post) => (
                  <SpotlightCard 
                    key={post.id}
                    className="flex flex-col justify-between group"
                    onClick={() => openPost(post)}
                    theme={theme}
                  >
                    <div className="flex flex-col h-full">
                      <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-4 group-hover:${theme === 'light' ? 'text-emerald-500' : 'text-emerald-400'} transition-colors`}>{post.title}</h3>
                      <p className={`${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'} leading-relaxed mb-6`}>
                        {post.summary}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm text-zinc-500">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map(tag => (
                            <span key={tag} className={`text-xs font-mono rounded-md border ${theme === 'light' ? 'text-zinc-500 bg-black/5 border-black/5' : 'text-zinc-400 bg-white/5 border-white/5'} px-2 py-1`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {currentView === 'blogPost' && selectedPost && (
          <AnimatedSection id="blog-post" className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
            <div className="max-w-3xl mx-auto">
              <button 
                onClick={backToBlogList}
                className={`flex items-center gap-2 font-medium mb-8 transition-colors ${theme === 'light' ? 'text-emerald-500 hover:text-emerald-600' : 'text-emerald-400 hover:text-emerald-300'}`}
              >
                <ArrowLeft size={18} />
                Back to all posts
              </button>
              
              <h1 className={`text-4xl md:text-6xl font-bold ${theme === 'light' ? 'text-zinc-900' : 'text-white'} mb-6 leading-tight`}>{selectedPost.title}</h1>
              <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
                <span>{selectedPost.date}</span>
                <span>&bull;</span>
                <span>{selectedPost.readTime}</span>
              </div>
              
              {/* Blog Post Content
                This div uses Tailwind's 'prose' plugin. 
                'prose-invert' automatically styles it for dark mode when the theme is dark.
                I've also added overrides for link colors to match the site theme.
              */}
              <div 
                className={`prose prose-lg lg:prose-xl max-w-none ${theme === 'dark' ? 'prose-invert' : ''} prose-a:text-emerald-500 hover:prose-a:text-emerald-600 ${theme === 'dark' ? 'prose-a:text-emerald-400 hover:prose-a:text-emerald-300' : ''} prose-ul:marker:text-emerald-500 prose-blockquote:border-emerald-500`}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
              />
              
              <div className="flex flex-wrap gap-2 mt-12">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className={`text-sm font-mono rounded-full border ${theme === 'light' ? 'text-zinc-500 bg-black/5 border-black/5' : 'text-zinc-400 bg-white/5 border-white/5'} px-3 py-1`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-8 px-6 text-center border-t ${theme === 'light' ? 'border-black/5' : 'border-white/5'} text-zinc-500 text-sm flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto`}>
        <p>© {new Date().getFullYear()} Mazin Abdullah. All rights reserved.</p>
        {/* --- FIX APPLIED --- */}
        <p className="mt-2 md:mt-0 flex items-center gap-1">
          Built with <span className="text-emerald-500 font-medium">React</span> & <span className="text-cyan-500 font-medium">Tailwind</span>
        </p>
      </footer>

    </div>
  );
}
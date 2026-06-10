
import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Mail, ArrowRight, Linkedin, Github, Award, ChevronRight, Sun, Moon, Menu, X } from 'lucide-react';
import GridBackground from './components/GridBackground';
import { PERSONAL_DATA, NAV_ITEMS, EXPERTISE, CAREER, PROJECTS, ACHIEVEMENTS } from './constants';
import { useExperienceTimer } from "./hooks/useExperienceTimer";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [typedText, setTypedText] = useState('');
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const experienceTime = useExperienceTimer();
  const lenisRef = useRef<Lenis | null>(null);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      if (next === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      return next;
    });
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Buttery-smooth, continuous (infinite-loop) scrolling. Disabled for reduced motion.
    let lenis: Lenis | null = null;
    const handleNativeScroll = () => setScrolled(window.scrollY > 50);
    if (reduce) {
      window.addEventListener('scroll', handleNativeScroll);
    } else {
      const l = new Lenis({
        lerp: 0.1,
        infinite: true,
        syncTouch: true,
        anchors: true,
        autoRaf: true,
      });
      l.on('scroll', () => setScrolled(l.scroll > 50));
      lenisRef.current = l;
      lenis = l;
    }

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Typing effect (instant when reduced motion is preferred)
    const summary = PERSONAL_DATA.summary;
    let typingInterval: ReturnType<typeof setInterval> | undefined;
    if (reduce) {
      setTypedText(summary);
    } else {
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < summary.length) {
          setTypedText(summary.slice(0, i + 1));
          i++;
        } else if (typingInterval) {
          clearInterval(typingInterval);
        }
      }, 20);
    }

    // Intersection Observer for reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      lenis?.destroy();
      lenisRef.current = null;
      window.removeEventListener('scroll', handleNativeScroll);
      clearInterval(timeInterval);
      if (typingInterval) clearInterval(typingInterval);
      observer.disconnect();
    };
  }, []);

  // Touch (no-hover) devices use tap to reveal the skill panel instead of hover.
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  // On touch, close the open skill panel on Escape or a tap outside the grid.
  useEffect(() => {
    if (activeSkill === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSkill(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('#skills')) setActiveSkill(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [activeSkill]);

  // Scrollspy: subtly highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ['home', 'skills', 'experience', 'projects', 'achievements', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hero is rendered twice: once at the top (with #home + reveal animation) and
  // once after the footer as the seamless wrap target for the infinite loop.
  // The clone has no id, is aria-hidden, and skips the reveal animation so it
  // matches the already-revealed real hero for a pixel-clean loop seam.
  const renderHero = (clone = false) => {
    const Heading: React.ElementType = clone ? 'div' : 'h1';
    return (
    <section
      {...(clone ? ({ 'aria-hidden': true, inert: true } as any) : { id: 'home' })}
      className="min-h-screen flex flex-col justify-center relative px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className={clone ? undefined : 'reveal'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-white/5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 mb-8">
            <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
            Bhopal, IN
          </div>

          <Heading className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-slate-900 dark:text-slate-100">
            Developing <span className="text-blue-600 dark:text-blue-400">Scalable</span> Realities.
          </Heading>

          <div className="mono text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-xl">
            <span className="typing-cursor">{typedText}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#experience"
              className="group relative px-8 py-5 w-[170px]
                        bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold mono text-sm
                        transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="absolute inset-0 flex items-center justify-center
                              opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                &gt; TRAJECTORY
              </span>

              <span className="absolute inset-0 flex items-center justify-center
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                &gt; EXPERIENCE
              </span>
            </a>
            <div className="flex items-center gap-6 text-slate-400 dark:text-slate-500">
              <a href={`https://${PERSONAL_DATA.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href={`https://${PERSONAL_DATA.github}`} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"><Github className="w-5 h-5" /></a>
              <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className={clone ? 'hidden lg:block relative' : 'hidden lg:block reveal relative'} style={{ transitionDelay: '200ms' }}>
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 p-8 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 mono text-[10px] text-slate-400 dark:text-slate-500">Java 21</div>
            <div className="space-y-4 mono text-sm text-slate-800 dark:text-slate-200">
              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">01</span>
                <span className="text-purple-600 dark:text-purple-400">final</span>
                <span className="text-purple-600 dark:text-purple-400">class</span>
                <span className="text-amber-600 dark:text-amber-400">Engineer</span> {'{'}
              </div>

              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">02</span>
                &nbsp;&nbsp;<span className="text-purple-600 dark:text-purple-400">private static final</span> String NAME =
                <span className="text-emerald-600 dark:text-emerald-400">"Aryan Sahu"</span>;
              </div>

              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">03</span>
                &nbsp;&nbsp;<span className="text-purple-600 dark:text-purple-400">private</span> var expertise = <span className="text-amber-600 dark:text-amber-400">StackProfile</span>
              </div>
              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">04</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.builder()
              </div>

              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">05</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.frameworks(
                <span className="text-emerald-600 dark:text-emerald-400">"Spring", "Hibernate"</span>)
              </div>

              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">06</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.datastores(
                <span className="text-emerald-600 dark:text-emerald-400">"PostgreSQL", "Redis", "Vertica"</span>)
              </div>

              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">07</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.security(
                <span className="text-emerald-600 dark:text-emerald-400">"Spring Security"</span>)
              </div>

               <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">08</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.build();
              </div>

              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">09</span>
                &nbsp;&nbsp;<span className="text-purple-600 dark:text-purple-400">public</span>
                <span className="text-amber-600 dark:text-amber-400">SystemState</span>
                <span className="text-blue-600 dark:text-blue-400">architectSystems</span>() {'{'}
              </div>

              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">10</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600 dark:text-purple-400">return</span>
                &nbsp;&nbsp;<span className="text-amber-600 dark:text-amber-400">Architect</span>
                .design(<span className="text-amber-600 dark:text-amber-400">ScalableSystems</span>.vNext())
              </div>
              <div className="flex gap-0">
                <span className="text-slate-400 dark:text-slate-500">11</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.deploy();
              </div>

              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">12</span>
                &nbsp;&nbsp;{'}'}
              </div>

              <div className="flex gap-4">
                <span className="text-slate-400 dark:text-slate-500">13</span>
                {'}'}
              </div>

            </div>
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end">
              <div>
                <div className="text-[12px] mono text-slate-500 dark:text-slate-400 uppercase mb-1">Building solutions since</div>

              </div>
              <div className="flex items-center justify-center">
                <div className="text-[15px] text-slate-900 dark:text-slate-100 font-bold">{experienceTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  };

  const renderDivider = () => (
    <div className="mx-auto w-[70%] h-px bg-slate-200 dark:bg-slate-800" />
  );

  return (
    <div className="min-h-screen">
      <GridBackground />

      {/* Navigation */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl py-4 border-b border-slate-200 dark:border-slate-800' : 'py-6 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => (lenisRef.current ? lenisRef.current.scrollTo(0) : window.scrollTo(0, 0))}>
            <div className="w-10 h-10 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-100 font-bold text-lg mono relative overflow-hidden">
              AS
              <div className="absolute inset-0 bg-slate-900/5 dark:bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase opacity-70">Aryaura</div>
              <div className="text-sm font-extrabold tracking-tighter text-slate-900 dark:text-slate-100">{PERSONAL_DATA.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-10">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection !== '' && item.href === `#${activeSection}`;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${isActive ? 'text-slate-900 dark:text-white [text-shadow:0_0_10px_rgba(37,99,235,0.4)] dark:[text-shadow:0_0_10px_rgba(96,165,250,0.45)]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a href="#contact" className="px-5 py-2 border border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-100 mono text-[10px] font-bold uppercase hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">Connect</a>
            </div>

            <button onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme" className="p-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-200 transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden text-slate-900 dark:text-slate-100 p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection !== '' && item.href === `#${activeSection}`;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mono text-xs font-bold uppercase tracking-[0.2em] py-3 transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 px-5 py-3 border border-slate-900 dark:border-slate-100 text-center text-slate-900 dark:text-slate-100 mono text-[10px] font-bold uppercase hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all"
              >
                Connect
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        {renderHero(false)}

        {renderDivider()}

        {/* Expertise Section */}
        <section id="skills" className="py-32 relative reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-xs mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase mb-4">Core Competencies</h2>
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">Optimized for <br/>High-Load Environments.</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed pt-10">
                Specializing in high-performance backend systems. Expert in Java and modern reactive frameworks, focused on building secure, compliant, and horizontally scalable cloud architectures.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {EXPERTISE.map((skill, idx) => {
                const active = activeSkill === idx;
                return (
                  <button
                    type="button"
                    key={idx}
                    aria-describedby={`skill-panel-${idx}`}
                    aria-expanded={active}
                    onClick={() => { if (isTouch) setActiveSkill(active ? null : idx); }}
                    className={`group relative text-left w-full ${isTouch ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`p-4 bg-slate-50 dark:bg-white/5 border transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-slate-400 dark:group-hover:border-slate-600 group-focus-visible:border-slate-400 dark:group-focus-visible:border-slate-600 ${active ? 'border-slate-400 dark:border-slate-600' : 'border-slate-200 dark:border-slate-800'}`}>
                      <div className="text-[10px] mono text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{skill.name}</div>
                    </div>
                    <div
                      id={`skill-panel-${idx}`}
                      role="tooltip"
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute left-1/2 top-1/2 z-30 w-80 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 origin-center rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xl shadow-slate-900/10 dark:shadow-black/40 transition-all duration-200 ${active ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'} group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100`}
                    >
                      <div className="mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">{skill.name}</div>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{skill.usage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {renderDivider()}

        {/* Experience Section */}
        <section id="experience" className="py-32 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <h2 className="text-xs mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase mb-4">Career_Trace</h2>
                <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Professional Log</h3>
              </div>
              <div className="text-right">
                 <div className="text-3xl font-mono text-slate-900 dark:text-slate-100">{CAREER.length.toString().padStart(2, '0')} <span className="text-slate-400 dark:text-slate-500 text-sm">Nodes_Deployed</span></div>
              </div>
            </div>
            <div className="space-y-32">
              {CAREER.map((item, idx) => (
                <div key={idx} className="grid md:grid-cols-[300px_1fr] gap-12 group">
                  <div className="space-y-4">
                    <div className="text-[10px] mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] mb-2">{item.period}</div>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">{item.company}</h3>
                    <div className="inline-block px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 mono text-[10px] text-slate-600 dark:text-slate-400">{item.role}</div>
                  </div>
                  <ul className="space-y-6">
                    {item.desc.map((d, i) => (
                      <li key={i} className="flex gap-4 text-slate-600 dark:text-slate-400 leading-relaxed text-base border-l border-slate-200 dark:border-slate-800 pl-6 hover:border-slate-900 dark:hover:border-slate-100 transition-all">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {renderDivider()}

        {/* Projects Section */}
        <section id="projects" className="py-32 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-xs mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase mb-4">Selected_Deployments</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Technical Portfolio</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((proj, idx) => (
                <div key={idx} className="p-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 group relative overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="absolute top-0 right-0 p-6 text-slate-200 dark:text-slate-800 mono text-[40px] font-black pointer-events-none group-hover:text-blue-600/10 dark:group-hover:text-blue-400/10 transition-colors">
                    {proj.category.split(' ')[0][0]}
                  </div>
                  <div className="mb-8 mono text-xs text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase">{proj.category}</div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed mono text-sm">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tools.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 mono text-[10px] text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {renderDivider()}

        {/* Achievements Section */}
        <section id="achievements" className="py-32 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-xs mono text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase mb-4">Milestones</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Recognition & Metrics</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map((a, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all group">
                  <div className="mono text-blue-600 dark:text-blue-400 mb-4 opacity-60 group-hover:opacity-100 transition-opacity"><Award className="w-5 h-5" /></div>
                  <div className="text-slate-900 dark:text-slate-100 font-bold mb-2 text-sm uppercase tracking-tight">{a.title}</div>
                  <div className="text-[10px] mono text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {renderDivider()}

        {/* CTA Section */}
        <section id="contact" className="py-48 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
            <div className="w-20 h-20 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center mx-auto mb-10 group cursor-pointer hover:border-slate-900 dark:hover:border-slate-100 transition-colors">
              <Mail className="text-slate-900 dark:text-slate-100 w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 mb-10 tracking-tighter">
              Ready to Scale?
            </h2>
            <p className="mono text-slate-500 dark:text-slate-400 mb-16 text-lg">Initiate collaboration through official channels.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="inline-flex items-center justify-center gap-4 px-12 py-6 min-w-[14rem] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold mono text-sm hover:border-slate-900 dark:hover:border-slate-100 transition-all transform hover:scale-105">
                Email <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`https://wa.me/${PERSONAL_DATA.whatsapp}`} className="inline-flex items-center justify-center gap-4 px-12 py-6 min-w-[14rem] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold mono text-sm hover:border-slate-900 dark:hover:border-slate-100 transition-all transform hover:scale-105">
                WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {renderDivider()}

      <footer className="py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="mono text-[10px] text-slate-500 dark:text-slate-500 tracking-widest uppercase">
            System_Time: {currentTime} | &copy; {new Date().getFullYear()} {PERSONAL_DATA.name.toUpperCase()}
          </div>
          <div className="flex gap-10 mono text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-8 hover:underline">ROOT</a>
            <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-8 hover:underline">EXPERIENCE</a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors underline-offset-8 hover:underline">PROJECTS</a>
          </div>
        </div>
      </footer>

      {/* Seamless infinite-loop wrap target: a clone of the hero so the bottom -> top wrap is invisible */}
      {renderHero(true)}
    </div>
  );
};

export default App;


import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ArrowUpRight, Sun, Moon, Menu, X } from 'lucide-react';
import CodeCard from './components/CodeCard';
import { PERSONAL_DATA, NAV_ITEMS, EXPERTISE, CAREER, PROJECTS, ACHIEVEMENTS, EDUCATION, CERTIFICATIONS } from './constants';
import { useExperienceTimer } from './hooks/useExperienceTimer';

const SECTION_IDS = ['home', 'experience', 'projects', 'skills', 'education', 'achievements', 'certifications', 'contact'];

const LABEL = 'text-[11px] uppercase tracking-[0.18em] text-muted';
const TEXT_LINK = 'border-b border-ink pb-0.5 transition-colors hover:border-accent hover:text-accent';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  meta?: string;
  children: React.ReactNode;
}

// Shared editorial section frame: a numbered label column beside a serif headline and content.
const Section: React.FC<SectionProps> = ({ id, index, label, title, meta, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="reveal border-t border-rule overflow-x-clip">
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-[200px_1fr] gap-x-16 gap-y-8">
      <div className="lg:sticky lg:top-28 self-start">
        <div className={`${LABEL} tabular-nums`}>
          <span className="text-accent">{index}</span> — {label}
        </div>
        {meta && <div className="mt-2 text-[12px] text-muted tabular-nums">{meta}</div>}
      </div>
      <div>
        <h2 id={`${id}-title`} className="font-serif font-normal text-4xl md:text-6xl leading-[1.02] tracking-tight mb-12 md:mb-16">
          {title}
        </h2>
        {children}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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

    // Smooth scrolling (disabled for reduced motion).
    let lenis: Lenis | null = null;
    const handleNativeScroll = () => setScrolled(window.scrollY > 50);
    if (reduce) {
      window.addEventListener('scroll', handleNativeScroll);
    } else {
      // Buttery-smooth, continuous (infinite-loop) scrolling.
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

  // Scrollspy: underline the nav item for the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS
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

  // Keep a skill's magnified panel inside the viewport (it is centered over its tile).
  const keepPanelOnScreen = (tile: HTMLElement) => {
    const panel = tile.querySelector<HTMLElement>('[role="tooltip"]');
    if (!panel) return;
    const margin = 12;
    const rect = tile.getBoundingClientRect();
    const width = panel.offsetWidth;
    const left = rect.left + rect.width / 2 - width / 2;
    const shift = Math.max(margin - left, 0) - Math.max(left + width - (window.innerWidth - margin), 0);
    panel.style.setProperty('translate', `${shift}px 0`);
  };

  const navLinkClass = (href: string, size: string) => {
    const isActive = activeSection !== '' && href === `#${activeSection}`;
    return `${size} uppercase tracking-[0.14em] font-medium pb-1 border-b transition-colors ${isActive ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}`;
  };

  // The hero is rendered twice: once at the top (with #home and the reveal animation) and once
  // after the footer as the wrap target for the infinite scroll. The clone has no id, is
  // aria-hidden and inert, and skips the reveal so it matches the already-revealed hero and the
  // wrap from the bottom back to the top has no visible seam.
  const renderHero = (clone = false) => {
    const Heading: React.ElementType = clone ? 'div' : 'h1';
    return (
      <section
        {...(clone ? ({ 'aria-hidden': true, inert: true } as any) : { id: 'home' })}
        className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20"
      >
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-x-12 gap-y-14 items-center">
          <div className={clone ? undefined : 'reveal'}>
            <div className={`inline-flex items-center gap-2.5 ${LABEL} mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true"></span>
              <span>{PERSONAL_DATA.title} <span className="whitespace-nowrap">· {PERSONAL_DATA.location}</span></span>
            </div>

            <Heading className="font-serif font-normal text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8">
              Developing <em className="italic text-accent">Scalable</em> Realities.
            </Heading>

            <p className="text-lg leading-relaxed text-muted max-w-xl mb-10">{PERSONAL_DATA.summary}</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <a href="#experience" className={`inline-flex items-center gap-1.5 font-medium ${TEXT_LINK}`}>
                View experience <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <div className="flex items-center gap-6">
                <a href={`https://${PERSONAL_DATA.linkedin}`} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">LinkedIn</a>
                <a href={`https://${PERSONAL_DATA.github}`} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-accent">GitHub</a>
                <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="text-muted transition-colors hover:text-accent">Email</a>
              </div>
            </div>
          </div>

          <div className={clone ? 'min-w-0' : 'reveal min-w-0'} style={clone ? undefined : { transitionDelay: '200ms' }}>
            <CodeCard elapsed={experienceTime} />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 text-sm">
        Skip to content
      </a>

      {/* Navigation */}
      <header id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b ${scrolled || mobileMenuOpen ? 'bg-paper border-rule' : 'bg-transparent border-transparent'}`}>
        <nav aria-label="Primary" className="max-w-6xl mx-auto px-6 h-[72px] flex justify-between items-center">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if (lenisRef.current) lenisRef.current.scrollTo(0); else window.scrollTo(0, 0); }}
            className="flex flex-col leading-none"
          >
            <span className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent">Aryaura</span>
            <span className="font-serif text-2xl">{PERSONAL_DATA.name}</span>
          </a>

          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection !== '' && item.href === `#${activeSection}`;
                return (
                  <a key={item.href} href={item.href} aria-current={isActive ? 'true' : undefined} className={navLinkClass(item.href, 'text-[11px]')}>
                    {item.label}
                  </a>
                );
              })}
              <a href="#contact" className="px-4 py-2 border border-ink text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:bg-ink hover:text-paper">Connect</a>
            </div>

            <button onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme" className="p-2 text-muted hover:text-ink transition-colors">
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-ink"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-rule bg-paper max-h-[calc(100dvh-73px)] overflow-y-auto overscroll-contain">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection !== '' && item.href === `#${activeSection}`;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-3xl py-2 transition-colors ${isActive ? 'text-accent' : 'text-ink hover:text-accent'}`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-5 px-5 py-3 border border-ink text-center text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:bg-ink hover:text-paper"
              >
                Connect
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        {renderHero(false)}

        {/* Experience */}
        <Section id="experience" index="01" label="Experience" meta={`${CAREER.length.toString().padStart(2, '0')} roles`} title="Professional Log">
          <ol className="border-t border-ink">
            {CAREER.map((item, idx) => (
              <li key={idx} className="grid md:grid-cols-[180px_1fr] gap-x-12 gap-y-3 py-10 border-b border-rule">
                <div>
                  <div className={`${LABEL} tabular-nums`}>{item.period}</div>
                  <div className="mt-2 text-sm text-muted">{item.company}</div>
                </div>
                <div>
                  <h3 className="font-serif font-normal text-3xl md:text-4xl leading-tight">{item.role}</h3>
                  <ul className="mt-6 space-y-4 max-w-2xl">
                    {item.desc.map((d, i) => (
                      <li key={i} className="relative pl-6 text-[15px] leading-relaxed">
                        <span aria-hidden="true" className="absolute left-0 text-accent">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Projects */}
        <Section id="projects" index="02" label="Projects" meta={`${PROJECTS.length.toString().padStart(2, '0')} selected`} title="Technical Portfolio">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
            {PROJECTS.map((proj, idx) => (
              <article key={idx} className="group border-t border-ink pt-6">
                <div className={`flex justify-between ${LABEL}`}>
                  <span className="text-accent">{proj.category}</span>
                  <span className="tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-serif font-normal text-3xl md:text-4xl leading-tight transition-colors group-hover:text-accent">{proj.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{proj.description}</p>
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted" aria-label="Technologies">
                  {proj.tools.map((t, i) => (
                    <li key={i} className="after:content-['·'] after:ml-3 last:after:content-none">{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* Expertise */}
        <Section id="skills" index="03" label="Expertise" title={<>Optimized for <em className="italic text-accent">High-Load</em> Environments.</>}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted mb-14">
            Specializing in high-performance backend systems. Expert in Java and modern reactive frameworks, focused on building secure, compliant, and horizontally scalable cloud architectures.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-rule">
            {EXPERTISE.map((skill, idx) => {
              const active = activeSkill === idx;
              return (
                <button
                  type="button"
                  key={idx}
                  aria-describedby={`skill-panel-${idx}`}
                  aria-expanded={active}
                  onPointerEnter={(e) => keepPanelOnScreen(e.currentTarget)}
                  onFocus={(e) => keepPanelOnScreen(e.currentTarget)}
                  onClick={(e) => {
                    if (!isTouch) return;
                    keepPanelOnScreen(e.currentTarget);
                    setActiveSkill(active ? null : idx);
                  }}
                  className={`group relative text-left border-r border-b border-rule px-4 py-5 transition-colors hover:bg-paper-2 focus-visible:bg-paper-2 ${active ? 'bg-paper-2' : ''} ${isTouch ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="block font-serif text-xl leading-tight transition-colors group-hover:text-accent">{skill.name}</span>
                  <span
                    id={`skill-panel-${idx}`}
                    role="tooltip"
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute left-1/2 top-1/2 z-30 block w-80 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 origin-center border border-ink bg-paper p-5 text-left transition-all duration-200 ${active ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'} group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100`}
                  >
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-accent mb-2">{skill.name}</span>
                    <span className="block text-sm leading-relaxed">{skill.usage}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" index="04" label="Education" title="Academic Background">
          <ol className="border-t border-ink">
            {EDUCATION.map((edu, idx) => (
              <li key={idx} className="grid md:grid-cols-[180px_1fr] gap-x-12 gap-y-2 py-8 border-b border-rule">
                <div className={`${LABEL} tabular-nums`}>{edu.period}</div>
                <div>
                  <h3 className="font-serif font-normal text-3xl leading-tight">{edu.institution}</h3>
                  <p className="mt-2 text-[15px] text-muted">{edu.degree}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Milestones */}
        <Section id="achievements" index="05" label="Milestones" title="Recognition & Metrics">
          <ul className="grid sm:grid-cols-2 gap-x-12 border-t border-ink">
            {ACHIEVEMENTS.map((a, idx) => (
              <li key={idx} className="py-6 border-b border-rule">
                <h3 className="font-serif font-normal text-2xl leading-tight">{a.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Credentials */}
        <Section id="certifications" index="06" label="Credentials" title="Certifications & Honors">
          <ul className="grid sm:grid-cols-2 gap-x-12 border-t border-ink">
            {CERTIFICATIONS.map((c, idx) => (
              <li key={idx} className="py-6 border-b border-rule">
                <h3 className="font-serif font-normal text-2xl leading-tight">{c.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="reveal border-t border-ink">
          <div className="max-w-6xl mx-auto px-6 py-28 md:py-40">
            <div className={`${LABEL} tabular-nums`}><span className="text-accent">07</span> — Contact</div>
            <h2 id="contact-title" className="mt-8 font-serif font-normal text-6xl md:text-8xl xl:text-9xl leading-[0.95] tracking-tight">
              Ready to <em className="italic text-accent">Scale?</em>
            </h2>
            <p className="mt-8 max-w-md text-lg text-muted">Initiate collaboration through official channels.</p>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 font-serif text-3xl md:text-4xl">
              <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className={`inline-flex items-center gap-2 ${TEXT_LINK}`}>
                Email <ArrowUpRight className="w-6 h-6" aria-hidden="true" />
              </a>
              <a href={`https://wa.me/${PERSONAL_DATA.whatsapp}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${TEXT_LINK}`}>
                WhatsApp <ArrowUpRight className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[12px] text-muted">
          <div>&copy; {new Date().getFullYear()} {PERSONAL_DATA.name}. {PERSONAL_DATA.location}.</div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 uppercase tracking-[0.14em] font-medium">
            <a href={`https://${PERSONAL_DATA.linkedin}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
            <a href={`https://${PERSONAL_DATA.github}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">GitHub</a>
            <a href="#home" className="transition-colors hover:text-accent">Back to top</a>
          </div>
        </div>
      </footer>

      {/* Seamless infinite-loop wrap target: a clone of the hero so the bottom -> top wrap is invisible */}
      {renderHero(true)}
    </div>
  );
};

export default App;

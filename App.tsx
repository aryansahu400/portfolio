
import React, { useEffect, useState } from 'react';
import { Cpu, Mail, ArrowRight, Linkedin, Github, Award, ChevronRight } from 'lucide-react';
import GridBackground from './components/GridBackground';
import AssistantTerminal from './components/AssistantTerminal';
import { PERSONAL_DATA, NAV_ITEMS, EXPERTISE, CAREER, PROJECTS, ACHIEVEMENTS } from './constants';
import { useExperienceTimer } from "./hooks/useExperienceTimer";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [typedText, setTypedText] = useState('');
  const experienceTime = useExperienceTimer();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Typing effect logic
    const summary = PERSONAL_DATA.summary;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < summary.length) {
        setTypedText(summary.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20);

    // Intersection Observer for reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      clearInterval(typingInterval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <GridBackground />
      <div className="scanline" />

      {/* Navigation */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/0 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-white/5' : 'py-6 border-white/0'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg mono relative overflow-hidden">
              AS
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-[10px] mono text-cyan-500 font-bold tracking-widest uppercase opacity-60">Aryaura</div>
              <div className="text-sm font-extrabold tracking-tighter">{PERSONAL_DATA.name}</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map((item, idx) => (
              <a key={idx} href={item.href} className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-all">
                {item.label}
              </a>
            ))}
            <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="px-5 py-2 border border-cyan-500/30 text-cyan-400 mono text-[10px] font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all">Connect</a>
          </div>

          <button className="md:hidden text-white p-2">
            <Cpu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full pt-24 grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-cyan-500/20 bg-cyan-500/5 text-[10px] mono font-bold uppercase tracking-[0.2em] text-cyan-400 mb-8">
                <span className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></span>
                System Node: Bhopal, IN
              </div>
              
              <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9] text-white">
                Developing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Scalable</span> Realities.
              </h1>
              
              <div className="mono text-slate-400 text-lg mb-10 max-w-xl">
                <span className="typing-cursor">{typedText}</span>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <a href="#experience" className="px-8 py-4 bg-cyan-500 text-black font-bold mono text-sm hover:bg-white transition-all transform hover:-translate-y-1">
                  &gt; INIT_CAREER_DATA
                </a>
                <div className="flex items-center gap-6 text-slate-500">
                  <a href={`https://${PERSONAL_DATA.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-all"><Linkedin className="w-5 h-5" /></a>
                  <a href={`https://${PERSONAL_DATA.github}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-all"><Github className="w-5 h-5" /></a>
                  <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="hover:text-cyan-400 transition-all"><Mail className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block reveal relative" style={{transitionDelay: '200ms'}}>
              <div className="glass p-8 border-cyan-500/20 rounded-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 mono text-[10px] text-cyan-500/40">Java 21</div>
                <div className="space-y-4 mono text-sm">
                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">01</span>
                    <span className="text-purple-400">final</span>
                    <span className="text-purple-400">class</span>
                    <span className="text-yellow-400">Engineer</span> {'{'}
                  </div>

                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">02</span>
                    &nbsp;&nbsp;<span className="text-purple-400">private static final</span> String NAME =
                    <span className="text-green-400">"Aryan Sahu"</span>;
                  </div>

                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">03</span>
                    &nbsp;&nbsp;<span className="text-purple-400">private</span> var expertise = <span className="text-yellow-400">StackProfile</span>
                  </div>
                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">04</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.builder()
                  </div>

                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">05</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.frameworks(
                    <span className="text-green-400">"Spring", "Hibernate"</span>)
                  </div>

                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">06</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.datastores(
                    <span className="text-green-400">"PostgreSQL", "Redis", "Vertica"</span>)
                  </div>

                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">07</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.security(
                    <span className="text-green-400">"Spring Security"</span>)
                  </div>

                   <div className="flex gap-0">
                    <span className="text-cyan-500/50">08</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.build();
                  </div>

                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">09</span>
                    &nbsp;&nbsp;<span className="text-purple-400">public</span>
                    <span className="text-yellow-400">SystemState</span>
                    <span className="text-blue-400">architectSystems</span>() {'{'}
                  </div>

                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">10</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span>
                    &nbsp;&nbsp;<span className="text-yellow-400">Architect</span>
                    .design(<span className="text-yellow-400">ScalableSystems</span>.vNext())
                  </div>
                  <div className="flex gap-0">
                    <span className="text-cyan-500/50">11</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.deploy();
                  </div>

                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">12</span>
                    &nbsp;&nbsp;{'}'}
                  </div>

                  <div className="flex gap-4">
                    <span className="text-cyan-500/50">13</span>
                    {'}'}
                  </div>

                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-end">
                  <div>
                    <div className="text-[12px] mono text-slate-300 uppercase mb-1">Building solutions since</div>
                    
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-[15px] text-white font-bold">{experienceTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="skills" className="py-32 relative reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-xs mono text-cyan-500 font-bold tracking-[0.3em] uppercase mb-4">Core Competencies</h2>
                <h3 className="text-4xl font-extrabold text-white leading-tight">Optimized for <br/>High-Load Environments.</h3>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed pt-10">
                Specializing in high-performance backend systems. Expert in Java and modern reactive frameworks, focused on building secure, compliant, and horizontally scalable cloud architectures.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {EXPERTISE.map((skill, idx) => (
                <div key={idx} className="p-4 glass group hover:border-cyan-500/50 transition-all cursor-default">
                  <div className="text-[10px] mono text-slate-500 group-hover:text-cyan-400">{skill}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 bg-[#030305] reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <h2 className="text-xs mono text-cyan-500 font-bold tracking-[0.3em] uppercase mb-4">Career_Trace</h2>
                <h3 className="text-4xl font-extrabold text-white">Professional Log</h3>
              </div>
              <div className="text-right">
                 <div className="text-3xl font-mono text-white">{CAREER.length.toString().padStart(2, '0')} <span className="text-slate-700 text-sm">Nodes_Deployed</span></div>
              </div>
            </div>
            <div className="space-y-32">
              {CAREER.map((item, idx) => (
                <div key={idx} className="grid md:grid-cols-[300px_1fr] gap-12 group">
                  <div className="space-y-4">
                    <div className="text-[10px] mono text-cyan-500 font-bold uppercase tracking-[0.2em] mb-2">{item.period}</div>
                    <h3 className="text-3xl font-extrabold text-white leading-tight">{item.company}</h3>
                    <div className="inline-block px-3 py-1 bg-white/5 border border-white/5 mono text-[10px] text-slate-400">{item.role}</div>
                  </div>
                  <ul className="space-y-6">
                    {item.desc.map((d, i) => (
                      <li key={i} className="flex gap-4 text-slate-400 leading-relaxed text-base border-l border-white/5 pl-6 hover:border-cyan-500 transition-all">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-xs mono text-cyan-500 font-bold tracking-[0.3em] uppercase mb-4">Selected_Deployments</h2>
              <h3 className="text-4xl font-extrabold text-white">Technical Portfolio</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((proj, idx) => (
                <div key={idx} className="p-10 glass group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-slate-800 mono text-[40px] font-black pointer-events-none group-hover:text-cyan-500/10 transition-colors">
                    {proj.category.split(' ')[0][0]}
                  </div>
                  <div className="mb-8 mono text-xs text-cyan-500 font-bold tracking-widest uppercase">{proj.category}</div>
                  <h3 className="text-3xl font-extrabold text-white mb-6 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                  <p className="text-slate-400 mb-10 leading-relaxed mono text-sm">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tools.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 mono text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 bg-[#030305] reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-xs mono text-cyan-500 font-bold tracking-[0.3em] uppercase mb-4">Milestones</h2>
              <h3 className="text-4xl font-extrabold text-white">Recognition & Metrics</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map((a, idx) => (
                <div key={idx} className="p-6 border border-white/5 hover:border-cyan-500/30 transition-all group">
                  <div className="mono text-cyan-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity"><Award className="w-5 h-5" /></div>
                  <div className="text-white font-bold mb-2 text-sm uppercase tracking-tight">{a.title}</div>
                  <div className="text-[10px] mono text-slate-500 group-hover:text-slate-400">{a.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-48 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
            <div className="w-20 h-20 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-10 group cursor-pointer hover:border-cyan-500 transition-colors">
              <Mail className="text-cyan-500 w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-10 tracking-tighter">
              Ready to Scale?
            </h2>
            <p className="mono text-slate-500 mb-16 text-lg">Initiate collaboration through official channels.</p>
            <a href={`mailto:${PERSONAL_DATA.professionalEmail}?cc=${PERSONAL_DATA.email}`} className="inline-flex items-center gap-4 px-12 py-6 bg-cyan-500 text-black font-bold mono text-sm hover:bg-white transition-all transform hover:scale-105">
              EXECUTE_CONTACT <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-black/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="mono text-[10px] text-slate-600 tracking-widest uppercase">
            System_Time: {currentTime} | &copy; {new Date().getFullYear()} {PERSONAL_DATA.name.toUpperCase()}
          </div>
          <div className="flex gap-10 mono text-[10px] font-bold text-slate-500">
            <a href="#home" className="hover:text-cyan-500 transition-colors underline-offset-8 hover:underline">ROOT</a>
            <a href="#experience" className="hover:text-cyan-500 transition-colors underline-offset-8 hover:underline">EXPERIENCE</a>
            <a href="#projects" className="hover:text-cyan-500 transition-colors underline-offset-8 hover:underline">PROJECTS</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Floating Terminal */}
      <AssistantTerminal />
    </div>
  );
};

export default App;

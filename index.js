
/**
 * ARYAN SAHU - Engineering Portfolio
 * Pure Vanilla JavaScript - Cyber-Systems Theme
 */

const PERSONAL_DATA = {
  name: "Aryan Sahu",
  summary: "Specializing in high-performance backend systems and reactive architectures. Passionate about crafting high-quality software with modern Java and reactive programming.",
  email: "aryansahu400@gmail.com",
  linkedin: "linkedin.com/in/aryansahu400",
  github: "github.com/aryansahu400"
};

const NAV_ITEMS = [
  { label: 'Expertise', href: '#skills' },
  { label: 'Log', href: '#experience' },
  { label: 'Deployments', href: '#projects' },
  { label: 'Metrics', href: '#achievements' }
];

const EXPERTISE = [
  "Java", "Reactive Programming", "Spring Boot", "Spring Webflux", 
  "Kafka", "Redis", "SSE", "JOOQ", "Postgres", "SQL", 
  "Vertica", "ETL", "JWT - RSA 256", "IronPDF", "Git", "Hibernate",
  "Duck-DB", "WebClient"
];

const CAREER = [
  {
    company: "Lumenore (Netlink Pvt. Ltd.)",
    role: "Associate Software Engineer",
    period: "06/2023 - Present",
    desc: [
      "Developed a Gateway Server to manage traffic and facilitate microservice communication with Auth/Audit functionalities.",
      "Implemented robust session management using JWTs and Redis, utilizing Kafka for real-time activity monitoring.",
      "Engineered a Migration API for seamless data transfer of no-code apps built by the Lumenore App Builder.",
      "Built a Media Module with SFTP integration for efficient enterprise-level file management.",
      "Developed a scalable Notification Module using Java Webflux and Server-Sent Events (SSE) for real-time triggers.",
      "Ensured regulatory adherence for HIPAA and GDPR compliance across sensitive data handling modules."
    ]
  },
  {
    company: "Netlink Software Group America",
    role: "Software Engineering Intern",
    period: "03/2023 - 05/2023",
    desc: [
      "Conducted in-depth analysis and troubleshooting of REST APIs for user registration, reviewing 3500+ lines of code.",
      "Enhanced code maintainability of the user authentication module by refactoring 1200+ lines of legacy Java code.",
      "Improved system security through strategic flow modifications in the authentication pipeline."
    ]
  }
];

const PROJECTS = [
  {
    title: "Sanjeevani Application",
    category: "Health Systems",
    description: "Enterprise-grade Hospital Management System with Oracle DB. Features LAN-based multi-module functionality and BulkSMS/TwoFactor API integration.",
    tools: ["Core Java", "Oracle DB", "SMS API", "RBAC"]
  },
  {
    title: "Lumenore Media Engine",
    category: "Asset Management",
    description: "High-throughput module for uploading, downloading, and managing media assets utilizing secure SFTP protocols.",
    tools: ["Java", "SFTP", "Spring Boot"]
  }
];

const ACHIEVEMENTS = [
  { title: "Employee of the Month", detail: "Nov 2023 @ Lumenore - Excellence in delivery." },
  { title: "CodeChef Rank 57", detail: "Global rank in Dec Long Challenge 2022." },
  { title: "IEEE CCET 2nd Place", detail: "Project Presentation Excellence Award." },
  { title: "HackerRank 6-Star", detail: "Problem Solving & C++ specialist badge." },
  { title: "IYI World 3rd", detail: "Global recognition for Young Inventors 2018." },
  { title: "Sage Coding #1", detail: "First prize in Engineer's Day coding contest." }
];

function init() {
  renderContent();
  setupInteractions();
  initGridBackground();
  initTypingEffect();
  
  if ((window as any).lucide) {
    (window as any).lucide.createIcons();
  }
}

function renderContent() {
  const footerCta = document.getElementById('footer-cta');
  if (footerCta) (footerCta as HTMLAnchorElement).href = `mailto:${PERSONAL_DATA.email}`;

  // Nav
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    NAV_ITEMS.forEach(item => {
      navLinks.innerHTML += `
        <a href="${item.href}" class="mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-all">
          ${item.label}
        </a>`;
    });
    navLinks.innerHTML += `<a href="mailto:${PERSONAL_DATA.email}" class="px-5 py-2 border border-cyan-500/30 text-cyan-400 mono text-[10px] font-bold uppercase hover:bg-cyan-500 hover:text-black transition-all">Connect</a>`;
  }

  // Skills
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) {
    EXPERTISE.forEach((skill, i) => {
      skillsContainer.innerHTML += `
        <div class="p-4 glass group hover:border-cyan-500/50 transition-all cursor-default">
          <div class="text-[10px] mono text-slate-500 group-hover:text-cyan-400">${skill}</div>
        </div>
      `;
    });
  }

  // Experience
  const expContainer = document.getElementById('experience-container');
  if (expContainer) {
    CAREER.forEach(item => {
      expContainer.innerHTML += `
        <div class="grid md:grid-cols-[300px_1fr] gap-12 group">
          <div class="space-y-4">
            <div class="text-[10px] mono text-cyan-500 font-bold uppercase tracking-[0.2em] mb-2">${item.period}</div>
            <h3 class="text-3xl font-extrabold text-white leading-tight">${item.company}</h3>
            <div class="inline-block px-3 py-1 bg-white/5 border border-white/5 mono text-[10px] text-slate-400">${item.role}</div>
          </div>
          <ul class="space-y-6">
            ${item.desc.map(d => `
              <li class="flex gap-4 text-slate-400 leading-relaxed text-base border-l border-white/5 pl-6 hover:border-cyan-500 transition-all">
                ${d}
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    });
  }

  // Projects
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    PROJECTS.forEach(proj => {
      projectsContainer.innerHTML += `
        <div class="p-10 glass group relative overflow-hidden">
          <div class="absolute top-0 right-0 p-6 text-slate-800 mono text-[40px] font-black pointer-events-none group-hover:text-cyan-500/10 transition-colors">
            ${proj.category.split(' ')[0][0]}
          </div>
          <div class="mb-8 mono text-xs text-cyan-500 font-bold tracking-widest uppercase">${proj.category}</div>
          <h3 class="text-3xl font-extrabold text-white mb-6 group-hover:text-cyan-400 transition-colors">${proj.title}</h3>
          <p class="text-slate-400 mb-10 leading-relaxed mono text-sm">${proj.description}</p>
          <div class="flex flex-wrap gap-2">
            ${proj.tools.map(t => `<span class="px-3 py-1 bg-white/5 mono text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors">${t}</span>`).join('')}
          </div>
        </div>
      `;
    });
  }

  // Awards
  const awardsContainer = document.getElementById('awards-container');
  if (awardsContainer) {
    ACHIEVEMENTS.forEach(a => {
      awardsContainer.innerHTML += `
        <div class="p-6 border border-white/5 hover:border-cyan-500/30 transition-all group">
          <div class="mono text-cyan-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity"><i data-lucide="award" class="w-5 h-5"></i></div>
          <div class="text-white font-bold mb-2 text-sm uppercase tracking-tight">${a.title}</div>
          <div class="text-[10px] mono text-slate-500 group-hover:text-slate-400">${a.detail}</div>
        </div>
      `;
    });
  }

  // Socials
  const socialDiv = document.getElementById('social-links');
  if (socialDiv) {
    socialDiv.innerHTML = `
      <a href="https://${PERSONAL_DATA.linkedin}" target="_blank" class="hover:text-cyan-400 transition-all"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
      <a href="https://${PERSONAL_DATA.github}" target="_blank" class="hover:text-cyan-400 transition-all"><i data-lucide="github" class="w-5 h-5"></i></a>
      <a href="mailto:${PERSONAL_DATA.email}" class="hover:text-cyan-400 transition-all"><i data-lucide="mail" class="w-5 h-5"></i></a>
    `;
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  
  const timeEl = document.getElementById('current-time');
  const updateTime = () => {
    if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
  };
  setInterval(updateTime, 1000);
  updateTime();
}

function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;
  
  const text = PERSONAL_DATA.summary;
  let i = 0;
  
  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 20);
    } else {
      target.classList.remove('typing-cursor');
    }
  }
  
  type();
}

function initGridBackground() {
  const canvas = document.getElementById('grid-bg') as HTMLCanvasElement;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const gridSize = 60;
  let mouse = { x: width / 2, y: height / 2 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
    ctx.lineWidth = 1;

    // Vertical
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Interactive circles
    const relX = Math.floor(mouse.x / gridSize) * gridSize;
    const relY = Math.floor(mouse.y / gridSize) * gridSize;

    ctx.fillStyle = 'rgba(0, 242, 255, 0.1)';
    ctx.fillRect(relX, relY, gridSize, gridSize);
    
    requestAnimationFrame(draw);
  }

  draw();
}

function setupInteractions() {
  const nav = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('bg-black/80', 'backdrop-blur-xl', 'py-4', 'border-white/5');
        nav.classList.remove('py-6', 'border-white/0');
      } else {
        nav.classList.remove('bg-black/80', 'backdrop-blur-xl', 'py-4', 'border-white/5');
        nav.classList.add('py-6', 'border-white/0');
      }
    }
  });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

window.addEventListener('DOMContentLoaded', init);

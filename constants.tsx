
import { NavItem, CareerItem, ProjectItem, AchievementItem } from './types';

export const PERSONAL_DATA = {
  name: "Aryan Sahu",
  summary: "Specializing in high-performance backend systems and low-code platform engineering. Passionate about security, scalable architecture, and long-term maintainability.",
  email: "aryansahu400@gmail.com",
  professionalEmail: "contact@aryaura.in",
  linkedin: "linkedin.com/in/aryansahu400",
  github: "github.com/aryansahu400",
  whatsapp: "918839576430"
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Expertise', href: '#skills' },
  { label: 'Trajectory', href: '#experience' },
  { label: 'Craft', href: '#projects' },
  { label: 'Impact', href: '#achievements' }
];

export const EXPERTISE = [
  "Java", "Spring Boot", "Spring Security","Spring Webflux","Spring Gateway", "Spring AI", "MCP Servers", "Quartz Scheduler",
  "SSO","OAuth 2","OIDC","SAML", "RBAC", "ABAC",
  "Hibernate", "Hikari","Postgres","Vertica", "Redis", "Kafka",  
  "Git", "Duck-DB","Azure blob", "AWS SES"
  
];

export const CAREER: CareerItem[] = [
  {
    company: "Lumenore (Netlink Pvt. Ltd.)",
    role: "Software Engineer",
    period: "08/2025 - Present",
    desc: [
      "Architected and delivered Lumenore Studio, a multi-tenant, multi-application low-code platform for building production-ready apps via drag-and-drop — serving [N] tenants and [M]+ users.",
      "Engineered a workflow automation server on an extensible, node-based execution engine with 25+ node types (SQL, JavaScript, email, SMS, telephony, cookie management, AI-driven actions, and more).",
      "Designed a flexible data management layer that lets users connect their own databases or use a managed built-in datastore.",
      "Built a complete authentication and session layer with enterprise SSO (Apple, Google, Microsoft), end-to-end activity logging, and audit-ready traceability.",
      "Implemented fine-grained RBAC across the multi-tenant architecture, enforcing strict data isolation between tenants and applications.",
      "Developed a library of reusable, configurable UI components with versioning and one-click publishing to accelerate end-user app development."
    ]
  },
  {
    company: "Lumenore (Netlink Pvt. Ltd.)",
    role: "Associate Software Engineer",
    period: "06/2023 - 07/2025",
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

export const PROJECTS: ProjectItem[] = [
  {
    title: "Lumenore Studio",
    category: "Low-Code Platform",
    description: "Multi-tenant, multi-application low-code platform for building production-ready apps via drag-and-drop, with visual workflows, flexible data management, and enterprise SSO.",
    tools: ["Spring Boot", "Multi-Tenancy", "SSO", "RBAC", "PostgreSQL"]
  },
  {
    title: "Workflow Automation Server",
    category: "Automation Engine",
    description: "Node-based execution engine powering 25+ node types — SQL, JavaScript, email, SMS, telephony, cookie management, and AI-driven actions.",
    tools: ["Java", "Spring Boot", "Spring AI", "Kafka"]
  },
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

export const ACHIEVEMENTS: AchievementItem[] = [
  { title: "Employee of the Month", detail: "Nov 2023 @ Lumenore - Excellence in delivery." },
  { title: "CodeChef Rank 57", detail: "Global rank in Dec Long Challenge 2022." },
  { title: "IEEE CCET 2nd Place", detail: "Project Presentation Excellence Award." },
  { title: "HackerRank 6-Star", detail: "Problem Solving & C++ specialist badge." },
  { title: "IYI World 3rd", detail: "Global recognition for Young Inventors 2018." },
  { title: "Sage Coding #1", detail: "First prize in Engineer's Day coding contest." }
];

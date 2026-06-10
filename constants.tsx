
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

// Each skill has a `usage` blurb shown on hover in the Core Competencies grid.
// EDIT THE `usage` TEXT BELOW to change what's revealed for each skill.
export const EXPERTISE = [
  { name: "Java", usage: "Primary language across the API Gateway, Lumenore Studio, and the workflow automation engine." },
  { name: "Spring Boot", usage: "Foundation of every microservice I've shipped — Gateway, Media, Notifications, and Lumenore Studio." },
  { name: "Spring Security", usage: "Secured the platform with SSO, JWT sessions, and fine-grained role-based access." },
  { name: "Spring Webflux", usage: "Built the reactive Notification module with non-blocking Server-Sent Events (SSE)." },
  { name: "Spring Gateway", usage: "Designed the API Gateway routing traffic and centralizing auth/audit for all services." },
  { name: "Spring AI", usage: "Powers the AI-driven nodes inside the Lumenore Studio workflow engine." },
  { name: "MCP Servers", usage: "Wired MCP servers so workflows can call AI tools and external context." },
  { name: "Quartz Scheduler", usage: "Schedules recurring jobs and time-based workflow triggers." },
  { name: "SSO", usage: "Implemented enterprise single sign-on (Apple, Google, Microsoft) for Lumenore Studio." },
  { name: "OAuth 2", usage: "Underlies the token exchange and authorization flows in the auth system." },
  { name: "OIDC", usage: "Federates identity with external providers in the SSO layer." },
  { name: "SAML", usage: "Enabled enterprise SAML logins for tenant organizations." },
  { name: "RBAC", usage: "Enforces role-based access control across the multi-tenant platform." },
  { name: "ABAC", usage: "Adds attribute-based rules for context-aware, fine-grained permissions." },
  { name: "Hibernate", usage: "ORM for the transactional data layer across services." },
  { name: "Hikari", usage: "Tuned the HikariCP pool for high-throughput database access." },
  { name: "Postgres", usage: "Primary relational store for application and tenant data." },
  { name: "Vertica", usage: "Columnar warehouse for large-scale analytical queries." },
  { name: "Redis", usage: "Backs JWT session management and caching at the Gateway." },
  { name: "Kafka", usage: "Streams real-time activity events for audit and monitoring." },
  { name: "Git", usage: "Version control and code review across all projects." },
  { name: "Duck-DB", usage: "Embedded, in-process analytics for fast data crunching." },
  { name: "Azure blob", usage: "Object storage powering enterprise media and file management." },
  { name: "AWS SES", usage: "Transactional email delivery for the Notification module." },
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
      "Built a complete authentication and session layer with enterprise SSO (Apple, Google, Microsoft), end-to-end activity logging, and audit-ready traceability."
    ]
  },
  {
    company: "Lumenore (Netlink Pvt. Ltd.)",
    role: "Associate Software Engineer",
    period: "08/2024 - 07/2025",
    desc: [
      "Developed a Gateway Server to manage traffic and facilitate microservice communication with Auth/Audit functionalities.",
      "Implemented robust session management using JWTs and Redis, utilizing Kafka for real-time activity monitoring.",
      "Developed a scalable Notification Module using Java Webflux and Server-Sent Events (SSE) for real-time triggers.",
      "Implemented fine-grained RBAC across the multi-tenant architecture, enforcing strict data isolation between tenants and applications."
    ]
  },
  {
    company: "Lumenore (Netlink Pvt. Ltd.)",
    role: "Trainee",
    period: "05/2023 - 07/2024",
    desc: [
      "Engineered a Migration API for seamless data transfer of no-code apps built by the Lumenore App Builder.",
      "Built a Media Module with SFTP integration for efficient enterprise-level file management.",
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

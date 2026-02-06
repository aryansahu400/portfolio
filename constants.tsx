
import { NavItem, CareerItem, ProjectItem, AchievementItem } from './types';

export const PERSONAL_DATA = {
  name: "Aryan Sahu",
  summary: "Specializing in high-performance backend systems and reactive architectures. Passionate about crafting high-quality software with modern Java and reactive programming.",
  email: "aryansahu400@gmail.com",
  linkedin: "linkedin.com/in/aryansahu400",
  github: "github.com/aryansahu400"
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Expertise', href: '#skills' },
  { label: 'Log', href: '#experience' },
  { label: 'Deployments', href: '#projects' },
  { label: 'Metrics', href: '#achievements' }
];

export const EXPERTISE = [
  "Java", "Reactive Programming", "Spring Boot", "Spring Webflux", 
  "Kafka", "Redis", "SSE", "JOOQ", "Postgres", "SQL", 
  "Vertica", "ETL", "JWT - RSA 256", "IronPDF", "Git", "Hibernate",
  "Duck-DB", "WebClient"
];

export const CAREER: CareerItem[] = [
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

export const PROJECTS: ProjectItem[] = [
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

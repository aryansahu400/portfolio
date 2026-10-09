
export interface NavItem {
  label: string;
  href: string;
}

export interface CareerItem {
  company: string;
  role: string;
  period: string;
  desc: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tools: string[];
}

export interface AchievementItem {
  title: string;
  detail: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

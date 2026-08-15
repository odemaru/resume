// Resume data shape. Edited here, copied into both apps by scripts/sync-content.mjs.

export interface Contacts {
  phone: string;
  email: string;
  github: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface Project {
  name: string;
  url?: string;
  role: string;
  summary: string;
  stack: string[];
  highlights: Highlight[];
  metrics?: string[];
  brands?: string[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  location: string;
  industry?: string;
  role: string;
  period: string;
  duration: string;
  current: boolean;
  projects: Project[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  faculty: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PetProject {
  name: string;
  description: string;
  url?: string;
}

export interface Resume {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  age: number;
  birthDate: string;
  location: string;
  citizenship: string;
  workPermit: string;
  relocation: string;
  experienceTotal: string;
  employmentTypes: string[];
  workFormats: string[];
  contacts: Contacts;
  about: string;
  experience: Experience[];
  skills: SkillGroup[];
  education: Education[];
  languages: Language[];
  petProjects: PetProject[];
}

// Форма данных резюме. Правится здесь, в оба приложения копируется
// скриптом scripts/sync-content.mjs.

export interface Contacts {
  phone: string;
  email: string;
  github: string;
}

export interface Project {
  name: string;
  url?: string;
  /** Роль в проекте, показывается рядом с названием. */
  role?: string;
  summary: string;
  stack: string[];
  /** Пункты списка, по одному предложению-двум на каждый. */
  highlights: string[];
}

export interface Experience {
  /** Ключ, по которому вариант находит место работы в базе. */
  id: string;
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
  /** Файл фотографии в public каждого приложения. */
  photo?: string;
  title: string;
  /** Специализации из справочника hh.ru, на сайте не показываются. */
  specializations?: string[];
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

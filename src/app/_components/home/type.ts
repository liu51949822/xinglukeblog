import type { HomeListCardType } from './cards/list';
import type { HomeWelcomeCardType } from './cards/welcome';

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
}

interface ProjectItem {
  title: string;
  description: string;
  url: string;
  tech: string[];
}

export interface HomePageConfig {
    welcome?: HomeWelcomeCardType;
    profile?: Profile;
    skills?: SkillCategory[];
    list?: HomeListCardType;
    typed?: string[];
    video?: {
        image: string;
        video: string;
    };
    experience?: Experience[];
    projects?: ProjectItem[];
}

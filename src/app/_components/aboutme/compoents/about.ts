import type { TimelineType } from './timeLine';
import type { BaseProps ,
  AboutMeType,
  Person
} from './base';



export interface AboutMeProps {
    persion: Person;
    panels: {
    [key: string]: BaseProps; // 支持扩展
  };
    timeline?: TimelineType[];
}

export default AboutMeProps;
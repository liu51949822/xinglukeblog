import type { HomeListCardType } from './cards/list';
import type { HomeWelcomeCardType } from './cards/welcome';
import type { HomeTimelineType } from './timeline';


export interface HomePageConfig {
    welcome?: HomeWelcomeCardType;
    list?: HomeListCardType;
    typed?: string[];
    video?: {
        image: string;
        video: string;
    };
    timeline?: HomeTimelineType[];
    
}

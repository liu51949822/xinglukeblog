import type { HomeListCardType } from './cards/list';
import type { HomeWelcomeCardType } from './cards/welcome';

export interface HomePageConfig {
    welcome?: HomeWelcomeCardType;
    list?: HomeListCardType;
    typed?: string[];
}

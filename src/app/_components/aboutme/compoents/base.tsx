
export interface BaseProps {
    title: string;
    data: string[];
}

export type AboutMeType = Record<string, BaseProps>;    

export interface Person {
    name: string;
    sex: string;
    email: string;
}
export type ScrapersEntity = {
    id: number;
    name: string;
    url: string;
    selectors: string[];
    type: string;
}

export type SchedulersEntity = {
    id: number;
    name: string;
    expression: string;
    status: 'created' | 'creating' | 'failed';
    scraperId: number;
}

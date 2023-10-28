export type Music = {
    id: number;
    songId: string;
    name: string;
    artist: string;
    src: string;
    img: string;
}

export type QueueItem = {
    name: string,
    author: string
}

export interface CounterState {
    value: number
}
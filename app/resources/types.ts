export type Music = {
    id: number;
    songId: string;
    name: string;
    artist: string;
    src: string;
    img: string;
    isPlaying?: boolean;
}

export interface CounterState {
    value: number
}
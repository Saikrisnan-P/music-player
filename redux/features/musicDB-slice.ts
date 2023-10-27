'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Music = {
    id: number;
    songId: string;
    name: string;
    artist: string;
    src: string;
    img: string;
}

type InitialState = {
    value: Music[]
}

const initialState: InitialState = {
    value: []
}

export const musicDB = createSlice ({
    name: 'musicDB',
    initialState,
    reducers: {
        setDb: (_state, action: PayloadAction<Music[]>) => {
            return { value: action.payload }
        }
    }
});

export const { setDb } = musicDB.actions;
export default musicDB.reducer;
'use client';

import { Music } from '@/app/resources/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
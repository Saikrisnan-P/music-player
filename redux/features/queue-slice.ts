'use client';

import { Music } from '@/app/resources/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: Music[]
}

const initialState: InitialState = {
    value: []
}

export const queue = createSlice ({
    name: 'queue',
    initialState,
    reducers: {
        clearQueue: () => {
            return initialState
        },
        addNewItem: (state, action: PayloadAction<Music>) => {
            return { value: [ ...state.value, action.payload ] }
        },
        removeAnItem: (state, action: PayloadAction<Music>) => {
            const copyList = [ ...state.value ];
            const indexToRemove = state.value.findIndex((item) => {
                return item.name === action.payload.name;
            });
            console.log(indexToRemove);
            if(indexToRemove > -1) {
                copyList.splice(indexToRemove, 1);
            }
            return { value: [ ...copyList ] }
        },
        removeFirstFromQueue: (state) => {
            const copyList = [ ...state.value ];
            copyList.shift();
            return { value: [ ...copyList ] };
        }
    }
});

export const { clearQueue, addNewItem, removeAnItem, removeFirstFromQueue } = queue.actions;
export default queue.reducer;
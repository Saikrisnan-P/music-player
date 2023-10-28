'use client';

import { QueueItem } from '@/app/resources/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    value: QueueItem[]
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
        addNewItem: (state, action: PayloadAction<QueueItem>) => {
            return { value: [ ...state.value, action.payload ] }
        },
        removeAnItem: (state, action: PayloadAction<QueueItem>) => {
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
    }
});

export const { clearQueue, addNewItem, removeAnItem } = queue.actions;
export default queue.reducer;
'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter-slice';
import queueReducer from './features/queue-slice';
import musicDBReducer from './features/musicDB-slice';


export const store = configureStore({
    reducer: {
        queue: queueReducer,
        counter: counterReducer,
        musicDB: musicDBReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
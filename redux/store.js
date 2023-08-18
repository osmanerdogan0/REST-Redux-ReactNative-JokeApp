import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {jokesApi} from './jokesApi';

export const store = configureStore({
  reducer: {[jokesApi.reducerPath]: jokesApi.reducer},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(jokesApi.middleware),
});

setupListeners(store.dispatch);

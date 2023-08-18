import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://official-joke-api.appspot.com/jokes/';

export const jokesApi = createApi({
  reducerPath: 'jokesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getJokeByType: builder.query({
      query: type => type + '/random',
    }),
  }),
});

export const {useGetJokeByTypeQuery} = jokesApi;

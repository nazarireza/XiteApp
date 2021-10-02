import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {GetVideosViewModel} from '../types/models';

export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/',
  }),
  endpoints: builder => ({
    getVideos: builder.query<GetVideosViewModel, any>({
      query: () => 'dataset.json',
    }),
  }),
});

export const {useGetVideosQuery} = videoApi;

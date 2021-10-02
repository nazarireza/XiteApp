import {configureStore} from '@reduxjs/toolkit';
import {videoApi} from '../services/video';

export default configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(videoApi.middleware),
});

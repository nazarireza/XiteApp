import {configureStore} from '@reduxjs/toolkit';
import {videoApi} from '../services';

export default configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(videoApi.middleware),
});

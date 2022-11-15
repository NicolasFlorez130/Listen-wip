import { configureStore } from '@reduxjs/toolkit';
import songSlice from '../features/currentSong/song-slice';
import userSlice from '../features/user/user-slice';

const store = configureStore({
   reducer: {
      user: userSlice,
      song: songSlice,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

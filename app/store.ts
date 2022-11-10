import { configureStore } from '@reduxjs/toolkit';
import songSlice from '../Features/CurrentSong/song-slice';
import userSlice from '../Features/User/user-slice';

const store = configureStore({
   reducer: {
      user: userSlice,
      song: songSlice,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

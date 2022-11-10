import { createSlice } from '@reduxjs/toolkit';

interface SongState {
   name: string;
   uri: string;
   duration: string;
}

const initialState: SongState = {
   name: '',
   uri: '',
   duration: '',
};

const songSlice = createSlice({
   name: 'song',
   initialState,
   reducers: {
      setSong: (state, action: { payload: SongState }) => action.payload,
      resetSong: () => initialState,
   },
});

export const { setSong, resetSong } = songSlice.actions;

export default songSlice.reducer;

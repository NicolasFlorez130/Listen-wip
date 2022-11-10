import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
   id: string;
   name: string;
   email: string;
   image: string;
   uri: string;
}

const initialState: UserState = {
   id: '',
   name: '',
   email: '',
   image: '',
   uri: '',
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: { payload: UserState }) => action.payload,
      resetUser: () => initialState,
   },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

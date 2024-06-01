import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIN: false,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIN = action.payload.login;
    },
  },
});

export const {setLoggedIn} = authSlice.actions;
export default authSlice.reducer;


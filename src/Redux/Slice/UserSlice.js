import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  profile_url: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      (state.token = action.payload),
        (state.email = action.payload),
        (state.profile_url = action.payload);
    },
    logout: state => {
      (state.token = null), (state.email = null), (state.profile_url = null);
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;

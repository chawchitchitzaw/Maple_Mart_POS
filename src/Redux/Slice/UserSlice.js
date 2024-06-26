import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  profile_url: null,
  id: null,
  name: null,
  position: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      (state.token = action.payload.token),
        (state.email = action.payload.email),
        (state.profile_url = action.payload.profile_url);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.position = action.payload.position;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;

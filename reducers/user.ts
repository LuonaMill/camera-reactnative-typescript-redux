import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    email: string | null;
    pictures: string[];
  };
};

const initialState: UserState = {
  value: {
    email: null,
    pictures: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail: (state: UserState, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    addPicture: (state: UserState, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.value.pictures.push(action.payload);
    },
  },
});

export const { updateEmail, addPicture } = userSlice.actions;
export default userSlice.reducer;

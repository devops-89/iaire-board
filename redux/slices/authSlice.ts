import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    avatar: string;
  } | null;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: UserState["user"];
        token: string;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser: (state, action: PayloadAction<NonNullable<UserState["user"]>>) => {
      state.user = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<NonNullable<UserState["user"]>>>,
    ) => {
      const filteredPayload = Object.fromEntries(
        Object.entries(action.payload).filter(
          ([_, value]) => value !== null && value !== undefined,
        ),
      );

      if (state.user) {
        state.user = { ...state.user, ...filteredPayload };
      } else if (state.isAuthenticated) {
        state.user = filteredPayload as NonNullable<UserState["user"]>;
      }
    },
  },
});

export const { login, logout, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;

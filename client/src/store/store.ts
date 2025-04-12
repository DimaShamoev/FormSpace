import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./user/userSlice";
import asideReducer from "./aside/asideSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        aside: asideReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
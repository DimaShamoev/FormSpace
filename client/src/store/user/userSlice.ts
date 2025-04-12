import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Types/user/user.types";
import { RootState } from "../store";

interface IUserState {
    user: IUser | null,
    isAuth: boolean
}

const initialState: IUserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload,
            state.isAuth = true 
        },
        logOut(state) {
            state.user = null,
            state.isAuth = false
        }
    }
})

export const { login, logOut } = userSlice.actions
export const selectCount = (state: RootState) => state.user
export default userSlice.reducer
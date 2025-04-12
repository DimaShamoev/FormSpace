import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAsideState {
    isOpen: boolean
}

const initialState: IAsideState = {
    isOpen: false
}

export const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        toggleAside: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleAside } = asideSlice.actions
export const selectAside = (state: RootState) => state.aside
export default asideSlice.reducer
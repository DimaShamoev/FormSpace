import { toggleAside } from "../store/aside/asideSlice"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { RootState } from "../store/store"

export const useAside = () => {
    const isOpen = useAppSelector((state: RootState) => state.aside.isOpen)
    const dispatch = useAppDispatch()

    const setAside = () => {
        dispatch(toggleAside())
    }
    return { isOpen, setAside }
}
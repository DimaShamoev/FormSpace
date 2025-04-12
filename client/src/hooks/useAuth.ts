import { useAppSelector } from "../store/hook"

export const useAuth = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth
}
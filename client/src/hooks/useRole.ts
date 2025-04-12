import { useAppSelector } from "../store/hook"
import { RootState } from "../store/store"

export const useRole = () => {
    const user = useAppSelector((state: RootState) => state.user.user)

    const role = user?.role
    const isAdmin = role === 'admin'
    const isUser = role === 'user'

    return { role, isAdmin, isUser }
}
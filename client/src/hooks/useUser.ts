import { useEffect, useState } from "react"
import { IUser } from "../Types/user/user.types"
import { request } from "../api/axios.api"

export const useUser = () => {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request.get<IUser>('auth/profile')
                setUser(response.data)
            } catch (error) {
                console.error("Failed to fetch user", error)
            }
        }

        fetchUser()
    }, [])

    return { user }
}

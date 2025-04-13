import { useEffect, useState } from "react"
import { currentUser } from "../helpers/users/currentUser"

export const useAuthor = () => {
    const [userId, setUserId] = useState<number | null>(null)

    const getUser = async () => {
        const user = await currentUser()
        if (user) setUserId(user.id)
    }

    useEffect(() => {
        getUser()
    }, [])
    
    const isAuthor = (templateId: number) => {
        return userId !== null && userId === templateId
    }

    return { isAuthor }
}
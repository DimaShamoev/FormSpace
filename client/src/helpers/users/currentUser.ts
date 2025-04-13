import { ICurrentUser } from "../../Types/user/user.types"
import { request } from "../../api/axios.api"

export const currentUser = async () => {
    try {
        const response = await request.get<ICurrentUser>('auth/profile')
        return response.data
    } catch (err) {
        console.log(err)
    }
}
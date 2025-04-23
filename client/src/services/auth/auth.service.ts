import { IFormData } from "../../Types/forms/form.types";
import { IResponseUserData, IUser, IUserDataRegistration, IUserInfo } from "../../Types/user/user.types";
import { request } from "../../api/axios.api";

export const AuthService = {
    async registration(userData: IUserDataRegistration): Promise<IResponseUserData | undefined> {
        try {
            const { data } = await request.post<IResponseUserData>('users', userData)
            return data
        } catch (error: any) {
            throw error
        }
    },

    login: async (data: IFormData) => {
        const res = await request.post('auth/login', data)
        return res.data
    },

    async getProfile(): Promise<IUser | undefined> {
        const { data } = await request.get<IUser>('auth/profile')
        if (data) return data
    }
}
import { useEffect, useState } from "react"
import { request } from "../api/axios.api"
import { useRole } from "../hooks/useRole"

interface IUser {
    id: number,
    email: string,
    role: string
} 

const Profile = () => {

    const [user, setUser] = useState<IUser | null>(null)
    const { role } = useRole()

    const getData = async (): Promise<void> => {
        const response = await request.get("auth/profile");
        setUser(response.data);  
    };

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            {user ? (
                <pre>
                    <span>
                        <p>{user.id}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                    </span>
                    {role}
                </pre>
            ) : (
                <p>not found</p>
            )}
        </div>
    )
}

export default Profile
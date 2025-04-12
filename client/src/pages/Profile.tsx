import { useEffect, useState } from "react"
import { request } from "../api/axios.api"
import { useRole } from "../hooks/useRole"

const Profile = () => {

    const [user, setUser] = useState(null)
    const { role } = useRole()

    const getData = async () => {
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
                    {JSON.stringify(user, null, 2,)}
                    { role }
                </pre>
            ) : (
                <p>not found</p>
            )}
        </div>
    )
}

export default Profile
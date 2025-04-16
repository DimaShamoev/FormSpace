import { useEffect, useState } from "react"
import { request } from "../api/axios.api"
import { ITemplate } from "../Types/templates/templates.types"
import { IDataUser } from "../Types/user/user.types"
import { useLoaderData } from "react-router-dom"
import { ILikes } from "../Types/likes/likes.types"
import { useUser } from "../hooks/useUser"

export const userLoader = async () => {
    const { data } = await request.get<IDataUser>(`auth/profile`)
    return data
}

const Profile = () => {

    const userData = useLoaderData() as IDataUser
    const [templates, setTemplates] = useState<ITemplate[]>([])
    const [likes, setLikes] = useState<ILikes[]>([])
    const { user } = useUser()

    const getTemplates = async () => {
        const response = await request.get('templates/all-templates')
        setTemplates(response.data)
    }

    useEffect(() => {
        getTemplates()
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="profile flex items-center gap-4 bg-white box-padding">
                <div className="avatar"></div>
                <div className="profile-info flex flex-col gap-2">
                    <p><b>Email: </b>{userData.email}</p>
                    <p><b>First Name: </b>{userData.first_name}</p>
                    <p><b>Last Name: </b>{userData.last_name}</p>
                </div>
            </div>
            <div className="templates box-padding bg-white">
                templates
                <ul className="template-list">
                    {templates.length ?
                        templates
                        .filter((template) => template.user.id === user?.id)
                        .map((template) => (
                            <li key={template.id}>
                                {template.title}
                            </li>
                        )) :
                        "No Templates"
                    }
                </ul>
            </div>
            <div className="likes box-padding bg-white">
                likes
            </div>
        </div>
    )
}

export default Profile
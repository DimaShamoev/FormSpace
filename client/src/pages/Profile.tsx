import { useEffect, useState } from "react"
import { request } from "../api/axios.api"
import { ITemplate, ITemplateResponses } from "../Types/templates/templates.types"
import { IDataUser } from "../Types/user/user.types"
import { useLoaderData } from "react-router-dom"
import { ILikes } from "../Types/likes/likes.types"
import UserTemplatesTable from "../components/UserTemplatesTable"
import UserLikesTable from "../components/UserLikesTable"
import UserResponsesTable from "../components/UserResponsesTable"
import UserTagsTable from "../components/UserTagsTable"
import { ITags } from "../Types/tags/tags.types"
import { IComments } from "../Types/comments/comments.types"
import UserCommentsTable from "../components/UserCommentsTable"

export const userLoader = async () => {
    const { data } = await request.get<IDataUser>(`auth/profile`)
    return data
}

const Profile: React.FunctionComponent = () => {

    const userData = useLoaderData() as IDataUser
    const [templates, setTemplates] = useState<ITemplate[]>([])
    const [responses, setResponses] = useState<ITemplateResponses[]>([])
    const [comments, setComments] = useState<IComments[]>([])
    const [likes, setLikes] = useState<ILikes[]>([])
    const [tags, setTags] = useState<ITags[]>([])

    const getTemplates = async () => {
        const templates = await request.get('templates')
        const responses = await request.get('template-responses')
        const likes = await request.get('template-likes')
        const tags = await request.get('tags')
        const comments = await request.get('comments')

        setTemplates(templates.data)
        setResponses(responses.data)
        setComments(comments.data)
        setLikes(likes.data)
        setTags(tags.data)
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
                <UserTemplatesTable templates={templates} />
            </div>

            <div className="responses box-padding bg-white">
                <UserResponsesTable responses={responses} />
            </div>
            
            <div className="comments box-padding bg-white">
                <UserCommentsTable comments={comments} />
            </div>
            
            <div className="likes box-padding bg-white">
                <UserLikesTable likes={likes} />
            </div>
            
            <div className="tags box-padding bg-white">
                <UserTagsTable tags={tags} />
            </div>
        </div>
    )
}

export default Profile
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"
import { useAuth } from "../hooks/useAuth"
import { useAuthor } from "../hooks/useAuthor"
import { useRole } from "../hooks/useRole"
import { useUser } from "../hooks/useUser"
import { HiDotsHorizontal } from "react-icons/hi"
import { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { LuNotebookPen } from "react-icons/lu"
import { toast } from "react-toastify"

export const templatePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { data } = await request.get<ITemplate>(`templates/${params.id}`)
    return data
}

const TemplatePage: React.FunctionComponent = () => {
    const [template, setTemplate] = useState(useLoaderData() as ITemplate)
    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()
    const { user } = useUser()
    const { id } = useParams()

    const toggleLikes = async (isLike: boolean) => {
        if (!id) return

        if (isLike) {
            await request.delete(`template-likes/${id}`)
        } else {
            await request.post(`template-likes/${id}`)
        }

        const { data } = await request.get<ITemplate>(`templates/${id}`)
        setTemplate(data)
    }

    return (
        <div className="bg-white box-padding">
            <div className="template-upper-row flex items-start">
                <div className="template-info">
                    <p className="text-3xl font-medium">
                        {template?.title}
                    </p>
                    <p className="text-xl font-medium">
                        {template?.description}
                    </p>
                </div>
                {(isAuth && isAuthor(template?.user?.id) || isAuth && isAdmin) && (
                    <span className="w-full flex justify-end text-xl cursor-pointer">
                        <HiDotsHorizontal />
                    </span>
                )}
            </div>

            <div className="template-bottom-row">
                <div className="details flex items-center gap-2">
                    {isAuth ? (
                        <span
                            className="flex items-center text-sm gap-0.5 cursor-pointer"
                            onClick={() =>
                                toggleLikes(template?.templateLikes?.some(like => like?.user?.id === user?.id) ?? true)
                            }
                        >
                            {template?.templateLikes?.some(like => like?.user?.id === user?.id) ? (
                                <span className="flex items-center gap-1">
                                    <FaHeart className="text-md text-red-500" />
                                    {template?.templateLikes?.length || 0}
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <FaRegHeart className="text-md" />
                                    {template?.templateLikes?.length || 0}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span
                            className="flex items-center text-sm gap-0.5 cursor-pointer"
                            onClick={() => toast.warn("Sign Up To Like")}
                        >
                            <FaRegHeart className="text-md" /> {template?.templateLikes?.length || 0}
                        </span>
                    )}

                    <span className="flex items-center text-sm gap-0.5">
                        <LuNotebookPen className="text-md" /> {template?.template_responses?.length || 0}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TemplatePage
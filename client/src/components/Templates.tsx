import { ITemplate } from "../Types/templates/templates.types"
import { Link } from "react-router-dom"
import { useAuthor } from "../hooks/useAuthor"
import { useAuth } from "../hooks/useAuth"
import { useRole } from "../hooks/useRole"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaRegHeart } from "react-icons/fa6"
import { LuNotebookPen } from "react-icons/lu"
import { request } from "../api/axios.api"
import { ILikes } from "../Types/likes/likes.types"
import { useEffect, useState } from "react"

interface TemplatesProps {
    templates: ITemplate[],
    toggleLikes: (templateId: number, isLike: boolean) => void
}

const Templates: React.FunctionComponent<TemplatesProps> = ({ templates, toggleLikes }) => {

    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()

    return (
        <div className="templates-container flex flex-col gap-5">
            { templates.length ? (
                templates.map(((template) => {

                    console.log(template.templateLikes.map((like) => like.user.id))
                    console.log(template.templateLikes.map((like) => like.template.id))
                    

                    return (
                        <div
                            key={template.id}
                            className="bg-white box-padding flex flex-col gap-3"
                        >
                            <div className="template-upper-row flex items-start">
                                <div className="template-info">
                                    <p className="text-3xl font-medium">
                                        {template.title}
                                    </p>
                                    <p className="text-xl font-medium">
                                        {template.description}
                                    </p>
                                </div>
                                {(isAuth && isAuthor(template.user.id) || isAuth && isAdmin) && (
                                    <span className="w-full flex justify-end text-xl cursor-pointer">
                                        <HiDotsHorizontal />
                                    </span>
                                )}
                            </div>

                            <div className="template-bottom-row">
                                <div className="details flex items-center gap-2">
                                    <span className="flex items-center text-sm gap-0.5 cursor-pointer">
                                        <FaRegHeart className="text-md" /> {template.templateLikes.length}
                                    </span>

                                    <span className="flex items-center text-sm gap-0.5">
                                        <LuNotebookPen className="text-md" /> {template.template_responses.length}
                                    </span>
                                </div>
                                
                                <div className="full text-xs underline text-blue-500">
                                    <Link to={`template/${template.id}`}>
                                        View Full
                                    </Link>
                                </div>
                                <span>{ template.id }</span>

                            </div>
                        </div>
                    )
                }))
            ) : (
                <p className="text-lg text-red-500">Something Went Wrong ☹️😥</p>
            ) }
        </div>
    )
}

export default Templates
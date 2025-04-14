import { ITemplate } from "../Types/templates/templates.types"
import { Link } from "react-router-dom"
import { useAuthor } from "../hooks/useAuthor"
import { useAuth } from "../hooks/useAuth"
import { useRole } from "../hooks/useRole"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { LuNotebookPen } from "react-icons/lu"
import { useUser } from "../hooks/useUser"

interface TemplatesProps {
    templates: ITemplate[],
    toggleLikes: (templateId: number, isLike: boolean) => void
    likeAlert: () => void
}

const Templates: React.FunctionComponent<TemplatesProps> = ({ templates, toggleLikes, likeAlert }) => {

    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()
    const { user } = useUser()
    

    return (
        <div className="templates-container flex flex-col gap-5">
            { templates.length ? (
                templates.map(((template) => {
                    
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
                                    {
                                        isAuth ? (
                                            <span
                                                className="flex items-center text-sm gap-0.5 cursor-pointer"
                                                onClick={() => toggleLikes(template.id, template.templateLikes.some((like) => like.user.id === user?.id))}
                                            >
                                                {template.templateLikes.some((like) => like.user.id === user?.id) ? (
                                                    <span className="flex items-center gap-1">
                                                        <FaHeart className="text-md text-red-500" /> {template.templateLikes.length}
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <FaRegHeart className="text-md" /> {template.templateLikes.length}
                                                    </span>
                                                )}
                                            </span>
                                        ) : (


                                            <span
                                                className="flex items-center text-sm gap-0.5 cursor-pointer"
                                                onClick={likeAlert}
                                            >
                                                <FaRegHeart className="text-md" /> {template.templateLikes.length}
                                            </span>

                                        )
                                    }

                                    <span className="flex items-center text-sm gap-0.5">
                                        <LuNotebookPen className="text-md" /> {template.template_responses.length}
                                    </span>
                                </div>
                                
                                <div className="full text-xs underline text-blue-500">
                                    <Link to={`template/${template.id}`}>
                                        View Full
                                    </Link>
                                </div>
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
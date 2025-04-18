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
    clickedParam: number | null
    toggleParam: (templateId: number) => void
    removeTemplate: (templateId: number) => void
    toggleLikes: (templateId: number, isLike: boolean) => void
    likeAlert: () => void
}

const Templates: React.FunctionComponent<TemplatesProps> = ({ templates, clickedParam, toggleParam, removeTemplate, toggleLikes, likeAlert }) => {
    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()
    const { user } = useUser()

    return (
        <div className="templates-container flex flex-col gap-5">
            {templates.length > 0 ? (
                templates.map((template) => (
                    template.status !== 'private' && (
                        <div
                            key={template.id}
                            className="bg-white box-padding flex flex-col gap-3"
                        >
                            <div className="template-upper-row flex items-start">
                                <div className="template-info w-full">
                                    <p className="text-3xl font-medium">
                                        {template.title}
                                    </p>
                                    <p className="text-xl font-medium">
                                        {template.description}
                                    </p>
                                    <p className="flex gap-0.5 text-xs text-gray-400">
                                        {template.tags.map((tag) => (
                                            <span key={tag.id}>{tag.title}</span>
                                        ))}
                                    </p>
                                </div>
                                {(isAuth && isAuthor(template.user.id) || isAuth && isAdmin) && (
                                    <div className="params-btn flex justify-end text-xl cursor-pointer relative w-max" onClick={() => toggleParam(template.id)}>
                                        <span><HiDotsHorizontal /></span>
                                        <div className={`params-list ${clickedParam === template.id ? "active" : ""}`}>
                                            <ul className={`absolute text-sm top-[15px] right-0 w-[100px] bg-slate-500 text-white sm-padding_1 transition-all ${clickedParam === template.id ? 'flex flex-col top-[20px]' : 'hidden'}`}>
                                                <li
                                                    className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1"
                                                >
                                                    <Link to={`edit-template/${template.id}`}>Edit</Link>
                                                </li>

                                                <li
                                                    className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1"
                                                    onClick={() => removeTemplate(template.id)}
                                                >Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="template-bottom-row">
                                <div className="details flex items-center gap-2">
                                    {isAuth ? (
                                        <span
                                            className="flex items-center text-sm gap-0.5 cursor-pointer"
                                            onClick={() =>
                                                toggleLikes(template.id, template.templateLikes.some((like) => like.user.id === user?.id))
                                            }
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
                                    )}

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
                ))
            ) : (
                <p className="text-lg text-red-500">Something Went Wrong ☹️😥</p>
            )}
        </div>
    )
}

export default Templates

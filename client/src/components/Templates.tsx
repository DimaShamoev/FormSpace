import { useEffect, useState } from "react"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"
import { Link } from "react-router-dom"
import { useAuthor } from "../hooks/useAuthor"
import { useAuth } from "../hooks/useAuth"
import { useRole } from "../hooks/useRole"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaRegHeart } from "react-icons/fa6"
import { LuNotebookPen } from "react-icons/lu"

const Templates: React.FunctionComponent = () => {

    const [templates, setTemplates] = useState<ITemplate[]>([])
    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()

    const getData = async () => {

        const template = await request.get<ITemplate[]>('templates/all-templates')
        setTemplates(template.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="templates-container flex flex-col gap-5">
            { templates.length ? (
                templates.map(((template) => (
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
                            {
                                isAuth && isAuthor(template.user.id) || isAuth && isAdmin ? (
                                    <span className="w-full flex justify-end text-xl cursor-pointer">
                                        <HiDotsHorizontal />
                                    </span>
                                ) : ('')
                            }
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

                        </div>

                        {/* <div className="id text-xs">
                            <span className="text-xs opacity-10">
                                id - {template.id} // user - {template.user.first_name}
                            </span>
                        </div> */}
                    </div>
                )))
            ) : (
                <p>no data</p>
            ) }
        </div>
    )
}

export default Templates

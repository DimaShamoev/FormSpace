import { useEffect, useState } from "react"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"
import { Link } from "react-router-dom"
import { useAuthor } from "../hooks/useAuthor"
import { useAuth } from "../hooks/useAuth"
import { useRole } from "../hooks/useRole"

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
                        className="bg-white"
                    >
                        <div className="template-settings">
                            {
                                isAuth && isAuthor(template.user.id) || isAuth && isAdmin ? 'yeyeye' : 'nono'
                            }
                        </div>
                        <div className="id text-xs">
                            id - {template.id} // user - {template.user.first_name}
                        </div>

                        <div className="template-title">
                            {template.title}
                        </div>

                        <div className="template-desc">
                            {template.description}
                        </div>

                        <div className="likes">
                            likes - {template.templateLikes.length}
                        </div>

                        <div className="responses">
                            responses - {template.template_responses.length}
                        </div>

                        <div className="full">
                            <Link to={`template/${template.id}`}>go to</Link>
                        </div>
                    </div>
                )))
            ) : (
                <p>no data</p>
            ) }
        </div>
    )
}

export default Templates

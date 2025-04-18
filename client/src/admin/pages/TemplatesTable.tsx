import { Link, useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { ITemplate } from "../../Types/templates/templates.types"

export const templatesLoaderAdmin = async () => {
    const { data } = await request.get('templates/all-templates')
    return data
}

const TemplatesTable: React.FunctionComponent = () => {

    const templates = useLoaderData() as ITemplate[]

    return (
        <div className="flex flex-col gap-4 bg-white box-padding">
            <div className="admins-toolbar flex justify-between">
                <div className="toolbar-btns flex gap-3">
                    <button className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer">Delete</button>
                    <button className="bg-blue-500 text-white xs-box-padding rounded-md cursor-pointer">Set Private</button>
                </div>
                <div className="toolbar-search">
                    <input
                        type="text"
                        placeholder="Find Admin"
                        className="border-2 xs-box-padding border-black rounded-md"
                    />
                </div>
            </div>

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Likes</th>
                            <th>responses</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => (
                            <tr key={template.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td className="text-center">
                                    {template.title}
                                </td>
                                <td>
                                    {template.description}
                                </td>
                                <td className="text-center">
                                    {template.status === 'public' ? <span className="text-green-500">{template.status}</span> : <span className="text-red-500">{template.status}</span>}
                                </td>
                                <td className="text-center">
                                    {template.templateLikes.length}
                                </td>
                                <td className="text-center">
                                    {template.template_responses.length}
                                </td>
                                <td className="text-center text-blue-400 underline">
                                    <Link to={`../../template/${template.id}`}>GO TO</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TemplatesTable
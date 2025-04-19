import { Link, useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { ITemplate } from "../../Types/templates/templates.types"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import useDebounce from "../../hooks/useDebounce"

export const templatesLoaderAdmin = async () => {
    const { data } = await request.get('templates/all-templates')
    return data
}

const TemplatesTable: React.FunctionComponent = () => {

    const templates = useLoaderData() as ITemplate[]
    const [selectedTemplates, setSelectedTemplates] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    const allTemplatesSelected = selectedTemplates?.length === templates.length
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const handleCheckboxChange = (templateId: number) => {
        setSelectedTemplates((prev) => prev?.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId])
    }

    const handleSelect = () => {
        if (allTemplatesSelected) {
            setSelectedTemplates([])
        } else {
            const allTemplatesId = templates.map(template => template.id)
            setSelectedTemplates(allTemplatesId)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedTemplates.map(id => request.delete(`templates/${id}`))
            window.location.reload()
        } catch (err) {
            alert(err)
        }
    }

    const handleSelectedStatus = async () => {
        try {
            selectedTemplates.map( id => {
                const template = templates.find(template => template.id === id)
                if (!template) return null

                const newStatus = template.status === 'public' ? 'private' : 'public'

                request.patch(`templates/${id}`, { status: newStatus })
                toast.success("Status Switched Successfully")
                window.location.reload()

            })
        } catch (err: any) {
            toast.error(err)
        }
    }

    const filteredTemplates = useMemo(() => {
        return templates.filter(template =>
            template.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            template.user.email.toLocaleLowerCase().includes(debouncedSearchQuery.toLocaleLowerCase())
        )
    }, [debouncedSearchQuery, templates])

    return (
        <div className="flex flex-col gap-4 bg-white box-padding">
            <div className="admins-toolbar flex justify-between">
                <div className="toolbar-btns flex gap-3">
                    <button
                        className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleDeleteSelected}
                    >
                        Delete
                    </button>

                    <button
                        className="bg-blue-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleSelectedStatus}
                    >
                        Switch Status
                    </button>
                </div>
                <div className="toolbar-search">
                    <input
                        type="text"
                        placeholder="Find Template"
                        className="border-2 xs-box-padding border-black rounded-md"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={allTemplatesSelected}
                                    onChange={handleSelect}
                                />
                            </th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Likes</th>
                            <th>responses</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTemplates.map((template) => (
                            <tr key={template.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTemplates.includes(template.id)}
                                        onChange={() => handleCheckboxChange(template.id)}
                                    />
                                </td>
                                <td className="text-center">
                                    {template.title}
                                </td>
                                <td>
                                    {template.description}
                                </td>
                                <td>
                                    {template.user.email}
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
import { useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { IComments } from "../../Types/comments/comments.types"
import { useMemo, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export const CommentsLoaderAdmin = async () => {
    const { data } = await request.get('comments/all-comments')
    return data
}

const CommentsTable: React.FunctionComponent = () => {

    const comments = useLoaderData() as IComments[]
    const [selectedTemplates, setSelectedTemplates] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    console.log(comments)
    const allTemplatesSelected = selectedTemplates?.length === comments.length
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const handleCheckboxChange = (templateId: number) => {
        setSelectedTemplates((prev) => prev?.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId])
    }

    const handleSelect = () => {
        if (allTemplatesSelected) {
            setSelectedTemplates([])
        } else {
            const allTemplatesId = comments.map(comment => comment.id)
            setSelectedTemplates(allTemplatesId)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedTemplates.map(id => request.delete(`comments/${id}`))
            window.location.reload()
        } catch (err: any) {
            toast.error(err)
        }
    }

    const filteredComments = useMemo(() => {
        return comments.filter(comment =>
            comment.comment?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            comment.user?.email?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            comment.template?.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
    }, [debouncedSearchQuery, comments])

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
                            <th>Comment</th>
                            <th>Created By</th>
                            <th>Posted On</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComments.map((comment) => (
                            <tr key={comment.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTemplates.includes(comment.id)}
                                        onChange={() => handleCheckboxChange(comment.id)}
                                    />
                                </td>
                                <td className="text-center">
                                    {comment?.comment}
                                </td>
                                <td>
                                    {comment?.user?.email}
                                </td>
                                <td className="text-center">
                                    {new Date(comment.createdAt).toLocaleString('en-GB')}
                                </td>
                                <td>
                                    {comment?.template?.title ? (<Link to={`../../template/${comment.template.id}`} className="text-center text-blue-400 underline" >GO TO</Link>): "No Link"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CommentsTable
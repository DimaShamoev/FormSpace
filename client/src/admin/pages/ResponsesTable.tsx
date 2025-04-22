import { Link, useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { ITemplateResponses } from "../../Types/templates/templates.types"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import useDebounce from "../../hooks/useDebounce"

export const responsesLoaderAdmin = async () => {
  const { data } = await request.get<ITemplateResponses[]>("template-responses/all-responses")
  return data
}

const ResponsesTable: React.FunctionComponent = () => {
    const responses = useLoaderData() as ITemplateResponses[]
    const [selectedResponses, setSelectedResponses] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    const allResponsesSelected = selectedResponses?.length === responses.length
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const handleCheckboxChange = (responseId: number) => {
        setSelectedResponses((prev) =>
        prev.includes(responseId) ? prev.filter((id) => id !== responseId) : [...prev, responseId]
        )
    }

    const handleSelectAll = () => {
        if (allResponsesSelected) {
            setSelectedResponses([])
        } else {
            const allResponseIds = responses.map((res) => res.id)
            setSelectedResponses(allResponseIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedResponses.map((id) => request.delete(`template-responses/${id}`))
            window.location.reload()
        } catch (err) {
            toast.error("Failed to delete selected responses.")
        }
    }

    const filteredResponses = useMemo(() => {
        return responses.filter((response) =>
            response.user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
    }, [debouncedSearchQuery, responses])

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
                        placeholder="Find by email"
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
                            checked={allResponsesSelected}
                            onChange={handleSelectAll}
                            />
                        </th>
                        <th>User</th>
                        <th>Template ID</th>
                        <th>Answers</th>
                        <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResponses.map((response) => (
                        <tr key={response.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedResponses.includes(response.id)}
                                    onChange={() => handleCheckboxChange(response.id)}
                                />
                            </td>

                            <td>{response.user.email}</td>

                            <td className="text-center">{response.template.id}</td>

                            <td>{new Date(response.createdAt).toLocaleString('en-GB')}</td>

                            <td className="text-blue-500 underline text-center">
                                <Link to={`../../template/${response.template.id}`}>GO TO</Link>
                            </td>

                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResponsesTable
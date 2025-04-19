import { useState } from "react"
import { ITags } from "../Types/tags/tags.types"
import { request } from "../api/axios.api"
import { toast } from "react-toastify"
import { IoIosArrowUp } from "react-icons/io"
import { Link } from "react-router-dom"

interface IUserTagsTableProps {
    tags: ITags[]
}

const UserTagsTable: React.FunctionComponent<IUserTagsTableProps> = ({ tags }) => {
    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)
    const [selectedTemplateIds, setSelectedTemplateIds] = useState<number[]>([])

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    const handleCheckboxChange = (templateId: number) => {
        setSelectedTemplateIds((prevSelected) =>
            prevSelected.includes(templateId)
                ? prevSelected.filter((id) => id !== templateId)
                : [...prevSelected, templateId]
        )
    }

    const areAllSelected = selectedTemplateIds.length === tags.length

    const handleSelectAllChange = () => {
        if (areAllSelected) {
            setSelectedTemplateIds([])
        } else {
            const allTemplateIds = tags.map(template => template.id)
            setSelectedTemplateIds(allTemplateIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedTemplateIds.map(id =>
                    request.delete(`tags/${id}`)
                )
            )
            toast.success("Selected tags removed successfully.")
            window.location.reload()
        } catch (err: any) {
            toast.error("Error deleting tags.")
        }
    }

    return (
        <div className="user-template-table">
            {tags.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>tags</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
                    </div>
                    <div className="tool-bar">
                        <div className="delete-btn">
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selectedTemplateIds.length === 0}
                                className={`bg-red-500 text-white xs-box-padding rounded-sm ${selectedTemplateIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={areAllSelected}
                                        onChange={handleSelectAllChange}
                                    />
                                </th>
                                <th>Title</th>
                                <th>Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedTemplateIds.includes(tag.id)}
                                            onChange={() => handleCheckboxChange(tag.id)}
                                        />
                                    </td>
                                    <td>{tag.title || "There No Title"}</td>
                                    <td>{tag.template?.title ? (<Link to={`../template/${tag.template?.id}`}>dd</Link>) : (<span className="text-red-500">Not Used</span>)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`flex flex-col gap-1 ${templatesVisible ? 'h-auto' : 'h-[22px] overflow-hidden'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>tags</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
                    </div>
                    <div className="bottom-row text-sm">
                        <span>There No Tags Yet, <Link to='../create-template' className='text-gray-500 underline'>Let's Create The Tag</Link></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserTagsTable
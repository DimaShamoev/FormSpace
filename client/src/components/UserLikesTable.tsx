import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowUp } from 'react-icons/io'
import { ILikes } from '../Types/likes/likes.types'
import { request } from '../api/axios.api'
import { toast } from 'react-toastify'

interface IUserLikesTable {
    likes: ILikes[]
}

const UserLikesTable: React.FunctionComponent<IUserLikesTable> = ({ likes }) => {
    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)
    const [selectedTemplateIds, setSelectedTemplateIds] = useState<number[]>([])

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    const handleCheckboxChange = (templateId: number) => {
        setSelectedTemplateIds((prevSelected) => prevSelected.includes(templateId) ? prevSelected.filter((id) => id !== templateId) : [...prevSelected, templateId]
)
    }

    const areAllSelected = selectedTemplateIds.length === likes.length

    const handleSelectAllChange = () => {
        if (areAllSelected) {
            setSelectedTemplateIds([])
        } else {
            const allTemplateIds = likes.map(like => like.template.id)
            setSelectedTemplateIds(allTemplateIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedTemplateIds.map(id =>
                    request.delete(`template-likes/${id}`)
                )
            )
            toast.success("Selected likes removed successfully.")
            window.location.reload()
        } catch (err: any) {
            toast.error("Error deleting likes.")
        }
    }

    return (
        <div className="user-template-table">
            {likes.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Likes</p>
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

                    <table className="text-sm">
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
                                <th>Description</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {likes.map((like) => (
                                <tr key={like.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedTemplateIds.includes(like.template.id)}
                                            onChange={() => handleCheckboxChange(like.template.id)}
                                        />
                                    </td>
                                    <td>{like.template.title || "There No Title"}</td>
                                    <td>{like.template.description || "There No Description"}</td>
                                    <td>
                                        <Link
                                            to={`../template/${like.template.id}`}
                                            className="text-blue-400 underline"
                                        >
                                            GO TO
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`flex flex-col gap-1 ${templatesVisible ? 'h-auto' : 'h-[22px] overflow-hidden'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Likes</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
                    </div>
                    <div className="bottom-row text-sm">
                        <span>There No Likes Yet, <Link to='/' className='text-gray-500 underline'>Let's Rate Forms</Link></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserLikesTable
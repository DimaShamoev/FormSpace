import { IoIosArrowUp } from "react-icons/io"
import { IComments } from "../Types/comments/comments.types"
import { Link } from "react-router-dom"
import { request } from "../api/axios.api"
import { toast } from "react-toastify"
import { useState } from "react"

interface IUserCommentsTableProps {
    comments: IComments[]
}

const UserCommentsTable: React.FunctionComponent<IUserCommentsTableProps> = ({ comments }) => {
    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)
    const [selectedCommentIds, setSelectedCommentIds] = useState<number[]>([])

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    const handleCheckboxChange = (commentId: number) => {
        setSelectedCommentIds((prevSelected) =>
            prevSelected.includes(commentId)
                ? prevSelected.filter((id) => id !== commentId)
                : [...prevSelected, commentId]
        )
    }

    const areAllSelected = selectedCommentIds.length === comments.length

    const handleSelectAllChange = () => {
        if (areAllSelected) {
            setSelectedCommentIds([])
        } else {
            const allCommentIds = comments.map(comment => comment.id)
            setSelectedCommentIds(allCommentIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedCommentIds.map(id => request.delete(`comments/${id}`))
            toast.success("Selected comments removed successfully.")
            window.location.reload()
        } catch (err: any) {
            toast.error("Error deleting comments.")
        }
    }

    return (
        <div className="user-template-table">
            {comments.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>comments</p>
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
                                disabled={selectedCommentIds.length === 0}
                                className={`bg-red-500 text-white xs-box-padding rounded-sm ${selectedCommentIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                <th>comment</th>
                                <th>Form</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comments) => (
                                <tr key={comments.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedCommentIds.includes(comments.id)}
                                            onChange={() => handleCheckboxChange(comments.id)}
                                        />
                                    </td>
                                    <td>{comments.comment || "There No Comment"}</td>
                                    <td>{comments.template ? (<Link to={`../template/${comments.template.id}`}>GO TO</Link>) : ("Can't Find")}</td>
                                    <td>
                                        <Link to={`../template/${comments.template.id}`} className="text-blue-400 underline">
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
                        <p>comments</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
                    </div>
                    <div className="bottom-row text-sm">
                        <span>There No comments Yet, <Link to='/' className='text-gray-500 underline'>Let's Fill Forms</Link></span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserCommentsTable
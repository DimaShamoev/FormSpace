import React, { useState } from 'react'
import { ITemplate } from '../Types/templates/templates.types'
import { toast } from 'react-toastify'
import { request } from '../api/axios.api'
import { IComments } from '../Types/comments/comments.types'
import { HiDotsHorizontal } from 'react-icons/hi'

interface ITemplateCommentsProps {
    template: ITemplate,
    setTemplate: (data: ITemplate) => void
    isAuth: boolean
    isAuthor: (id: number) => boolean
    isAdmin: boolean
    id: string | undefined
    openCommentParams: number | null
    toggleEditCommentModal: () => void
    toggleCommentsParamsBtn: (commentId: number) => void
}

const TemplateComments: React.FunctionComponent<ITemplateCommentsProps> = ({ template, setTemplate, isAuth, isAuthor, id, isAdmin, openCommentParams, toggleEditCommentModal, toggleCommentsParamsBtn }) => {
    const [comment, setComment] = useState<string>('')

    const handleComment = async () => {
        if (!comment.trim()) {
            toast.warn("Comment Can't Be Empty")
            return
        }

        try {
            await request.post<IComments>(`comments/${template.id}`, {comment: comment})
            toast.success("Comment Posted Successfully")
            const { data } = await request.get<ITemplate>(`templates/${id}`)
            setTemplate(data)
            setComment('')
        } catch (error: any) {
            toast.error(error.response?.data?.message) 
        }
    }


    const handleCommentRemove = async (commentId: number) => {
        try {
            await request.delete(`comments/${commentId}`)
            toast.success("Comment Deleted Successfully")
            window.location.reload()
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div className='comments-wrapper flex flex-col gap-4'>
            <div className="comment-input">
                { isAuth && (
                    <div className="upload-comment box-padding bg-white flex flex-col gap-3 h-auto">
                        <div className="title">
                            Leave Your Comment
                        </div>
                        <div className="input-block grid grid-cols-[90%10%] gap-2">
                            <input
                                placeholder="Enter Your Comment"
                                className="border-2 rounded-sm xs-box-padding text-sm"
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-sm bg-blue-700 xs-box-padding text-white rounded-sm cursor-pointer"
                                onClick={handleComment}
                            >
                                Leave Comment
                            </button>
                        </div>
                    </div>
                ) }
            </div>

            <div className="comments flex flex-col gap-4 bg-white box-padding">
                <div className="comment-title text-xl">Comments</div>
                {template.comments.map((comment) =>(
                    <div key={comment.id} className="comments-list bg-gray-200 xs-box-padding">
                        <div className="comment-author text-xs text-gray-500 flex items-center justify-between">
                            <div>
                                <span className="text-md">{comment.user.email}</span> <span>●</span> <span className="text-[10px]">{new Date(comment.createdAt).toLocaleString('en')}</span>
                            </div>
                            { isAuth && (isAuthor(comment.user.id) || isAdmin) ? (
                                <div className="text-lg cursor-pointer relative" key={comment.id}>
                                    <span onClick={() => toggleCommentsParamsBtn(comment.id)}><HiDotsHorizontal /></span>
                                    <div>
                                        <ul className={`absolute text-sm top-[15px] right-0 w-[100px] bg-slate-500 text-white sm-padding_1 transition-all ${openCommentParams === comment.id ? 'flex flex-col top-[20px]' : 'hidden'}`}>
                                            <li className="hover:bg-slate-300 hover:text-gray-600 sm-padding_1 z-[1]">
                                                <button onClick={() => handleCommentRemove(comment.id)}>Delete</button>
                                            </li>
                                            <li className="hover:bg-slate-300 hover:text-gray-600 sm-padding_1 z-[1]">
                                                <button onClick={toggleEditCommentModal}>Edit</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="comment-text">
                            {comment.comment}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default TemplateComments

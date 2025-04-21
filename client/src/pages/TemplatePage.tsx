import { Link, LoaderFunctionArgs, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"
import { useAuth } from "../hooks/useAuth"
import { useAuthor } from "../hooks/useAuthor"
import { useRole } from "../hooks/useRole"
import { useUser } from "../hooks/useUser"
import { HiDotsHorizontal } from "react-icons/hi"
import { useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { LuNotebookPen } from "react-icons/lu"
import { toast } from "react-toastify"
import { IoIosArrowUp } from "react-icons/io"
import React from "react"
import { IComments } from "../Types/comments/comments.types"
import { BiComment } from "react-icons/bi"
import EditCommentModal from "../components/modals/EditCommentModal"

export const templatePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { data } = await request.get<ITemplate>(`templates/${params.id}`)
    return data
}

export const TemplatePage: React.FunctionComponent = () => {
    const [template, setTemplate] = useState(useLoaderData() as ITemplate)
    const [responseOpen, setResponseOpen] = useState<boolean>(false)
    const [openParams, setOpenParams] = useState<boolean>(false)
    const [openCommentParams, setCommentParams] = useState<number | null>(null)
    const [comment, setComment] = useState<string>('')
    const [isCommentEdit, setIsCommentEdit] = useState<boolean>(false)
    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()
    const { user } = useUser()
    const { id } = useParams()
    const navigate = useNavigate()

    console.log(openCommentParams)

    const toggleLikes = async (isLike: boolean) => {
        if (!id) return

        if (isLike) {
            await request.delete(`template-likes/${id}`)
        } else {
            await request.post(`template-likes/${id}`)
        }

        const { data } = await request.get<ITemplate>(`templates/${id}`)
        setTemplate(data)
    }

    const toggleResponseBtn = () => {
        setResponseOpen(prev => !prev)
    }

    const toggleParamsBtn = () => {
        setOpenParams(prev => !prev)
    }

    const toggleCommentsParamsBtn = (commentId: number) => {
        setCommentParams(prev => (prev === commentId ? null : commentId))
    }

    const toggleEditCommentModal = () => {
        setIsCommentEdit(prev => !prev)
        // setCommentParams(null)  
    }

    const handleRemove = async () => {
        try {
            await request.delete(`templates/${id}`)
            toast.success("Template Deleted Successfully")
            navigate('/')
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
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

    const handleEditComment = async (editedText: string) => {
        if (!openCommentParams) return

        try {
            await request.patch<IComments>(`comments/edit/${openCommentParams}`, { comment: editedText })
            toast.success('Comment Edited Successfully')
            const { data } = await request.get<ITemplate>(`templates/${id}`);
            setTemplate(data);
            setIsCommentEdit(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <div>
            {template.status === 'private' && !isAuthor(template.user.id) && !isAdmin ? (
                "This Form Is Private"
            ) : (
                <div className="flex flex-col gap-4">
                    <EditCommentModal
                        isEdit={isCommentEdit}
                        toggleIsEdit={toggleEditCommentModal}
                        handleEditComment={handleEditComment}
                        setCommentParams={setCommentParams}
                    />

                    <div className="bg-white box-padding template-main-info flex flex-col gap-3">
                        <div className="template-upper-row flex items-start">
                            <div className="template-info w-full">
                                <p className="text-3xl font-medium">{template?.title}</p>
                                <p className="text-xl font-medium">{template?.description}</p>
                                <p className="tags flex gap-1">
                                    {template.tags.map((tag) => (
                                        <span key={tag.title} className="text-[12px] text-gray-500">#{tag.title}</span>
                                    ))}
                                </p>
                            </div>
                            {(isAuth && isAuthor(template?.user?.id)) || (isAuth && isAdmin) ? (
                                <div className="params-btn flex justify-end text-xl cursor-pointer relative w-max">
                                    <HiDotsHorizontal className="w-max" onClick={toggleParamsBtn} />
                                    <ul className={`absolute text-sm top-[15px] w-[100px] bg-slate-500 text-white sm-padding_1 transition-all ${openParams ? 'flex flex-col top-[20px]' : 'hidden'}`}>
                                        <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                            <button onClick={handleRemove}>Delete</button>
                                        </li>
                                        <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                            <Link to={`../edit-template/${template.id}`}>Edit</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : null}
                        </div>

                        <div className="template-bottom-row">
                            <div className="details flex items-center gap-2">
                                {isAuth ? (
                                    <p
                                        className="flex items-center text-sm gap-0.5 cursor-pointer"
                                        onClick={() =>
                                            toggleLikes(template?.templateLikes?.some(like => like?.user?.id === user?.id) ?? true)
                                        }
                                    >
                                        {template?.templateLikes?.some(like => like?.user?.id === user?.id) ? (
                                            <span className="flex items-center gap-1">
                                                <FaHeart className="text-md text-red-500" />
                                                {template?.templateLikes?.length || 0}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <FaRegHeart className="text-md" />
                                                {template?.templateLikes?.length || 0}
                                            </span>
                                        )}
                                    </p>
                                ) : (
                                    <span
                                        className="flex items-center text-sm gap-0.5 cursor-pointer"
                                        onClick={() => toast.warn("Sign Up To Like")}
                                    >
                                        <FaRegHeart className="text-md" /> {template?.templateLikes?.length}
                                    </span>
                                )}

                                <span className="flex items-center text-sm gap-0.5 font-bold">
                                    <BiComment /> {template?.comments.length}
                                </span>
                                
                                <span className="flex items-center text-sm gap-0.5">
                                    <LuNotebookPen className="text-md" /> {template?.template_responses?.length}
                                </span>
                            </div>
                        </div>

                        {isAuth && !isAuthor(template?.user.id) && !isAdmin ? (
                            <div className="fill-btn bg-blue-500 w-max sm-box-padding rounded-md text-white">
                                <Link to={`/fill-template/${template?.id}`}>Fill The Form</Link>
                            </div>
                        ) : null}
                        {
                            !isAuth && !isAuthor(template.id) && <Link to='../authorization' className="fill-btn bg-blue-500 w-max sm-box-padding rounded-md text-white cursor-pointer">Fill Form</Link>
                        }
                    </div>

                    {isAuth && isAuthor(template.user.id) || isAuth && isAdmin ? (
                        <div className={`flex flex-col gap-4 bg-white box-padding h-[48px] overflow-hidden transition-all ${responseOpen ? 'h-full' : ''}`}>
                            <p className="flex items-center justify-between">
                                <span className="responses-title text-xl">Responses On Form</span>
                                <span className="cursor-pointer" onClick={toggleResponseBtn}>
                                    <IoIosArrowUp className={`rotate-0 transition-all ${responseOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </p>
                            {template.template_responses && template.template_responses.length > 0 ? (
                                <div>
                                    {template.template_responses.map((response, responseIndex) => (
                                        <div key={responseIndex} className="response flex flex-col gap-[10px] sm-margin-bottom_1">
                                            <div className="submitted-info text-xs">
                                                <p>Filled By: {response.user.email}</p>
                                                <p>Submitted: {new Date(response.createdAt).toLocaleString('en-GB')}</p>
                                            </div>
                                            {template.questions.map((question, index) => (
                                                <div key={index}>
                                                    <p className="bg-slate-400/60 sm-padding_1">{question}</p>
                                                    <p className="bg-slate-200/50 sm-padding_1">{response.answers[index]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">There No Responses On Form</p>
                            )}
                        </div>
                    ) : null}

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

                    <div className="comments flex flex-col gap-4 bg-white box-padding">
                        <div className="comment-title text-xl">Comments</div>
                        {template.comments.map((comment) =>(
                            <div key={comment.id} className="comments-list bg-gray-200 xs-box-padding">
                                <div className="comment-author text-xs text-gray-500 flex items-center justify-between">
                                    <div>
                                        <span className="text-md">{comment.user.email}</span> <span>●</span> <span className="text-[10px]">{new Date(comment.createdAt).toLocaleString('en')}</span>
                                    </div>
                                    { isAuth && isAuthor(comment.user.id) || isAuth && isAdmin ? (
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
            )}
        </div>
    )
}

export default TemplatePage
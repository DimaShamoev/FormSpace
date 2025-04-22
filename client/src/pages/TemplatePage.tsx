import { LoaderFunctionArgs, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"
import { useAuth } from "../hooks/useAuth"
import { useAuthor } from "../hooks/useAuthor"
import { useRole } from "../hooks/useRole"
import { useUser } from "../hooks/useUser"
import { useState } from "react"
import { toast } from "react-toastify"
import React from "react"
import { IComments } from "../Types/comments/comments.types"
import EditCommentModal from "../components/modals/EditCommentModal"
import TemplateInfo from "../components/TemplateInfo"
import TemplateResponsesList from "../components/TemplateResponsesList"
import TemplateComments from "../components/TemplateComments"
import UserTemplateResponse from "../components/UserTemplateResponse"

export const templatePageLoader = async ({ params }: LoaderFunctionArgs) => {
    const { data } = await request.get<ITemplate>(`templates/${params.id}`)
    return data
}

export const TemplatePage: React.FunctionComponent = () => {
    const [template, setTemplate] = useState(useLoaderData() as ITemplate)
    const [openCommentParams, setCommentParams] = useState<number | null>(null)
    const [isCommentEdit, setIsCommentEdit] = useState<boolean>(false)
    const isAuth = useAuth()
    const { isAuthor } = useAuthor()
    const { isAdmin } = useRole()
    const { user } = useUser()
    const { id } = useParams()
    const navigate = useNavigate()


    const toggleEditCommentModal = () => {
        setIsCommentEdit(prev => !prev)
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

    
    const toggleCommentsParamsBtn = (commentId: number) => {
        setCommentParams((prev: number | null) => (prev === commentId ? null : commentId))
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

                    <TemplateInfo
                        template={template}
                        handleRemove={handleRemove}
                        setTemplate={setTemplate}
                        user={user}
                        isAdmin={isAdmin}
                        isAuthor={isAuthor}
                        id={id}
                    />

                    <TemplateResponsesList
                        template={template}
                        setTemplate={setTemplate}
                        isAdmin={isAdmin}
                        isAuth={isAuth}
                        isAuthor={isAuthor}
                        id={id}
                    />

                    <TemplateComments
                        template={template}
                        setTemplate={setTemplate}
                        openCommentParams={openCommentParams}
                        toggleCommentsParamsBtn={toggleCommentsParamsBtn}
                        toggleEditCommentModal={toggleEditCommentModal}
                        isAuth={isAuth}
                        isAdmin={isAdmin}
                        isAuthor={isAuthor}
                        id={id}
                    />

                    <UserTemplateResponse
                        template={template}
                        user={user}
                    />

                    <EditCommentModal
                        isEdit={isCommentEdit}
                        toggleIsEdit={toggleEditCommentModal}
                        handleEditComment={handleEditComment}
                        setCommentParams={setCommentParams}
                    />

                    

                    {/* {template.template_responses.map((response) => response.user.id === user?.id ? (response.answers.map((answer) => <p>{answer}</p>)) : 'you`re not owner')} */}

                </div>
            )}
        </div>
    )
}

export default TemplatePage
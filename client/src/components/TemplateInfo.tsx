import { BiComment } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { ITemplate } from "../Types/templates/templates.types";
import { useState } from "react";
import { request } from "../api/axios.api";
import { IUser } from "../Types/user/user.types";

interface ITemplateInfoProps {
    template: ITemplate
    setTemplate: (data: ITemplate) => void
    isAuthor: (id: number) => boolean
    isAdmin: boolean
    handleRemove: () => void
    id: string | undefined
    user: IUser | null
}

const TemplateInfo: React.FunctionComponent<ITemplateInfoProps> = ({ template, setTemplate, isAuthor, isAdmin, handleRemove, id, user }) => {

    const [openParams, setOpenParams] = useState<boolean>(false)

    const toggleParamsBtn = () => {
        setOpenParams(prev => !prev)
    }

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

    const isAuth = useAuth()

    return (
        <div>
            <div className="bg-white box-padding template-main-info flex flex-col gap-3">
                <div className="template-upper-row flex items-start">
                    <div className="template-info w-full">
                        <p className="text-sm text-gray-500">
                            Created By: {template.user.email}
                        </p>
                        <p className="text-3xl font-medium">
                            {template?.title}
                        </p>
                        <p className="text-xl font-medium">
                            {template?.description}
                        </p>
                        <p className="tags flex gap-1">
                            {template.tags.map((tag) => (
                                <span
                                    key={tag.title}
                                    className="text-[12px] text-gray-500"
                                >
                                    #{tag.title}
                                </span>
                            ))}
                        </p>
                    </div>
                    {(isAuth && isAuthor(template?.user?.id)) ||
                    (isAuth && isAdmin) ? (
                        <div className="params-btn flex justify-end text-xl cursor-pointer relative w-max">
                            <HiDotsHorizontal
                                className="w-max"
                                onClick={toggleParamsBtn}
                            />
                            <ul
                                className={`absolute text-sm top-[15px] w-[100px] bg-slate-500 text-white sm-padding_1 transition-all ${
                                    openParams
                                        ? "flex flex-col top-[20px]"
                                        : "hidden"
                                }`}
                            >
                                <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                    <button onClick={handleRemove}>
                                        Delete
                                    </button>
                                </li>
                                <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                    <Link
                                        to={`../edit-template/${template.id}`}
                                    >
                                        Edit
                                    </Link>
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
                                    toggleLikes(
                                        template?.templateLikes?.some(
                                            (like) =>
                                                like?.user?.id === user?.id
                                        ) ?? true
                                    )
                                }
                            >
                                {template?.templateLikes?.some(
                                    (like) => like?.user?.id === user?.id
                                ) ? (
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
                                <FaRegHeart className="text-md" />{" "}
                                {template?.templateLikes?.length}
                            </span>
                        )}

                        <span className="flex items-center text-sm gap-0.5 font-bold">
                            <BiComment /> {template?.comments.length}
                        </span>

                        <span className="flex items-center text-sm gap-0.5">
                            <LuNotebookPen className="text-md" />{" "}
                            {template?.template_responses?.length}
                        </span>
                    </div>
                </div>

                {isAuth && !isAuthor(template?.user.id) && !isAdmin ? (
                    <div className="fill-btn bg-blue-500 w-max sm-box-padding rounded-md text-white">
                        <Link to={`/fill-template/${template?.id}`}>
                            Fill The Form
                        </Link>
                    </div>
                ) : null}
                {!isAuth && !isAuthor(template.id) && (
                    <Link
                        to="../authorization"
                        className="fill-btn bg-blue-500 w-max sm-box-padding rounded-md text-white cursor-pointer"
                    >
                        Fill Form
                    </Link>
                )}
            </div>
        </div>
    );
};

export default TemplateInfo;

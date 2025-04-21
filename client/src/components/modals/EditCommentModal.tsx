import { FormEvent, useState } from "react"
import { IoClose } from "react-icons/io5"

interface IEditCommentModalProps {
    isEdit: boolean,
    toggleIsEdit: () => void,
    handleEditComment: (editedComment: string) => void
    setCommentParams: (params: number | null) => void
}

const EditCommentModal: React.FunctionComponent<IEditCommentModalProps> = ({ isEdit, toggleIsEdit, handleEditComment, setCommentParams }) => {

    const [editedComment, setEditedComment] = useState<string>("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleEditComment(editedComment)
        setCommentParams(null)
    }

    return (
        <div className={`fixed inset-0 z-[3] ${isEdit ? 'flex h-screen overflow-hidden' : 'hidden'} `}>
            <div className="layout inset-0 bg-black/50 h-full w-full relative" onClick={toggleIsEdit}></div>
            <div className="form-wrapper">
                <form
                    className="absolute top-[50%] left-[50%] translate-[-50%] bg-white box-padding flex flex-col gap-2 rounded-md w-[300px] max-w-[100%]"
                >
                    <div className="close flex justify-end xs-box-padding cursor-pointer">
                        <IoClose onClick={toggleIsEdit} />
                    </div>
                    <div className="title text-2xl">
                        Create Tag
                    </div>

                    <div className="input-block">
                        <input
                            type="text"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            placeholder="Enter Edited Text"
                            onChange={(e) => setEditedComment(e.target.value)}
                        />
                    </div>

                    <div className="submit-btn">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 xs-box-padding text-white rounded-xs text-sm cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCommentModal
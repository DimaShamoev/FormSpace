import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify"; // Assuming you are using toast for notifications
import { request } from "../../api/axios.api";

interface ICreateTagModal {
    isModalOpen: boolean;
    handleModalOpen: () => void;
}

const CreateTagModal: React.FunctionComponent<ICreateTagModal> = ({ isModalOpen, handleModalOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ tag: string }>();

    const onSubmit = async (data: { tag: string }) => {
        try {
            await request.post<string>('tags', { title: data.tag });
            toast.success("Tag created successfully!");
            handleModalOpen();
            reset()
            window.location.reload()
        } catch (error) {
            toast.error("Failed to create tag. Please try again.");
        }
    };

    return (
        <div className={`fixed inset-0 ${isModalOpen ? 'flex' : 'hidden'}`}>
            <div className="layout inset-0 bg-black/50 h-full w-full relative" onClick={handleModalOpen}></div>
            <div className="form-wrapper">
                <form className="absolute top-[50%] left-[50%] translate-[-50%] bg-white box-padding flex flex-col gap-2 rounded-md w-[300px] max-w-[100%]">
                    <div className="close flex justify-end xs-box-padding cursor-pointer">
                        <IoClose onClick={handleModalOpen} />
                    </div>
                    <div className="title text-2xl">
                        Create Tag
                    </div>

                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Enter Tag"
                            className={`border-2 w-full rounded xs-box-padding text-sm ${errors.tag ? "border-red-500" : ""}`}
                            {...register("tag", {
                                required: "Tag is required",
                                minLength: { value: 3, message: "Tag must be at least 3 characters long" },
                            })}
                        />
                        {errors.tag && (
                            <span className="text-red-500 text-xs">{errors.tag.message}</span>
                        )}
                    </div>

                    <div className="submit-btn">
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className="bg-blue-500 xs-box-padding text-white rounded-xs text-sm cursor-pointer"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTagModal;
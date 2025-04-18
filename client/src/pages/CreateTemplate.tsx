import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { ICreateTemplate, ITemplateFormData } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateTemplate: React.FC = () => {
    const { control, handleSubmit, register } = useForm<ITemplateFormData>();
    const { fields, append } = useFieldArray({
        control,
        name: "questions",
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate()

    const handleAddInputs = (type: ICreateTemplate["type"]) => {
        append({
            question: "",
            answer: "",
            answers: type === "checkbox" ? ["", "", "", ""] : [],
            type,
        });
    };

    const onSubmit: SubmitHandler<ITemplateFormData> = async (data) => {
        const requestData = {
            title,
            description,
            questions: data.questions.map((question: ICreateTemplate) => question.question),
            answers: data.questions.map((question: ICreateTemplate) => {
                if (question.type === "checkbox") {
                    return question.answers?.toLocaleString();
                }
                return question.answer?.toString();
            }),
            status,
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((id) => Number(id)),
        };
    
        try {
            await request.post("/templates", requestData);
            toast.success("Template Created Successfully")
            navigate('/profile')

        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }    
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="box-padding bg-white space-y-6 flex flex-col gap-2 w-[600px] max-w-full"
            >
                <h1 className="text-2xl font-bold">Create Your Form</h1>

                <div className="template-details">
                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <input
                            placeholder="Enter Description"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <input
                            type="text"
                            placeholder="Enter Tags (Optional)"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <select
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option className="text-gray-500" value="">
                                Select Your Form Status
                            </option>
                            <option className="text-gray-500" value="public">
                                PUBLIC
                            </option>
                            <option className="text-gray-500" value="private">
                                PRIVATE
                            </option>
                        </select>
                    </div>
                </div>

                <div className="form-body flex flex-col gap-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="question-block flex flex-col gap-2"
                        >
                            <label className="block font-medium mb-1">
                                Question #{index + 1}
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your question"
                                className="border-2 w-full rounded xs-box-padding text-sm"
                                {...register(`questions.${index}.question`)}
                            />
                            {field.type === "checkbox" && field.answers ? (
                                <div className="checkbox-options grid grid-cols-1 gap-2">
                                    {field.answers.map(
                                        (_, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    disabled
                                                />
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${
                                                        i + 1
                                                    }`}
                                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                                    {...register(
                                                        `questions.${index}.answers.${i}`
                                                    )}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : field.type === "number" ? (
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Enter your answer (non-negative)"
                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                    {...register(`questions.${index}.answer`)}
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    placeholder="Enter your answer"
                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                    {...register(`questions.${index}.answer`)}
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Enter your answer"
                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                    {...register(`questions.${index}.answer`)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => handleAddInputs("text")}
                        className="bg-blue-500 text-white rounded xs-box-padding text-xs cursor-pointer"
                    >
                        + Add Text Question
                    </button>

                    <button
                        type="button"
                        onClick={() => handleAddInputs("textarea")}
                        className="bg-blue-500 text-white rounded xs-box-padding text-xs cursor-pointer"
                    >
                        + Add Multi-line Question
                    </button>

                    <button
                        type="button"
                        onClick={() => handleAddInputs("number")}
                        className="bg-blue-500 text-white rounded xs-box-padding text-xs cursor-pointer"
                    >
                        + Add Number Question
                    </button>

                    <button
                        type="button"
                        onClick={() => handleAddInputs("checkbox")}
                        className="bg-blue-500 text-white rounded xs-box-padding text-xs cursor-pointer"
                    >
                        + Add Checkbox Question
                    </button>
                </div>

                <div className="submit-btn">
                    <button
                        type="submit"
                        className="bg-green-600 text-white xs-box-padding w-full text-sm rounded-xs cursor-pointer"
                    >
                        Create Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTemplate;

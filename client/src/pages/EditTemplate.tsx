import { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { ICreateTemplate, ITemplateFormData, ITemplateResponses } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTemplate: React.FC = () => {
    const { control, handleSubmit, register, setValue, reset } = useForm<ITemplateFormData>();
    const { fields, append } = useFieldArray({
        control,
        name: "questions",
    });

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [answers, setAnswers] = useState<ITemplateResponses[]>([])

    const navigate = useNavigate();
    const { templateId } = useParams();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await request.get(`/templates/${templateId}`);
                const template = response.data;

                setTitle(template.title);
                setDescription(template.description);
                setTags(template.tags.join(", "));
                setStatus(template.status);
                setAnswers(template.answers)

                setValue("title", template.title);
                setValue("description", template.description);
                setValue("tags", template.tags.join(", "));
                setValue("status", template.status);

                const questionsData = template.questions.map((question: ICreateTemplate) => ({
                    question: question.question,
                    answer: question.answer,
                    answers: question.answers || [],
                    type: question.type,
                }));

                reset({
                    title: template.title,
                    description: template.description,
                    tags: template.tags.join(", "),
                    status: template.status,
                    questions: questionsData,
                });
            } catch {
                toast.error("Failed to load template.");
            }
        };

        fetchTemplate();
    }, [templateId, reset]);

    const handleAddInputs = (type: ICreateTemplate["type"]) => {
        append({
            question: "",
            answer: "",
            answers: type === "checkbox" ? ["", "", "", ""] : [],
            type,
        });
    };

    const onSubmit: SubmitHandler<ITemplateFormData> = async (data) => {
        const filteredQuestions = data.questions.filter(q => q.question.trim() !== "");
        const filteredAnswers = filteredQuestions.map((question) => {
            if (question.type === "checkbox") {
                return question.answers?.filter(a => a.trim() !== "").join(", ");
            }
            return question.answer?.toString().trim();
        });

        const requestData = {
            ...(title.trim() && { title: title.trim() }),
            ...(description.trim() && { description: description.trim() }),
            ...(filteredQuestions.length && {
                questions: filteredQuestions.map(q => q.question.trim()),
            }),
            ...(filteredAnswers.length && { answers: filteredAnswers }),
            ...(status.trim() && { status: status.trim() }),
            ...(tags.trim() && {
                tags: tags
                    .split(",")
                    .map(t => t.trim())
                    .filter(Boolean)
                    .map(id => Number(id)),
            }),
        };

        try {
            await request.patch(`/templates/${templateId}`, requestData);
            toast.success("Template updated successfully!");
            navigate("/profile");
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    return (
        <div className="flex flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="box-padding bg-white space-y-6 flex flex-col gap-2 w-[600px] max-w-full"
            >
                <h1 className="text-2xl font-bold">Edit Your Form</h1>

                <input
                    type="text"
                    placeholder="Enter Title"
                    className="border-2 w-full rounded xs-box-padding text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    placeholder="Enter Description"
                    className="border-2 w-full rounded xs-box-padding text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Tags (Optional)"
                    className="border-2 w-full rounded xs-box-padding text-sm"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                <select
                    className="border-2 w-full rounded xs-box-padding text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Your Form Status</option>
                    <option value="public">PUBLIC</option>
                    <option value="private">PRIVATE</option>
                </select>

                <div className="form-body flex flex-col gap-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="question-block flex flex-col gap-2">
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
                                    {field.answers.map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <input type="checkbox" disabled />
                                            <input
                                                type="text"
                                                placeholder={`Option ${i + 1}`}
                                                className="border-2 w-full rounded xs-box-padding text-sm"
                                                {...register(`questions.${index}.answers.${i}`)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : field.type === "number" ? (
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Enter your answer"
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

                <button
                    type="submit"
                    className="bg-green-600 text-white xs-box-padding w-full text-sm rounded-xs cursor-pointer"
                >
                    Update Form
                </button>
            </form>
        </div>
    );
};

export default EditTemplate;
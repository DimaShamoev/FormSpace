import React from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { ITemplate } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const fillTemplateLoader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await request.get<ITemplate>(`templates/${params.id}`);
  return data;
};

const FillTemplate: React.FunctionComponent = () => {
    const template = useLoaderData() as ITemplate;
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: Record<string, any>) => {
        const answers: string[] = [];

        template.questions.forEach((q, idx) => {
        const name = `question-${idx}`;

        if (q.type === "checkbox") {
            const value = data[name];
            if (Array.isArray(value)) {
                answers.push(value.join(", "));
            } else if (value) {
                answers.push(String(value));
            } else {
                answers.push("");
            }
        } else {
            answers.push(data[name] ? String(data[name]) : "");
        }
        });

        try {
            await request.post(
                `template-responses/${template.id}`,
                {
                    templateId: template.id,
                    answers,
                }
            );

            toast.success("Submitted successfully!");
            navigate("../profile");
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col gap-3 w-full max-w-[500px] box-padding bg-white rounded">
                <div className="template-info">
                    <h1 className="text-3xl font-bold">{template.title}</h1>
                    <p className="text-gray-600">{template.description}</p>
                </div>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {template.questions.map((question, idx) => {
                        const name = `question-${idx}`;

                        return (
                        <div key={idx} className="grid gap-1">
                            <div className="font-medium">{question.question}</div>

                            {(question.type === "text" || question.type === "number") && (
                                <input
                                    type={question.type}
                                    {...register(name)}
                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                />
                            )}

                            {question.type === "textarea" && (
                                <textarea
                                    {...register(name)}
                                    className="border-2 w-full rounded xs-box-padding text-sm"
                                />
                            )}

                            {question.type === "checkbox" && question.options && (
                                <div className="grid gap-1">
                                    {question.options.map((opt, optIdx) => (
                                    <label
                                        key={optIdx}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                        type="checkbox"
                                        value={opt}
                                        {...register(name)}
                                        className="accent-blue-600"
                                        />
                                        <span>{opt}</span>
                                    </label>
                                    ))}
                                </div>
                            )}
                        </div>
                        );
                    })}

                    <div className="grid place-items-center border-gray-200">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded xs-box-padding w-full cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FillTemplate;
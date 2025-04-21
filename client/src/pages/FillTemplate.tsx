import React from "react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ITemplate } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";

export const fillTemplateLoader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await request.get<ITemplate>(`templates/${params.id}`);
  return data;
};

const FillTemplate: React.FC = () => {
    const template = useLoaderData() as ITemplate;

    

    return (
        <div className="flex flex-1 justify-center items-center mt-lg">
            <div className="flex flex-col gap-3 w-full max-w-[500px] box-padding bg-white rounded">

                <div className="template-info">
                    <h1 className="text-3xl font-bold">{template.title}</h1>
                    <p className="text-gray-600">{template.description}</p>
                </div>

                <form className="grid gap-4">
                    {template.questions.map((q, idx) => (
                        <div key={idx} className="grid gap-1">
                        <label className="font-medium text-gray-800">{q.question}</label>

                        {q.type === "text" || q.type === "number" ? (
                            <input
                                type={q.type}
                                name={`question-${idx}`}
                                className="border-2 w-full rounded xs-box-padding text-sm"
                            />
                        ) : q.type === "textarea" ? (
                            <textarea
                                name={`question-${idx}`}
                                className="border-2 w-full rounded xs-box-padding text-sm"
                            />
                        ) : q.type === "checkbox" && q.options ? (
                            <div className="grid gap-1">
                                {q.options.map((opt, optIdx) => (
                                    <label key={optIdx} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name={`question-${idx}`}
                                        value={opt}
                                        className="accent-blue-600"
                                    />
                                    <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        ) : null}
                        </div>
                    ))}

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
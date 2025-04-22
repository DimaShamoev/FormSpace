import React, { useEffect } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { ITemplate, ITemplateResponses } from "../Types/templates/templates.types";
import { useForm } from "react-hook-form";
import { request } from "../api/axios.api";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import ErrorPage from "../components/errors/ErrorPage";
import NotFound from "../components/errors/NotFound";

export const editTemplateResponseLoader = async ({ params }: LoaderFunctionArgs) => {
    const templateId = params.templateId;
    const responseId = params.responseId;

    const templateRequest = request.get<ITemplate>(`templates/${templateId}`);
    const responseRequest = request.get<ITemplateResponses>(`template-responses/${responseId}`);

    const [templateData, responseData] = await Promise.all([templateRequest, responseRequest]);

    return { template: templateData.data, response: responseData.data };
};

const EditTemplateResponse: React.FunctionComponent = () => {
    const { template, response } = useLoaderData() as {
        template: ITemplate;
        response: ITemplateResponses;
    };

    const { register, handleSubmit, setValue } = useForm();

    const { user } = useUser()
    const { isAdmin } = useRole()
    const isAuth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        response.answers.forEach((answer, idx) => {
            const name = `question-${idx}`;
            setValue(name, answer);
        });
    }, [response, setValue]);

    const onSubmit = async (data: Record<string, any>) => {
        const answers: string[] = [];

        template.questions.forEach((question, index) => {
            const name = `question-${index}`;

            if (question.type === "checkbox") {
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
            await request.patch(`template-responses/${response.id}`, {
                templateId: template.id,
                answers,
            });
            toast.success("Response updated successfully!");
            navigate(`/template/${template.id}`)
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const filteredResponses = template.template_responses.filter(
        (response) => (response.user.id == user?.id && isAuth) || (isAuth && isAdmin)
    );

    return (
        <React.Fragment>
            {filteredResponses.length > 0 ? filteredResponses.map((response) => (
                <div key={response.id} className="flex flex-1 justify-center items-center w-[100%]">
                    <div className="flex flex-col gap-3 w-full max-w-[500px] box-padding bg-white rounded">
                        <div className="template-info">
                            <h1 className="text-3xl font-bold">{template.title}</h1>
                            <p className="text-gray-600">{template.description}</p>
                        </div>

                        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                            {template.questions.map((question, index) => {
                                const name = `question-${index}`;

                                return (
                                    <div key={index} className="grid gap-1">
                                        <div className="font-medium">
                                            {question.question}
                                        </div>

                                        {(question.type === "text" ||
                                            question.type === "number") && (
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

                                        {question.type === "checkbox" &&
                                            question.options && (
                                                <div className="grid gap-1">
                                                    {question.options.map(
                                                        (opt, optIdx) => (
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
                                                        )
                                                    )}
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
            )) : <NotFound />}
        </React.Fragment>
    );
};

export default EditTemplateResponse;
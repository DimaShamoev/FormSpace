import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { IFillFormData, ITemplate } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";
import React from "react";
import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";

export const fillTemplateLoader = async ({ params }: LoaderFunctionArgs) => {
    const { data } = await request.get<ITemplate>(`templates/${params.id}`);
    return data;
};

const FillTemplate: React.FunctionComponent = () => {
    const template = useLoaderData() as ITemplate;
    const navigate = useNavigate();

    const { register, handleSubmit, control } = useForm<IFillFormData>({
        defaultValues: {
            answers: template.questions.map(() => ({ value: "" })),
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "answers",
    });

    const onSubmit = async (data: IFillFormData) => {
        try {
            const answers = data.answers.map((a) => a.value);
            await request.post(`template-responses/${template.id}`, { answers });
            toast.success("Template filled successfully!");
            navigate("/profile");
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="box-padding bg-white space-y-6 flex flex-col gap-2 w-[600px] max-w-full"
            >
                <h2 className="text-xl font-semibold text-gray-800">
                    Fill Template: {template.title}
                </h2>

                {fields.map((field, index) => (
                    <div className="input-block" key={field.id}>
                        <label className="text-sm text-gray-600 mb-1 block">
                            {template.questions[index]}
                        </label>
                        <input
                            type="text"
                            placeholder="Enter answer"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            {...register(`answers.${index}.value`)}
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FillTemplate;
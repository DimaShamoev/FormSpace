import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
};

const SalesforceForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action =
            "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

        const hiddenFields = [
            { name: "oid", value: "00DgK000003EUis" },
            { name: "retURL", value: "https://form-space.netlify.app/" },
        ];

        hiddenFields.forEach(({ name, value }) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
        });

        Object.entries(data).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    const handleRedirect = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get("error");
        if (error) {
            alert("There was an error with your submission: " + error);
        }
    };

    useEffect(() => {
        handleRedirect();
    }, []);

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded shadow box-padding">
                <h2 className="text-2xl font-bold text-center">
                    Salesforce Form
                </h2>
                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <input
                            id="first_name"
                            {...register("first_name", {
                                required: "First name is required",
                            })}
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            placeholder="First Name"
                        />
                        {errors.first_name && (
                            <p className="text-red-500 text-sm">
                                {errors.first_name.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1">
                        <input
                            id="last_name"
                            {...register("last_name", {
                                required: "Last name is required",
                            })}
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            placeholder="Last Name"
                        />
                        {errors.last_name && (
                            <p className="text-red-500 text-sm">
                                {errors.last_name.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1">
                        <input
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            type="email"
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1">
                        <input
                            id="mobile"
                            {...register("mobile", {
                                required: "Mobile number is required",
                            })}
                            type="tel"
                            maxLength={40}
                            className="border-2 w-full rounded xs-box-padding text-sm"
                            placeholder="Mobile"
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-sm">
                                {errors.mobile.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="border-2 w-full rounded xs-box-padding text-sm bg-blue-500 text-white p-2 text-center font-semibold hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SalesforceForm;

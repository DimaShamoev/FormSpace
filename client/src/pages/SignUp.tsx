import { AuthService } from "../services/auth/auth.service"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"
import { useForm } from "react-hook-form"
import { IFormRegDataReq, IFormRegDataRes } from "../Types/forms/form.types"
import { setToken } from "../helpers/localstorage/localstorage.helper"

const SignUp: React.FunctionComponent = () => {

    const navigate = useNavigate()
    const {register, handleSubmit, watch, formState: { errors }} = useForm<IFormRegDataRes>()
    const passwordCheck = watch('password')

    const registrationHandler = async (data: IFormRegDataReq) => {
        try {
            const response = await AuthService.registration(data)

            if (response?.token) {
                setToken('token', response.token)
                navigate('/authorization');
            }

        } catch (err: any) {
            console.log(err.response?.data?.message || err.message)
        }
    }

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit(registrationHandler)}
                className=" box-padding flex flex-col gap-3.5 min-w-[full] w-[400px]"
            >   
                <div className="form-title text-center text-2xl">
                    Sign Up
                </div>

                <div className="input-block">
                    <input
                        type="text"
                        placeholder="Enter First Name"
                        className="form-input rounded-md"
                        {...register('first_name', {
                            required: "First Name Is Required"
                        })}
                    />
                    { errors.first_name && (<span className="text-xs text-red-500">{ errors.first_name.message }</span>) }
                </div>

                <div className="input-block">
                    <input
                        type="text"
                        placeholder="Enter Last Name"
                        className="form-input rounded-md"
                        {...register('last_name', {
                            required: "Last Name Is Required"
                        })}
                    />
                    { errors.last_name && (<span className="text-xs text-red-500">{ errors.last_name.message }</span>) }
                </div>

                <div className="input-block">
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="form-input rounded-md"
                        {...register('email', {
                            required: "Email Is Required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    { errors.email && (<span className="text-xs text-red-500">{ errors.email.message }</span>) }
                </div>

                <div className="input-block">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="form-input rounded-md"
                        {...register('password', {
                            required: "Password Is Required"
                        })}
                    />
                    { errors.confirmPassword && (<span className="text-xs text-red-500">{ errors.confirmPassword.message }</span>) }
                </div>

                <div className="input-block">
                    <input
                        type="password"
                        placeholder="Re-Enter Password"
                        className="form-input rounded-md"
                        {...register('confirmPassword', {
                            required: "Password Is Required",
                            validate: (value) => value === passwordCheck || "Passwords Don't Match"
                        })}
                    />
                    { errors.confirmPassword && (<span className="text-xs text-red-500">{ errors.confirmPassword.message }</span>) }
                </div>

                <div className="registration-link flex justify-end">
                    <Link
                        to='/authorization'
                        className="text-sm underline text-blue-400"
                    >
                        Already Have An Account?
                    </Link>
                </div>

                <div className="submit-btn">
                    <button
                        type="submit"
                        className="w-full h-full bg-blue-700 border-none text-white rounded-md cursor-pointer"
                    >
                        submit
                    </button>
                </div>

                <div className="line text-sm relative text-center">
                    OR
                </div>

                <div className="social-media">
                    <ul>
                        <li>
                            <FaGoogle />
                            <span className="text-md">Sign Up With Google</span>
                            <span></span>
                        </li>
                    </ul>
                </div>

            </form>
        </div>
    )
}

export default SignUp
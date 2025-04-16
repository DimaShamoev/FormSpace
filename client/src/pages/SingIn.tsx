import { useState } from "react"
import { useAppDispatch } from "../store/hook"
import { AuthService } from "../services/auth/auth.service"
import { setToken } from "../helpers/localstorage/localstorage.helper"
import { login } from "../store/user/userSlice"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaGoogle } from "react-icons/fa6"
import { useForm } from "react-hook-form"
import { IFormData } from "../Types/forms/form.types"


const SingIn = () => {
    const [Error, setError] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>()

    const loginHandler = async (data: IFormData) => {
        try {
            setError(null)
            const response = await AuthService.login(data)

            if (response?.token) {
                setToken('token', response.token)
                dispatch(login(response))
                navigate('/')
                setTimeout(() => {
                    window.location.reload()
                }, 100);    
            }
        } catch (err: any) {
            const error = 'Email Or Password Are Wrong'
            setError(error)
        }

    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="bg-white box-padding flex flex-col gap-3.5 min-w-[full] w-[400px]"
            >   
                <div className="form-title text-center text-2xl">
                    Sign In
                </div>

                <div className="input-block">
                    <input
                        type="text"
                        placeholder="Enter Email"
                        className="form-input rounded-md"
                        {
                            ...register("email", {
                                required: "Email Is Required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid Email Address"
                                }
                            })
                        }
                    />
                    {(errors.email || Error) && (
                        <span className="text-xs text-red-500">
                            {errors.email?.message ?? Error}
                        </span>
                    )}
                </div>

                
                <div className="input-block">
                    <input
                        type="text"
                        placeholder="Enter Password"
                        className="form-input rounded-md"
                        {...register("password", {
                            required: "Password Is Required",
                            minLength: {
                                value: 6,
                                message: "Password Should Be At Least 6 Symbols"
                            }
                        })}
                    />
                    {(errors.password || Error) && (
                        <span className="text-xs text-red-500">
                            {errors.password?.message ?? Error}
                        </span>
                    )}
                </div>

                <div className="registration-link flex justify-end">
                    <Link
                        to='/registration'
                        className="text-sm underline text-blue-400"
                    >
                        Don't Have An Account?
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
                            <span className="text-md">Sign In With Google</span>
                            <span></span>
                        </li>
                    </ul>
                </div>

            </form>
        </div>
    )
}

export default SingIn
import React, { JSX } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({ children }) => {

    const isAuth = useAuth()
    const navigate = useNavigate()

    return (
        <React.Fragment>
            { isAuth ? (
                children 
            ) : (
                <div className="flex flex-col flex-1 gap-2 bg-slate-200 box-padding items-center justify-center">
                    <div className="error-code text-6xl font-bold">401</div>
                    <div className="warn text-4xl">You Are Not Allowed To Enter Here</div>
                    <div className="warn text-sm">Access Is Allowed Only For Registered Users</div>
                    <div className="return">
                    <button
                        className="bg-blue-500 text-white sm-padding_1 rounded-sm cursor-pointer"
                        onClick={() => navigate('/authorization')}
                    >
                        Get Started
                    </button>
                </div>
                </div>
            ) }
        </React.Fragment>
    )
}

export default ProtectedRoute
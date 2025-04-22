import { JSX } from "react/jsx-dev-runtime"
import { useRole } from "../../hooks/useRole"
import { useAuth } from "../../hooks/useAuth"
import React from "react"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteAdminProps {
    children: JSX.Element
}

const ProtectedRouteAdmin: React.FunctionComponent<ProtectedRouteAdminProps> = ({ children }) => {

    const { isAdmin } = useRole() 
    const isAuth = useAuth()
    const navigate = useNavigate()

  return (
    <React.Fragment>
        { isAuth && isAdmin ? (
            children
        ) : (
            <div className="flex flex-col flex-1 items-center justify-center gap-2">
                <div className="error-code text-6xl font-bold">404</div>
                <div className="warn text-4xl">That Page Doesn't Exist</div>
                <div className="warn text-sm">Sorry, The Page You Were Looking For Couldn't Be Found</div>
                <div className="return">
                    <button
                        className="bg-blue-500 text-white sm-padding_1 rounded-sm cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        ) }
    </React.Fragment>
  )
}

export default ProtectedRouteAdmin
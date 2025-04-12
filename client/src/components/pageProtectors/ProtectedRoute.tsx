import { JSX } from "react"
import { useAuth } from "../../hooks/useAuth"

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({ children }) => {

    const isAuth = useAuth()

    return (
        <div>
            { isAuth ? (
                children 
            ) : (
                <p>Authorize</p>
            ) }
        </div>
    )
}

export default ProtectedRoute
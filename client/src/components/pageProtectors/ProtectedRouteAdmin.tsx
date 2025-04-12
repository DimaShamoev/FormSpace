import { JSX } from "react/jsx-dev-runtime"
import { useRole } from "../../hooks/useRole"
import { useAuth } from "../../hooks/useAuth"

interface ProtectedRouteAdminProps {
    children: JSX.Element
}

const ProtectedRouteAdmin: React.FunctionComponent<ProtectedRouteAdminProps> = ({ children }) => {

    const { isAdmin } = useRole() 
    const isAuth = useAuth()

  return (
    <div>
        { isAuth && isAdmin ? (
            children
        ) : (
            <p>Error</p>
        ) }
    </div>
  )
}

export default ProtectedRouteAdmin
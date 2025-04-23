import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useRole } from "../hooks/useRole"
import { IoMenu } from "react-icons/io5"
import { useAside } from "../hooks/useAside"
import { useAppDispatch } from "../store/hook"
import { removeToken } from "../helpers/localstorage/localstorage.helper"
import { logOut } from "../store/user/userSlice"

const Header: React.FunctionComponent = () => {

    const { isAdmin } = useRole()
    const isAuth = useAuth()
    const { setAside } = useAside()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logOut())
        removeToken('token')
        navigate('/')
    }


    return (
        <header className="flex justify-between items-center box-padding">

            <div className="logo text-2xl">
                <NavLink to='/'>FormSpace</NavLink>
            </div>
            <nav className="nav-links">
                <ul className="flex gap-10 text-lg">
                    <li>
                        <NavLink
                            to='/'
                            className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                        >
                            home
                        </NavLink>
                    </li>

                    { isAuth ? (
                        <li>
                            <NavLink
                                to='/profile'
                                className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                            >
                                Profile
                            </NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink
                                to={`/authorization`}
                                className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                            >
                                Get Started
                            </NavLink></li>
                    )}

                    { isAdmin && isAuth ? (
                        <li>
                            <NavLink
                                to='/admin'
                                className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                            >
                                Admin
                            </NavLink>
                        </li>
                    ) : (
                        ''
                    ) }
                    { isAuth ? (
                        <li>
                            <button
                                className='nav-link cursor-pointer'
                                onClick={logoutHandler}
                            >
                                Log Out
                            </button>
                        </li>
                    ) : (
                        ''
                    ) }
                </ul>
            </nav>
            <nav onClick={setAside} className="menu-btn text-2xl">
                <IoMenu className="cursor-pointer" />
            </nav>
        </header>
    )
}

export default Header
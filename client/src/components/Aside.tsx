import React from 'react'
import { useAside } from '../hooks/useAside'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import { IoClose } from 'react-icons/io5'
import { AiFillHome } from 'react-icons/ai'
import { FaUserLarge } from 'react-icons/fa6'
import { FaRunning } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'
import { removeToken } from '../helpers/localstorage/localstorage.helper'
import { useAppDispatch } from '../store/hook'
import { logOut } from '../store/user/userSlice'
import { ImExit } from 'react-icons/im'

const Aside: React.FunctionComponent = () => {

    const { isOpen, setAside } = useAside()
    const { isAdmin } = useRole()
    const isAuth = useAuth()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logOut())
        removeToken('token')
        navigate('/')
        setAside()
    }

    return (
        <div className={`layout absolute ease-in-out duration-200 ${isOpen ? 'inset-0 bg-black/50' : ''}`}>
            <aside className={`min-w-[200px] min-h-screen box-padding fixed right-[-200px] ease-in-out duration-200 bg-white z-[2] ${isOpen ? 'right-[0px]' : ''}`}>
                <nav className="aside-links flex flex-col gap-3">
                    <div className="exit-btn flex justify-end">
                        <IoClose
                            className='cursor-pointer text-2xl'
                            onClick={setAside}
                        />
                    </div>
                    <ul className="text-lg flex flex-col gap-3 aside-ul">
                        <li>
                            <NavLink
                                to='/'
                                className={({isActive}) => `aside-link ${isActive ? 'active' : ''}`}
                                onClick={setAside}
                            >
                                <AiFillHome /> home
                            </NavLink>
                        </li>
                        { isAuth ? (
                            <li>
                                <NavLink
                                    to='/profile'
                                    className={({isActive}) => `aside-link ${isActive ? 'active' : ''}`}
                                    onClick={setAside}
                                >
                                    <FaUserLarge /> Profile
                                </NavLink>
                            </li>
                        ) : (
                            <li>
                                <NavLink
                                    to='/authorization'
                                    className={({isActive}) => `aside-link ${isActive ? 'active' : ''}`}
                                    onClick={setAside}
                                >
                                    <FaRunning /> Get Started
                                </NavLink>
                            </li>
                        ) }
                        { isAdmin && isAuth ? (
                            <li>
                                <NavLink
                                    to='/admin'
                                    className={({isActive}) => `aside-link ${isActive ? 'active' : ''}`}
                                    onClick={setAside}
                                >
                                    <RiAdminFill /> Admin
                                </NavLink>
                            </li>
                        ) : (
                            ''
                        ) }
                        { isAuth ? (
                            <li>
                                <button
                                    className='aside-link cursor-pointer'
                                    onClick={logoutHandler}
                                    
                                >
                                    <ImExit /> Log Out
                                </button>
                            </li>
                        ) : (
                            ''
                        ) }
                    </ul>
                </nav>
            </aside>
        </div>
    )
}

export default Aside
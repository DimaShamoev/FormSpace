import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHeader: React.FunctionComponent = () => {
    return (
        <div className='bg-white box-padding'>
            <nav className='admin-nav'>
                <ul>
                    <li>
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} to='admins-list'>Admins</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} to='users-list'>Users</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} to='templates-list'>Templates</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} to='responses-list'>Responses</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`} to='comments-list'>Comments</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminHeader
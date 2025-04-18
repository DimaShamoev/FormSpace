import { useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { IUserInfo } from "../../Types/user/user.types"
import { useState } from "react"
import { toast } from "react-toastify"

export const usersLoaderAdmin = async () => {
    const { data } = await request.get('users')
    return data
}

const UsersTable: React.FunctionComponent = () => {

    const users = useLoaderData() as IUserInfo[]
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])

    const allUsersSelected = selectedUsers?.length === users.length

    const handleCheckboxChange = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }

    const handleSelect = () => {
        if (allUsersSelected) {
            setSelectedUsers([])
        } else {
            const allUsersId = users.map(user => user.id)
            setSelectedUsers(allUsersId)
        }
    }

    const handleUserDelete = () => {
        try {
            selectedUsers.map(id => request.delete(`users/${id}`))
            toast.success("User Removed")
            window.location.reload()
        } catch (err: any) {
            toast.error(err)
        }
    }

    const handleSelectedRole = () => {
        try {
            selectedUsers.map(id => request.patch(`users/${id}`, { role: 'admin' }))
            toast.success("User Role Changed")
            window.location.reload()
        } catch (err: any) {
            toast.error(err)
        }
    }

    return (
        <div className="flex flex-col gap-4 bg-white box-padding">
            <div className="admins-toolbar flex justify-between">
                <div className="toolbar-btns flex gap-3">
                    <button
                        className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleUserDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleSelectedRole}
                    >
                        Set As Admin
                    </button>
                </div>
                <div className="toolbar-search">
                    <input
                        type="text"
                        placeholder="Find User"
                        className="border-2 xs-box-padding border-black rounded-md"
                    />
                </div>
            </div>

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={allUsersSelected}
                                    onChange={handleSelect}
                                />
                            </th>
                            <th>name</th>
                            <th>surname</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) =>
                            user.role !== 'admin' ? (
                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleCheckboxChange(user.id)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        {user.first_name}
                                    </td>
                                    <td className="text-center">
                                        {user.last_name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                            ) : null
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTable
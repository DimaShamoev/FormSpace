import { useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { IUserInfo } from "../../Types/user/user.types"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import useDebounce from "../../hooks/useDebounce"

export const adminsLoader = async () => {
    const { data } = await request.get('users')
    return data
}

const AdminsTable: React.FunctionComponent = () => {
    const admins = useLoaderData() as IUserInfo[]
    const [selectedAdmins, setSelectedAdmins] = useState<number[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const filteredAdmins = admins.filter(admin => admin.role === 'admin')
    const allAdminsSelected = selectedAdmins.length === filteredAdmins.length

    const handleCheckboxChange = (adminId: number) => {
        setSelectedAdmins(prev =>
            prev.includes(adminId)
                ? prev.filter(id => id !== adminId)
                : [...prev, adminId]
        )
    }

    const handleSelect = () => {
        if (allAdminsSelected) {
            setSelectedAdmins([])
        } else {
            const allIds = filteredAdmins.map(admin => admin.id)
            setSelectedAdmins(allIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedAdmins.map(id => request.delete(`users/${id}`))
            window.location.reload()
        } catch (err) {
            toast.error("Failed to delete admins")
        }
    }

    const handleRemoveAdminRole = async () => {
        try {
            selectedAdmins.map(id =>
                request.patch(`users/${id}`, { role: "user" })
            )
            toast.success("Admin roles removed")
            window.location.reload()
        } catch (err) {
            toast.error("Failed to update roles")
        }
    }

    const searchFilteredAdmin = useMemo(() => {
        return filteredAdmins.filter((admin) =>
            admin.first_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            admin.last_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
    }, [debouncedSearchQuery, admins])

    return (
        <div className="flex flex-col gap-4 bg-white box-padding">
            <div className="admins-toolbar flex justify-between">
                <div className="toolbar-btns flex gap-3">
                    <button
                        className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleDeleteSelected}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer"
                        onClick={handleRemoveAdminRole}
                    >
                        Remove Admin
                    </button>
                </div>
                <div className="toolbar-search">
                    <input
                        type="text"
                        placeholder="Find Admin"
                        className="border-2 xs-box-padding border-black rounded-md"
                        onChange={(e) => setSearchQuery((e.target.value))}
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
                                    checked={allAdminsSelected}
                                    onChange={handleSelect}
                                />
                            </th>
                            <th>name</th>
                            <th>surname</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchFilteredAdmin.map((admin) => (
                            <tr key={admin.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedAdmins.includes(admin.id)}
                                        onChange={() => handleCheckboxChange(admin.id)}
                                    />
                                </td>
                                <td className="text-center">{admin.first_name}</td>
                                <td className="text-center">{admin.last_name}</td>
                                <td>{admin.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminsTable
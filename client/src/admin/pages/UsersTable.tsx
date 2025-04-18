import { useLoaderData } from "react-router-dom"
import { request } from "../../api/axios.api"
import { IUserInfo } from "../../Types/user/user.types"

export const usersLoaderAdmin = async () => {
    const { data } = await request.get('users')
    return data
}

const UsersTable: React.FunctionComponent = () => {

    const users = useLoaderData() as IUserInfo[]

    return (
        <div className="flex flex-col gap-4 bg-white box-padding">
            <div className="admins-toolbar flex justify-between">
                <div className="toolbar-btns flex gap-3">
                    <button className="bg-red-500 text-white xs-box-padding rounded-md cursor-pointer">Delete</button>
                    <button className="bg-blue-500 text-white xs-box-padding rounded-md cursor-pointer">Set As Admin</button>
                </div>
                <div className="toolbar-search">
                    <input
                        type="text"
                        placeholder="Find Admin"
                        className="border-2 xs-box-padding border-black rounded-md"
                    />
                </div>
            </div>

            <div className="admins-table">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>name</th>
                            <th>surname</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((admin) => admin.role !== 'admin' ? (
                            <tr key={admin.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td className="text-center">
                                    {admin.first_name}
                                </td>
                                <td className="text-center">
                                    {admin.last_name}
                                </td>
                                <td>
                                    {admin.email}
                                </td>
                            </tr>
                        ) : null)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTable
import React, { useState } from 'react'
import { ITemplateResponses } from '../Types/templates/templates.types'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'

interface IUserResponsesTable {
    responses: ITemplateResponses[]
}

const UserResponsesTable: React.FunctionComponent<IUserResponsesTable> = ({ responses }) => {

    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    return (
        <div className="user-template-table">
            {responses.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Responses</p>
                        <p><IoIosArrowUp onClick={toggleTemplateVisible} className={`transition ${templatesVisible ? 'rotate-180' : 'rotate-0'}`} /></p>
                    </div>
                    <div className="tool-bar">
                        <div className="delete-btn">
                            <button className='bg-red-500 text-white xs-box-padding rounded-sm'>Delete</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map((response) => (
                                <tr key={response.id}>
                                    <td><input type="checkbox" /></td>
                                    <td>{response.template.title || "There No Title"}</td>
                                    <td>{response.template.description || "There No Description"}</td>
                                    <td><Link to={`../template/${response.template.id}`} className='text-blue-400 underline'>GO TO</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`flex flex-col gap-1 ${templatesVisible ? 'h-auto' : 'h-[22px] overflow-hidden'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Responses</p>
                        <p><IoIosArrowUp onClick={toggleTemplateVisible} className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`} /></p>
                    </div>
                    <div className="bottom-row text-sm">
                        <span>There No Responses Yet, <Link to='/' className='text-gray-500 underline'>Let's Fill Forms</Link></span>
                    </div>
                </div>
            )}

            
        </div>
    )
}

export default UserResponsesTable
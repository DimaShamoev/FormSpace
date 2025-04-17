import React, { useState } from 'react'
import { ITemplate } from '../Types/templates/templates.types'
import { Link } from 'react-router-dom'
import { IoIosArrowUp } from 'react-icons/io'

interface IUserTemplatesTable {
    templates: ITemplate[]
}

const UserTemplatesTable: React.FunctionComponent<IUserTemplatesTable> = ({ templates }) => {

    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    return (
        <div className="user-template-table">
            {templates.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Templates</p>
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
                            {templates.map((template) => (
                                <tr key={template.id}>
                                    <td><input type="checkbox" /></td>
                                    <td>{template.title || "There No Title"}</td>
                                    <td>{template.description || "There No Description"}</td>
                                    <td><Link to={`../template/${template.id}`} className='text-blue-400 underline'>GO TO</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`flex flex-col gap-1 ${templatesVisible ? 'h-auto' : 'h-[22px] overflow-hidden'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Templates</p>
                        <p><IoIosArrowUp onClick={toggleTemplateVisible} className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`} /></p>
                    </div>
                    <div className="bottom-row text-sm">
                        <span>There No Forms Yet, <Link to='../create-template' className='text-gray-500 underline'>Let's Create The Form</Link></span>
                    </div>
                </div>
            )}

            
        </div>
    )
}

export default UserTemplatesTable
import React, { useState } from 'react'
import { ITemplate } from '../Types/templates/templates.types'
import { Link } from 'react-router-dom'
import { IoIosArrowUp } from 'react-icons/io'
import { request } from '../api/axios.api'
import { toast } from 'react-toastify'

interface IUserTemplatesTable {
    templates: ITemplate[]
}

const UserTemplatesTable: React.FunctionComponent<IUserTemplatesTable> = ({ templates }) => {
    const [templatesVisible, setTemplateVisible] = useState<boolean>(false)
    const [selectedTemplateIds, setSelectedTemplateIds] = useState<number[]>([])

    const toggleTemplateVisible = () => {
        setTemplateVisible(prev => !prev)
    }

    const handleCheckboxChange = (templateId: number) => {
        setSelectedTemplateIds((prevSelected) =>
            prevSelected.includes(templateId)
                ? prevSelected.filter((id) => id !== templateId)
                : [...prevSelected, templateId]
        )
    }

    const areAllSelected = selectedTemplateIds.length === templates.length

    const handleSelectAllChange = () => {
        if (areAllSelected) {
            setSelectedTemplateIds([])
        } else {
            const allTemplateIds = templates.map(template => template.id)
            setSelectedTemplateIds(allTemplateIds)
        }
    }

    const handleDeleteSelected = async () => {
        try {
            selectedTemplateIds.map(id => request.delete(`templates/${id}`))
            toast.success("Selected templates removed successfully.")
            window.location.reload()
        } catch (err: any) {
            toast.error("Error deleting templates.")
        }
    }

    return (
        <div className="user-template-table">
            {templates.length > 0 ? (
                <div className={`table-wrapper flex flex-col cursor-pointer gap-2 overflow-hidden ${templatesVisible ? 'h-auto' : 'h-[22px]'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Templates</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
                    </div>
                    <div className="tool-bar">
                        <div className="delete-btn">
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selectedTemplateIds.length === 0}
                                className={`bg-red-500 text-white xs-box-padding rounded-sm ${selectedTemplateIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={areAllSelected}
                                        onChange={handleSelectAllChange}
                                    />
                                </th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {templates.map((template) => (
                                <tr key={template.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedTemplateIds.includes(template.id)}
                                            onChange={() => handleCheckboxChange(template.id)}
                                        />
                                    </td>
                                    <td>{template.title || "There No Title"}</td>
                                    <td>{template.description || "There No Description"}</td>
                                    <td>
                                        <Link to={`../template/${template.id}`} className="text-blue-400 underline">
                                            GO TO
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`flex flex-col gap-1 ${templatesVisible ? 'h-auto' : 'h-[22px] overflow-hidden'}`}>
                    <div className="top-row flex items-center justify-between">
                        <p>Templates</p>
                        <p>
                            <IoIosArrowUp
                                onClick={toggleTemplateVisible}
                                className={`transition cursor-pointer ${templatesVisible ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </p>
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
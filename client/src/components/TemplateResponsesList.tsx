import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { ITemplate } from '../Types/templates/templates.types'

interface ITemplateResponsesListProps {
    template: ITemplate
    isAuthor: (id: number) => boolean
    isAdmin: boolean
    id: string | undefined
    setTemplate: (data: ITemplate) => void
    isAuth: boolean
}

const TemplateResponsesList: React.FunctionComponent<ITemplateResponsesListProps> = ({ template, isAuthor, isAdmin, isAuth }) => {

    const [responseOpen, setResponseOpen] = useState<boolean>(false)

    const toggleResponseBtn = () => {
        setResponseOpen(prev => !prev)
    }

    return (
        <div>
            {isAuth && isAuthor(template.user.id) || isAuth && isAdmin ? (
                        <div className={`flex flex-col gap-4 bg-white box-padding h-[48px] overflow-hidden transition-all ${responseOpen ? 'h-full' : ''}`}>
                            <p className="flex items-center justify-between">
                                <span className="responses-title text-xl">Responses On Form</span>
                                <span className="cursor-pointer" onClick={toggleResponseBtn}>
                                    <IoIosArrowUp className={`rotate-0 transition-all ${responseOpen ? 'rotate-180' : ''}`} />
                                </span>
                            </p>
                            {template.template_responses && template.template_responses.length > 0 ? (
                                <div>
                                    {template.template_responses.map((response, responseIndex) => (
                                        <div key={responseIndex} className="response flex flex-col gap-[10px] sm-margin-bottom_1">
                                            <div className="submitted-info text-xs">
                                                <p>Filled By: {response.user.email}</p>
                                                <p>Submitted: {new Date(response.createdAt).toLocaleString('en-GB')}</p>
                                            </div>
                                            {template.questions.map((question, index) => (
                                                <div key={index}>
                                                    <p className="bg-slate-400/60 sm-padding_1">{question.question}</p>
                                                    <p className="bg-slate-200/50 sm-padding_1">{response.answers[index]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">There No Responses On Form</p>
                            )}
                        </div>
                    ) : null}
        </div>
    )
}

export default TemplateResponsesList
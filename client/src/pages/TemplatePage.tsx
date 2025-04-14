import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"

const TemplatePage: React.FunctionComponent = () => {

    const { id } = useParams()
    const [template, setTemplate] = useState<ITemplate | null>(null)

    const getData = async () => {
        try {
            const res = await request.get<ITemplate>(`templates/${id}`);
            setTemplate(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    if (!template) return <p>No Data Wait</p>

    return (
        <div key={template.id}>
            <p>-- {template.title} --</p>
            <p>-- {template.description} --</p>
            <p>{template.questions.map((ans, i) => <span key={i}>--{ans}</span>)}</p>
            <p>{template.answers.map((ans, i) => <span key={i}>--{ans}</span>)}</p>
            <p>-- likes -- {template.templateLikes?.length ?? 0}</p>
            <p>-- responses -- {template.template_responses?.length ?? 0}</p>
        </div>
    )
}

export default TemplatePage
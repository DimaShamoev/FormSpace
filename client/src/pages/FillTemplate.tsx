import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ITemplate } from "../Types/templates/templates.types"
import { request } from "../api/axios.api"

export const fillTemplateLoader = async ({ params }: LoaderFunctionArgs) => {
    const { data } = await request.get<ITemplate>(`templates/${params.id}`)
    return data
}

const FillTemplate: React.FunctionComponent = () => {

    const template = useLoaderData() as ITemplate

    return (
        <div>
            {template.answers.map((answer) => answer.split(','))}
            <br />
        </div>
    )
}

export default FillTemplate
import TemplatesToolBar from "../components/TemplatesToolBar";
import Templates from "../components/Templates";
import { useEffect, useState } from "react";
import { ITemplate } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";

const Home = () => {

    const [templates, setTemplates] = useState<ITemplate[]>([])

    const getData = async () => {
        const template = await request.get<ITemplate[]>('templates/all-templates')
        setTemplates(template.data)
    }

    const sortByLikes = () => {
        const sorted = [...templates].sort((a, b) => b.templateLikes.length - a.templateLikes.length)
        setTemplates(sorted)
    }

    const sortByResponses = () => {
        const sorted = [...templates].sort((a, b) => b.template_responses.length - a.template_responses.length)
        setTemplates(sorted)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <TemplatesToolBar sortByLikes={sortByLikes} sortByResponses={sortByResponses} />
            <Templates templates={templates} />
        </div>
    );
};

export default Home;
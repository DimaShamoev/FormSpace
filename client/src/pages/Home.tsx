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

    console.log(templates.map((template) => template.templateLikes.map((like) => like.id)))

    const sortByLikes = () => {
        const sorted = [...templates].sort((a, b) => b.templateLikes.length - a.templateLikes.length)
        setTemplates(sorted)
    }

    const sortByResponses = () => {
        const sorted = [...templates].sort((a, b) => b.template_responses.length - a.template_responses.length)
        setTemplates(sorted)
    }

    // const setLike = async (templateId: number) => {
    //     await request.post<number>(`template-likes/${templateId}`)
    //     getData()
    // }

    // const removeLike = async (templateId: number) => {
    //     await request.delete<number>(`template-likes/${templateId}`)
    //     getData()
    // }

    const toggleLikes = async (templateId: number, isLike: boolean) => {
        isLike ? await request.delete(`template-likes/${templateId}`) : await request.post(`template-likes/${templateId}`)
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <TemplatesToolBar sortByLikes={sortByLikes} sortByResponses={sortByResponses} />
            <Templates
                templates={templates}
                toggleLikes={toggleLikes}
            />
        </div>
    );
};

export default Home;
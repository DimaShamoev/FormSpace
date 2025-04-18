import TemplatesToolBar from "../components/TemplatesToolBar";
import Templates from "../components/Templates";
import { ITemplate } from "../Types/templates/templates.types";
import { request } from "../api/axios.api";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

export const templatesLoader =async () => {
    const { data } = await request.get<ITemplate[]>("templates/all-templates")
    return data
}

const Home = () => {
    const [templates, setTemplates] = useState<ITemplate[]>(useLoaderData() as ITemplate[])
    const [clickedParam, setClickedParam] = useState<number | null>(null)
    const navigate = useNavigate()

    const sortByLikes = () => {
        const sorted = [...templates].sort((a, b) => b.templateLikes.length - a.templateLikes.length)
        setTemplates(sorted)
    }

    const sortByResponses = () => {
        const sorted = [...templates].sort((a, b) => b.template_responses.length - a.template_responses.length)
        setTemplates(sorted)
    }

    const toggleLikes = async (templateId: number, isLike: boolean) => {
        isLike ? await request.delete(`template-likes/${templateId}`) : await request.post(`template-likes/${templateId}`)

        const { data } = await request.get<ITemplate[]>("templates/all-templates");
        setTemplates(data);
    }

    const likeAlert = () => {
        toast.warn("To Like The Template Sing in")
    }
    
    const toggleParamClick = (templateId: number) => {
        setClickedParam((prev) => (prev === templateId ? null : templateId))
    }

    const handleRemove = async (templateId: number) => {
        try {
            await request.delete(`templates/${templateId}`)
            toast.success("Template Deleted Successfully")
            window.location.reload()
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div>
            <TemplatesToolBar sortByLikes={sortByLikes} sortByResponses={sortByResponses} />
            <Templates
                templates={templates}
                clickedParam={clickedParam}
                toggleParam={toggleParamClick}
                removeTemplate={handleRemove}
                toggleLikes={toggleLikes}
                likeAlert={likeAlert}
            />
        </div>
    );
};

export default Home;
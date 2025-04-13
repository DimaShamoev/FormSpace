import TemplatesToolBar from "../components/TemplatesToolBar";
import Templates from "../components/Templates";

// interface IUser {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     role: string;
//     createdAt: string;
//     updatedAt: string;
// }

// interface ILikes {
//     id: number;
//     template_id: number;
//     user_id: number;
// }

// interface ITemplate {
//     id: number;
//     title: string;
//     description: string;
//     questions: string[];
//     answers: string[];
//     user: IUser;
//     likes: ILikes[];
//     createdAt: number;
// }

const Home = () => {
    // const [templates, setTemplates] = useState<ITemplate[]>([]);
    // const [likesCount, setLikesCount] = useState<{ [key: number]: number }>({});

    // const getTemplates = async () => {
    //     const response = await request.get<ITemplate[]>('templates/all-templates');
    //     setTemplates(response.data);
    
    //     const likeCounts: { [key: number]: number } = {};
    
    //     for (const template of response.data) {
    //         try {
    //             const likeResponse = await request.get<{ data: number }>(`template-likes/count/${template.id}`);
    
    //             if (typeof likeResponse.data === "number") {
    //                 likeCounts[template.id] = likeResponse.data;
    //             }
    //         } catch (error) {
    //             alert(error)
    //         }
    //     }
    
    //     setLikesCount(likeCounts);
    // };

    // useEffect(() => {
    //     getTemplates();
    // }, []);

    return (
        <div>

            <TemplatesToolBar />
            <Templates />


            {/* {templates.length ? (
                templates.map((template) => (
                    <div key={template.id}>
                        <p>ID: {template.id}</p>
                        <p>Title: {template.title}</p>
                        <p>Description: {template.description}</p>
                        <p>Questions: {template.questions.join(", ")}</p>
                        <p>Answers: {template.answers.join(", ")}</p>
                        <p>User: {template.user.first_name} {template.user.last_name}</p>
                        <p>Created At: {new Date(template.createdAt).toLocaleString()}</p>
                        <p>Likes Count: {likesCount[template.id] || 0}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>There is no data</p>
            )} */}
        </div>
    );
};

export default Home;
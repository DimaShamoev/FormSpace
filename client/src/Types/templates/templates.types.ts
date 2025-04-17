import { ILikes } from "../likes/likes.types";
import { ITags } from "../tags/tags.types";
import { IUser, IUserInfo } from "../user/user.types";

export interface ITemplate {
    id: number;
    title: string;
    description: string;
    questions: string[];
    answers: string[];
    user: IUserInfo;
    tags: ITags[];
    templateLikes: ILikes[];
    template_responses: ITemplateResponses[];
    createdAt: Date;
}

export interface ITemplateResponses {
    id: number;
    answers: string[];
    user: IUser;
    template: ITemplate;
    createdAt: Date;
}

export type QuestionType = "text" | "textarea" | "number" | "checkbox";

export interface ICreateTemplate {
    question: string;
    answer: string;
    answers?: string[];
    type: QuestionType;
}

export interface ITemplateFormData {
    title: string;
    description: string;
    tags: string;
    status: string;
    questions: ICreateTemplate[];
}

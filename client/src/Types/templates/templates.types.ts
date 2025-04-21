import { IComments } from "../comments/comments.types";
import { ILikes } from "../likes/likes.types";
import { ITags } from "../tags/tags.types";
import { IUser, IUserInfo } from "../user/user.types";

export type QuestionType = "text" | "textarea" | "number" | "checkbox" | "multiple-choice";

export interface ICreateTemplate {
    title: string;
    description: string;
    questions: {
        question: string;
        answer?: string;
        options?: string[];
        type: "text" | "textarea" | "number" | "checkbox";
    } [];
    answers?: {
        questionIndex: number;
        answer: string | string[] | number | null;
    }[];
    status: string;
    user?: IUserInfo;
    template_likes?: ILikes[];
    tags?: ITags[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITemplateFormData {
    title: string;
    description: string;
    tags: string;
    status: string;
    questions: {
        question: string;
        answer?: string;
        options?: string[];
        type: "text" | "textarea" | "number" | "checkbox";
    }[];
}

export interface ITemplate {
    id: number;
    title: string;
    description: string;
    questions: IFillTemplateQuestion[];
    answers: string[];
    status: string;
    user: IUserInfo;
    tags: ITags[];
    templateLikes: ILikes[];
    template_responses: ITemplateResponses[];
    comments: IComments[];
    createdAt: Date;
}

export interface ITemplateResponses {
    id: number;
    answers: string[];
    user: IUser;
    template: ITemplate;
    createdAt: Date;
}

export interface IFillFormData {
    answers: { value: string }[];
}

export interface IFillTemplateQuestion {
    question: string;
    type: "text" | "textarea" | "number" | "checkbox";
    options?: string[];
    answer?: string | number | string[];
}
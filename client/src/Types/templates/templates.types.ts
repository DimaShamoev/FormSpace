import { IUserInfo } from "../user/user.types"

export interface ITemplate {
    id: number,
    title: string,
    description: string,
    questions: string[]
    answers: string[]
    user: IUserInfo,
    templateLikes: number[]
    template_responses: number[]
}
import { ILikes } from "../likes/likes.types"
import { IUserInfo } from "../user/user.types"

export interface ITemplate {
    id: number,
    title: string,
    description: string,
    questions: string[]
    answers: string[]
    user: IUserInfo,
    templateLikes: ILikes[]
    template_responses: number[]
}
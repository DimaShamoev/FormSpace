import { ITemplate } from "../templates/templates.types";
import { IUserInfo } from "../user/user.types";

export interface IComments {
    id: number,
    comment: string,
    user: IUserInfo,
    template: ITemplate
    createdAt: Date
}
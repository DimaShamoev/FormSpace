import { ITemplate } from "../templates/templates.types";
import { IUserInfo } from "../user/user.types";

export interface ILikes {
    id: number,
    user: IUserInfo,
    template: ITemplate
}
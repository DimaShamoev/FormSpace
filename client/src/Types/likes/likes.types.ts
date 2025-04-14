import { ITemplate } from "../templates/templates.types";
import { IUser } from "../user/user.types";

export interface ILikes {
    id: number,
    user: IUser,
    template: ITemplate
}
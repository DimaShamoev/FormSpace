import { ITemplate } from "../templates/templates.types";
import { IUserInfo } from "../user/user.types";

export interface ITags {
    id: number,
    title: string,
}

export interface ITags {
    id: number,
    title: string,
    template: ITemplate,
    user: IUserInfo
}
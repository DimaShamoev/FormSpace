import { Template } from "src/template/entities/template.entity"
import { User } from "src/user/entities/user.entity"

export class CreateCommentDto {

    id: number
    comment: string
    user?: User
    template?: Template
    createdAt?: Date
}
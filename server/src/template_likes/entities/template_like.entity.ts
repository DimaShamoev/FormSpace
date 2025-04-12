import { Template } from "src/template/entities/template.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TemplateLike {

    @PrimaryGeneratedColumn({ name: 'like_id' })
    id: number

    @ManyToOne(() => Template, template => template.templateLikes)
    @JoinColumn({ name: 'template_id' })
    template: Template

    @ManyToOne(() => User, user => user.templateLikes)
    user: User

}

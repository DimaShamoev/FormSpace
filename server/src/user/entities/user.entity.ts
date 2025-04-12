import { Tag } from "src/tag/entities/tag.entity";
import { TemplateResponse } from "src/template-response/entities/template-response.entity";
import { Template } from "src/template/entities/template.entity";
import { TemplateLike } from "src/template_likes/entities/template_like.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 'user'})
    role: string

    @OneToMany(() => Template, template => template.user)
    templates: Template[]

    @OneToMany(() => TemplateResponse, templateResponse => templateResponse.user)
    template_responses: TemplateResponse[]

    @OneToMany(() => TemplateLike, templateLike => templateLike.user)
    templateLikes: TemplateLike[]

    @OneToMany(() => Tag, tag => tag.user)
    tags: Tag[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
import { Template } from "src/template/entities/template.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TemplateResponse {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text', { array: true })
    answers: string[]

    @ManyToOne(() => User, user => user.template_responses)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Template, template => template.template_responses, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'template_id' })
    template: Template

    @CreateDateColumn()
    createdAt: Date
}

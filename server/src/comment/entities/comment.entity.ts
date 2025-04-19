import { Template } from "src/template/entities/template.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ name: 'comment_id' })
    id: number

    @Column()
    comment: string

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Template, template => template.comments, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'template_id' })
    template: Template

    @CreateDateColumn()
    createdAt: Date
}
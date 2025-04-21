import { Comment } from "src/comment/entities/comment.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { TemplateResponse } from "src/template-response/entities/template-response.entity";
import { TemplateLike } from "src/template_likes/entities/template_like.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Template {
    @PrimaryGeneratedColumn({ name: 'template_id' })
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'jsonb', nullable: true })
    questions: {
        question: string;
        type: 'text' | 'textarea' | 'number' | 'checkbox';
        options?: string[];
    }[];

    @Column({ type: 'jsonb', nullable: true })
    answers: {
        questionIndex: number;
        answer: string | string[] | number | null;
    }[];

    @Column()
    status: string

    @ManyToOne(() => User, user => user.templates)
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => TemplateResponse, templateResponse => templateResponse.template)
    template_responses: TemplateResponse[]

    @OneToMany(() => TemplateLike, templateLike => templateLike.template)
    templateLikes: TemplateLike[]

    @OneToMany(() => Comment, comment => comment.template)
    comments: Comment[]

    @OneToMany(() => Tag, tag => tag.template, {nullable: true})
    tags: Tag[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
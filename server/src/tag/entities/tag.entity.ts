import { Template } from "src/template/entities/template.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({ name: 'tag_id' })
    id: number

    @Column()
    title: string

    @ManyToOne(() => User, user => user.tags)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Template, template => template.tags, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'template_id' })
    template: Template;
}
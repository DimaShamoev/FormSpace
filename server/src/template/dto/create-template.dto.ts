import { IsNumber } from "@nestjs/class-validator"
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Tag } from "src/tag/entities/tag.entity"
import { TemplateLike } from "src/template_likes/entities/template_like.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTemplateDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsNotEmpty()
    questions: {
        question: string;
        type: 'text' | 'textarea' | 'number' | 'checkbox';
        options?: string[];
    } []

    @IsOptional()
    answers: {
        questionIndex: number;
        answer: string | string[] | number | null;
    } []

    @IsString()
    status: string

    @IsOptional()
    user: User

    @IsOptional()
    template_likes: TemplateLike[]

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    tags: Tag[]
    
    @IsOptional()
    @IsDate()
    createdAt: Date
    
    @IsOptional()
    @IsDate()
    updatedAt: Date
}
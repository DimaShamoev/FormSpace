import { IsNumber } from "@nestjs/class-validator"
import { IsArray, IsDate, IsOptional, IsString } from "class-validator"
import { Tag } from "src/tag/entities/tag.entity"
import { User } from "src/user/entities/user.entity"

export class CreateTemplateDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsArray()
    @IsString({ each: true })
    questions: string[]
    
    @IsArray()
    @IsString({ each: true })
    answers: string[]

    @IsOptional()
    user: User

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
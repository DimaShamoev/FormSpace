import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTemplateResponseDto {
    
    @IsOptional()
    @IsNumber()
    userId?: number

    @IsOptional()
    @IsNumber()
    templateId?: number

    @IsArray()
    @IsString({ each: true })
    answers: string[]

}
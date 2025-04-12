import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTagDto {

    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    @IsNumber()
    templateId?: number;
}
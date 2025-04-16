import { IsNumber, IsOptional, IsString } from "class-validator"
import { Template } from "src/template/entities/template.entity";
import { User } from "src/user/entities/user.entity";

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
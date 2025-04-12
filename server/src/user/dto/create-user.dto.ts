import { IsEmail, IsNumber, IsString, MaxLength, MinLength, IsOptional, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNumber()
    @IsOptional()
    id?: number
    
    @IsString()
    first_name: string
    
    @IsString()
    last_name: string
    
    @IsEmail()
    email: string
    
    @IsString()
    @MinLength(6, { message: "Password Should Be More Than 6 Symbol" })
    @MaxLength(8, { message: "Password Should Be Less Than 6 Symbol" })
    password: string
    
    @IsString()
    @IsOptional()
    role?: string
}
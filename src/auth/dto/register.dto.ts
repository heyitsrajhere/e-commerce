import { IsEmail, IsString, Min } from "class-validator";

export class RegisterUser{
    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsString()
    @Min(6)
    password:string
}
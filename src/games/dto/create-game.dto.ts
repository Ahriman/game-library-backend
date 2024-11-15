import { IsOptional, IsString } from "class-validator";

export class CreateGameDto {

    @IsString()
    title: string;

    @IsString()
    cover: string;

    @IsString()
    @IsOptional()
    description?: string;
    
}

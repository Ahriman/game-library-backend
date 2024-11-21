import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateUserGameDto {

    @ApiProperty({
      description: 'The unique identifier for the user.',
      example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  
    @ApiProperty({
      description: 'The unique identifier for the game.',
      example: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
    })
    @IsUUID()
    @IsNotEmpty()
    gameId: string;
    
    //   @ApiProperty({
    //     description: 'The score of the user in the game.',
    //     example: 100,
    //     required: false
    //   })
    //   @IsNumber()
    //   @IsOptional()
    //   score?: number;
      
}

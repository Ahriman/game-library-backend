import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {

    @ApiProperty({
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        description: 'ID único del juego',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    @Column('text', {
        unique: true
    })
    title: string;

    @Column({
        type: 'text'
    })
    cover: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description?: string;

}

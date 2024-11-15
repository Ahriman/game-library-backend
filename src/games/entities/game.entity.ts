import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: number;

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

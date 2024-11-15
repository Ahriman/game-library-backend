import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column({
        type: 'text',
        unique: true
    })
    username: string;

    @Column('text', {
        nullable: true
    })
    fullname?: string;
    
}

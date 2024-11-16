import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
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

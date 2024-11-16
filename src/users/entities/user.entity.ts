import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Status } from "../enums/status.enum";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: true,
    })
    username?: string;

    @Column({
        type: 'text',
        select: false,
    })
    password: string;

    @Column({ type: 'text', nullable: true })
    first_name?: string;

    @Column({ type: 'text', nullable: true })
    last_name?: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @Column({
        type: 'enum',
        enum: Status, 
        default: Status.ACTIVE,
    })
    status?: Status;
    
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewsPost {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text', default: ''})
    title!: string;

    @Column({type: 'text', default: ''})
    content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
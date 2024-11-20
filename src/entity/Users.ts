import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", default: "" })
  name!: string;

  @Column({ type: "text", default: "", unique: true, nullable: false })
  email!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}

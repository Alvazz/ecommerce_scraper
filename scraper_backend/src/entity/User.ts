import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  first_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  last_name: string;

  @Column({
    length: 100,
    unique: true
  })
  email: string;

  @Column({
    length: 100
  })
  password: string;

  @Column({
    length: 15,
  })
  phone: string;

  @Column({
    default: false,
  })
  is_active: boolean;

};

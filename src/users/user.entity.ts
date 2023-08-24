import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('inserted user with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id ', this.id);
  }

  @AfterRemove()
  logRemovo() {
    console.log('removed user with id ', this.id);
  }
}

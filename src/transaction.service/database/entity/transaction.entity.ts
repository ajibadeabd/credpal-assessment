import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column({ nullable: false })
  transactionId: string;

  @Column({
    nullable: false,
  })
  balance: number;

  @Column({ nullable: false })
  transactionType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

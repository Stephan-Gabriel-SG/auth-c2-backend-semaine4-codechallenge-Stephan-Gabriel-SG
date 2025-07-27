import { ApiProperty } from '@nestjs/swagger';
import { Library } from 'src/libraries/entities/library.entity';
import { Loan } from 'src/loans/entities/loan.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ required: false, example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true, example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ required: true, example: '7Ct5o@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ required: true, example: 'password123' })
  @Column({ select: false })
  password_hash: string;

  @ApiProperty({ required: false, example: '2022-01-01T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Library, (library) => library.user)
  library: Library;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];
}

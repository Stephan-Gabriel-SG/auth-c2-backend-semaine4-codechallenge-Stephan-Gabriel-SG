import { ApiProperty } from '@nestjs/swagger';
import { Library } from 'src/libraries/entities/library.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ required: false, example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: true, example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ required: true, example: '7Ct5o@example.com' })
  @Column()
  email: string;

  @ApiProperty({ required: true, example: 'password123' })
  @Column()
  password_hash: string;

  @ApiProperty({ required: false, example: '2022-01-01T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Library, (library) => library.user)
  library: Library;
}

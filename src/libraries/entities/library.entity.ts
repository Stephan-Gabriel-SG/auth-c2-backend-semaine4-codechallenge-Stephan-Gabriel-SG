import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('libraries')
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ForeignKey(() => User, (user) => user.id)
  @OneToOne(() => User, (user) => user.library)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

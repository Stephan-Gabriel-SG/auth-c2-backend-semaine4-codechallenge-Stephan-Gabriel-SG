import { Library } from 'src/libraries/entities/library.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  resume: string;

  @Column()
  genre: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Library, (library) => library.books)
  @JoinColumn({ name: 'library_id' })
  library: Library;
}

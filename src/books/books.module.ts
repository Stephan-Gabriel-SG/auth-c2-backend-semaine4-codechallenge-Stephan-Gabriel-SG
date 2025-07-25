import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Library } from 'src/libraries/entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Library])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

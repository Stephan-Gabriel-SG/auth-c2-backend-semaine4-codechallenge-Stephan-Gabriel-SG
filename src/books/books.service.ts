import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Library } from 'src/libraries/entities/library.entity';
import { FilterBookDto } from './dto/filter-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Library) private libraryRepository: Repository<Library>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { library_id } = createBookDto;
    try {
      const isLibraryExist = await this.libraryRepository.findOne({
        where: {
          id: library_id,
        },
      });
      if (!isLibraryExist) {
        throw new Error("La bibliothèque n'existe pas");
      }
      const newBook = await this.bookRepository.save({
        ...createBookDto,
        available: true,
        library: { id: library_id },
      });
      return {
        success: true,
        message: 'Livre ajouter avec success',
        data: newBook,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          code: error.name,
          message: error.message,
        };
      }
      return {
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Une erreur interne est survenue',
      };
    }
  }

  async findAll(filterBookDto: FilterBookDto = {}) {
    const { genre, author, available } = filterBookDto;

    // Construction dynamique des filtres
    const where: Record<string, any> = {};
    if (genre) where.genre = genre;
    if (author) where.author = author;
    if (available !== undefined) where.available = available;

    // Requête avec ou sans filtres
    const books = await this.bookRepository.find({ where });

    // Détermination du message
    let message = 'Liste des livres';
    if (books.length === 0) {
      if (genre || author || available !== undefined) {
        message = `Aucun livre trouvé pour les critères spécifiés`;
      } else {
        message = `Aucun livre trouvé dans la base`;
      }
    }

    return {
      success: true,
      data: books,
      message,
    };
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      return {
        success: false,
        code: 'NOT_FOUND',
        message: 'Livre introuvable',
      };
    }
    return {
      success: true,
      message: 'Livre trouve avec success',
      data: book,
    };
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}

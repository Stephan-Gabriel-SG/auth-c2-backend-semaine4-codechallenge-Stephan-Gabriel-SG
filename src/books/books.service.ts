import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Library } from 'src/libraries/entities/library.entity';
import { FilterBookDto } from './dto/filter-book.dto';
import { formatErrorResponse } from 'src/common/exceptions/format-error-response.helpers';
import { isValidNumericId } from 'src/common/utils/id-validation';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Library) private libraryRepository: Repository<Library>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { library_id } = createBookDto;
    try {
      if (!isValidNumericId(library_id)) {
        throw new BadRequestException(
          "L'id de la bibliothèque fourni invalide",
        );
      }
      const isLibraryExist = await this.libraryRepository.findOne({
        where: {
          id: library_id,
        },
      });
      if (!isLibraryExist) {
        throw new NotFoundException("La bibliothèque n'existe pas");
      }
      const newBook = await this.bookRepository.save({
        ...createBookDto,
        available: true,
        library: { id: library_id },
      });
      return {
        success: true,
        message: 'Livre ajouter avec success',
        data: [
          {
            id: newBook.id,
            title: newBook.title,
            author: newBook.author,
            resume: newBook.resume,
            genre: newBook.genre,
            available: newBook.available,
            created_at: newBook.created_at,
            library_id: newBook.library,
          },
        ],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findAll(filterBookDto: FilterBookDto = {}) {
    try {
      const { genre, author, available } = filterBookDto;

      // Construction dynamique des filtres
      const where: Record<string, any> = {};
      if (genre) where.genre = genre;
      if (author) where.author = author;
      if (available !== undefined) where.available = available;

      // Requête avec ou sans filtres
      const books = await this.bookRepository.find({
        where,
        loadRelationIds: {
          relations: ['library'],
        },
      });

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
        data: books.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          resume: book.resume,
          genre: book.genre,
          available: book.available,
          created_at: book.created_at,
          library_id: book.library,
        })),
        message,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findOne(id: number) {
    try {
      if (!isValidNumericId(id)) {
        throw new Error('ID fourni invalide');
      }
      const book = await this.bookRepository.findOne({
        where: { id },
        loadRelationIds: { relations: ['library'] },
      });
      if (!book) {
        throw new Error('Livre introuvable');
      }

      return {
        success: true,
        message: 'Livre trouve avec success',
        data: [
          {
            id: book.id,
            title: book.title,
            author: book.author,
            resume: book.resume,
            genre: book.genre,
            available: book.available,
            created_at: book.created_at,
            library_id: book.library,
          },
        ],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

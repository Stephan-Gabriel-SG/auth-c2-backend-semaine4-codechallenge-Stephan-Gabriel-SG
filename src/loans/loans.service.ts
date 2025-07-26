import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createLoanDto: CreateLoanDto) {
    try {
      const { book_id, user_id } = createLoanDto;
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        return {
          success: false,
          code: 'NOT_FOUND',
          message: 'Utilisateur introuvable',
        };
      }
      const book = await this.bookRepository.findOne({
        where: { id: book_id },
      });
      if (!book) {
        return {
          success: false,
          code: 'NOT_FOUND',
          message: 'Livre introuvable',
        };
      }
      if (book.available) {
        if (
          `${createLoanDto.returned}` === 'false' ||
          createLoanDto.returned === false
        ) {
          book.available = false;
        }
        await this.bookRepository.save(book);
      } else {
        return {
          success: false,
          code: 'UNAVAILABLE',
          message: 'Livre déjà emprunté par un autre utilisateur',
        };
      }
      // creation de l'emprunt et enregistrement
      const loan = this.loanRepository.create({
        ...createLoanDto,
        returned: createLoanDto.returned ?? false,
        user,
        book,
      });
      const addedLoan = await this.loanRepository.save(loan);
      return {
        success: true,
        message: 'Emprunt cree avec success',
        data: addedLoan,
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

  async findAll() {
    return {
      success: true,
      data: await this.loanRepository.find({ relations: ['book', 'user'] }),
      message: 'Liste des emprunts',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  async update(id: number, updateLoanDto: UpdateLoanDto) {
    try {
      const loan = await this.loanRepository.findOne({
        relations: ['book'],
        where: { id },
      });
      if (loan) {
        await this.loanRepository.update(id, {
          ...updateLoanDto,
          returned: true,
        });
        console.log(loan, loan.book);
        await this.bookRepository.update(loan.book.id, {
          available: true,
        });

        const updatedLoan = await this.loanRepository.findOneBy({ id });

        return {
          message: 'Emprunt mis à jour avec succès',
          data: updatedLoan,
          success: true,
        };
      } else {
        throw new Error('Emprunt introuvable');
        // return {
        //   success: false,
        //   code: 'NOT_FOUND',
        //   message: 'Emprunt introuvable',
        // };
      }
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

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}

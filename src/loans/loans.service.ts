import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { isValidNumericId } from 'src/common/utils/id-validation';
import { formatErrorResponse } from 'src/common/exceptions/format-error-response.helpers';

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
      if (!isValidNumericId(user_id)) {
        throw new BadRequestException("ID de l' utilisateur fourni invalide");
      }
      if (!isValidNumericId(book_id)) {
        throw new BadRequestException('ID du livre fourni invalide');
      }
      if (!user) {
        throw new BadRequestException('Utilisateur introuvable');
      }
      const book = await this.bookRepository.findOne({
        where: { id: book_id },
      });
      if (!book) {
        throw new BadRequestException('Livre introuvable');
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
        throw new BadRequestException(
          "Ce livre n'est pas disponible pour le moment — il a déjà été emprunté par un autre utilisateur.",
        );
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
        message: "L'emprunt a été créé avec succès.",
        data: [
          {
            id: addedLoan.id,
            start_date: addedLoan.start_date,
            end_date: addedLoan.end_date,
            returned: addedLoan.returned,
            user: {
              id: addedLoan.user.id,
              name: addedLoan.user.name,
            },
            book: {
              id: addedLoan.book.id,
              title: addedLoan.book.title,
            },
          },
        ],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findAll() {
    try {
      const allLoans = await this.loanRepository.find({
        relations: ['book', 'user'],
      });
      return {
        success: true,
        data: allLoans.map((loan) => ({
          id: loan.id,
          start_date: loan.start_date,
          end_date: loan.end_date,
          returned: loan.returned,
          user: {
            id: loan.user.id,
            name: loan.user.name,
          },
          book: {
            id: loan.book.id,
            title: loan.book.title,
          },
        })),
        message: 'Liste des emprunts',
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findOne(id: number) {
    try {
      if (!isValidNumericId(id)) {
        throw new BadRequestException('ID fourni invalide');
      }
      const loan = await this.loanRepository.findOne({
        relations: ['book', 'user'],
        where: { id },
      });
      if (!loan) {
        throw new BadRequestException('Emprunt introuvable');
      }
      return {
        success: true,
        message: 'Emprunt trouve avec success',
        data: [
          {
            id: loan.id,
            start_date: loan.start_date,
            end_date: loan.end_date,
            returned: loan.returned,
            user: {
              id: loan.user.id,
              name: loan.user.name,
            },
            book: {
              id: loan.book.id,
              title: loan.book.title,
            },
          },
        ],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async update(id: number, updateLoanDto: UpdateLoanDto) {
    try {
      if (!isValidNumericId(id)) {
        throw new BadRequestException('ID fourni invalide');
      }

      const loan = await this.loanRepository.findOne({
        relations: ['book'],
        where: { id },
      });
      if (loan) {
        await this.loanRepository.update(id, {
          ...updateLoanDto,
          returned: true,
        });
        await this.bookRepository.update(loan.book.id, {
          available: true,
        });

        const updatedLoan = await this.loanRepository.findOne({
          where: { id },
          relations: ['book', 'user'],
        });
        if (!updatedLoan) {
          throw new BadRequestException('Emprunt non mise à jour');
        }
        return {
          message: 'Emprunt mis à jour avec succès',
          data: [
            {
              id: updatedLoan.id,
              start_date: updatedLoan.start_date,
              end_date: updatedLoan.end_date,
              returned: updatedLoan.returned,
              user: {
                id: updatedLoan.user.id,
                name: updatedLoan.user.name,
              },
              book: {
                id: updatedLoan.book.id,
                title: updatedLoan.book.title,
              },
            },
          ],
          success: true,
        };
      } else {
        throw new BadRequestException('Emprunt introuvable');
      }
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async remove(id: number) {
    try {
      if (!isValidNumericId(id)) {
        throw new BadRequestException('ID fourni invalide');
      }
      const loan = await this.loanRepository.findOneBy({ id });
      if (!loan) {
        throw new BadRequestException('Emprunt introuvable');
      }
      if (loan.returned === false) {
        throw new ConflictException(
          "L'emprunt ne peut pas encore etre supprime car l'utilisateur n'a pas encore rendu le livre",
        );
      }
      await this.loanRepository.delete(id);
      return {
        success: true,
        message: 'Emprunt supprimé avec success',
        data: [
          {
            id: loan.id,
            start_date: loan.start_date,
            end_date: loan.end_date,
            returned: loan.returned,
            user: {
              id: loan.user.id,
              name: loan.user.name,
            },
            book: {
              id: loan.book.id,
              title: loan.book.title,
            },
          },
        ],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

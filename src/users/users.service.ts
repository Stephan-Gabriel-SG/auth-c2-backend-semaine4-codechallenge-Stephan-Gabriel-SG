import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { formatErrorResponse } from 'common/exceptions/format-error-response.helpers';
import { isValidNumericId } from 'common/utils/id-validation';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const userExists = await this.usersRepository.findOne({
        where: { email },
      });

      if (userExists) {
        throw new BadRequestException('Utilisateur deja existant');
      }
      const password_hash = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        name,
        email,
        password_hash,
      });
      await this.usersRepository.save(user);
      return {
        success: true,
        data: [
          {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
          },
        ],
        message: 'Utilisateur cree avec success',
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findAll() {
    try {
      const allUsers = await this.usersRepository.find();
      return {
        success: true,
        data: allUsers,
        message: 'Liste des utilisateurs',
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password_hash', 'created_at'],
    });
    return user;
  }

  async findOne(id: number) {
    try {
      if (!isValidNumericId(id)) {
        console.log('bad request - invalid numeric id');
        throw new BadRequestException('ID fourni invalide');
      }

      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('Utilisateur introuvable');
      }

      return {
        success: true,
        message: 'Utilisateur trouve avec success',
        data: [user],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findLoans(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['loans', 'loans.book'],
      });
      if (!user) {
        throw new NotFoundException('Utilisateur introuvable');
      }

      const formattedLoans = user.loans.map((loan) => ({
        id: loan.id,
        start_date: loan.start_date,
        end_date: loan.end_date,
        returned: loan.returned,
        user: {
          id: user.id,
          name: user.name,
        },
        book: {
          id: loan.book.id,
          title: loan.book.title,
        },
      }));

      return {
        success: true,
        message: 'Liste des emprunts',
        data: formattedLoans,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

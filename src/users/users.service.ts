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
import { formatErrorResponse } from 'src/common/exceptions/format-error-response.helpers';
import { isValidNumericId } from 'src/common/utils/id-validation';

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
        relations: ['loans'],
      });
      if (user) {
        return {
          success: true,
          message: 'Liste des emprunts',
          data: user.loans,
        };
      } else {
        throw new NotFoundException('Utilisateur introuvable');
      }
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

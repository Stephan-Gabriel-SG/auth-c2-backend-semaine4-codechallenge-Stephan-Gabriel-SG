import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
        throw new Error('Utilisateur deja existant');
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
        data: user,
        message: 'Utilisateur cree avec success',
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          code: error.name,
          message: error.message,
          success: false,
        };
      }
      return {
        code: 'INTERNAL_SERVER_ERROR',
        message: "Une erreur est survenue lors de la creation de l'utilisateur",
        success: false,
      };
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    if (id) {
      const user = await this.usersRepository.findOneBy({ id });
      return {
        success: true,
        message: 'Utilisateur trouve avec success',
        data: user,
      };
    }
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'Utilisateur introuvable',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

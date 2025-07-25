import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLibraryDto: CreateLibraryDto) {
    try {
      const { user_id, name, location } = createLibraryDto;
      if (user_id) {
        const user = await this.libraryRepository.findOne({
          where: { user: { id: Number(user_id) } },
        });

        if (user) {
          throw new Error('Utilisateur a deja un bibliotheque');
        }
        const userExists = await this.userRepository.findOne({
          where: { id: Number(user_id) },
        });
        if (!userExists) {
          throw new Error('Utilisateur introuvable');
        }
      }
      const library = this.libraryRepository.create({
        user: { id: user_id },
        name,
        location,
      });
      await this.libraryRepository.save(library);
      return {
        success: true,
        message: 'Bibliotheque créer avec success',
        data: library,
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
        success: false,
        code: 'SERVER_ERROR',
        message: 'Une erreur est survenue lors de la creation du bibliotheque',
      };
    }
  }

  async findAll() {
    return {
      success: true,
      data: await this.libraryRepository.find(),
      message: 'Liste des bibliotheques',
    };
  }

  async findOne(id: number) {
    if (id) {
      const library = await this.libraryRepository.findOneBy({ id });
      return {
        success: true,
        message: 'Bibliotheque trouve avec success',
        data: library,
      };
    }
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'Bibliotheque introuvable',
    };
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return `This action updates a #${id} library`;
  }

  remove(id: number) {
    return `This action removes a #${id} library`;
  }
}

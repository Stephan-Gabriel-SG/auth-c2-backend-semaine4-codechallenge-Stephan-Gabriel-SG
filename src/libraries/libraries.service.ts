import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { Library } from './entities/library.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { isValidNumericId } from 'common/utils/id-validation';
import { formatErrorResponse } from 'common/exceptions/format-error-response.helpers';

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
      if (!isValidNumericId(user_id)) {
        throw new BadRequestException("ID de l'utilisateur fourni invalide");
      }
      if (user_id) {
        const user = await this.libraryRepository.findOne({
          where: { user: { id: Number(user_id) } },
        });

        if (user) {
          throw new BadRequestException(
            'Utilisateur déjà associer à une bibliotheque',
          );
        }
        const userExists = await this.userRepository.findOne({
          where: { id: Number(user_id) },
        });
        if (!userExists) {
          throw new NotFoundException('Utilisateur introuvable');
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
        data: [library],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }

  async findAll() {
    try {
      const allLibraries = await this.libraryRepository.find();
      return {
        success: true,
        data: allLibraries,
        message: 'Liste des bibliotheques',
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

      const library = await this.libraryRepository.findOneBy({ id });

      if (!library) throw new NotFoundException('Bibliotheque introuvable');

      return {
        success: true,
        message: 'Bibliotheque trouve avec success',
        data: [library],
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

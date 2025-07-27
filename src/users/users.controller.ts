import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/api-response.dto';
import { ErrorResponseDto } from 'src/common/dto/api-error.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créer avec success',
    type: SuccessResponseDto<User>,
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur deja existant',
    type: ErrorResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès',
    type: SuccessResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Une erreur interne est survenue',
    type: ErrorResponseDto,
    example: {
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Une erreur interne est survenue',
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un utilisateur donné' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé',
    type: SuccessResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur non trouvé',
    type: ErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID invalide ou mal formé',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Une erreur interne est survenue',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/loans')
  @ApiOperation({ summary: 'Obtenir les emprunts liés à un utilisateur donné' })
  @ApiResponse({
    status: 200,
    description: 'Liste des emprunts de l’utilisateur',
    type: SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID invalide ou mal formé',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Une erreur interne est survenue',
    type: ErrorResponseDto,
  })
  findLoans(@Param('id') id: string) {
    return this.usersService.findLoans(+id);
  }
}

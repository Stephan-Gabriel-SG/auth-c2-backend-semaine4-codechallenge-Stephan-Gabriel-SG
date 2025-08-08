import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'common/dto/api-response.dto';
import { ErrorResponseDto } from 'common/dto/api-error.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UserDto } from './dto/user.dto';
import { LoanDto } from 'src/loans/dto/loan.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'Liste des livres',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserDto) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur deja existant',
    type: ErrorResponseDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiExtraModels(SuccessResponseDto, CreateBookDto)
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserDto) },
            },
          },
        },
      ],
    },
  })
  @Get('/myloans')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('user')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtenir mes emprunts' })
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 200,
    description: "Liste des emprunts faite pas l'utilisateur",
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
  })
  findMyLoans(@Request() req: { user: { userId: string } }) {
    const user = req.user;
    return this.usersService.findLoans(Number(user.userId));
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })
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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtenir un utilisateur donné' })
  @ApiExtraModels(SuccessResponseDto, UserDto)
  @ApiResponse({
    status: 200,
    description: 'Trouver un utilisateur',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(UserDto) },
            },
          },
        },
      ],
    },
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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtenir les emprunts liés à un utilisateur donné' })
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 200,
    description: "Liste des emprunts faite pas l'utilisateur",
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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

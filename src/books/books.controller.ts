import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FilterBookDto } from './dto/filter-book.dto';
import { SuccessResponseDto } from 'common/dto/api-response.dto';
import { ErrorResponseDto } from 'common/dto/api-error.dto';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau livre' })
  @ApiBody({ type: CreateBookDto })
  @ApiExtraModels(SuccessResponseDto, BookDto)
  @ApiResponse({
    status: 201,
    description: 'Livre créé avec succès',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(BookDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou mal formatées',
    type: ErrorResponseDto,
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste livre avec filtres',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(BookDto) },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Lister tous les livres avec filtres' })
  @ApiQuery({
    name: 'genre',
    required: false,
    type: String,
    description: 'Filtrer par genre du livre',
  })
  @ApiQuery({
    name: 'author',
    required: false,
    type: String,
    description: 'Filtrer par auteur',
  })
  @ApiQuery({
    name: 'available',
    required: false,
    type: Boolean,
    description: 'Filtrer par disponibilité (true/false)',
  })
  @ApiQuery({ name: 'genre', required: false, type: String })
  @ApiQuery({ name: 'author', required: false, type: String })
  @ApiQuery({ name: 'available', required: false, type: Boolean })
  findAll(@Query() filterBookDto: FilterBookDto) {
    return this.booksService.findAll(filterBookDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir les détails d’un livre par son ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Identifiant unique du livre',
  })
  @ApiExtraModels(SuccessResponseDto, BookDto)
  @ApiResponse({
    status: 200,
    description: 'Livre trouvé avec succès',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(BookDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'ID invalide ou mal formé',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Livre non trouvé',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }
}

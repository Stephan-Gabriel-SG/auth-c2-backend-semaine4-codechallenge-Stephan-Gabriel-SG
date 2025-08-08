import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'common/dto/api-response.dto';
import { Library } from './entities/library.entity';
import { ErrorResponseDto } from 'common/dto/api-error.dto';
import { LibraryDto } from './dto/library.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiTags('Libraries')
@Controller('libraries')
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'user')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Créer une nouvelle bibliothèque' })
  @ApiBody({ type: CreateLibraryDto })
  @ApiExtraModels(SuccessResponseDto, LibraryDto)
  @ApiResponse({
    status: 201,
    description: 'Bibliothèque créée avec succès',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LibraryDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Bibliothèque créée avec succès',
    type: SuccessResponseDto<Library>,
  })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.librariesService.create(createLibraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les bibliothèques' })
  @ApiExtraModels(SuccessResponseDto, LibraryDto)
  @ApiResponse({
    status: 200,
    description: 'Liste des bibliothèques récupérée',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LibraryDto) },
            },
          },
        },
      ],
    },
  })
  findAll() {
    return this.librariesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obtenir une bibliothèque par son ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Identifiant unique de la bibliothèque',
    type: Number,
  })
  @ApiExtraModels(SuccessResponseDto, LibraryDto)
  @ApiResponse({
    status: 200,
    description: 'Bibliothèque trouvéee avec succès',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LibraryDto) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'Bibliothèque non trouvée',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.librariesService.findOne(+id);
  }
}
